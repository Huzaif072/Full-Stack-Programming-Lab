import React from 'react';
import StudentCard from './components/StudentCard';
import './App.css';

function App() {
  const students = [
    {
      name: 'Muhammad Huzaif Amir',
      rollNo: '232006',
      department: 'Creative Technologies',
      university: 'Air University',
      color: '#e3f2fd'
    },
    {
      name: 'Younas Faisal',
      rollNo: '232487',
      department: 'Computer Science',
      university: 'Air University',
      color: '#f3e5f5'
    },
    {
      name: 'Ayaan Qazi',
      rollNo: '231980',
      department: 'Creative Technologies',
      university: 'Air University',
      color: '#e8f5e9'
    }
  ];

  return (
    <div className="App">
      <h1 className="app-title">Student Information Cards</h1>
      <div className="cards-container">
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            rollNo={student.rollNo}
            department={student.department}
            university={student.university}
            color={student.color}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
