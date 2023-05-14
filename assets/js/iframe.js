// **********************************************
// *             Iframe shenanigans             *
// **********************************************

// Run code when window is done loading
document.addEventListener('DOMContentLoaded', () => {
    // Getting all gameIframe's
    document.querySelectorAll('.gameIframe').forEach(iframe => {
        iframe.src = `https://kimlukasmyrvold.github.io/${iframe.id}/`;

        // Removing "loading..." when gameIframe has finished loading.
        iframe.onload = () => {
            document.querySelectorAll('.gameIframeContainer').forEach(e => e.style.background = 'none')
            document.querySelectorAll('.gameIframeContainer span').forEach(e => e.style.display = 'none')
        };

        // // // Calling dynamicIframe function on each iframe
        // // dynamicIframe(iframe)
    });
})

// // // Function for making iframes height responsive
// // function dynamicIframe(iframe) {
// //     // Wait for the iframe to finish loading its content
// //     iframe.addEventListener('load', function () {
// //         // Send a message to the iframe, requesting its content height
// //         iframe.contentWindow.postMessage('getHeight', '*');
// //         // Focusing on iframe on load
// //         iframe.contentWindow.focus();
// //     });

// //     var loadHeight = window.addEventListener('message', function (event) {
// //         if (event.source === iframe.contentWindow) {
// //             loadHeight = event.data;
// //         }
// //     }, { once: true });

// //     // Listen for the window resize event
// //     window.addEventListener('resize', function () {
// //         // Sett the height of the iframe to the starting value
// //         iframe.style.height = loadHeight + 'px';

// //         // Send a message to the iframe, requesting its content height
// //         iframe.contentWindow.postMessage('getHeight', '*');
// //     });

// //     // Listen for messages from the iframe
// //     window.addEventListener('message', function (event) {
// //         // Check that the message came from the iframe
// //         if (event.source === iframe.contentWindow) {
// //             // Set the height of the iframe to match the height of its content
// //             iframe.style.height = event.data + 'px';
// //         }
// //     });
// // }
