import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Guestbook from './pages/Guestbook';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guestbook" element={<Guestbook />} />
      </Routes>
    </>
  );
}
