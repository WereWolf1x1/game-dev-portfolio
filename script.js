// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    let menuIcon = document.querySelector('#menu-icon');
    let navBar = document.querySelector('.navbar');
    
    // Check if elements exist
    if (menuIcon && navBar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navBar.classList.toggle('active');
        };
        
        // Close menu when clicking on a link
        navBar.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                menuIcon.classList.remove('bx-x');
                navBar.classList.remove('active');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuIcon.contains(e.target) && !navBar.contains(e.target)) {
                menuIcon.classList.remove('bx-x');
                navBar.classList.remove('active');
            }
        });
    } else {
        console.log('Menu elements not found');
    }
});