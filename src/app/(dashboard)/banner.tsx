'use client';

import { Button } from '@/components/ui/button';
import { useCreateProject } from '@/features/projects/api/use-create-project';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Banner() {
  const router = useRouter();
  const mutation = useCreateProject();

  const onClick = () => {
    mutation.mutate(
      {
        name: 'Untitled project',
        json: '',
        width: 900,
        height: 1200,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };
  return (
    <div className="text-[#262E3C] min-h-[200px] flex items-center">
      <div className="flex flex-col gap-y-2 md:gap-y-3.5">
        <h1 className="text-2xl md:text-3xl lg:text-[2.5rem] font-extrabold text-[#262E3C]">
          Visualize your ideas with Image AI
        </h1>
        <p className="text-sm md:text-base lg:text-lg mb-2 text-[#262E3C]">
          Turn inspiration into design in no time. Simply upload an image and
          let AI do the rest.
        </p>
        <Button
          disabled={mutation.isPending}
          onClick={onClick}
          variant="secondary"
          className="relative w-44 md:w-48 xl:w-52 h-10 md:h-12 xl:h-14 text-sm xl:text-base group bg-gradient-to-r from-[#17acff] to-[#3083ff] text-white overflow-hidden"
        >
          <div className="absolute w-full h-full bg-white/0 group-hover:bg-white/20 transition" />
          Start creating
          <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition" />
        </Button>
      </div>
    </div>
  );
}
