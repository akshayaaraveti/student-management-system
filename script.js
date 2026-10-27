let editIndex = null;

// Get students from localStorage
function getStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

// Save students
function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

// Load students
function loadStudents() {
  displayStudents(getStudents());
}

// Display students
function displayStudents(students) {
  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  students.forEach((s, index) => {
    table.innerHTML += `
      <tr>
        <td>${s.roll}</td>
        <td>${s.name}</td>
        <td>${s.total}</td>
        <td>${s.percentage}%</td>
        <td class="${s.result === 'PASS' ? 'pass' : 'fail'}">${s.result}</td>
        <td>
          <button class="edit" onclick="editStudent(${index})">Edit</button>
          <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Form submit
document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const roll = document.getElementById("roll").value;
  const name = document.getElementById("name").value;

  const marks = [
    Number(document.getElementById("s1").value),
    Number(document.getElementById("s2").value),
    Number(document.getElementById("s3").value),
    Number(document.getElementById("s4").value),
    Number(document.getElementById("s5").value),
    Number(document.getElementById("s6").value),
    Number(document.getElementById("s7").value),
  ];

  const total = marks.reduce((a, b) => a + b, 0);
  const percentage = ((total / 700) * 100).toFixed(2);
  const result = marks.some(m => m < 35) ? "FAIL" : "PASS";

  const students = getStudents();
  const data = { roll, name, marks, total, percentage, result };

  if (editIndex === null) {
    students.push(data);
  } else {
    students[editIndex] = data;
    editIndex = null;
  }

  saveStudents(students);
  this.reset();
  loadStudents();
});

// Edit student
function editStudent(index) {
  const students = getStudents();
  const s = students[index];

  document.getElementById("roll").value = s.roll;
  document.getElementById("name").value = s.name;

  document.getElementById("s1").value = s.marks[0];
  document.getElementById("s2").value = s.marks[1];
  document.getElementById("s3").value = s.marks[2];
  document.getElementById("s4").value = s.marks[3];
  document.getElementById("s5").value = s.marks[4];
  document.getElementById("s6").value = s.marks[5];
  document.getElementById("s7").value = s.marks[6];

  editIndex = index;
}

// Delete student
function deleteStudent(index) {
  const students = getStudents();
  students.splice(index, 1);
  saveStudents(students);
  loadStudents();
}

// Search by roll number
function searchStudent() {
  const value = document.getElementById("searchRoll").value.toLowerCase();
  const students = getStudents();

  const filtered = students.filter(s =>
    s.roll.toLowerCase().includes(value)
  );

  displayStudents(filtered);
}

// Initial load
loadStudents();