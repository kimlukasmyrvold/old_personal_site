// dark and light theme code

// Here it reads what the theme currently is, it reads from the localstorage.
const currentTheme = localStorage.getItem("theme");

// Changes the theme when the page loads
if (currentTheme == "light") {
    document.body.classList.add("light-theme");
    document.getElementById("light-theme-btn").classList.add("underline");
}
else {
    document.body.classList.remove("light-theme");
    document.getElementById("dark-theme-btn").classList.add("underline");
};

// Changes the theme of the site to light when user clicks button, and saves theme to localstorage
function theme_btn_light() {
    document.body.classList.add("light-theme");
    document.getElementById("light-theme-btn").classList.add("underline");
    document.getElementById("dark-theme-btn").classList.remove("underline");

    let theme = "light";
    localStorage.setItem("theme", theme);
};

// Changes the theme of the site to dark when user clicks button, and saves theme to localstorage
function theme_btn_dark() {
    document.body.classList.remove("light-theme");
    document.getElementById("dark-theme-btn").classList.add("underline");
    document.getElementById("light-theme-btn").classList.remove("underline");

    let theme = "dark";
    localStorage.setItem("theme", theme);
};

// End of dark / light mode code




// Changing language of website

// Const that reads the first 7 letters in the current url of the user. Then makes it all lowercase.
const currentURL = window.location.pathname.substring(0, 7).toLowerCase();

// Creating the variable lang
let lang;

// Conditions to check what lang should be, with help from currentURL. If currentURL = /cv/en/ -> lang = english, etc...
if (currentURL === '/cv/en/') {
    document.getElementById("english-btn").classList.add("underline");
    document.getElementById("norwegian-btn").classList.remove("underline");

    lang = 'english';
    localStorage.setItem(lang, 'lang');
}
else if (currentURL.startsWith('/cv/') && !currentURL.endsWith('en/')) {
    document.getElementById("norwegian-btn").classList.add("underline");
    document.getElementById("english-btn").classList.remove("underline");

    lang = 'norsk';
    localStorage.setItem(lang, 'lang');
}
else if (currentURL.substring(0, 4) === '/en/') {
    document.getElementById("english-btn").classList.add("underline");
    document.getElementById("norwegian-btn").classList.remove("underline");

    lang = 'english_dev';
    localStorage.setItem(lang, 'lang')
}
else {
    document.getElementById("norwegian-btn").classList.add("underline");
    document.getElementById("english-btn").classList.remove("underline");

    lang = 'norsk_dev';
    localStorage.setItem(lang, 'lang');
};

// Function for when the english button is pressed.
function language_btn_english() {
    if (lang === 'norsk') {
        window.location.pathname = `/cv/en${window.location.pathname.replace('/cv', '')}`;

        lang = 'english';
        localStorage.setItem(lang, 'lang');
    }
    else if (lang === 'norsk_dev') {
        window.location.pathname = `/en${window.location.pathname}`;

        lang = 'english_dev';
        localStorage.setItem(lang, 'lang');
    };
};

// Function for when the norsk button is pressed.
function language_btn_norwegian() {
    if (lang === 'english') {
        window.location.pathname = window.location.pathname.replace('en/', '');

        lang = 'norsk';
        localStorage.setItem(lang, 'lang');
    }
    else if (lang === 'english_dev') {
        window.location.pathname = window.location.pathname.slice(3);

        lang = 'norsk_dev';
        localStorage.setItem(lang, 'lang');
    };
};

// End of Language code



// Google maps code

// Function for google maps
function Map() {
    // Variable that stores latitude and longitude
    var location = {
        lat: 59.260554083311135,
        lng: 11.107230400640757
    };
    // Variable for changing zoom level and where the center of the map view is
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: location
    });
    // Variable for where the marker on the map should be
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
};



// Navbar
const overlay = document.querySelector('.overlay');

const menu_btn = document.querySelector('.hamburger');
const appearance_btn = document.querySelector('.appearance');
const language_btn = document.querySelector('.language');

const navigation = document.querySelector('.navigation');

const appearance_drop = document.querySelector('.appearance-drop');
const language_drop = document.querySelector('.language-drop');


let navigation_open = false;
let language_open = false;
let appearance_open = false;


overlay.addEventListener('click', function () {
    language_drop.classList.add('hidden');
    language_open = false;

    appearance_drop.classList.add('hidden');
    appearance_open = false;

    overlay.classList.add('hidden');
});


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
    };
});

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
    };
});

menu_btn.addEventListener('click', function () {
    menu_btn.classList.toggle('is-active');
    navigation.classList.toggle('flex');

    appearance_open = false
    appearance_drop.classList.add('hidden');

    language_open = false
    language_drop.classList.add('hidden');

    overlay.classList.add('hidden');
});

// Checks if screen width is 750px or less and then removes is-active from menu_btn and removes flex class from navigation.
var vw = window.matchMedia("(max-width: 750px)");
vw.addEventListener('change', vwFunct);
vwFunct(vw);

function vwFunct(vw) {
    if (vw.matches) {
        menu_btn.classList.remove('is-active');
        navigation.classList.remove('flex');
    }
};


// End of navbar