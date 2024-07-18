import React, { useEffect, useState } from 'react';
import { getStudents, deleteStudent } from '../api';
import StudentDetail from './StudentDetail';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await getStudents();
    setStudents(response.data);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.first_name} {student.last_name} {student.age} {student.email}
            <button onClick={() => setSelectedStudent(student)}>Edit</button>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
         </li>
        ))}
      </ul>
      {selectedStudent && (
        <StudentDetail student={selectedStudent} onClose={() => setSelectedStudent(null)} onSave={fetchStudents} />
      )}
    </div>
  );
};

export default StudentList;
