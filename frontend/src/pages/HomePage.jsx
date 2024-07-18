import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/global.css'

const HomePage = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg" style={{width: '20srem', backgroundColor: '#ebe8e8'}}>
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Student Management System</h1>
          <nav>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-transparent">
                <Link to="/add" className="btn btn-primary w-100">Add Student</Link>
              </li>
              <li className="list-group-item bg-transparent">
                <Link to="/show" className="btn btn-success w-100">Show Students</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HomePage;