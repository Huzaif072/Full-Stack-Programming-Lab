const registeredCourses = new Set();

const coursesToAdd = ["JavaScript", "HTML", "CSS", "Python", "JavaScript", "HTML", "React"];

let log = "";

for (const course of coursesToAdd) {
    if (registeredCourses.has(course)) {
        log += `<p class="warning">⚠ "${course}" is already registered (duplicate skipped).</p>`;
    } else {
        registeredCourses.add(course);
        log += `<p class="success">✔ "${course}" registered successfully.</p>`;
    }
}

let courseList = "<ul>";
for (const course of registeredCourses) {
    courseList += `<li>📘 ${course}</li>`;
}
courseList += "</ul>";

document.getElementById("output").innerHTML = `
    <div class="section">
        <h3>Registration Log</h3>
        ${log}
    </div>
    <div class="section">
        <h3>All Registered Courses</h3>
        ${courseList}
        <p><strong>Total Unique Courses:</strong> ${registeredCourses.size}</p>
    </div>
`;
