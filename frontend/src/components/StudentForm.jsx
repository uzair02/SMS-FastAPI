import React, { useState } from 'react';
import { createStudent, updateStudent } from '../api';
import Swal from 'sweetalert2'; 

const StudentForm = ({ student, onSave }) => {
  const [formData, setFormData] = useState(student || { first_name: '', last_name: '', age: '', email: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (student) {
        response = await updateStudent(student.student_id, formData);
      } else {
        response = await createStudent(formData);
      }
      Swal.fire({
        title: student ? 'Student Updated!' : 'Student Created!',
        icon: 'success',
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        position: 'top-end',
        showConfirmButton: false,
      });
      onSave();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.detail.reduce((acc, err) => {
          acc[err.loc[1]] = err.msg;
          return acc;
        }, {});
        setErrors(validationErrors);
        Swal.fire({
          title: 'Validation Error',
          text: 'Please correct the errors in the form.',
          icon: 'error',
          toast: true,
          timer: 3000,
          timerProgressBar: true,
          position: 'top-end',
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to save student',
          icon: 'error',
          toast: true,
          timer: 3000,
          timerProgressBar: true,
          position: 'top-end',
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-12 col-xl-12">
          <div className="card bg-dark text-light">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Student Registration</h2>
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input 
                      type="text"
                      className={`form-control bg-secondary text-light ${errors.first_name ? 'is-invalid' : ''}`}
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                    />
                    {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input 
                      type="text"
                      className={`form-control bg-secondary text-light ${errors.last_name ? 'is-invalid' : ''}`}
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      required
                    />
                    {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="age" className="form-label">Age</label>
                  <input 
                    type="number"
                    className={`form-control bg-secondary text-light ${errors.age ? 'is-invalid' : ''}`}
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    required
                  />
                  {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email"
                    className={`form-control bg-secondary text-light ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="d-flex justify-content-start">
                  <button type="submit" className="btn btn-primary btn-lg px-5">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
