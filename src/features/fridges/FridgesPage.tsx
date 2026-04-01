import { TabNav } from '../../components/layout/TabNav';
import { ComingSoon } from '../../components/ui/ComingSoon';

export function FridgesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TabNav />
      <ComingSoon category="fridges" />
    </div>
  );
}
