'use client';

import { useCreateProject } from '@/features/projects/api/use-create-project';
import {
  ResponseType,
  useGetTemplates,
} from '@/features/projects/api/use-get-templates';
import { Loader, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TemplateCard } from './template-card';

export const TemplatesSection = () => {
  const router = useRouter();
  const mutation = useCreateProject();

  const { data, isLoading, isError } = useGetTemplates({
    page: '1',
    limit: '5',
  });

  const onClick = (template: ResponseType['data'][0]) => {
    mutation.mutate(
      {
        name: `${template.name} project`,
        json: template.json,
        width: template.width,
        height: template.height,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4 text-[#262E3C]">
        <h3 className="font-extrabold text-lg text-[#262E3C]">
          Start from a template
        </h3>
        <div className="flex items-center justify-center h-32">
          <Loader className="size-6 text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4 text-[#262E3C]">
        <h3 className="font-extrabold text-lg">Start from a template</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <TriangleAlert className="size-6 text-muted-foreground" />
          <p>Failed to load templates</p>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return null;
  }

  return (
    <div className="text-[#262E3C]">
      <h3 className="font-extrabold text-lg">Start from a template</h3>
      <div className="grid grid-cols-3 md:grid-cols-5 mt-4 gap-4">
        {data?.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.name}
            imageSrc={template.thumbnailUrl || ''}
            onClick={() => onClick(template)}
            disabled={mutation.isPending}
            description={`${template.width} x ${template.height} px`}
            width={template.width}
            height={template.height}
          />
        ))}
      </div>
    </div>
  );
};
