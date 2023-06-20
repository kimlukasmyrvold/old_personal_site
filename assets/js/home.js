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




// ******************************************
// *        Coding languages section        *
// ******************************************

// Make it show up 3 project links on each coding languages item
document.querySelectorAll('.codingLanguageItem').forEach(item => {
    const links = item.querySelectorAll('.codingRepos a');
    if (links.length < 3) return;

    // Loop through all links except the first 3 links
    for (let i = 3; i < links.length; i++) {
        links[i].style.display = 'none';
    }

    // Create span element and appending it the links parent
    const span = document.createElement('span');
    span.className = 'show-more';
    span.textContent = 'Show more...';
    links[0].parentNode.append(span);

    // Making links visible when 'show more' text is clicked
    item.querySelectorAll('.show-more').forEach(el => {
        el.addEventListener('click', () => {
            // Removing itself
            el.remove();

            links.forEach(link => link.style.display = 'flex');
        });
    });
});