import React from 'react';
import StudentForm from '../components/StudentForm';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const AddStudent = () => {
  const navigate = useNavigate();

  const handleSave = () => {
      navigate('/show');
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
              <StudentForm onSave={handleSave} />
              <div className="text-center mt-3">
                <Link to="/" className="btn btn-secondary">Back to Home</Link>
              </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
