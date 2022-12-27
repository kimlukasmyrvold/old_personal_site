// dark and light theme code

// Here it reads what the theme currently is, it reads from the localstorage.
const currentTheme = localStorage.getItem("theme");

// Here it checks if the currentTheme is light or not.
// If it is equal to light then it adds the light-theme class to the body of the site
// If it does not equal to light-theme, then it removes the light-theme class
// Then it is dark mode.
if (currentTheme == "light") {
    document.body.classList.add("light-theme");
}
else {
    document.body.classList.remove("light-theme");
}

// function for when light theme button is pressed
// when clicked, it will add the "light-theme" class to the body of the site
// then it lets the variabel "theme" equal "light"
// after that, the "theme" then gets localy stored with the "localStorage.setItem("theme", theme);" 
function theme_btn_light() {
    document.body.classList.add("light-theme");
    let theme = "light";

    localStorage.setItem("theme", theme);
}

// function for when dark theme button is pressed
// when clicked, it removes the "light-theme" class from the body of the site
// then it lets the variabel "theme" equal "dark"
// after that, the "theme" then gets localy stored with the "localStorage.setItem("theme", theme);" 
function theme_btn_dark() {
    document.body.classList.remove("light-theme");
    let theme = "dark";

    localStorage.setItem("theme", theme);
}

// End of dark / light mode code





// Changing language of website

// Const that reads the first 7 letters in the current url of the user. Then makes it all lowercase.
const currentURL = window.location.pathname.substring(0, 7).toLowerCase();

// Creating the variable lang
let lang;

// Conditions to check what lang should be, with help from currentURL. If currentURL = /cv/en/ -> lang = english, etc...
if (currentURL === '/cv/en/') {
    lang = 'english';
}
else if (currentURL.startsWith('/cv/') && !currentURL.endsWith('en/')) {
    lang = 'norsk';
}
else if (currentURL.substring(0, 4) === '/en/') {
    lang = 'english_dev';
}
else {
    lang = 'norsk_dev';
}

// Function for when the english button is pressed.
function language_btn_english() {
    if (lang === 'norsk') {
        window.location.pathname = `/cv/en${window.location.pathname.replace('/cv', '')}`;
        lang = 'english';
    }
    else if (lang === 'norsk_dev') {
        window.location.pathname = `/en${window.location.pathname}`;
        lang = 'english_dev';
    }
}

// Function for when the norsk button is pressed.
function language_btn_norwegian() {
    if (lang === 'english') {
        window.location.pathname = window.location.pathname.replace('en/', '');
        lang = 'norsk';
    }
    else if (lang === 'english_dev') {
        window.location.pathname = window.location.pathname.slice(3);
        lang = 'norsk_dev';
    }
}

// End of Language code





// Sidemenu functions

// Opens and closes sidemenu when clicking on the hamburger icon
function sidemenu_btn() {
    document.getElementById("sidemenu").classList.toggle("sidemenu");
    document.getElementById("sidemenu").classList.toggle("hidden");
    document.getElementById("sidemenu-overlay").classList.toggle("sidemenu-overlay");
    document.getElementById("sidemenu-overlay").classList.toggle("hidden");
    document.getElementById("appearance-drop").classList.remove("block");
    document.getElementById("appearance-drop").classList.add("hidden");
    document.getElementById("appearance-btn").classList.remove("appearance-btn-clicked");
    document.getElementById("language-drop").classList.remove("block");
    document.getElementById("language-drop").classList.add("hidden");
    document.getElementById("language-btn").classList.remove("language-btn-clicked");
}

// Opens and closes sidemenu and dropdown menues when clicking outside of sidemenu
function sidemenu_overlay() {
    document.getElementById("sidemenu-overlay").classList.remove("sidemenu-overlay");
    document.getElementById("sidemenu-overlay").classList.toggle("hidden");
    document.getElementById("sidemenu").classList.remove("sidemenu");
    document.getElementById("sidemenu").classList.toggle("hidden");
    document.getElementById("appearance-drop").classList.remove("block");
    document.getElementById("appearance-drop").classList.add("hidden");
    document.getElementById("appearance-btn").classList.remove("appearance-btn-clicked");
    document.getElementById("language-drop").classList.remove("block");
    document.getElementById("language-drop").classList.add("hidden");
    document.getElementById("language-btn").classList.remove("language-btn-clicked");
}

// Opens and closes the appearance dropdown menu when is clicked
function appearance_btn() {
    document.getElementById("appearance-drop").classList.toggle("block");
    document.getElementById("appearance-drop").classList.toggle("hidden");
    document.getElementById("appearance-btn").classList.toggle("appearance-btn-clicked");
}

// Opens and closes the language dropdown menue when is clicked
function language_btn() {
    document.getElementById("language-drop").classList.toggle("block");
    document.getElementById("language-drop").classList.toggle("hidden");
    document.getElementById("language-btn").classList.toggle("language-btn-clicked");
}

// End of sidemenu functions





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
}



window.onload = function () {
    const menu_btn = document.querySelector('.hamburger');
    const appearance_btn = document.querySelector('.appearance');
    const language_btn = document.querySelector('.language');

    const appearance_drop = document.querySelector('.appearance-drop');
    const language_drop = document.querySelector('.language-drop');

    menu_btn.addEventListener('click', function () {
        menu_btn.classList.toggle('is-active');
    });

    appearance_btn.addEventListener('click', function () {
        appearance_drop.classList.toggle('hidden');
        language_drop.classList.add('hidden');
    })

    language_btn.addEventListener('click', function () {
        language_drop.classList.toggle('hidden');
        appearance_drop.classList.add('hidden');
    })
}

