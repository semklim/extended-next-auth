import { Loader2 } from 'lucide-react';

import { cn } from '@/libs/utils';

interface CustomLoaderProps {
  className?: string;
}

export default function CustomLoader(props: CustomLoaderProps) {
  const { className = '', ...otherProps } = props;

  return (
    <div
      className={cn('flex flex-col items-center gap-4', className)}
      {...otherProps}
    >
      <Loader2 className="size-10 animate-spin text-primary" />
      <p className="text-lg font-medium text-muted-foreground">Loading...</p>
    </div>
  );
}
