const BASE_URL = "https://672c66621600dda5a9f84bfc.mockapi.io/user"; // 기본 주소 설정

// Fetch and display all students
const fetchStudents = async () => {
  try {
    const response = await fetch(BASE_URL); // 기본 주소로 요청
    const data = await response.json();
    displayStudents(data);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

// Display students in the DOM
const displayStudents = (students) => {
  const studentList = document.getElementById("student-list");
  studentList.innerHTML = "";
  students.forEach((student) => {
    const studentDiv = document.createElement("div");
    studentDiv.classList.add("student-item");
    studentDiv.innerHTML = `
            <strong>ID:</strong> ${student.id} <br>
            <strong>Name:</strong> ${student.name} <br>
            <strong>Birth:</strong> ${student.birth} <br>
            <strong>Gender:</strong> ${student.gender} <br>
            <strong>Major 1:</strong> ${student.major1} <br>
            <strong>Major 2:</strong> ${student.major2} <br>
        `;
    studentList.appendChild(studentDiv);
  });
};

// Add new student
document
  .getElementById("student-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const student = {
      id: document.getElementById("id").value, // ID를 숫자로 변환
      name: document.getElementById("name").value,
      birth: document.getElementById("birth").value,
      gender: document.getElementById("gender").value,
      major1: document.getElementById("major1").value,
      major2: document.getElementById("major2").value,
    };
    try {
      await fetch(BASE_URL, {
        // 기본 주소로 POST 요청
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      fetchStudents(); // Refresh the student list
    } catch (error) {
      console.error("Error adding student:", error);
    }
  });

// Update student
document
  .getElementById("student-update-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("update-id").value;
    const updatedStudent = {
      name: document.getElementById("update-name").value,
      birth: document.getElementById("update-birth").value,
      gender: document.getElementById("update-gender").value,
      major1: document.getElementById("update-major1").value,
      major2: document.getElementById("update-major2").value,
    };
    try {
      await fetch(`${BASE_URL}/${id}`, {
        // ID를 URL에 포함하여 요청합니다.
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      });
      fetchStudents(); // Refresh the student list
    } catch (error) {
      console.error("Error updating student:", error);
    }
  });

// Delete student
document
  .getElementById("student-delete-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("delete-id").value; // ID를 숫자로 변환
    try {
      await fetch(`${BASE_URL}/${id}`, {
        // ID를 URL에 포함하여 요청합니다.
        method: "DELETE",
      });
      fetchStudents(); // Refresh the student list
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  });

// Initial fetch
fetchStudents();
