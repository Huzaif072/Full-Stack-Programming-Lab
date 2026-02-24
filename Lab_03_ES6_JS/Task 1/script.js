
class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }

    getDetails() {
        return `<div class="student-card">
            <h3>${this.name}</h3>
            <p><strong>ID:</strong> ${this.id}</p>
            <p><strong>Semester:</strong> ${this.semester}</p>
            <p><strong>Courses:</strong> ${this.courses.join(", ")}</p>
        </div>`;
    }
}

const student1 = new Student(1, "Ahmad Faraz", 6, ["Full Stack Programming", "Generative AI", "Mobile App Development"]);
const student2 = new Student(2, "Ayaan Qazi", 6, ["Technical & Business Writing", "Enterpreneurship", "Software Requirements Engineering"]);
const student3 = new Student(3, "Talal Virk", 6, ["Full Stack Programming", "Generative AI", "Mobile App Development"]);

const students = [student1, student2, student3];

let output = "";
for (let student of students) {
    output += student.getDetails();
}

document.getElementById("students").innerHTML = output