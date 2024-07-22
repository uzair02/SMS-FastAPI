import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});

export const getStudents = (page = 1, size = 5, filter = '') => 
  api.get('/students', { params: { page, size, filter } });

export const getStudent = (id) => api.get(`/students/${id}`);
export const createStudent = (student) => api.post('/students', student);
export const updateStudent = (id, student) => api.put(`/students/${id}`, student);
export const deleteStudent = (id) => api.delete(`/students/${id}`);