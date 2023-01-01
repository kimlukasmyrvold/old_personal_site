// Code for changing language of 404 page

const currentLang = localStorage.getItem("lang");
console.log(lang);


const norwegian = document.querySelector('#norwegian');
const english = document.querySelector('#english');

if (lang === 'norsk') {
    norwegian.classList.remove('hidden');
    english.classList.add('hidden');

    console.log('it worked! - norsk');
}
else if (lang === 'english') {
    norwegian.classList.add('hidden');
    english.classList.remove('hidden');

    console.log('it worked! - english');
}
else if (lang === 'norsk_dev') {
    norwegian.classList.remove('hidden');
    english.classList.add('hidden');

    console.log('it worked! - norsk_dev');
}
else {
    norwegian.classList.add('hidden');
    english.classList.remove('hidden');

    console.log('it worked! - english_dev');
};


window.onload = function () {

    const currentPathname = window.location.pathname;
    const currentLang = localStorage.getItem('lang');

    if (currentLang === 'norsk_dev' || currentLang === 'english_dev') {
        if (!currentPathname === '404.html') {
            window.location.pathname = '404.html';
        }
        else {
            console.log('hello2');
        };
    }
    else {
        console.log('hello');
    };
};





// Sidemenu functions for 404 page

// Opens and closes sidemenu when clicking on the hamburger icon
function sidemenu_btn2() {
    document.getElementById("sidemenu2").classList.toggle("sidemenu");
    document.getElementById("sidemenu2").classList.toggle("hidden");
    document.getElementById("sidemenu-overlay2").classList.toggle("sidemenu-overlay");
    document.getElementById("sidemenu-overlay2").classList.toggle("hidden");
    document.getElementById("appearance-btn2").classList.remove("appearance-btn-clicked");
    document.getElementById("appearance-drop2").classList.remove("block");
    document.getElementById("appearance-drop2").classList.add("hidden");
    document.getElementById("language-btn2").classList.remove("language-btn-clicked");
    document.getElementById("language-drop2").classList.remove("block");
    document.getElementById("language-drop2").classList.add("hidden");
};

// Opens and closes sidemenu and dropdown menues when clicking outside of sidemenu
function sidemenu_overlay2() {
    document.getElementById("sidemenu-overlay2").classList.remove("sidemenu-overlay");
    document.getElementById("sidemenu-overlay2").classList.toggle("hidden");
    document.getElementById("sidemenu2").classList.remove("sidemenu");
    document.getElementById("sidemenu2").classList.toggle("hidden");
    document.getElementById("appearance-drop2").classList.remove("block");
    document.getElementById("appearance-drop2").classList.add("hidden");
    document.getElementById("appearance-btn2").classList.remove("appearance-btn-clicked");
    document.getElementById("language-drop2").classList.remove("block");
    document.getElementById("language-drop2").classList.add("hidden");
    document.getElementById("language-btn2").classList.remove("language-btn-clicked");
};

// Opens and closes the appearance dropdown menu when is clicked
function appearance_btn2() {
    document.getElementById("appearance-drop2").classList.toggle("block");
    document.getElementById("appearance-drop2").classList.toggle("hidden");
    document.getElementById("appearance-btn2").classList.toggle("appearance-btn-clicked");
}

// Opens and closes the language dropdown menue when is clicked
function language_btn2() {
    document.getElementById("language-drop2").classList.toggle("block");
    document.getElementById("language-drop2").classList.toggle("hidden");
    document.getElementById("language-btn2").classList.toggle("language-btn-clicked");
};

// End of sidemenu functions