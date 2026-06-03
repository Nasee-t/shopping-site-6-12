import { Routes, Route } from 'react-router-dom';

import ShoppingPage from './pages/ShoppingPage';
import SuccessPage from './pages/Success';
import CancelPage from './pages/Cancel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShoppingPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/cancel" element={<CancelPage />} />
    </Routes>
  );
}

export default App;