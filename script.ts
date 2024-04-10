// Function to calculate the grade based on marks
function calculateGrade(mark: number): string {
  if (mark >= 90) {
    return "A";
  } else if (mark >= 80) {
    return "B";
  } else if (mark >= 70) {
    return "C";
  } else if (mark >= 60) {
    return "D";
  } else {
    return "F";
  }
}

// Function to calculate the class average
function calculateAverage(marks: number[]): number {
  const totalMarks = marks.reduce((acc, curr) => acc + curr, 0);
  return totalMarks / marks.length;
}

// Function to handle form submission
function calculateGrades(event: Event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const markInputs = [
    document.getElementById("mark1") as HTMLInputElement,
    document.getElementById("mark2") as HTMLInputElement,
    document.getElementById("mark3") as HTMLInputElement,
    document.getElementById("mark4") as HTMLInputElement,
    document.getElementById("mark5") as HTMLInputElement,
  ];

  // Convert mark inputs to numbers
  const marks = markInputs.map((input) => parseInt(input.value));

  // Calculate grades and class average
  const grades = marks.map(calculateGrade);
  const average = calculateAverage(marks);

  // Display the result
  const result = document.createElement("div");
  result.innerHTML = `<p>Student Name: ${nameInput.value}</p>`;
  result.innerHTML += `<p>Grades: ${grades.join(", ")}</p>`;
  result.innerHTML += `<p>Mark Average: ${average.toFixed(2)}</p>`;

  // Clear previous result
  const previousResult = document.getElementById("result");
  if (previousResult) {
    previousResult.remove();
  }

  // Append new result
  result.id = "result";
  document.body.appendChild(result);
}

// Add event listener to the form
const form = document.getElementById("gradingForm");
form.addEventListener("submit", calculateGrades);
