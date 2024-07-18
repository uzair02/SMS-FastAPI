import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { getStudent } from '../api';
import Swal from 'sweetalert2';

const EditStudent = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudent(id);
        setStudent(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Student not found");
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Student not found',
          });
        } else {
          console.error("Error fetching student:", error);
          setError("An error occurred while fetching student");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleSave = () => {
    navigate('/show');
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
              <StudentForm student={student} onSave={handleSave} />
              <div className="text-center mt-3">
                <Link to="/show" className="btn btn-secondary">Back to Student List</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
