// // dark and light theme code

// Here it reads what the theme currently is, it reads from the localstorage.
const currentTheme = localStorage.getItem("theme");

// Changes the theme when the page loads
if (currentTheme == "light") {
    document.body.classList.add("light-theme");
    document.getElementById("light-theme-btn").classList.add("underline");
} else {
    document.body.classList.remove("light-theme");
    document.getElementById("dark-theme-btn").classList.add("underline");
}

// Changes the theme of the site to light when user clicks button, and saves theme to localstorage
function theme_btn_light() {
    document.body.classList.add("light-theme");
    document.getElementById("light-theme-btn").classList.add("underline");
    document.getElementById("dark-theme-btn").classList.remove("underline");

    let theme = "light";
    localStorage.setItem("theme", theme);
}

// Changes the theme of the site to dark when user clicks button, and saves theme to localstorage
function theme_btn_dark() {
    document.body.classList.remove("light-theme");
    document.getElementById("dark-theme-btn").classList.add("underline");
    document.getElementById("light-theme-btn").classList.remove("underline");

    let theme = "dark";
    localStorage.setItem("theme", theme);
}

// End of dark / light mode code




// // Changing language of website

// Const that reads the first 7 letters in the current url of the user. Then makes it all lowercase.
const currentURL = window.location.pathname.substring(0, 7).toLowerCase();

// Conditions to check what lang should be, with help from currentURL. If currentURL = /cv/en/ -> lang = english, etc...
if (currentURL === '/cv/en/') {
    document.getElementById("english-btn").classList.add("underline");
    document.getElementById("norwegian-btn").classList.remove("underline");

    let lang = 'english';
    localStorage.setItem('lang', lang);
} else if (currentURL.startsWith('/cv/') && !currentURL.endsWith('en/')) {
    document.getElementById("norwegian-btn").classList.add("underline");
    document.getElementById("english-btn").classList.remove("underline");

    let lang = 'norsk';
    localStorage.setItem('lang', lang);
} else if (currentURL.substring(0, 4) === '/en/') {
    document.getElementById("english-btn").classList.add("underline");
    document.getElementById("norwegian-btn").classList.remove("underline");

    let lang = 'english_dev';
    localStorage.setItem('lang', lang)
} else {
    document.getElementById("norwegian-btn").classList.add("underline");
    document.getElementById("english-btn").classList.remove("underline");

    let lang = 'norsk_dev';
    localStorage.setItem('lang', lang);
}

// Creating a const called currentLang to store what lang is from localstorage
const currentLang = localStorage.getItem('lang');

// Function for when the english button is pressed.
function language_btn_english() {
    if (currentLang === 'norsk') {
        window.location.pathname = `/cv/en${window.location.pathname.replace('/cv', '')}`;

        let lang = 'english';
        localStorage.setItem('lang', lang);
    } else if (currentLang === 'norsk_dev') {
        window.location.pathname = `/en${window.location.pathname}`;

        let lang = 'english_dev';
        localStorage.setItem('lang', lang);
    }
};

// Function for when the norsk button is pressed.
function language_btn_norwegian() {
    if (currentLang === 'english') {
        window.location.pathname = window.location.pathname.replace('en/', '');

        let lang = 'norsk';
        localStorage.setItem(lang, 'lang');
    } else if (currentLang === 'english_dev') {
        window.location.pathname = window.location.pathname.slice(3);

        let lang = 'norsk_dev';
        localStorage.setItem('lang', lang);
    }
}

// End of Language code




// // Navbar
const overlay = document.querySelector('.overlay');

const menu_btn = document.querySelector('.hamburger');
const appearance_btn = document.querySelector('.appearance');
const language_btn = document.querySelector('.language');

const navigation = document.querySelector('.navigation');

const appearance_drop = document.querySelector('.appearance-drop');
const language_drop = document.querySelector('.language-drop');


let navigation_open = false, language_open = false, appearance_open = false;


overlay.addEventListener('click', function () {
    language_drop.classList.add('hidden');
    language_open = false;

    appearance_drop.classList.add('hidden');
    appearance_open = false;

    overlay.classList.add('hidden');
})


appearance_btn.addEventListener('click', () => {
    if (appearance_open === false) {
        appearance_open = true;
        appearance_drop.classList.remove('hidden');

        language_open = false
        language_drop.classList.add('hidden');

        menu_btn.classList.remove('is-active');
        navigation.classList.remove('flex');

        overlay.classList.remove('hidden');
    }
    else {
        appearance_open = false
        appearance_drop.classList.add('hidden');

        overlay.classList.add('hidden');
    }
})

language_btn.addEventListener('click', function () {
    if (language_open === false) {
        language_open = true;
        language_drop.classList.remove('hidden');

        appearance_open = false
        appearance_drop.classList.add('hidden');

        menu_btn.classList.remove('is-active');
        navigation.classList.remove('flex');

        overlay.classList.remove('hidden');
    }
    else {
        language_open = false
        language_drop.classList.add('hidden');

        overlay.classList.add('hidden');
    }
})

menu_btn.addEventListener('click', function () {
    menu_btn.classList.toggle('is-active');
    navigation.classList.toggle('flex');

    appearance_open = false
    appearance_drop.classList.add('hidden');

    language_open = false
    language_drop.classList.add('hidden');

    overlay.classList.add('hidden');
})

// Checks if screen width is 750px or less and then removes is-active from menu_btn and removes flex class from navigation.
var vw = window.matchMedia("(max-width: 750px)");
vw.addEventListener('change', vwFunct);
vwFunct(vw);

function vwFunct(vw) {
    if (vw.matches) {
        menu_btn.classList.remove('is-active');
        navigation.classList.remove('flex');
    }
}


// End of navbar




// Self invoking function to calculate age
(function age(birthDay, birthMonth, birthYear) {
    // Using Date object to get current data
    const currentDate = new Date();
    let [currentDay, currentMonth, currentYear] = [currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear()];

    // Creating an array for amount of days in each month and correcting for leap years;
    const month = [31, ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    currentDay = 1;
    currentMonth = 2;

    // Adding leapyear days
    var leapyearDays = 0;
    var leapyearMonths = currentMonth;
    var leapyearBirthYear = birthYear
    // console.log(leapyearMonths > 2 ? currentDate.getFullYear() : currentDate.getFullYear() - 1)
    while (leapyearBirthYear < (leapyearMonths > 2 ? currentDate.getFullYear() : currentDate.getFullYear() - 1)) {
        leapyearDays += ((leapyearBirthYear % 4 === 0 && leapyearBirthYear % 100 !== 0) || leapyearBirthYear % 400 === 0) ? 1 : 0;
        leapyearBirthYear++;
    }
    console.log(`leapyearDays: ${leapyearDays}`)

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
    const d = (currentDay - birthDay) + leapyearDays; // variable day is unused, but can be used in future
    const m = currentMonth - birthMonth; // variable month is unused, but can be used in future
    const y = currentYear - birthYear;

    // Printing age in years to a elements with an id of 'age'
    // document.querySelectorAll('#age').forEach((item) => item.innerHTML = y + " years, " + m + " months and " + d + " days.");  // For testing
    document.querySelectorAll('#age').forEach((item) => item.innerHTML = y);
})(21, 5, 2006);
