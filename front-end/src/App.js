import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Room from './pages/Room';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/public" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
