import { Loader2 } from 'lucide-react';

export default function Loading() {
  // Applying SRP: Single Responsibility Principle - this component only handles loading state
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-10 animate-spin text-primary" />
        <p className="text-lg font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
