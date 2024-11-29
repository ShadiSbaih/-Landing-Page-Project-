/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navigation = document.getElementById("navbar__list"); // Navigation bar list container
const sections = document.querySelectorAll("section"); // All section elements on the page

/**
 * Helper Functions
 */

/**
 * Helper function to calculate the offset of a section
 */
const offset = (section) => {
  return Math.floor(section.getBoundingClientRect().top);
};

/**
 * Helper function to remove the 'active' class from a section
 */
const removeActive = (section) => {
  section.classList.remove("your-active-class");
};

/**
 * Helper function to add the 'active' class to a section if a condition is met
 */
const addActive = (condition, section) => {
  if (condition) {
    section.classList.add("your-active-class");
  }
};

/**
 * Main Functions
 */

/**
 * Builds the navigation menu dynamically based on the sections
 */
const navBuilder = () => {
  let navUL = ""; // Initialize the HTML structure for the nav
  sections.forEach((section) => {
    const sectionID = section.id; // Section's ID
    const sectionDataNav = section.dataset.nav; // Section's data-nav attribute
    // Create a list item with a link for each section
    navUL += `<li><a class="menu__link" href="#${sectionID}">${sectionDataNav}</a></li>`;
  });
  navigation.innerHTML = navUL; // Append the built HTML to the navigation container
};

/**
 * Activates the section in the viewport by adding the 'active' class
 */
const sectionActivation = () => {
  sections.forEach((section) => {
    const elementOffset = offset(section);
    const inViewport = elementOffset < 150 && elementOffset >= -150;
    
    // Get the corresponding nav item
    const navItem = document.querySelector(`a[href="#${section.id}"]`);
    
    // Remove active classes
    removeActive(section);
    if (navItem) {
      navItem.classList.remove('active-nav');
    }
    
    // Add active classes if in viewport
    if (inViewport) {
      section.classList.add('your-active-class');
      if (navItem) {
        navItem.classList.add('active-nav');
      }
    }
  });
};

/**
 * Adds smooth scrolling behavior to navigation links
 */
const enableScrolling = () => {
  const links = document.querySelectorAll(".menu__link"); // Select all nav links
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent the default anchor behavior
      const targetId = link.getAttribute("href").substring(1); // Extract the target section ID
      const targetSection = document.getElementById(targetId); // Get the target section
      if (targetSection) {
        // Scroll to the target section with smooth behavior
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
};

/**
 * Event Listeners
 */

// Build the navigation menu on page load
navBuilder();

// Activate sections on scroll
window.addEventListener("scroll", sectionActivation);

// Enable smooth scrolling on nav link click
enableScrolling();

// Scroll to top functionality
const scrollToTopButton = document.getElementById('scroll-to-top');

// Show/hide button with smooth fade effect
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopButton.classList.add('show');
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.classList.remove('show');
        scrollToTopButton.style.display = 'none';
    }
};

// Scroll to top when button is clicked
scrollToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
