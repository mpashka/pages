const root = document.documentElement;
const details = [...document.querySelectorAll("details")];
const allButton = document.querySelector("#toggle-all");
const themeButton = document.querySelector("#theme");
const fontButton = document.querySelector("#font-size");

let expanded = false;
let largeText = localStorage.getItem("largeText") === "true";
const savedTheme = localStorage.getItem("theme");

if (savedTheme) root.dataset.theme = savedTheme;
if (largeText) root.style.setProperty("--base-size", "19px");

allButton.addEventListener("click", () => {
  expanded = !expanded;
  details.forEach((item) => { item.open = expanded; });
  allButton.textContent = expanded ? "Свернуть всё" : "Раскрыть всё";
});

themeButton.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
});

fontButton.addEventListener("click", () => {
  largeText = !largeText;
  root.style.setProperty("--base-size", largeText ? "19px" : "17px");
  localStorage.setItem("largeText", String(largeText));
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copy);
    await navigator.clipboard.writeText(target.innerText);
    const oldText = button.textContent;
    button.textContent = "Скопировано";
    window.setTimeout(() => { button.textContent = oldText; }, 1600);
  });
});
