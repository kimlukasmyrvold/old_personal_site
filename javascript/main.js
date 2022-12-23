// Sidemenu scripts

// Opens and closes sidemenu when clicking on the hamburger icon
function sidemenu_btn() {
    document.getElementById("sidemenu").classList.toggle("sidemenu");
    document.getElementById("sidemenu-overlay").classList.toggle("sidemenu-overlay");
    document.getElementById("appearance-drop").classList.remove("appearance-drop");
    document.getElementById("appearance-btn").classList.remove("appearance-btn-clicked");
    document.getElementById("language-drop").classList.remove("language-drop");
    document.getElementById("language-btn").classList.remove("language-btn-clicked");
}

// Opens and closes sidemenu and dropdown menues when clicking outside of sidemenu
function sidemenu_overlay() {
    document.getElementById("sidemenu-overlay").classList.remove("sidemenu-overlay");
    document.getElementById("sidemenu").classList.remove("sidemenu");
    document.getElementById("appearance-drop").classList.remove("appearance-drop");
    document.getElementById("appearance-btn").classList.remove("appearance-btn-clicked");
    document.getElementById("language-drop").classList.remove("language-drop");
    document.getElementById("language-btn").classList.remove("language-btn-clicked");
}

// Opens and closes the appearance dropdown menu when is clicked
function appearance_btn() {
    document.getElementById("appearance-drop").classList.toggle("block");
    document.getElementById("appearance-btn").classList.toggle("appearance-btn-clicked");
}

// Opens and closes the language dropdown menue when is clicked
function language_btn() {
    document.getElementById("language-drop").classList.toggle("block");
    document.getElementById("language-btn").classList.toggle("language-btn-clicked");
}




// Changing language of website

// Creating variable for getting the current URL, uses window.location.pathname in order to get what the current URL is.
// The .pathname is part of the URL after for example: "www.google.com" The pathname is what comes after.
// Then I add .substring(0, 7) in order to only get the first seven letters in the URL
// The reason why it should only select the 7 first letters is because that is the only information the code needs in order to check if website is english or not.
var currentURL = window.location.pathname.substring(0, 7).toLowerCase();


// Checks if the varible currentURL is equal to /cv/en/
// If it is, then it sets the variable lang to english
// If it is not, then it set the variable lang to norsk
if (currentURL === "/cv/en/") {
    var lang = "english";
}
else if (currentURL.substring(0, 4) === "/cv/" && currentURL.substring(4, 7) !== "en/") {
    var lang = "norsk"
}
else if (currentURL.substring(0, 4) === "/en/") {
    var lang = "english_dev";
}
else if (currentURL.substring(0, 4) !== "/cv/" && currentURL.substring(0, 4) !== "/en/") {
    var lang = "norsk_dev";
}

// Function for when the english button is pressed.
// Checks if the variable lang equals norsk
// if it does, then it changes the pathname of the currenturl and adds /en to the starts of it, thus changing the language of the website to english 
// Then it lets lang to equal english
function language_btn_english() {
    if (lang === "norsk") {
        window.location.pathname = "/cv/en" + window.location.pathname.replace('/cv', '');
        let lang = "english";
    }
    else if (lang === "norsk_dev") {
        window.location.pathname = "/en" + window.location.pathname;
        let lang = "english_dev";
    }
}

// Function for when the norsk button is pressed.
// Checks if the variable lang equals english
// if it does, then it changes the pathname of the currenturl and removes /en to the starts of it, thus changing the language of the website to norsk 
// Then it lets lang equal norsk
function language_btn_norwegian() {
    if (lang === "english") {
        window.location.pathname = window.location.pathname.replace('en/', '');
        let lang = "norsk";
    }
    else if (lang === "english_dev") {
        window.location.pathname = window.location.pathname.slice(3);
        let lang = "norsk_dev";
    }
}




// dark and light theme

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