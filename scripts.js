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

    setInterval(createMeteor, 100);
});


