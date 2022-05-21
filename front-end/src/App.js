import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import Room from './pages/Room';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/joinroom" element={<JoinRoom />} />
      </Routes>
    </div>
  );
}

export default App;
