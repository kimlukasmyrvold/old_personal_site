// Self invoking function to calculate age
function age(birthDay, birthMonth, birthYear) {
    // setTimeout(() => {

        // Using Date object to get current data
        const currentDate = new Date();
        let [currentDay, currentMonth, currentYear] = [currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear()];

        // Creating an array for amount of days in each month and correcting for leap years;
        const month = [31, ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


        // currentDay = 1;
        // currentMonth = 2;

        // Adding leapyear days
        var leapyearDays = 0;
        var leapyearMonths = currentMonth;
        var leapyearBirthYear = birthYear

        // console.log(leapyearMonths > 2 ? currentDate.getFullYear() : currentDate.getFullYear() - 1)

        while (leapyearBirthYear < (leapyearMonths > 2 ? currentDate.getFullYear() : currentDate.getFullYear() - 1)) {
            leapyearDays += ((leapyearBirthYear % 4 === 0 && leapyearBirthYear % 100 !== 0) || leapyearBirthYear % 400 === 0) ? 1 : 0;
            leapyearBirthYear++;
        }
        // console.log(`leapyearDays: ${leapyearDays}`)

        // currentDay = leapyearDays;

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

        // Creating the variables than can be printed out
        // const d = (currentDay - birthDay) + leapyearDays; // variable day is unused, but can be used in future
        const d = currentDay - birthDay; // variable day is unused, but can be used in future
        const m = currentMonth - birthMonth; // variable month is unused, but can be used in future
        const y = currentYear - birthYear;

        // Printing age in years to a elements with an id of 'age'
        // document.querySelectorAll('#age').forEach((item) => item.innerHTML = y + " years, " + m + " months and " + d + " days.");  // For testing
        document.querySelectorAll('#age').forEach((item) => item.innerHTML = y);

    // }, 2000);
}

age(21, 5, 2006);
