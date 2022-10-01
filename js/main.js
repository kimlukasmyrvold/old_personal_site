const btn = document.querySelector(".btn-toggle");

const currentTheme = localStorage.getItem("theme");

if (currentTheme == "dark") {
    document.body.classList.add("dark-theme");
    document.getElementById("theme_btn").src = "https://kimlukasmyrvold.github.io/cv/img/dark mode button.png";
}

btn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    let theme = "light";
    if (document.body.classList.contains("dark-theme")) {
        theme = "dark";
        document.getElementById("theme_btn").src = "https://kimlukasmyrvold.github.io/cv/img/dark mode button.png";
    }
    else {
        document.getElementById("theme_btn").src = "https://kimlukasmyrvold.github.io/cv/img/light mode button.png";
    }
    localStorage.setItem("theme", theme);
});
