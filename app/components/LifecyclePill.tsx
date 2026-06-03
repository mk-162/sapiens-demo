import type { LifecycleStatus } from '@/lib/types';

const STYLE_MAP: Record<LifecycleStatus, string> = {
  'Future Platform': 'pill-future',
  Maintain: 'pill-maintain',
  'End of Life': 'pill-eol',
};

export default function LifecyclePill({
  status,
  className = '',
}: {
  status: LifecycleStatus;
  className?: string;
}) {
  return (
    <span className={`pill ${STYLE_MAP[status]} ${className}`}>{status}</span>
  );
}
