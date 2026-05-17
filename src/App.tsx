import { Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
