import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Methods from './Components/Methods'; // Import Methods.js
import Form from './Components/Form'; // Assuming you already have this component
import Graphs from './Components/Graphs';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/users" element={<Methods />} /> {/* Correct the route here to /users */}
        <Route path="/apply" element={<Form />} />
        <Route path="/graphs" element={<Graphs />}/>
      </Routes>
    </Router>
  );
}

export default App;
