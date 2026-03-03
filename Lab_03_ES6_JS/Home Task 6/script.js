class Student {
    constructor(id, name, semester) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = new Set(); 
    }

    registerCourse(course) {
        this.courses.add(course);
    }
}

const studentMap = new Map();

const s1 = new Student(1, "Ali Ahmed", 6);
s1.registerCourse("JavaScript");
s1.registerCourse("HTML");
s1.registerCourse("JavaScript"); // duplicate - will be ignored

const s2 = new Student(2, "Sara Khan", 6);
s2.registerCourse("Python");
s2.registerCourse("CSS");
s2.registerCourse("Python"); // duplicate

const s3 = new Student(3, "Hassan Raza", 6);
s3.registerCourse("React");
s3.registerCourse("Node.js");
s3.registerCourse("React"); // duplicate

studentMap.set(s1.id, s1);
studentMap.set(s2.id, s2);
studentMap.set(s3.id, s3);

const saveData = () => {
    return new Promise((resolve, reject) => {
        const success = true; // change to false to see reject
        setTimeout(() => {
            if (success) {
                resolve("All student data saved successfully!");
            } else {
                reject("Error: Failed to save data to server.");
            }
        }, 2000);
    });
};

let tableHTML = `<table>
    <tr><th>ID</th><th>Name</th><th>Semester</th><th>Courses</th><th>Total Courses</th></tr>`;

studentMap.forEach((student, id) => {
    const courseList = [...student.courses].join(", ");
    tableHTML += `<tr>
        <td>${id}</td>
        <td>${student.name}</td>
        <td>${student.semester}</td>
        <td>${courseList}</td>
        <td>${student.courses.size}</td>
    </tr>`;
});
tableHTML += "</table>";

saveData()
    .then((message) => {
        document.getElementById("status").innerHTML = `✔ ${message}`;
        document.getElementById("status").classList.add("success");
        document.getElementById("output").innerHTML = `
            <div class="section">
                <h3>Registered Students (Total: ${studentMap.size})</h3>
                ${tableHTML}
            </div>
        `;
    })
    .catch((error) => {
        document.getElementById("status").innerHTML = `✘ ${error}`;
        document.getElementById("status").classList.add("error");
    });
