document.addEventListener('DOMContentLoaded', function() {
    // Change navbar color on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Thank you for your message!');
            contactForm.reset();
        });
    }

    // Comment form submission
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Your comment has been added!');
            commentForm.reset();
        });
    }

    // Blog post search
    const searchButton = document.querySelector('.search-bar button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = document.getElementById('search').value.toLowerCase();
            const posts = document.querySelectorAll('.post');
            posts.forEach(function(post) {
                const title = post.querySelector('h3').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Meteor shower effect
    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        meteor.style.left = `${Math.random() * 100}vw`;
        meteor.style.width = `${Math.random() * 3 + 1}px`;
        meteor.style.height = `${Math.random() * 100 + 50}px`;
        meteor.style.animationDuration = `${Math.random() * 3 + 2}s`;
        meteor.style.opacity = Math.random();
        document.querySelector('.meteor-shower').appendChild(meteor);

        setTimeout(() => {
            meteor.remove();
        }, 5000);
    }
    // scripts.js
  
    

    setInterval(createMeteor, 100);

    // Navigation bar auto-hide functionality
    let navTimeout;
    const header = document.querySelector('header');
    let isNavVisible = true;

    function hideNav() {
        if (isNavVisible) {
            header.style.transform = 'translateY(-100%)';
            isNavVisible = false;
        }
    }

    function showNav() {
        if (!isNavVisible) {
            header.style.transform = 'translateY(0)';
            isNavVisible = true;
        }
    }

    function resetNavTimeout() {
        clearTimeout(navTimeout);
        showNav();
        navTimeout = setTimeout(hideNav, 5000);
    }

    // Show nav when mouse is near the top of the page
    document.addEventListener('mousemove', (e) => {
        if (e.clientY <= 80) {
            showNav();
            clearTimeout(navTimeout);
        } else {
            resetNavTimeout();
        }
    });

    // Show nav when scrolling up
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop < lastScrollTop) {
            showNav();
            clearTimeout(navTimeout);
        }
        lastScrollTop = scrollTop;
    });

    // Initial setup
    resetNavTimeout();
});


