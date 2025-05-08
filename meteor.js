document.addEventListener('DOMContentLoaded', function() {
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