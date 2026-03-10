import React from 'react';
import './StudentCard.css';

function StudentCard({ name, rollNo, department, university, color }) {
  return (
    <div className="student-card" style={{ backgroundColor: color || '#ffffff' }}>
      <h2 className="student-name">{name}</h2>
      <div className="student-details">
        <p><span>Roll No:</span> {rollNo}</p>
        <p><span>Department:</span> {department}</p>
        <p><span>University:</span> {university}</p>
      </div>
    </div>
  );
}

export default StudentCard;
