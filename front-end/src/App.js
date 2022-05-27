import { Route, Routes } from 'react-router-dom';
import { Box } from 'rebass';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import Room from './pages/Room';

function App() {
  return (
    <div className="App">
      <Box width={[1 / 1, 1 / 1.9]} mx="auto">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/room" element={<Room />} />
          <Route path="/joinroom" element={<JoinRoom />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
