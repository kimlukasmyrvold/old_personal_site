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
    if (links.length < 3) return;

    // Loop through all links except the first 3 links
    for (let i = 3; i < links.length; i++) {
        links[i].style.display = 'none';
    }

    // Create span element and appending it the links parent
    const span = document.createElement('span');
    span.id = 'show-more';
    span.textContent = 'Show more...';
    links[0].parentNode.append(span);

    // Making links visible when 'show more' text is clicked
    item.querySelectorAll('#show-more').forEach(el => {
        el.addEventListener('click', () => {
            // Removing itself
            el.remove();

            links.forEach(link => link.style.display = 'flex');
        });
    });
});




// ******************************************
// *        Hobbies > Gaming section        *
// ******************************************
(function () {
    let game = document.querySelectorAll('.gaming-item')
    game.forEach(item => {
        let isFullImage = false;

        const imageContainer = item.querySelector('.image-container');
        const focusedImage = imageContainer.querySelector('.focused-image img');
        const carouselImages = imageContainer.querySelectorAll('.image-carousel .image');

        carouselImages.forEach(img => {
            img.addEventListener('click', () => {
                carouselImages.forEach(e => e.classList.remove('focus'));
                img.classList.add('focus');
                setFocused();
            });
        });

        function setFocused() {
            const focusedCarouselImage = imageContainer.querySelector('.image-carousel .image.focus');
            focusedImage.setAttribute('src', `assets/images/${item.id}/${(focusedImage.classList.contains('full')) ? "large" : "medium"}/${focusedCarouselImage.dataset.image}.jpg`);

            // // Scroll to focused image
            // const scrollPosition = focusedCarouselImage.offsetLeft - focusedCarouselImage.parentElement.offsetLeft;
            // focusedCarouselImage.parentElement.scrollLeft = scrollPosition;
        }
        setFocused();

        function fullImage(e) {
            if (focusedImage.classList.contains('full') && e.target === focusedImage) nextImage();
            const focusedCarouselImage = imageContainer.querySelector('.image-carousel .image.focus');
            focusedImage.setAttribute('src', `assets/images/${item.id}/${(e.target === focusedImage) ? "large" : "medium"}/${focusedCarouselImage.dataset.image}.jpg`);
            focusedImage.classList[(e.target === focusedImage) ? "add" : "remove"]('full');
            isFullImage = (focusedImage.classList.contains('full')) ? true : false;
        }

        function nextImage() {
            let index = 0;
            for (let i = 0; i < carouselImages.length; i++) {
                if (carouselImages[i].classList.contains('focus')) {
                    index = i === (carouselImages.length - 1) ? 0 : i + 1;
                    carouselImages[i].classList.remove('focus');
                }
            }
            carouselImages[index].classList.add('focus');
            setFocused()
        }

        function previousImage() {
            let index = 0;
            for (let i = carouselImages.length - 1; i >= 0; i--) {
                if (carouselImages[i].classList.contains('focus')) {
                    index = (i === 0) ? carouselImages.length - 1 : i - 1;
                    carouselImages[i].classList.remove('focus');
                }
            }
            carouselImages[index].classList.add('focus');
            setFocused()
        }

        setInterval(() => {
            if (isFullImage) return;
            nextImage()
        }, 10_000);

        document.addEventListener('click', fullImage);
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape" || event.key === "Esc") fullImage(event);
            if (event.key === "ArrowRight" && isFullImage) nextImage();
            if (event.key === "ArrowLeft" && isFullImage) previousImage();
        })
    })
})();