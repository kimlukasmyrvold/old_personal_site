"use strict";

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
    if (links.length <= 3) return;

    // Loop through all links except the first 3 links
    for (let i = 3; i < links.length; i++) {
        links[i].style.display = 'none';
    }

    // Create span element and appending it the links parent
    const span = document.createElement('span');
    span.tabIndex = 0;
    span.id = 'show-more';
    span.textContent = 'Show more...';
    links[0].parentNode.append(span);

    // Making links visible when 'show more' text is clicked
    item.querySelectorAll('#show-more').forEach(el => {
        el.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            a();
        });
        el.addEventListener('click', a);
        function a() {
            el.remove();
            links.forEach(link => link.style.display = 'flex');
        }
    });
});




// ******************************************
// *        Hobbies > Gaming section        *
// ******************************************

// Loop through all .gaming-item elements
document.querySelectorAll('.gaming-item').forEach(item => {
    let isFullImage = false;

    const imageContainer = item.querySelector('.image-container');
    const previewImageContainer = imageContainer.querySelector('.preview-image-container');
    const previewImage = previewImageContainer.querySelector('img');
    const carouselImages = imageContainer.querySelectorAll('.image-carousel .image');

    // Check if Escape key was pressed
    function escapeKey() {
        if (!isFullImage) return;
        window.addEventListener('keydown', (e) => { if (e.key === "Escape" || e.key === "Esc") closeFullImage(); }, { once: true });
    }

    // Check for click outside of preview image
    function clickOutside(e) {
        if (e.target === previewImage) return;
        closeFullImage();
    }

    // Set the preview image
    function setPreview() {
        const focusedCarouselImage = imageContainer.querySelector('.image-carousel .image.focus');
        previewImage.setAttribute('src', `/assets/images/${item.id}/${(isFullImage) ? "large" : "medium"}/${focusedCarouselImage.dataset.image}.jpg`);
    }

    // Check for click on each of the carousel images
    carouselImages.forEach(img => {
        img.addEventListener('keydown', (e) => { if (e.key !== 'Enter') return; a(); })
        img.addEventListener('click', a);
        function a() {
            carouselImages.forEach(e => e.classList.remove('focus'));
            img.classList.add('focus');
            setPreview();
        }
    });

    // Go to next image
    function nextImage() {
        let index = 0;
        for (let i = 0; i < carouselImages.length; i++) {
            if (carouselImages[i].classList.contains('focus')) {
                index = i === (carouselImages.length - 1) ? 0 : i + 1;
                carouselImages[i].classList.remove('focus');
            }
        }
        carouselImages[index].classList.add('focus');
        setPreview();
        escapeKey();
    }

    // Go to the previous image
    function previousImage() {
        let index = 0;
        for (let i = carouselImages.length - 1; i >= 0; i--) {
            if (carouselImages[i].classList.contains('focus')) {
                index = (i === 0) ? carouselImages.length - 1 : i - 1;
                carouselImages[i].classList.remove('focus');
            }
        }
        carouselImages[index].classList.add('focus');
        setPreview();
        escapeKey();
    }

    // Open a larger preview image
    function openFullImage() {
        const focusedCarouselImage = imageContainer.querySelector('.image-carousel .image.focus');
        previewImage.setAttribute('src', `/assets/images/${item.id}/large/${focusedCarouselImage.dataset.image}.jpg`);
        previewImageContainer.classList.add('full');
        isFullImage = true;

        // Push empty history state to allow for clicking on the back button to close the full image
        history.pushState(null, null, "");

        // Close the modal when the back button is pressed
        window.addEventListener("popstate", () => {
            if (isFullImage) closeFullImage();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === "ArrowRight" && isFullImage) nextImage();
            if (e.key === "ArrowLeft" && isFullImage) previousImage();
        });
        document.addEventListener('click', clickOutside);
        escapeKey();
        disableScrolling();
    }

    // Closes the larger preview image
    function closeFullImage() {
        const focusedCarouselImage = imageContainer.querySelector('.image-carousel .image.focus');
        previewImage.setAttribute('src', `/assets/images/${item.id}/medium/${focusedCarouselImage.dataset.image}.jpg`);
        previewImageContainer.classList.remove('full');
        isFullImage = false;
        document.removeEventListener('click', clickOutside);
        enableScrolling();
    }

    // Check for different events on the preview image
    previewImage.addEventListener('keydown', (e) => { if (e.key !== "Enter") return; action(); });
    previewImage.addEventListener('click', action);
    function action() {
        if (!isFullImage) openFullImage();
        else if (isFullImage) nextImage();
    }

    // Rotate between all the carousel images
    setInterval(() => {
        if (isFullImage) return;
        nextImage()
    }, 10_000);
});