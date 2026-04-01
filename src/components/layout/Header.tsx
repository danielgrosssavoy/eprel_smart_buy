import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-gray-900 hover:text-green-700 transition-colors">
            <Zap className="w-7 h-7 text-green-600" />
            <span className="text-xl font-bold">EPREL Smart Buy</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/washing-machines" className="hover:text-green-700 transition-colors">
              Compare
            </Link>
            <a href="#about" className="hover:text-green-700 transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
