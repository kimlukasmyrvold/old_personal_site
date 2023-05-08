// Buttons for education page. Dropdowns for the schools.
// Function for Glemmen VGS
function glemmenBtn() {
    document.getElementById("glemmenDrop").classList.toggle("block");
    document.getElementById("glemmenBtn").classList.toggle("dropRightUp2");

    document.getElementById("borgeDrop").classList.remove("block");
    document.getElementById("borgeBtn").classList.remove("dropRightUp2");
    document.getElementById("aarumDrop").classList.remove("block");
    document.getElementById("aarumBtn").classList.remove("dropRightUp2");
}
// function for Borge Middle School
function borgeBtn() {
    document.getElementById("borgeDrop").classList.toggle("block");
    document.getElementById("borgeBtn").classList.toggle("dropRightUp2");

    document.getElementById("glemmenDrop").classList.remove("block");
    document.getElementById("glemmenBtn").classList.remove("dropRightUp2");
    document.getElementById("aarumDrop").classList.remove("block");
    document.getElementById("aarumBtn").classList.remove("dropRightUp2");
}
// Function for Årum lower school
function aarumBtn() {
    document.getElementById("aarumDrop").classList.toggle("block");
    document.getElementById("aarumBtn").classList.toggle("dropRightUp2");

    document.getElementById("glemmenDrop").classList.remove("block");
    document.getElementById("glemmenBtn").classList.remove("dropRightUp2");
    document.getElementById("borgeDrop").classList.remove("block");
    document.getElementById("borgeBtn").classList.remove("dropRightUp2");
}