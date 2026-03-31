const dataAvailable = true;

const fetchUsers = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (dataAvailable) {
                resolve([
                    { id: 1, name: "Ali Ahmed", email: "ali@example.com", role: "Student" },
                    { id: 2, name: "Sara Khan", email: "sara@example.com", role: "Student" },
                    { id: 3, name: "Hassan Raza", email: "hassan@example.com", role: "Admin" }
                ]);
            } else {
                reject("Failed to load data from server!");
            }
        }, 3000);
    });
};

fetchUsers()
    .then((users) => {
        document.getElementById("loading").style.display = "none";

        let output = "";
        for (let user of users) {
            output += `<div class="user-card">
                <h3>${user.name}</h3>
                <p><strong>ID:</strong> ${user.id}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Role:</strong> ${user.role}</p>
            </div>`;
        }
        document.getElementById("output").innerHTML = output;
    })
    .catch((error) => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("output").innerHTML = `<p class="error">${error}</p>`;
    });
