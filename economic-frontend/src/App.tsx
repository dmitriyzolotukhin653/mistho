import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { MainPage } from './page/MainPage';
import { SingleNewsPage } from './page/SIngleNewsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/news/:id" element={<SingleNewsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
