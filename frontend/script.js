const BASE_URL = "http://127.0.0.1:8000";

const enrollUser = document.getElementById("enrollUser");
const enrollCourse = document.getElementById("enrollCourse");
const progressUser = document.getElementById("progressUser");
const progressCourse = document.getElementById("progressCourse");

function showOutput(data) {
    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}

function loadUsers() {
    fetch(`${BASE_URL}/users`)
        .then(res => res.json())
        .then(users => {
            enrollUser.innerHTML = `<option value="">Select Student</option>`;
            progressUser.innerHTML = `<option value="">Select Student</option>`;

            users.forEach(u => {
                const option = `<option value="${u.id}">${u.name} (${u.email})</option>`;
                enrollUser.innerHTML += option;
                progressUser.innerHTML += option;
            });
        });
}

function loadCourses() {
    fetch(`${BASE_URL}/courses`)
        .then(res => res.json())
        .then(courses => {
            enrollCourse.innerHTML = `<option value="">Select Course</option>`;
            progressCourse.innerHTML = `<option value="">Select Course</option>`;

            courses.forEach(c => {
                const option = `<option value="${c.id}">${c.title}</option>`;
                enrollCourse.innerHTML += option;
                progressCourse.innerHTML += option;
            });
        });
}

function createUser() {
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();

    fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    })
    .then(res => res.json())
    .then(data => {
        showOutput(data);
        loadUsers();
        document.getElementById("userName").value = "";
        document.getElementById("userEmail").value = "";
    });
}

function createCourse() {
    const title = document.getElementById("courseTitle").value.trim();
    const description = document.getElementById("courseDescription").value.trim();

    fetch(`${BASE_URL}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    })
    .then(res => res.json())
    .then(data => {
        showOutput(data);
        loadCourses();
        document.getElementById("courseTitle").value = "";
        document.getElementById("courseDescription").value = "";
    });
}

function enrollStudent() {
    const user_id = Number(enrollUser.value);
    const course_id = Number(enrollCourse.value);

    fetch(`${BASE_URL}/enrollments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, course_id })
    })
    .then(res => res.json())
    .then(data => showOutput(data));
}

function updateProgress() {
    const user_id = Number(progressUser.value);
    const course_id = Number(progressCourse.value);

    fetch(`${BASE_URL}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, course_id })
    })
    .then(res => res.json())
    .then(data => {
        showOutput(data);

        const percent = data.progress_percentage || 0;
        const bar = document.getElementById("progressBar");

        bar.style.width = percent + "%";
        bar.textContent = percent + "%";
        document.getElementById("progressText").textContent =
            `Progress updated to ${percent}%`;
    });
}

loadUsers();
loadCourses();
