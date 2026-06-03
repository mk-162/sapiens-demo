'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type DealContext = Record<string, unknown>;

type AdvisorEvent = CustomEvent<DealContext>;

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    'I can help assess package fit, explain module choices, and review a generated deal for upsell opportunities, risks and sales talking points.',
};

const SUGGESTED_PROMPTS = [
  'Which modules are strongest for this cohort?',
  'What risks should sales flag before sharing?',
  'How should I position Horizon vs Intelligent?',
];

export default function DealAdvisor() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [dealContext, setDealContext] = useState<DealContext | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const visibleMessages = useMemo(
    () => messages.filter((message) => message.content.trim().length > 0),
    [messages],
  );

  const callAdvisor = useCallback(
    async ({
      nextMessages,
      mode,
      context,
    }: {
      nextMessages: ChatMessage[];
      mode: 'chat' | 'deal-analysis';
      context?: DealContext | null;
    }) => {
      setLoading(true);
      setDemoMode(false);

      try {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            messages: nextMessages,
            dealContext: context ?? dealContext,
            mode,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || data.error || 'AI advisor failed');
        }

        setDemoMode(Boolean(data.demoMode));
        setMessages((current) => [
          ...current,
          {
            role: 'assistant',
            content:
              data.content ||
              'I could not produce a useful response. Try asking the question another way.',
          },
        ]);
      } catch (error) {
        setMessages((current) => [
          ...current,
          {
            role: 'assistant',
            content: `The Deal Advisor is unavailable right now. ${
              error instanceof Error ? error.message : 'Unknown error'
            }`,
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [dealContext],
  );

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || loading) return;

      const nextMessages = [...messages, { role: 'user' as const, content: trimmed }];
      setMessages(nextMessages);
      setInput('');
      setOpen(true);

      await callAdvisor({ nextMessages, mode: 'chat' });
    },
    [callAdvisor, loading, messages],
  );

  const analyseDeal = useCallback(
    async (context?: DealContext | null) => {
      const activeContext = context ?? dealContext;
      setOpen(true);

      if (!activeContext) {
        setMessages((current) => [
          ...current,
          {
            role: 'assistant',
            content:
              'Open the Configurator and generate a quote first, then I can analyse the current deal.',
          },
        ]);
        return;
      }

      const userMessage: ChatMessage = {
        role: 'user',
        content: 'Analyse the current generated deal and recommend improvements.',
      };
      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      await callAdvisor({
        nextMessages,
        mode: 'deal-analysis',
        context: activeContext,
      });
    },
    [callAdvisor, dealContext, messages],
  );

  useEffect(() => {
    const handleUpdate = (event: Event) => {
      const custom = event as AdvisorEvent;
      setDealContext(custom.detail);
    };

    const handleAnalyse = (event: Event) => {
      const custom = event as AdvisorEvent;
      setDealContext(custom.detail);
      void analyseDeal(custom.detail);
    };

    window.addEventListener('deal-advisor:update', handleUpdate);
    window.addEventListener('deal-advisor:analyse', handleAnalyse);

    return () => {
      window.removeEventListener('deal-advisor:update', handleUpdate);
      window.removeEventListener('deal-advisor:analyse', handleAnalyse);
    };
  }, [analyseDeal]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white shadow-2xl hover:bg-[#e85000] transition-colors print:hidden"
        aria-label="Open AI Deal Advisor"
      >
        AI Deal Advisor
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 print:hidden" aria-live="polite">
          <button
            type="button"
            aria-label="Close AI Deal Advisor overlay"
            className="absolute inset-0 bg-[rgba(13,37,111,0.18)]"
            onClick={() => setOpen(false)}
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-[var(--color-border)] bg-white shadow-2xl">
            <div className="bg-[var(--color-primary)] px-5 py-4 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                    AI layer
                  </div>
                  <h2 className="mt-1 text-2xl font-light tracking-tight">
                    Deal Advisor
                  </h2>
                  <p className="mt-1 text-sm text-white/75">
                    Product-aware coaching for package fit, risk and upsell.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/25 px-3 py-1 text-sm text-white/80 hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] px-5 py-3">
              <button
                type="button"
                onClick={() => void analyseDeal()}
                disabled={loading}
                className="btn-accent w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
              >
                {dealContext ? 'Analyse current deal' : 'Generate a quote to analyse'}
              </button>
              {demoMode ? (
                <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                  Demo mode: add ANTHROPIC_API_KEY to enable live Anthropic responses.
                </p>
              ) : null}
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {visibleMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'ml-10 bg-[var(--color-primary)] text-white'
                      : 'mr-10 border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-ink)]'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              ))}
              {loading ? (
                <div className="mr-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3 text-sm text-[var(--color-text-muted)]">
                  Thinking through the deal…
                </div>
              ) : null}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-[var(--color-border)] bg-white p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    disabled={loading}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-primary)] hover:border-[var(--color-primary)] disabled:opacity-60"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                className="flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage(input);
                }}
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about package fit, modules, risks…"
                  className="min-w-0 flex-1 rounded-xl border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="btn-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Send
                </button>
              </form>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
