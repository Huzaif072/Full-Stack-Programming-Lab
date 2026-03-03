const students = [
    { name: "Ali Ahmed", age: 22, semester: 6, courses: ["JavaScript", "AI", "Database"] },
    { name: "Sara Khan", age: 21, semester: 6, courses: ["HTML", "CSS", "Python"] },
    { name: "Hassan Raza", age: 23, semester: 6, courses: ["React", "Node.js", "MongoDB"] }
];

const jsonString = JSON.stringify(students, null, 2);

const parsedStudents = JSON.parse(jsonString);

let studentCards = "";
parsedStudents.forEach((student) => {
    const { name, age, semester, courses } = student;
    studentCards += `<div class="student-card">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Semester:</strong> ${semester}</p>
        <p><strong>Courses:</strong> ${courses.join(", ")}</p>
    </div>`;
});

const nameList = parsedStudents.map(s => s.name).join(", ");

document.getElementById("output").innerHTML = `
    <div class="section">
        <h3>JSON String (JSON.stringify)</h3>
        <pre>${jsonString}</pre>
    </div>
    <div class="section">
        <h3>Parsed Student Data (JSON.parse + Destructuring)</h3>
        ${studentCards}
    </div>
    <div class="section">
        <h3>Student Names (using map)</h3>
        <p>${nameList}</p>
    </div>
`;
