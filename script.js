/* =========================================
   script.js - adds interactivity to the page
   1. Time-based greeting
   2. Footer year
   3. Mobile menu toggle
   4. Dark mode toggle
   5. Project filter
   6. Contact form validation + character counter
   ========================================= */

/* ---------- 1. Greeting based on time of day ---------- */
const greeting = document.getElementById("greeting");
const hour = new Date().getHours();

if (hour < 12) {
  greeting.textContent = "Good morning! Thanks for stopping by.";
} else if (hour < 18) {
  greeting.textContent = "Good afternoon! Thanks for stopping by.";
} else {
  greeting.textContent = "Good evening! Thanks for stopping by.";
}

/* ---------- 2. Keep the footer year current ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- 3. Mobile menu toggle ---------- */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");
  // Tell screen readers whether the menu is open
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the menu after a link is clicked (mobile)
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- 4. Dark mode toggle ---------- */
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark");
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
});

/* ---------- 5. Project filter ---------- */
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const filter = button.dataset.filter; // "all", "web", or "python"

    // Highlight the clicked button
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    button.classList.add("active");

    // Show matching projects, hide the rest
    projects.forEach(function (project) {
      const match = filter === "all" || project.dataset.category === filter;
      project.classList.toggle("hidden", !match);
    });
  });
});

/* ---------- 6. Contact form validation ---------- */
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const charCount = document.getElementById("char-count");
const successMsg = document.getElementById("form-success");

// Live character counter for the message box
messageInput.addEventListener("input", function () {
  charCount.textContent = messageInput.value.length + " / 300 characters";
});

// Shows or clears an error message under a field
function setError(input, message) {
  const errorSpan = document.getElementById(input.id + "-error");
  errorSpan.textContent = message;
  input.classList.toggle("invalid", message !== "");
}

// Simple email pattern check: something@something.something
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading
  successMsg.textContent = "";
  let isValid = true;

  // Check name
  if (nameInput.value.trim() === "") {
    setError(nameInput, "Please enter your name.");
    isValid = false;
  } else {
    setError(nameInput, "");
  }

  // Check email
  if (!isValidEmail(emailInput.value.trim())) {
    setError(emailInput, "Please enter a valid email address.");
    isValid = false;
  } else {
    setError(emailInput, "");
  }

  // Check message length
  if (messageInput.value.trim().length < 10) {
    setError(messageInput, "Message must be at least 10 characters.");
    isValid = false;
  } else {
    setError(messageInput, "");
  }

  // If everything passes, show success and reset the form
  if (isValid) {
    successMsg.textContent = "Thanks, " + nameInput.value.trim() + "! Your message was sent.";
    form.reset();
    charCount.textContent = "0 / 300 characters";
  }
});
