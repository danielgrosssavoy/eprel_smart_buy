import { TabNav } from '../../components/layout/TabNav';
import { ComingSoon } from '../../components/ui/ComingSoon';

export function DishwashersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TabNav />
      <ComingSoon category="dishwashers" />
    </div>
  );
}
