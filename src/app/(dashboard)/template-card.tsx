import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  imageSrc: string;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  description: string;
  width: number;
  height: number;
};

export const TemplateCard = ({
  imageSrc,
  title,
  onClick,
  disabled,
  description,
  height,
  width,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'space-y-2 group text-left transition flex flex-col',
        disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
      )}
    >
      <div
        style={{ aspectRatio: `${width}/${height}` }}
        className="relative rounded-xl h-full w-full overflow-hidden border"
      >
        <Image
          fill
          src={imageSrc}
          alt={title}
          className=" object-cover transition transform group-hover:scale-105"
        />

        <div className="opacity-0 group-hover:opacity-100 transition absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl backdrop-filter backdrop-blur-sm">
          <p className="text-white font-medium">Open in editor</p>
        </div>
      </div>
      <div className="space-y-1 text-[#262E3C]">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-75 transition">
          {description}
        </p>
      </div>
    </button>
  );
};
