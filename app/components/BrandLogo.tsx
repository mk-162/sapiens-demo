import Image from 'next/image';

type BrandLogoProps = {
  variant?: 'full' | 'compact';
  className?: string;
};

export default function BrandLogo({
  variant = 'full',
  className = '',
}: BrandLogoProps) {
  const width = variant === 'compact' ? 106 : 142;
  const height = Math.round((width / 600) * 170);

  return (
    <Image
      src="/brand/sapiens-logo.png"
      alt="Sapiens"
      width={width}
      height={height}
      priority={variant === 'full'}
      className={`sapiens-logo ${className}`}
    />
  );
}
