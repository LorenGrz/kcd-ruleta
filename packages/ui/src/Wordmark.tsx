type Props = {
  src: string;
  alt: string;
  /** Pass the height here, e.g. "h-12 md:h-14". */
  className?: string;
};

/**
 * Header logo. `src` points at a file in the app's `public/` dir.
 *
 * The image is shown as-is, with no card behind it: each app ships a `logo.png`
 * toned for its own background (the form wraps it in a dark chip since the
 * card is white; the wheel shows it directly on its near-black header).
 */
export function Wordmark({ src, alt, className = "h-12" }: Props) {
  return <img src={src} alt={alt} className={`w-auto ${className}`} />;
}
