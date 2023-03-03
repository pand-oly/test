import { Login, Register } from './pages';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
