import { NavLink } from 'react-router-dom';
import { WashingMachine, Refrigerator, CookingPot } from 'lucide-react';

const tabs = [
  { to: '/washing-machines', label: 'Washing Machines', icon: WashingMachine, active: true },
  { to: '/fridges', label: 'Fridges', icon: Refrigerator, active: false },
  { to: '/dishwashers', label: 'Dishwashers', icon: CookingPot, active: false },
] as const;

export function TabNav() {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-green-600 text-green-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {!tab.active && (
                <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">Soon</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
