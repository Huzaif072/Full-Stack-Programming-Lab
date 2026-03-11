import React from 'react';

function CourseItem({ courseName, instructor, duration, courseType }) {
  return (
    <div style={styles.card}>
      <h3>{courseName}</h3>
      <p><strong>Instructor:</strong> {instructor}</p>
      <p><strong>Duration:</strong> {duration}</p>
      <p><strong>Type:</strong> {courseType}</p>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px',
    width: '250px',
    textAlign: 'left',
  },
};

export default CourseItem;
