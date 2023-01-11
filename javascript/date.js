// Calculates age
window.onload = function () {
    // Variables for day, month and year. 
    var d1 = 21;
    var m1 = 05;
    var y1 = 2006;

    // Using date objects to get the current date
    var date = new Date();
    var d2 = date.getDate();
    var m2 = 1 + date.getMonth();
    var y2 = date.getFullYear();

    // Creating an array for amount of days in each month
    // calculations for february when there is 29 days in the month would be wrong
    var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Checking if the birthday day is greater than current day
    if (d1 > d2) {
        d2 += month[m2 - 1];
        m2 --;
    }

    // Checking if the birthday month is greater than current month
    if (m1 > m2) {
        m2 += 12;
        y2 -= 1;
    }

    var d = d2 - d1; // variable day is unused, but can be used in future
    var m = m2 - m1; // variable month is unused, but can be used in future
    var y = y2 - y1;

    // Printing the text to a element with a id of 'age'
    document.getElementById('age').innerHTML = y;
}