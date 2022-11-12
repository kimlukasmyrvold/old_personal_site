// Sidemenu script

// Opens and closes sidemenu when clicking on the hamburger icon
function sidemenu_btn() {
    document.getElementById("sidemenu").classList.toggle("sidemenu-show");
    document.getElementById("sidemenu-overlay").classList.toggle("sidemenu-overlay-show");
}
// Opens and closes sidemenu and dropdown menues when clicking outside of sidemenu
function sidemenu_overlay() {
    document.getElementById("sidemenu-overlay").className = "sidemenu-overlay";
    document.getElementById("sidemenu").className = "sidemenu";
    document.getElementById("appearance-drop").classList.remove("appearance-drop-show");
    document.getElementById("appearance-btn").classList.remove("appearance-btn-clicked");
    document.getElementById("language-drop").classList.remove("language-drop-show");
    document.getElementById("language-btn").classList.remove("language-btn-clicked");
}


// Dropdown menus scripts

// Appearance dropdown
function appearance_btn() {
    document.getElementById("appearance-drop").classList.toggle("appearance-drop-show");
    document.getElementById("appearance-btn").classList.toggle("appearance-btn-clicked");
}


function language_btn() {
    document.getElementById("language-drop").classList.toggle("language-drop-show");
    document.getElementById("language-btn").classList.toggle("language-btn-clicked");
}




// dark and light theme script

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



// Ignore this
        //  line under is supposed to enable site to detect device theme of users.
        // window.matchMedia('(prefers-color-scheme: dark)')
        //       .addEventListener('change',({ matches }) => {
        //   if (matches) {
        //     console.log("change to dark mode!")
        //   } else {
        //     console.log("change to light mode!")
        //   }
        // })


        // let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // if(matched) {
        //     document.body.classList.remove("light-theme");
        //     let theme = "dark";

        //     localStorage.setItem("theme", theme);
        // }
        // else {
        //     document.body.classList.add("light-theme");
        //     let theme = "light";

        //     localStorage.setItem("theme", theme);
        // };