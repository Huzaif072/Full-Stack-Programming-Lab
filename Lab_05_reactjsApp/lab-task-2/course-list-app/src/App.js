import './App.css';
import CourseItem from './CourseItem';

const courses = [
  { courseName: 'React Basics', instructor: 'Anwar-ul-Hassan', duration: '4 weeks', courseType: 'Online' },
  { courseName: 'Node.js Fundamentals', instructor: 'Dr. Humaira Waqas', duration: '6 weeks', courseType: 'Online' },
  { courseName: 'Database Management', instructor: 'Ali Pirzada', duration: '8 weeks', courseType: 'Offline' },
  { courseName: 'Python Programming', instructor: 'Naseer Jan', duration: '5 weeks', courseType: 'Online' },
  { courseName: 'Data Structures', instructor: 'Shareef Hussain', duration: '10 weeks', courseType: 'Offline' },
];

function App() {
  return (
    <div className="App">
      <h1>Course List App</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {courses.map((course, index) => (
          <CourseItem
            key={index}
            courseName={course.courseName}
            instructor={course.instructor}
            duration={course.duration}
            courseType={course.courseType}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
