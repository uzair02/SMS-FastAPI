import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddStudent from './pages/AddStudent';
import ShowStudents from './pages/ShowStudents';
import EditStudent from './pages/EditStudent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/show" element={<ShowStudents />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </Router>
  );
};

export default App;