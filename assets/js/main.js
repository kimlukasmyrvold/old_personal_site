"use strict";

// **********************************************
// *              Global Variables              *
// **********************************************

// Creating constant to store the name of current page
const currentPage = document.documentElement.dataset.pagename;




// **********************************************
// *               Misc functions               *
// **********************************************

// Function for adding css to head of document
function addCss(fileName) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fileName;
    document.head.appendChild(link);
}

// Disables scrolling on document
function disableScrolling() {
    document.body.style.overflow = 'hidden';
}

// Enables Scrolling on document
function enableScrolling() {
    document.body.style.overflow = 'auto';
}

// Function for loading in HTML content to page
function loadHTML(id, filename, callback) {
    let xhttp;
    let element = document.querySelector(id);
    let file = filename;

    if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    element.innerHTML = this.responseText;
                    if (typeof callback === 'function') { callback(); }
                    addIcons();
                } else if (this.status == 404) { element.innerHTML = '<h1 id="error">Error 404; Page not found.</h1>'; }
            }
        }
        xhttp.open("GET", `/templates/${file}`, true);
        xhttp.send();
        return;
    }
}



// ***********************************
// *          Custom Navbar          *
// ***********************************

class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.style.display = 'none';
        this.classList.add('navbar');
        this.setAttribute('aria-label', 'Primary navbar.');
        loadHTML('custom-navbar', 'navbar.html', () => {
            // Code for navbar functions.
            const navbar = document.querySelector('.navbar');
            const navLinks = document.querySelectorAll('.navbar-link');
            const menuButton = document.querySelector('.navbar-menuButton');
            const navbarLanguage = document.querySelector('.navbar-language');
            const navbarAppearance = document.querySelector('.navbar-appearance');

            // Listening for click on menuButton
            menuButton.addEventListener('click', () => {
                navbar.classList.toggle('active');
                navbarAppearance.classList.remove('active');
                navbarLanguage.classList.remove('active');

                // Closing menu when navlink is pressed
                document.addEventListener('click', (event) => {
                    navLinks.forEach(a => {
                        a.contains(event.target) ? navbar.classList.remove('active') : null;
                    });
                })
            })

            // Closing menues when "Escape" key is pressed
            document.addEventListener('keydown', (event) => {
                if (event.key === "Escape" || event.key === "Esc") {
                    navbarAppearance.classList.remove('active');
                    navbarLanguage.classList.remove('active');
                    navbar.classList.remove('active');
                }
            })

            // Closing menues when screen width gets to big
            const viewWidth = window.matchMedia("(min-width: 740px)");
            viewWidth.addEventListener('change', viewWidthFunct);
            viewWidthFunct(viewWidth);

            function viewWidthFunct(viewWidth) {
                if (viewWidth.matches) {
                    navbarAppearance.classList.remove('active');
                    navbarLanguage.classList.remove('active');
                    navbar.classList.remove('active');
                }
            };

            // Changing active page/section on navbar
            function setActiveLink() {
                const currentPosition = window.scrollY;
                let activeArticle = null;
                const articles = document.querySelectorAll('article');
                const firstArticle = articles[0] || 0; // setting default value to avoid errors
                const lastArticle = articles[articles.length - 1] || 0; // setting default value to avoid errors
                const offset = 100;

                document.querySelectorAll('article').forEach(article => {
                    // Defining the start and end of the article
                    const articleStart = article.offsetTop - offset;
                    const articleEnd = articleStart + article.offsetHeight;

                    // Checking if postition of screen is within an article and then setting activeArticle to be equal to article
                    if (currentPosition >= articleStart && currentPosition <= articleEnd) {
                        activeArticle = article;
                    }
                });

                // Loop trough all navbar links
                navLinks.forEach(link => {
                    // Removing active class from all links
                    link.classList.remove('active');

                    // adding active class to link that fits requirements
                    if (activeArticle && link.getAttribute('id').includes(activeArticle.id)) {
                        link.classList.add('active');
                    } else if (articles.length === 0 && link.getAttribute('id').includes(currentPage)) {
                        link.classList.add('active');
                    }
                });

                // If too high on the screen, select the page name
                if (currentPosition < firstArticle.offsetTop - offset) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLinks.forEach(link => link.getAttribute('id').includes(currentPage) ? link.classList.add('active') : null);
                }

                // If too low, select the last article
                if (currentPosition > lastArticle.offsetTop - offset + lastArticle.offsetHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    document.querySelector(`a[id="${lastArticle.id}Link"]`).classList.add('active');
                }
            }

            // Function for handling mouse events like mouseout and mouseout
            function handleMouseEvents(event) {
                if (event.target.matches('.navbar-link')) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    event.type === 'mouseout' ? setActiveLink() : event.type === 'mouseover' ? event.target.classList.add('active') : null;
                }
            }

            // Removes hash from url
            function removeHash() {
                history.replaceState("", document.title, window.location.pathname + window.location.search);
            }

            // Add scroll event listener to the document
            document.addEventListener('scroll', setActiveLink);
            // Check for change in url
            window.addEventListener('popstate', removeHash);
            // Check for mouseout and mousover events
            document.querySelector('.navbar-links').addEventListener('mouseover', handleMouseEvents);
            document.querySelector('.navbar-links').addEventListener('mouseout', handleMouseEvents);

            // Calling functions to start on load
            setActiveLink();
            removeHash()

            // Calling changeTheme function with 'device' has default argument if theme is not found in localstorage.
            changeTheme(localStorage.getItem('theme') || 'device');
        })
    };
};
customElements.define('custom-navbar', CustomNavbar);

// Function for dropdown menu's on navbar
function navbarDrop(input) {
    const navbarLanguage = document.querySelector('.navbar-language');
    const navbarAppearance = document.querySelector('.navbar-appearance');
    const navbar = document.querySelector('.navbar');

    if (input === 'language') {
        navbarLanguage.classList.toggle('active');
        navbarAppearance.classList.remove('active');
        navbar.classList.remove('active');
    } else {
        navbarAppearance.classList.toggle('active');
        navbarLanguage.classList.remove('active');
        navbar.classList.remove('active');
    }

    // Checks for click outside dropdowns and closes them
    document.addEventListener('click', (event) => {
        !navbarLanguage.contains(event.target) ? navbarLanguage.classList.remove('active') : null;
        !navbarAppearance.contains(event.target) ? navbarAppearance.classList.remove('active') : null;
    });
}




// ***********************************
// *          Custom footer          *
// ***********************************

class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.style.display = 'none';
        this.setAttribute('id', 'footer');
        this.setAttribute('aria-label', 'Primary footer.');
        loadHTML('custom-footer', 'footer.html', () => {
            // adding google maps script and asking for user consent
            function addMapsApi() {
                localStorage.setItem('mapsConsent', "true");
                document.body.appendChild(document.createElement('script')).setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCriq_RvddTjsYCd-uRVVIJROZpMYBVr0U&callback=Map');
            }
            if (localStorage.getItem('mapsConsent') === null) localStorage.setItem('mapsConsent', "false");
            if (localStorage.getItem('mapsConsent') === "true") addMapsApi();
            document.querySelector('#footer #map-consent-button').addEventListener('click', addMapsApi)
        })
    }
};
customElements.define('custom-footer', CustomFooter);

// Setting location, marker and zoom for google map
function Map() {
    const location = {
        lat: 59.260573,
        lng: 11.107192
    };
    const map = new google.maps.Map(document.querySelector("#footer #map"), {
        zoom: 12,
        center: location
    });
    new google.maps.Marker({
        position: location,
        map: map
    });
}




// **********************************************
// *        Changing language of website        *
// **********************************************

let languageJSON;

try {
    // Fetching language.json
    fetch('/assets/json/language.json')
        .then(response => response.json())
        .then(data => {
            // setting data.language to language
            languageJSON = data.language;

            // storing value of localstorage and then calling the changeLanguage function with it's value. If no value is present it default to 'no'
            changeLanguage(localStorage.getItem('lang') || 'no');
        })
} catch (error) {
    console.error('Could not fetch language.json:', error);
};

function changeLanguage(lang) {
    // Setting localstorage lang to selected language
    localStorage.setItem("lang", lang);

    // Changing lang tag on html tag to current lang
    document.documentElement.setAttribute('lang', lang);

    // Adding underline to current selected language
    document.querySelectorAll(".navbar-language button").forEach(btn => btn.classList.toggle("underline", btn.dataset.lang === lang));

    try {
        // Changing the language of all the elements
        try {
            Object.entries(languageJSON[lang][currentPage]).forEach(([key, value]) => {
                const element = document.querySelectorAll(`#${key}`);
                element.forEach(e => {
                    e ? e.innerHTML = value : null;
                });
            });
        } catch (e) {
            console.error(`Page is not defined in language.json. ${e}`);
        };

        // Changing language for navbar and footer
        try {
            Object.entries(languageJSON[lang].NavbarFooter).forEach(([key, value]) => {
                const element = document.querySelectorAll(`#${key}`);
                element.forEach(e => {
                    e ? e.innerHTML = value : null;
                });
            });
        } catch (e) {
            console.error(`Error attempting to apply language change to navbar or footer. ${e}`);
        };
    } catch (error) {
        console.error(`Could not translate page! ${error}`)
    }

    // Dispatch a custom event when the function has been executed
    // This is for when there are scripts that modify the innerHTML
    const changeLanguageEvent = new CustomEvent('changeLanguageCalled');
    document.dispatchEvent(changeLanguageEvent);
}




// ************************************************
// *           Website color theme code           *
// ************************************************

// Function for changing website color theme
function changeTheme(theme) {
    // Checking for change in users device theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        // Changing the theme of the website depending if the user has selected device theme or not
        theme === 'device' ? document.body.className = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : document.body.className = theme;
    });

    // Changing the theme of the website depending if the user has selected device theme or not
    theme === 'device' ? document.body.className = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : document.body.className = theme;

    // Adding underline to the button selecting the current theme
    document.querySelectorAll(".navbar-appearance button").forEach(btn => btn.classList.toggle("underline", btn.dataset.theme === theme));

    // Adding theme to localstorage
    localStorage.setItem('theme', theme);
}




// ****************************************
// *       DropDown toggle function       *
// ****************************************

// Selecting all buttons with "data-dropdown" value
const dropdownButtons = document.querySelectorAll('button[data-dropdown]');

function dropdownToggle(e) {
    // add hidden class to all dropdowns
    dropdownButtons.forEach((x) => {
        e.dataset.dropdown === x.dataset.dropdown ? document.querySelector('#' + e.dataset.dropdown).classList.toggle('hidden') : document.querySelector('#' + x.dataset.dropdown).classList.add('hidden');
    })
}

// Add click listener to all dropdown buttons
dropdownButtons.forEach((e) => {
    // Add hidden class to all dropdowns
    document.querySelector('#' + e.dataset.dropdown).classList.add('hidden');

    // Check for click and call dropdownToggle()
    e.addEventListener('click', () => {
        dropdownToggle(e)
    })
})




// ****************************************
// *          Add icons function          *
// ****************************************

function addIcons() {
    // Loop trough every element with 'icon-' class
    document.querySelectorAll('[class^="icon-"], [class*=" icon-"]').forEach((e) => {
        let icon = '';

        // Get the className of the icon name
        for (let i = 0; i < e.classList.length; i++) {
            if (e.classList[i].startsWith('icon-')) {
                icon = e.classList[i];
                break;
            };
        };

        // Adding attributes
        e.setAttribute('focusable', false);
        e.setAttribute('aria-hidden', true);
        e.setAttribute('viewBox', '0 0 24 24');
        e.setAttribute('height', '1.4em');

        // Add the svg icon
        e.innerHTML = `<use xlink:href="/assets/images/icons.svg#${icon}"></use>`;
    })
}

// Initiate addIcons function
addIcons();

// Call function if language changes
document.addEventListener('changeLanguageCalled', addIcons);
