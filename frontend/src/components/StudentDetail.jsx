import React from 'react';
import StudentForm from './StudentForm';

const StudentDetail = ({ student, onClose, onSave }) => {
  return (
    <div>
      <h2>Edit Student</h2>
      <StudentForm student={student} onSave={() => { onSave(); onClose(); }} />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default StudentDetail;
