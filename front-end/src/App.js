import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './View/HomePage';
import UserPage from './View/UserPage';
import 'semantic-ui-css/semantic.min.css';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/userpage" exact element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
