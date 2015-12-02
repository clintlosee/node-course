var grades = [100, 50, 75];
var totalGrade = 0;

grades.forEach(function(i) {
    // add grade to total grade
    totalGrade += i;
});

console.log(totalGrade / grades.length);
