'use client';

import { useEffect, useId, useRef, useState } from 'react';

type HelpHintProps = {
  label: string;
  children: React.ReactNode;
  align?: 'start' | 'end';
  className?: string;
};

export default function HelpHint({
  label,
  children,
  align = 'start',
  className = '',
}: HelpHintProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <span ref={wrapRef} className={`help-hint ${className}`}>
      <button
        type="button"
        aria-label={`What is ${label}?`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (
            !wrapRef.current?.contains(e.relatedTarget as Node | null)
          ) {
            setOpen(false);
          }
        }}
        className="help-hint-btn"
      >
        <span aria-hidden="true">i</span>
      </button>
      {open ? (
        <span
          role="tooltip"
          id={id}
          className={`help-hint-pop help-hint-pop--${align}`}
        >
          <span className="help-hint-title">{label}</span>
          <span className="help-hint-body">{children}</span>
        </span>
      ) : null}
    </span>
  );
}
