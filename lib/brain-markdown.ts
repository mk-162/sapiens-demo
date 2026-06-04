import fs from 'node:fs';
import path from 'node:path';

export type BrainStatus = 'draft' | 'agent_proposed' | 'needs_validation' | 'validated' | 'retired';

export interface MarkdownBrainAsset {
  id: string;
  title: string;
  status: BrainStatus;
  category: string;
  region: string;
  confidence: string;
  buyerSignals: string[];
  productFit: string[];
  relatedModules: string[];
  relatedCohorts: string[];
  sourceUrls: string[];
  lastReviewed: string;
  owner: string;
  body: string;
  filePath: string;
  sections: Record<string, string>;
}

const BRAIN_ROOT = path.join(process.cwd(), 'content', 'brain');
const ASSETS_DIR = path.join(BRAIN_ROOT, 'assets');

function parseFrontmatter(markdown: string): { data: Record<string, string | string[]>; body: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: markdown };

  const data: Record<string, string | string[]> = {};
  const lines = match[1].split('\n');
  let activeKey: string | null = null;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, '');
    if (!line.trim()) continue;

    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && activeKey) {
      const current = data[activeKey];
      data[activeKey] = Array.isArray(current) ? [...current, listItem[1].trim()] : [listItem[1].trim()];
      continue;
    }

    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (pair) {
      activeKey = pair[1];
      data[activeKey] = pair[2].trim();
    }
  }

  return { data, body: match[2].trim() };
}

function asList(value: string | string[] | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function asString(value: string | string[] | undefined, fallback = ''): string {
  if (!value) return fallback;
  return Array.isArray(value) ? value.join(', ') : value;
}

function parseSections(body: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const parts = body.split(/^##\s+/m);
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const [heading, ...rest] = trimmed.split('\n');
    sections[heading.trim()] = rest.join('\n').trim();
  }
  return sections;
}

export function getMarkdownBrainAssets(): MarkdownBrainAsset[] {
  if (!fs.existsSync(ASSETS_DIR)) return [];

  return fs
    .readdirSync(ASSETS_DIR)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const fullPath = path.join(ASSETS_DIR, file);
      const markdown = fs.readFileSync(fullPath, 'utf8');
      const { data, body } = parseFrontmatter(markdown);
      const status = asString(data.status, 'draft') as BrainStatus;

      return {
        id: asString(data.id, file.replace(/\.md$/, '')),
        title: asString(data.title, file.replace(/\.md$/, '')),
        status,
        category: asString(data.category, 'Uncategorised'),
        region: asString(data.region, 'Global'),
        confidence: asString(data.confidence, 'Needs validation'),
        buyerSignals: asList(data.buyerSignals),
        productFit: asList(data.productFit),
        relatedModules: asList(data.relatedModules),
        relatedCohorts: asList(data.relatedCohorts),
        sourceUrls: asList(data.sourceUrls),
        lastReviewed: asString(data.lastReviewed),
        owner: asString(data.owner, 'Unassigned'),
        body,
        filePath: `content/brain/assets/${file}`,
        sections: parseSections(body),
      };
    });
}

export function buildBrainSnapshot(assets = getMarkdownBrainAssets()): string {
  return assets
    .map((asset) => {
      const risks = asset.sections['Risks / validation notes'] ?? asset.sections['Risks'] ?? '';
      return [
        `Asset: ${asset.title}`,
        `Status: ${asset.status}`,
        `Category/region: ${asset.category} / ${asset.region}`,
        `Confidence: ${asset.confidence}`,
        `Buyer signals: ${asset.buyerSignals.join(', ')}`,
        `Product fit: ${asset.productFit.join(', ')}`,
        `Related modules: ${asset.relatedModules.join(', ')}`,
        `Related cohorts: ${asset.relatedCohorts.join(', ')}`,
        `Source URLs: ${asset.sourceUrls.join(', ')}`,
        risks ? `Risks: ${risks}` : '',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n---\n\n');
}

export function assetToMarkdown(asset: MarkdownBrainAsset): string {
  const arrayBlock = (key: string, values: string[]) => `${key}:\n${values.map((value) => `  - ${value}`).join('\n')}`;
  return `---\nid: ${asset.id}\ntitle: ${asset.title}\nstatus: ${asset.status}\ncategory: ${asset.category}\nregion: ${asset.region}\nconfidence: ${asset.confidence}\n${arrayBlock('buyerSignals', asset.buyerSignals)}\n${arrayBlock('productFit', asset.productFit)}\n${arrayBlock('relatedModules', asset.relatedModules)}\n${arrayBlock('relatedCohorts', asset.relatedCohorts)}\n${arrayBlock('sourceUrls', asset.sourceUrls)}\nlastReviewed: ${asset.lastReviewed}\nowner: ${asset.owner}\n---\n\n${asset.body.trim()}\n`;
}
