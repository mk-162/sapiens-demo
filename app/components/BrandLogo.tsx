import Image from 'next/image';

type BrandLogoProps = {
  variant?: 'header' | 'compact' | 'hero';
  className?: string;
};

const VARIANT_WIDTH: Record<NonNullable<BrandLogoProps['variant']>, number> = {
  header: 125,
  compact: 42,
  hero: 55,
};

export default function BrandLogo({
  variant = 'header',
  className = '',
}: BrandLogoProps) {
  const width = VARIANT_WIDTH[variant];
  const height = Math.round((width / 600) * 170);

  return (
    <Image
      src="/brand/sapiens-logo.png"
      alt="Sapiens"
      width={width}
      height={height}
      className={`sapiens-logo ${className}`}
    />
  );
}
