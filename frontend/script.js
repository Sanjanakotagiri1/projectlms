const BASE_URL = "http://127.0.0.1:8000"

const enrollUser = document.getElementById("enrollUser")
const enrollCourse = document.getElementById("enrollCourse")
const progressUser = document.getElementById("progressUser")
const progressCourse = document.getElementById("progressCourse")

function showOutput(data) {
    document.getElementById("output").textContent = JSON.stringify(data, null, 2)
}

function loadUsers() {
    fetch(`${BASE_URL}/users`)
        .then(res => res.json())
        .then(users => {
            enrollUser.innerHTML = `<option value="">Select Student</option>`
            progressUser.innerHTML = `<option value="">Select Student</option>`
            users.forEach(u => {
                enrollUser.innerHTML += `<option value="${u.id}">${u.name} (${u.email})</option>`
                progressUser.innerHTML += `<option value="${u.id}">${u.name} (${u.email})</option>`
            })
        })
}

function loadCourses() {
    fetch(`${BASE_URL}/courses`)
        .then(res => res.json())
        .then(courses => {
            enrollCourse.innerHTML = `<option value="">Select Course</option>`
            progressCourse.innerHTML = `<option value="">Select Course</option>`
            courses.forEach(c => {
                enrollCourse.innerHTML += `<option value="${c.id}">${c.title}</option>`
                progressCourse.innerHTML += `<option value="${c.id}">${c.title}</option>`
            })
        })
}

function createUser() {
    const name = document.getElementById("userName").value.trim()
    const email = document.getElementById("userEmail").value.trim()

    fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    })
    .then(res => res.json())
    .then(data => {
        showOutput(data)
        loadUsers()
        document.getElementById("userName").value = ""
        document.getElementById("userEmail").value = ""
    })
}

function createCourse() {
    const title = document.getElementById("courseTitle").value.trim()
    const description = document.getElementById("courseDescription").value.trim()

    fetch(`${BASE_URL}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    })
    .then(res => res.json())
    .then(data => {
        showOutput(data)
        loadCourses()
        document.getElementById("courseTitle").value = ""
        document.getElementById("courseDescription").value = ""
    })
}

function enrollStudent() {
    const user_id = Number(enrollUser.value)
    const course_id = Number(enrollCourse.value)

    fetch(`${BASE_URL}/enrollments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, course_id })
    })
    .then(res => res.json())
    .then(data => showOutput(data))
}

function updateProgress() {
    const user_id = Number(progressUser.value)
    const course_id = Number(progressCourse.value)
    const progress = Number(document.getElementById("progressValue").value)

    fetch(`${BASE_URL}/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, course_id, progress })
    })
    .then(res => res.json())
    .then(data => {
        showOutput(data)
        document.getElementById("progressBar").style.width = `${progress}%`
        document.getElementById("progressBar").textContent = `${progress}%`
        document.getElementById("progressText").textContent = "Progress Updated"
        document.getElementById("progressValue").value = ""
    })
}

loadUsers()
loadCourses()
