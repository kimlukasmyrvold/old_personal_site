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




// ***********************************
// *          Custom Navbar          *
// ***********************************

class CustomNavbar extends HTMLElement {
    connectedCallback() {
        // Adding css file to head of document
        addCss('/assets/css/navbar.css');

        // Making navbar hidden until css takes over, this is to stop the navbar from flashing whilst loading css
        this.style.display = 'none';

        // Adding class, aria-label and innerHTML to <custom-navbar>
        this.classList.add('navbar');
        this.setAttribute('aria-label', 'Primary navbar.');

        this.innerHTML = /*html*/`
            <a href="#main" class="skip-to-main">Skip to main content.</a>
            <div class="navbar-menuButton"><button class="bar"></button></div>
            <nav class="navbar-links" aria-label="Navigation Links">
                <ul>
                    <li><a id="homeLink" href="/#" class="navbar-link">Home</a></li>
                    <li><a id="educationLink" href="/#education" class="navbar-link">Education</a></li>
                    <li><a id="workExperienceLink" href="/#workExperience" class="navbar-link">Work experience</a></li>
                    <li><a id="hobbiesLink" href="/#hobbies" class="navbar-link">Hobbies</a></li>
                    <li><a id="gamesLink" href="/#games" class="navbar-link">Games</a></li>
                </ul>
            </nav>
            <div class="navbar-buttons">
                <div class="navbar-language">
                    <button onclick="navbarDrop('language')" aria-label="Language button">
                        <svg class="icon-globe-filled"></svg>
                    </button>
                    <div class="navbar-drop">
                        <button onclick="changeLanguage('no')" data-lang="no" aria-label="Norwegian translation button">
                            <svg class="icon-flag-no"></svg>
                            <span>Norsk</span>
                        </button>
                        <hr>
                        <button onclick="changeLanguage('en')" data-lang="en" aria-label="English translation button">
                            <svg class="icon-flag-en"></svg>
                            <span>English</span>
                        </button>
                        <hr>
                        <button onclick="changeLanguage('de')" data-lang="de" aria-label="English translation button">
                            <svg class="icon-flag-de"></svg>
                            <span>German</span>
                        </button>
                    </div>
                </div>
                <div class="navbar-appearance">
                    <button onclick="navbarDrop('appearance')" aria-label="Appearance button">
                        <svg class="icon-appearance"></svg>
                    </button>
                    <div class="navbar-drop">
                        <button onclick="changeTheme('device')" data-theme="device" aria-label="Device theme button">
                            <svg class="icon-cog"></svg>
                            <span id="deviceTheme">Device</span>
                        </button>
                        <hr>
                        <button onclick="changeTheme('dark')" data-theme="dark" aria-label="Dark theme button">
                            <svg class="icon-splash-black"></svg>
                            <span id="darkTheme">Dark</span>
                        </button>
                        <hr>
                        <button onclick="changeTheme('purple')" data-theme="purple" aria-label="Purple theme button">
                            <svg class="icon-splash-purple"></svg>
                            <span id="purpleTheme">Purple</span>
                        </button>
                        <hr>
                        <button onclick="changeTheme('light')" data-theme="light" aria-label="Light theme button">
                            <svg class="icon-splash-white"></svg>
                            <span id="lightTheme">Light</span>
                        </button>
                        <hr>
                        <button onclick="changeTheme('orange')" data-theme="orange" aria-label="Orange theme button">
                            <svg class="icon-splash-orange"></svg>
                            <span id="orangeTheme">Orange</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

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
        // Creating constant "viewWidth" with window.matchMedia("(min-width: 740px)");
        const viewWidth = window.matchMedia("(min-width: 740px)");
        viewWidth.addEventListener('change', viewWidthFunct); // Checking for change in the media query
        viewWidthFunct(viewWidth); // Calling viewWidthFunct function at least once

        // Defining the viewWidthFunct function
        function viewWidthFunct(viewWidth) {
            // Checking if viewWidth matches "min-width: 740px"
            if (viewWidth.matches) {
                // Removes active class from [navbarAppearance, navbarLanguage, navbar]
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

            document.querySelectorAll('article').forEach(article => {
                // Defining the start and end of the article
                const articleStart = article.offsetTop - 130;
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
            if (currentPosition < firstArticle.offsetTop - 130) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks.forEach(link => link.getAttribute('id').includes(currentPage) ? link.classList.add('active') : null);
            }

            // If too low, select the last article
            if (currentPosition > lastArticle.offsetTop - 130 + lastArticle.offsetHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                document.querySelector(`a[id="${lastArticle.id}Link"]`).classList.add('active');
            }
        }

        // Function for handling mouse events like mouseout and mouseout
        function handleMouseEvents(event) {
            // Checking if the target matches '.navbar-link'
            if (event.target.matches('.navbar-link')) {
                // Removing active class from all navbar links
                navLinks.forEach(link => link.classList.remove('active'));
                // Checking if the event type was 'mouseout' and calls setActiveLink() if true
                event.type === 'mouseout' ? setActiveLink() : null;
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
        // Adding css file to head of document
        addCss('/assets/css/footer.css');

        // Making footer hidden until css takes over, this is to stop the footer from flashing whilst loading css
        this.style.display = 'none';

        // Adding id, aria-label and innerHTML to <custom-footer>
        this.setAttribute('id', 'footer');
        this.setAttribute('aria-label', 'Primary footer.');

        this.innerHTML = /*html*/`
            <div class="grid-container">
                <div class="grid-item" aria-label="Social information section">
                    <p class="header">Kim Lukas Myrvold</p>
                    <p>
                        <a href="https://github.com/kimlukasmyrvold/kimlukasmyrvold.github.io" target="_blank" rel="noreferrer noopener">
                            <svg class="icon-github"></svg>
                            <span>Github</span>
                        </a>
                    </p>
                    <p>
                        <a href="https://steamcommunity.com/id/solonerves" target="_blank" rel="noreferrer noopener">
                            <svg class="icon-steam"></svg>
                            <span>Steam</span>
                        </a>
                    </p>
                    <p>
                        <a href="https://www.youtube.com/@SoloNerves" target="_blank" rel="noreferrer noopener">
                            <svg class="icon-youtube"></svg>
                            <span>Youtube</span>
                        </a>
                    </p>
                </div>
                <div class="grid-item" aria-label="Contact information section">
                    <p id="contactInformation" class="header">Kontaktinformasjon</p>
                    <p>
                        <a href="tel: +4748426624"><svg class="icon-phone"></svg><span>+47 484 26 624</span></a>
                    </p>
                    <p>
                        <a href="https://discord.com/" target="_blank" rel="noreferrer noopener"><svg class="icon-discord"></svg><span>SoloNerves#4666</span></a>
                    </p>
                    <p>
                        <a href="mailto:kimlukasmyrvold06@gmail.com"><svg class="icon-mail"></svg><span>kimlukasmyrvold06@gmail.com</span></a>
                    </p>
                </div>
                <div class="grid-item" id="location" aria-label="Location section">
                    <p id="locationText" class="header">Beliggenhet</p>
                    <div id="map" style="padding: 0 .5em 1em;">
                        <p id="map-consent-location">Fredrikstad, Årum.</p>
                        <p id="map-consent-text">Google maps may collect user data, in order to view map you need to consent.</p>
                        <button id="map-consent-button">Accept</button>
                    </div>
                </div>
            </div>
            <div class="copyright"><p><svg class="icon-copyright"></svg>2023 Copyright: Kim Lukas Myrvold</p></div>
        `;

        // adding google maps script and asking for user consent
        const googleMapsSource = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCriq_RvddTjsYCd-uRVVIJROZpMYBVr0U&callback=Map';

        // Checking if user has already consented to the use of google maps
        if ((localStorage.getItem('googleAPIConsent') || false) === false) {
            // Checking if user clicks on consent button
            document.querySelector('#map-consent-button').addEventListener('click', () => {
                // Adding google maps api script to bottom of page and setting localstorage googleMapsConsent to true
                localStorage.setItem('googleAPIConsent', true);
                document.body.appendChild(document.createElement('script')).setAttribute('src', googleMapsSource);
            })
        } else {
            // Adding google maps api script to bottom of page
            document.body.appendChild(document.createElement('script')).setAttribute('src', googleMapsSource);
        }
    }
};
customElements.define('custom-footer', CustomFooter);

// Setting location, marker and zoom for google map
function Map() {
    const location = {
        lat: 59.260573,
        lng: 11.107192
    };
    const map = new google.maps.Map(document.querySelector("#map"), {
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




// ***********************************************
// *         Dark and light theme code           *
// ***********************************************

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

// Calling changeTheme function with 'device' has default argument if theme is not found in localstorage.
changeTheme(localStorage.getItem('theme') || 'device');




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
        e.innerHTML = `<use xlink:href="../assets/images/icons.svg#${icon}"></use>`;
    })
}

addIcons();