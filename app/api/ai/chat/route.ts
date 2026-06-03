import { NextRequest, NextResponse } from 'next/server';
import { AI_SYSTEM_PROMPT, buildFallbackDealAdvice, buildKnowledgeBase } from '@/lib/ai/knowledge';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatRequest = {
  messages?: ChatMessage[];
  dealContext?: unknown;
  mode?: 'chat' | 'deal-analysis';
};

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-sonnet-4-20250514';

function sanitiseMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message): message is ChatMessage => {
      if (!message || typeof message !== 'object') return false;
      const candidate = message as Record<string, unknown>;
      return (
        (candidate.role === 'user' || candidate.role === 'assistant') &&
        typeof candidate.content === 'string' &&
        candidate.content.trim().length > 0
      );
    })
    .slice(-10)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 4000),
    }));
}

function buildUserContent(request: ChatRequest): string {
  const latestMessage = sanitiseMessages(request.messages).at(-1)?.content;

  if (request.mode === 'deal-analysis') {
    return `Analyse this generated deal and give commercially useful feedback.\n\nDeal context JSON:\n${JSON.stringify(
      request.dealContext ?? {},
      null,
      2,
    )}`;
  }

  return latestMessage ?? 'Help me understand this subscription toolkit.';
}

export async function POST(request: NextRequest) {
  let body: ChatRequest;

  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const messages = sanitiseMessages(body.messages);
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      content: buildFallbackDealAdvice(body.dealContext),
      demoMode: true,
    });
  }

  const system = `${AI_SYSTEM_PROMPT}\n\n${buildKnowledgeBase()}`;
  const userContent = buildUserContent(body);
  const anthropicMessages =
    body.mode === 'deal-analysis'
      ? [{ role: 'user', content: userContent }]
      : [
          ...messages.slice(0, -1),
          { role: 'user' as const, content: userContent },
        ];

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL ?? DEFAULT_MODEL,
        max_tokens: 1200,
        temperature: 0.3,
        system,
        messages: anthropicMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: 'Anthropic request failed',
          detail: errorText.slice(0, 800),
        },
        { status: 502 },
      );
    }

    const data = await response.json();
    const content = Array.isArray(data.content)
      ? data.content
          .filter((block: { type?: string; text?: string }) => block.type === 'text')
          .map((block: { text?: string }) => block.text ?? '')
          .join('\n')
          .trim()
      : '';

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'AI advisor unavailable',
        detail: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
