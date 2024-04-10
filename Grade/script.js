// Function to calculate the grade based on marks
function calculateGrade(mark) {
    if (mark >= 90) {
        return "A";
    }
    else if (mark >= 80) {
        return "B";
    }
    else if (mark >= 70) {
        return "C";
    }
    else if (mark >= 60) {
        return "D";
    }
    else {
        return "F";
    }
}
// Function to calculate the class average
function calculateAverage(marks) {
    var totalMarks = marks.reduce(function (acc, curr) { return acc + curr; }, 0);
    return totalMarks / marks.length;
}
// Function to handle form submission
function calculateGrades(event) {
    event.preventDefault(); // Prevent form submission
    // Get input values
    var nameInput = document.getElementById("name");
    var markInputs = [
        document.getElementById("mark1"),
        document.getElementById("mark2"),
        document.getElementById("mark3"),
        document.getElementById("mark4"),
        document.getElementById("mark5"),
    ];
    // Convert mark inputs to numbers
    var marks = markInputs.map(function (input) { return parseInt(input.value); });
    // Calculate grades and class average
    var grades = marks.map(calculateGrade);
    var average = calculateAverage(marks);
    // Display the result
    var result = document.createElement("div");
    result.innerHTML = "<p>Student Name: ".concat(nameInput.value, "</p>");
    result.innerHTML += "<p>Grades: ".concat(grades.join(", "), "</p>");
    result.innerHTML += "<p>Mark Average: ".concat(average.toFixed(2), "</p>");
    // Clear previous result
    var previousResult = document.getElementById("result");
    if (previousResult) {
        previousResult.remove();
    }
    // Append new result
    result.id = "result";
    document.body.appendChild(result);
}
// Add event listener to the form
var form = document.getElementById("gradingForm");
form.addEventListener("submit", calculateGrades);
