// ****************************************
// *     Function for calculating age     *
// ****************************************

(function () {
    // function to calculate age
    function ageCalc(birthDay, birthMonth, birthYear) {
        // Using Date object to get current data
        const currentDate = new Date();
        let [currentDay, currentMonth, currentYear] = [currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear()];

        // Creating an array for amount of days in each month and correcting for leap years;
        const month = [31, ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Checking if the birth day is greater than current day
        if (birthDay > currentDay) {
            currentDay += month[currentMonth - 1];
            currentMonth--;
        }

        // Checking if the birthday month is greater than current month
        if (birthMonth > currentMonth) {
            currentMonth += 12;
            currentYear--;
        }

        // Calculating the age in years
        const ageYears = currentYear - birthYear;

        // Printing age in years to a elements with an id of 'age'
        document.querySelectorAll('#age').forEach((item) => item.innerHTML = ageYears);
    }

    // Initalzing calling of age function
    ageCalc(21, 5, 2006);

    // Calling age function on language change
    document.addEventListener('changeLanguageCalled', () => {
        ageCalc(21, 5, 2006);
    });
})();