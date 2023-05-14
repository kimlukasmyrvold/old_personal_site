"use strict";

// **********************************************
// *              Global Variables              *
// **********************************************

// Creating constant to store the name of current page
const currentPage = document.documentElement.dataset.pagename;

// Checking if the website is viewed on github or localy and storing a value to repoName constant
const pathname = location.hostname === 'kimlukasmyrvold.github.io' ? 'https://kimlukasmyrvold.github.io/' : '/';




// **********************************************
// *               Misc functions               *
// **********************************************

// Function for adding css to head of document
function addCss(fileName) {
    var link = document.createElement("link");
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
        addCss(`${pathname}assets/css/navbar.css`);

        // Making navbar hidden until css takes over, this is to stop the navbar from flashing whilst loading css
        this.style.visibility = 'hidden';

        // Adding class, aria-label and innerHTML to <custom-navbar>
        this.classList.add('navbar');
        this.setAttribute('aria-label', 'Primary navbar.');

        this.innerHTML = /*html*/`
            <div class="navbar-menuButton"><button class="bar"></button></div>
            <nav class="navbar-links" aria-label="Navigation Links">
                <ul>
                    <li><a id="homeLink" href="${pathname}#" class="navbar-link">Home</a></li>
                    <li><a id="educationLink" href="${pathname}#education" class="navbar-link">Education</a></li>
                    <li><a id="workExperienceLink" href="${pathname}#workExperience" class="navbar-link">Work experience</a></li>
                    <li><a id="hobbiesLink" href="${pathname}#hobbies" class="navbar-link">Hobbies</a></li>
                    <li><a id="gamesLink" href="${pathname}#games" class="navbar-link">Games</a></li>
                </ul>
            </nav>
            <div class="navbar-buttons">
                <div class="navbar-language">
                    <button onclick="navbarDrop('language')" aria-label="Language button">
                        <svg aria-label="Language Image" style="width: 28px; height: 28px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M689 320C660 141.4 591.6 16 512 16s-148 125.4-177 304h354zM320 512c0 44.4 2.4 87 6.6 128h370.6c4.2-41 6.6-83.6 6.6-128s-2.4-87-6.6-128H326.6c-4.2 41-6.6 83.6-6.6 128z m649.4-192c-57.2-135.8-173-240.8-316-283.2 48.8 67.6 82.4 169.4 100 283.2h216zM370.4 36.8C227.6 79.2 111.6 184.2 54.6 320h216c17.4-113.8 51-215.6 99.8-283.2zM990.8 384H761.4c4.2 42 6.6 85 6.6 128s-2.4 86-6.6 128h229.2c11-41 17.2-83.6 17.2-128s-6.2-87-17-128zM256 512c0-43 2.4-86 6.6-128H33.2C22.4 425 16 467.6 16 512s6.4 87 17.2 128h229.2c-4-42-6.4-85-6.4-128z m79 192c29 178.6 97.4 304 177 304s148-125.4 177-304h-354z m318.6 283.2c142.8-42.4 258.8-147.4 316-283.2h-216c-17.6 113.8-51.2 215.6-100 283.2zM54.6 704c57.2 135.8 173 240.8 316 283.2-48.8-67.6-82.4-169.4-100-283.2h-216z" /></svg>
                    </button>
                    <div class="navbar-drop">
                        <button onclick="changeLanguage('no')" data-lang="no" aria-label="Norwegian translation button">
                            <svg aria-label="Norwegian flag" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" height="24px"><path fill="#EF2B2D" d="M10 5H4a4 4 0 0 0-4 4v6h10V5zm22 0H16v10h20V9a4 4 0 0 0-4-4zM10 31H4a4 4 0 0 1-4-4v-6h10v10zm22 0H16V21h20v6a4 4 0 0 1-4 4z" /><path fill="#002868" d="M14.5 5h-2.944l-.025 11.5H0v3h11.525L11.5 31h3V19.5H36v-3H14.5z" /><path fill="#EEE" d="M14.5 31H16V21h20v-1.5H14.5zM16 5h-1.5v11.5H36V15H16zm-4.5 0H10v10H0v1.5h11.5zM0 19.5V21h10v10h1.5V19.5z" /></svg>
                            <span>Norsk</span>
                        </button>
                        <hr>
                        <button onclick="changeLanguage('en')" data-lang="en" aria-label="English translation button">
                            <svg aria-label="English flag" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" height="24px"><path fill="#00247D" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z" /><path fill="#CF1B2B" d="M25.14 23l9.712 6.801a3.977 3.977 0 0 0 .99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8a3.988 3.988 0 0 0-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2a3.994 3.994 0 0 0-.991 1.749L7.372 13h3.487z" /><path fill="#EEE" d="M36 21H21v10h2v-5.836L31.335 31H32a3.99 3.99 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9a3.983 3.983 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4.001 4.001 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4a3.985 3.985 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A3.968 3.968 0 0 0 0 9v.059L5.628 13H0v2h15V5h-2z" /><path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z" /></svg>
                            <span>English</span>
                        </button>
                    </div>
                </div>
                <div class="navbar-appearance">
                    <button onclick="navbarDrop('appearance')" aria-label="Appearance button">
                        <svg aria-label="Appearance image" style="width: 31px; height: 31px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M833.706667 216.746667A452.693333 452.693333 0 0 0 508.16 85.333333a426.666667 426.666667 0 0 0-2.133333 853.333334 110.08 110.08 0 0 0 107.946666-80.64 107.52 107.52 0 0 0-24.32-97.28 21.333333 21.333333 0 0 1 15.786667-35.413334h70.4A262.4 262.4 0 0 0 938.666667 483.413333a361.813333 361.813333 0 0 0-104.96-266.666666zM677.546667 640h-70.4a106.24 106.24 0 0 0-79.786667 177.066667 20.906667 20.906667 0 0 1 5.12 20.906666c-2.133333 8.96-11.946667 14.506667-25.173333 15.36a341.333333 341.333333 0 0 1-333.653334-388.693333A345.6 345.6 0 0 1 508.586667 170.666667H512a361.386667 361.386667 0 0 1 260.266667 105.813333 277.333333 277.333333 0 0 1 81.066666 203.52A177.92 177.92 0 0 1 677.546667 640z" /><path d="M512 277.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" /><path d="M650.666667 307.2a64 64 0 1 0 87.466666 23.466667 64 64 0 0 0-87.466666-23.466667zM373.333333 307.2a64 64 0 1 0 23.466667 87.466667 64 64 0 0 0-23.466667-87.466667zM262.826667 480.426667a64 64 0 1 0 88.746666 17.066666 63.573333 63.573333 0 0 0-88.746666-17.066666z"/></svg>
                    </button>
                    <div class="navbar-drop">
                        <button onclick="changeTheme('device')" data-theme="device" aria-label="Device theme button">
                            <svg aria-label="Device theme image" height="26px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
                            <span id="deviceTheme">Device</span>
                        </button>
                        <hr>
                        <button onclick="changeTheme('dark')" data-theme="dark" aria-label="Dark theme button">
                            <svg aria-label="dark theme image" height="22px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M29.684 23.984l-0.021-0.055c-0.193-0.456-0.638-0.771-1.155-0.771-0.172 0-0.336 0.035-0.486 0.098l0.008-0.003c-1.219 0.521-2.638 0.824-4.127 0.824-5.937 0-10.751-4.813-10.751-10.751 0-4.458 2.713-8.282 6.579-9.911l0.071-0.026 0.221-0.093c0.444-0.199 0.747-0.636 0.747-1.145 0-0.625-0.458-1.142-1.057-1.235l-0.007-0.001c-0.676-0.106-1.455-0.167-2.249-0.167-8.421 0-15.248 6.827-15.248 15.248s6.827 15.248 15.248 15.248c4.91 0 9.278-2.321 12.067-5.925l0.026-0.035c0.161-0.208 0.258-0.473 0.258-0.76 0-0.197-0.046-0.383-0.127-0.548l0.003 0.007zM22.326 27.779c-1.44 0.612-3.115 0.968-4.873 0.968-7.041 0-12.75-5.708-12.75-12.75 0-6.189 4.41-11.349 10.26-12.507l0.081-0.013c-2.694 2.435-4.379 5.942-4.379 9.843 0 7.319 5.933 13.252 13.252 13.252 0.242 0 0.482-0.006 0.72-0.019l-0.033 0.001c-0.655 0.45-1.404 0.86-2.194 1.193l-0.084 0.031z" /></svg>
                            <span id="darkTheme">Dark</span>
                        </button>
                        <hr>
                        <button onclick="changeTheme('purple')" data-theme="purple" aria-label="Purple theme button">
                            <svg aria-label="Purple theme image" height="22px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M29.684 23.984l-0.021-0.055c-0.193-0.456-0.638-0.771-1.155-0.771-0.172 0-0.336 0.035-0.486 0.098l0.008-0.003c-1.219 0.521-2.638 0.824-4.127 0.824-5.937 0-10.751-4.813-10.751-10.751 0-4.458 2.713-8.282 6.579-9.911l0.071-0.026 0.221-0.093c0.444-0.199 0.747-0.636 0.747-1.145 0-0.625-0.458-1.142-1.057-1.235l-0.007-0.001c-0.676-0.106-1.455-0.167-2.249-0.167-8.421 0-15.248 6.827-15.248 15.248s6.827 15.248 15.248 15.248c4.91 0 9.278-2.321 12.067-5.925l0.026-0.035c0.161-0.208 0.258-0.473 0.258-0.76 0-0.197-0.046-0.383-0.127-0.548l0.003 0.007zM22.326 27.779c-1.44 0.612-3.115 0.968-4.873 0.968-7.041 0-12.75-5.708-12.75-12.75 0-6.189 4.41-11.349 10.26-12.507l0.081-0.013c-2.694 2.435-4.379 5.942-4.379 9.843 0 7.319 5.933 13.252 13.252 13.252 0.242 0 0.482-0.006 0.72-0.019l-0.033 0.001c-0.655 0.45-1.404 0.86-2.194 1.193l-0.084 0.031z" /></svg>
                            <span id="purpleTheme">Purple</span>
                        </button>
                        <hr>
                        <button onclick="changeTheme('light')" data-theme="light" aria-label="Light theme button">
                            <svg aria-label="Light theme image" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 19c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13S24.82 19 32 19zM32 41c4.971 0 9-4.029 9-9s-4.029-9-9-9-9 4.029-9 9S27.029 41 32 41zM34 8c0 .366 0 5.634 0 6 0 1.105-.895 2-2 2s-2-.895-2-2c0-.366 0-5.634 0-6 0-1.105.895-2 2-2S34 6.895 34 8zM50.385 16.444c-.259.259-3.984 3.984-4.243 4.243-.781.781-2.047.781-2.828 0-.781-.781-.781-2.047 0-2.828.259-.259 3.984-3.984 4.243-4.243.781-.781 2.047-.781 2.828 0S51.166 15.663 50.385 16.444zM56 34c-.366 0-5.634 0-6 0-1.105 0-2-.895-2-2s.895-2 2-2c.366 0 5.634 0 6 0 1.105 0 2 .895 2 2S57.105 34 56 34zM47.556 50.385c-.259-.259-3.984-3.984-4.243-4.243-.781-.781-.781-2.047 0-2.828s2.047-.781 2.828 0c.259.259 3.984 3.984 4.243 4.243.781.781.781 2.047 0 2.828S48.337 51.166 47.556 50.385zM30 56c0-.366 0-5.634 0-6 0-1.105.895-2 2-2s2 .895 2 2c0 .366 0 5.634 0 6 0 1.105-.895 2-2 2S30 57.105 30 56zM13.615 47.556c.259-.259 3.984-3.984 4.243-4.243.781-.781 2.047-.781 2.828 0 .781.781.781 2.047 0 2.828-.259.259-3.984 3.984-4.243 4.243-.781.781-2.047.781-2.828 0S12.834 48.337 13.615 47.556zM8 30c.366 0 5.634 0 6 0 1.105 0 2 .895 2 2s-.895 2-2 2c-.366 0-5.634 0-6 0-1.105 0-2-.895-2-2S6.895 30 8 30zM16.444 13.615c.259.259 3.984 3.984 4.243 4.243.781.781.781 2.047 0 2.828-.781.781-2.047.781-2.828 0-.259-.259-3.984-3.984-4.243-4.243-.781-.781-.781-2.047 0-2.828S15.663 12.834 16.444 13.615z"/></svg>
                            <span id="lightTheme">Light</span>
                        </button>
                        <hr>
                        <button onclick="changeTheme('orange')" data-theme="orange" aria-label="Orange theme button">
                            <svg aria-label="Orange theme image" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 19c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13S24.82 19 32 19zM32 41c4.971 0 9-4.029 9-9s-4.029-9-9-9-9 4.029-9 9S27.029 41 32 41zM34 8c0 .366 0 5.634 0 6 0 1.105-.895 2-2 2s-2-.895-2-2c0-.366 0-5.634 0-6 0-1.105.895-2 2-2S34 6.895 34 8zM50.385 16.444c-.259.259-3.984 3.984-4.243 4.243-.781.781-2.047.781-2.828 0-.781-.781-.781-2.047 0-2.828.259-.259 3.984-3.984 4.243-4.243.781-.781 2.047-.781 2.828 0S51.166 15.663 50.385 16.444zM56 34c-.366 0-5.634 0-6 0-1.105 0-2-.895-2-2s.895-2 2-2c.366 0 5.634 0 6 0 1.105 0 2 .895 2 2S57.105 34 56 34zM47.556 50.385c-.259-.259-3.984-3.984-4.243-4.243-.781-.781-.781-2.047 0-2.828s2.047-.781 2.828 0c.259.259 3.984 3.984 4.243 4.243.781.781.781 2.047 0 2.828S48.337 51.166 47.556 50.385zM30 56c0-.366 0-5.634 0-6 0-1.105.895-2 2-2s2 .895 2 2c0 .366 0 5.634 0 6 0 1.105-.895 2-2 2S30 57.105 30 56zM13.615 47.556c.259-.259 3.984-3.984 4.243-4.243.781-.781 2.047-.781 2.828 0 .781.781.781 2.047 0 2.828-.259.259-3.984 3.984-4.243 4.243-.781.781-2.047.781-2.828 0S12.834 48.337 13.615 47.556zM8 30c.366 0 5.634 0 6 0 1.105 0 2 .895 2 2s-.895 2-2 2c-.366 0-5.634 0-6 0-1.105 0-2-.895-2-2S6.895 30 8 30zM16.444 13.615c.259.259 3.984 3.984 4.243 4.243.781.781.781 2.047 0 2.828-.781.781-2.047.781-2.828 0-.259-.259-3.984-3.984-4.243-4.243-.781-.781-.781-2.047 0-2.828S15.663 12.834 16.444 13.615z"/></svg>
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
        window.onload = () => {
            setActiveLink();
            removeHash()
        };
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
        addCss(`${pathname}assets/css/footer.css`);

        // Making footer hidden until css takes over, this is to stop the footer from flashing whilst loading css
        this.style.visibility = 'hidden';

        // Adding id, aria-label and innerHTML to <custom-footer>
        this.setAttribute('id', 'footer');
        this.setAttribute('aria-label', 'Primary footer.');

        this.innerHTML = /*html*/`
            <div class="grid-container">
                <div class="grid-item" aria-label="Social information section">
                    <p class="header">Kim Lukas Myrvold</p>
                    <p>
                        <a href="https://github.com/kimlukasmyrvold/kimlukasmyrvold.github.io" target="_blank" rel="noreferrer noopener"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                            </svg><span>Github</span></a>
                    </p>
                    <p>
                        <a href="https://steamcommunity.com/id/solonerves" target="_blank" rel="noreferrer noopener"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C7.4,22 3.55,18.92 2.36,14.73L6.19,16.31C6.45,17.6 7.6,18.58 8.97,18.58C10.53,18.58 11.8,17.31 11.8,15.75V15.62L15.2,13.19H15.28C17.36,13.19 19.05,11.5 19.05,9.42C19.05,7.34 17.36,5.65 15.28,5.65C13.2,5.65 11.5,7.34 11.5,9.42V9.47L9.13,12.93L8.97,12.92C8.38,12.92 7.83,13.1 7.38,13.41L2,11.2C2.43,6.05 6.73,2 12,2M8.28,17.17C9.08,17.5 10,17.13 10.33,16.33C10.66,15.53 10.28,14.62 9.5,14.29L8.22,13.76C8.71,13.58 9.26,13.57 9.78,13.79C10.31,14 10.72,14.41 10.93,14.94C11.15,15.46 11.15,16.04 10.93,16.56C10.5,17.64 9.23,18.16 8.15,17.71C7.65,17.5 7.27,17.12 7.06,16.67L8.28,17.17M17.8,9.42C17.8,10.81 16.67,11.94 15.28,11.94C13.9,11.94 12.77,10.81 12.77,9.42A2.5,2.5 0 0,1 15.28,6.91C16.67,6.91 17.8,8.04 17.8,9.42M13.4,9.42C13.4,10.46 14.24,11.31 15.29,11.31C16.33,11.31 17.17,10.46 17.17,9.42C17.17,8.38 16.33,7.53 15.29,7.53C14.24,7.53 13.4,8.38 13.4,9.42Z" />
                            </svg><span>Steam</span></a>
                    </p>
                    <p>
                        <a href="https://www.youtube.com/@SoloNerves" target="_blank" rel="noreferrer noopener"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
                            </svg><span>Youtube</span></a>
                    </p>
                </div>
                <div class="grid-item" aria-label="Contact information section">
                    <p id="contactInformation" class="header">Kontaktinformasjon</p>
                    <p>
                        <a href="tel: +4748426624"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4 3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                            </svg><span>+47 484 26 624</span></a>
                    </p>
                    <p>
                        <a href="https://discord.com/" target="_blank" rel="noreferrer noopener">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.59 5.88997C17.36 5.31997 16.05 4.89997 14.67 4.65997C14.5 4.95997 14.3 5.36997 14.17 5.69997C12.71 5.47997 11.26 5.47997 9.83001 5.69997C9.69001 5.36997 9.49001 4.95997 9.32001 4.65997C7.94001 4.89997 6.63001 5.31997 5.40001 5.88997C2.92001 9.62997 2.25001 13.28 2.58001 16.87C4.23001 18.1 5.82001 18.84 7.39001 19.33C7.78001 18.8 8.12001 18.23 8.42001 17.64C7.85001 17.43 7.31001 17.16 6.80001 16.85C6.94001 16.75 7.07001 16.64 7.20001 16.54C10.33 18 13.72 18 16.81 16.54C16.94 16.65 17.07 16.75 17.21 16.85C16.7 17.16 16.15 17.42 15.59 17.64C15.89 18.23 16.23 18.8 16.62 19.33C18.19 18.84 19.79 18.1 21.43 16.87C21.82 12.7 20.76 9.08997 18.61 5.88997H18.59ZM8.84001 14.67C7.90001 14.67 7.13001 13.8 7.13001 12.73C7.13001 11.66 7.88001 10.79 8.84001 10.79C9.80001 10.79 10.56 11.66 10.55 12.73C10.55 13.79 9.80001 14.67 8.84001 14.67ZM15.15 14.67C14.21 14.67 13.44 13.8 13.44 12.73C13.44 11.66 14.19 10.79 15.15 10.79C16.11 10.79 16.87 11.66 16.86 12.73C16.86 13.79 16.11 14.67 15.15 14.67Z" />
                            </svg><span>SoloNerves#4666</span></a>
                    </p>
                    <p>
                        <a href="mailto:kimlukasmyrvold06@gmail.com"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                            </svg><span>kimlukasmyrvold06@gmail.com</span></a>
                    </p>
                </div>
                <div class="grid-item" id="location" aria-label="Location section">
                    <p id="locationText" class="header">Beliggenhet</p>
                    <div id="map" style="padding: 0 .5em 1em;">
                        <p style="font-size: 2rem; font-weight: 500; color: var(--text-inverse);">Fredrikstad, Årum.</p>
                        <p id="map-consent-text">Google maps may collect user data, in order to view map you need to consent.</p>
                        <button id="map-consent-button">Accept</button>
                    </div>
                </div>
            </div>
            <div class="copyright"><p><svg aria-label="Copyright" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.08 10.86C10.13 10.53 10.24 10.24 10.38 10C10.68 9.44 11.19 9.15 11.88 9.14C12.33 9.14 12.74 9.34 13.03 9.63C13.31 9.94 13.5 10.37 13.5 10.8H15.3C15.28 10.33 15.19 9.9 15 9.5C14.85 9.12 14.62 8.78 14.32 8.5C12.87 7.16 10.18 7.35 8.95 8.87C7.66 10.54 7.63 13.46 8.94 15.13C10.15 16.62 12.8 16.83 14.24 15.5C14.55 15.25 14.8 14.94 15 14.58C15.16 14.22 15.27 13.84 15.28 13.43H13.5C13.5 13.64 13.43 13.83 13.34 14C13.25 14.19 13.13 14.34 13 14.47C12.67 14.73 12.28 14.87 11.86 14.87C11.5 14.86 11.2 14.79 10.97 14.64C10.72 14.5 10.5 14.27 10.38 14C9.88 13.1 9.96 11.85 10.08 10.86M12 2C6.5 2 2 6.5 2 12C2.53 25.27 21.5 25.26 22 12C22 6.5 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12C4.44 1.39 19.56 1.39 20 12C20 16.41 16.41 20 12 20Z" /></svg>2023 Copyright: Kim Lukas Myrvold</p></div>
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
    // fetch(`${pathname}assets/json/language.json`)
    fetch(`${pathname}assets/json/language.json`)
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
                const element = document.querySelector(`#${key}`);
                element ? element.innerHTML = value : null;
            });
        } catch (e) {
            console.error(`Page is not defined in language.json. ${e}`);
        };

        // Changing language for navbar and footer
        try {
            Object.entries(languageJSON[lang].NavbarFooter).forEach(([key, value]) => {
                const element = document.querySelector(`#${key}`);
                element ? element.innerHTML = value : null;
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