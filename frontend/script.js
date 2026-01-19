const API = "http://127.0.0.1:8000";

window.onload = () => {
    loadUsers();
    loadCourses();
};

function show(data) {
    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}

async function createUser() {
    const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: uname.value,
            email: uemail.value
        })
    });
    show(await res.json());
    loadUsers();
}

async function createCourse() {
    const res = await fetch(`${API}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: ctitle.value,
            description: cdesc.value
        })
    });
    show(await res.json());
    loadCourses();
}

async function loadUsers() {
    const res = await fetch(`${API}/users`);
    const users = await res.json();

    studentSelect.innerHTML = "";
    progressStudentSelect.innerHTML = "";
    trackStudentSelect.innerHTML = "";

    users.forEach(user => {
        const label = `${user.name} (${user.email})`;
        studentSelect.add(new Option(label, user.id));
        progressStudentSelect.add(new Option(label, user.id));
        trackStudentSelect.add(new Option(label, user.id));
    });
}

async function loadCourses() {
    const res = await fetch(`${API}/courses`);
    const courses = await res.json();

    courseSelect.innerHTML = "";
    progressCourseSelect.innerHTML = "";
    trackCourseSelect.innerHTML = "";

    courses.forEach(course => {
        courseSelect.add(new Option(course.title, course.id));
        progressCourseSelect.add(new Option(course.title, course.id));
        trackCourseSelect.add(new Option(course.title, course.id));
    });
}

async function enrollUser() {
    const res = await fetch(`${API}/enrollments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: Number(studentSelect.value),
            course_id: Number(courseSelect.value)
        })
    });
    show(await res.json());
}

async function updateProgress() {
    const res = await fetch(`${API}/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: Number(progressStudentSelect.value),
            course_id: Number(progressCourseSelect.value),
            progress: Number(pval.value)
        })
    });
    show(await res.json());
}

async function trackProgress() {
    const user_id = Number(trackStudentSelect.value);
    const course_id = Number(trackCourseSelect.value);

    const res = await fetch(
        `${API}/progress?user_id=${user_id}&course_id=${course_id}`
    );

    const data = await res.json();
    show(data);

    const progress = data.progress_percentage || 0;

    progressBar.style.width = progress + "%";
    progressBar.textContent = progress + "%";
    progressText.textContent = `Progress: ${progress}%`;
}
