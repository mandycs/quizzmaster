import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import Quizz from './Quizz'; // Asegúrate de importar el componente Quiz
import Credits from './Credits'; // Asegúrate de importar el componente Credits

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/quizz" element={<Quizz />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </Router>
  );
}

export default App;
