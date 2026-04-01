import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './features/home/HomePage';
import { WashingMachinesPage } from './features/washing-machines/WashingMachinesPage';
import { FridgesPage } from './features/fridges/FridgesPage';
import { DishwashersPage } from './features/dishwashers/DishwashersPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/washing-machines" element={<WashingMachinesPage />} />
            <Route path="/fridges" element={<FridgesPage />} />
            <Route path="/dishwashers" element={<DishwashersPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
