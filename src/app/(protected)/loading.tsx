import CustomLoader from '@/components/ui/custom-loader';

export default function Loading() {
  // Applying SRP: Single Responsibility Principle - this component only handles loading state
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <CustomLoader />
    </div>
  );
}
