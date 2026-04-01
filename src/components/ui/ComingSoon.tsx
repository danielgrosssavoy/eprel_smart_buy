import { Clock } from 'lucide-react';

export function ComingSoon({ category }: { category: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <Clock className="w-16 h-16 text-gray-300 mb-6" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Coming Soon</h2>
      <p className="text-gray-500 max-w-md">
        We're working on adding {category} to EPREL Smart Buy.
        Check back soon for energy efficiency comparisons and cost estimates.
      </p>
    </div>
  );
}
