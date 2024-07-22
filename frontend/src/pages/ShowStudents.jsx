import React, { useEffect, useState } from 'react';
import { getStudents, deleteStudent } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './css/ShowStudent.css';

const ShowStudents = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents(currentPage, filter);
  }, [currentPage, filter]);

  const fetchStudents = async (page, filter) => {
    try {
      const response = await getStudents(page, 5, filter);
      setStudents(response.data.items);
      setTotalPages(Math.ceil(response.data.total / response.data.size));
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteStudent(id);
          Swal.fire({
            title: 'Deleted!',
            text: 'Student has been deleted.',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
          });
          fetchStudents(currentPage, filter);
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete student.',
            icon: 'error',
            timer: 3000,
            timerProgressBar: true,
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  return (
    <div className="container-fluid my-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card bg-dark text-light shadow-lg">
            <div className="card-body p-0">
              <h2 className="card-title text-center py-4 mb-0 bg-primary text-white">Students List</h2>
              <div className="row px-4 py-3">
              <div className="col-md-4 d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by first name, last name, or email"
                  value={filter}
                  onChange={handleFilterChange}
                />
              </div>
            <div className="col-md-8">
              {/* You can add other elements or leave this space empty */}
            </div>
          </div>
              <div className="table-responsive">
                <table className="table table-dark table-hover table-striped mb-0">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="py-3">First Name</th>
                      <th className="py-3">Last Name</th>
                      <th className="py-3">Age</th>
                      <th className="py-3">Email</th>
                      <th className="py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.student_id} className="align-middle">
                        <td>{student.first_name}</td>
                        <td>{student.last_name}</td>
                        <td>{student.age}</td>
                        <td>{student.email}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-outline-info btn-sm me-2"
                              onClick={() => navigate(`/edit/${student.student_id}`)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(student.student_id)}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-center py-4 bg-dark">
                <nav aria-label="Page navigation">
                  <ul className="pagination pagination-sm">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages).keys()].map(page => (
                      <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page + 1)}>{page + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/" className="btn btn-outline-light btn-lg">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowStudents;
