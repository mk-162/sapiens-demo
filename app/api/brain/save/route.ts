import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type SaveRequest = {
  asset?: { id?: string };
  markdown?: string;
};

function safeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

export async function POST(request: Request) {
  let payload: SaveRequest;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const id = safeSlug(payload.asset?.id ?? '');
  const markdown = payload.markdown ?? '';

  if (!id) return NextResponse.json({ error: 'Missing asset id' }, { status: 400 });
  if (!markdown.trim()) return NextResponse.json({ error: 'Missing markdown content' }, { status: 400 });

  const relativePath = `content/brain/assets/${id}.md`;
  const fullPath = path.join(process.cwd(), relativePath);

  try {
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, markdown, 'utf8');
    return NextResponse.json({ ok: true, path: relativePath });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Could not write Markdown file. In production, wire this route to GitHub commits instead of filesystem writes.',
      },
      { status: 500 },
    );
  }
}
