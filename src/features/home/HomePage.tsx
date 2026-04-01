import { Link } from 'react-router-dom';
import { Zap, Euro, Wrench, WashingMachine, Refrigerator, CookingPot, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Energy Efficiency',
    description: 'Compare EU energy labels from A to G based on official EPREL data.',
  },
  {
    icon: Euro,
    title: 'Running Costs',
    description: 'See estimated yearly electricity costs and total cost of ownership.',
  },
  {
    icon: Wrench,
    title: 'Repairability',
    description: 'Check repairability scores and spare parts availability before you buy.',
  },
];

const categories = [
  {
    to: '/washing-machines',
    icon: WashingMachine,
    label: 'Washing Machines',
    active: true,
    count: 19,
  },
  {
    to: '/fridges',
    icon: Refrigerator,
    label: 'Fridges',
    active: false,
  },
  {
    to: '/dishwashers',
    icon: CookingPot,
    label: 'Dishwashers',
    active: false,
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-2xl">
            <Zap className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          EPREL Smart Buy
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Compare EU household appliances by energy efficiency, real-world running costs, and
          repairability — all in one place. Make smarter, more sustainable purchasing decisions.
        </p>
        <Link
          to="/washing-machines"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors text-lg"
        >
          Start Comparing
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Everything you need to decide
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                  <f.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Browse by category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.to}
                to={cat.to}
                className={`relative rounded-xl border p-8 text-center transition-all ${
                  cat.active
                    ? 'border-green-200 bg-green-50 hover:border-green-300 hover:shadow-md'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <cat.icon className={`w-12 h-12 mx-auto mb-4 ${cat.active ? 'text-green-600' : 'text-gray-400'}`} />
                <h3 className={`text-lg font-semibold mb-1 ${cat.active ? 'text-gray-900' : 'text-gray-500'}`}>
                  {cat.label}
                </h3>
                {cat.active ? (
                  <p className="text-sm text-green-600 font-medium">{cat.count} products</p>
                ) : (
                  <span className="inline-block text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
