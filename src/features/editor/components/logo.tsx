import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <div className="size-8 relative shrink-0">
        <Image
          className="shrink-0 hover:opacity-75 transition"
          src="/logo.svg"
          alt="Image AIlogo"
          fill
        />
      </div>
    </Link>
  );
}
