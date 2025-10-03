window.HELP_IMPROVE_VIDEOJS = false;

// Scenario switching function
function showScenario(scenarioId) {
    // Find the nav containing the clicked button
    const nav = event.target.closest('.scenario-nav');
    if (!nav) return;
    
    // Find the corresponding carousel container (next sibling of nav)
    const carousel = nav.nextElementSibling;
    if (!carousel || !carousel.classList.contains('scenario-carousel-container')) return;
    
    // Hide all scenario contents within this carousel
    const allScenarios = carousel.querySelectorAll('.scenario-content');
    allScenarios.forEach(scenario => {
        scenario.classList.remove('active');
    });
    
    // Remove active class from all buttons in this nav
    const allButtons = nav.querySelectorAll('.scenario-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected scenario
    const selectedScenario = carousel.querySelector('#scenario-' + scenarioId);
    if (selectedScenario) {
        selectedScenario.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

$(document).ready(function() {
    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 10000,
    }

    // Initialize all carousels (including those in hidden scenario sections)
    // Small delay to ensure DOM is fully ready
    setTimeout(function() {
        var carousels = bulmaCarousel.attach('.carousel', options);
        console.log('Initialized ' + carousels.length + ' carousels');
    }, 100);
    
    bulmaSlider.attach();
    
    // Lazy loading for videos
    const lazySources = document.querySelectorAll('source[data-src]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const source = video.querySelector('source');
                if (source && source.dataset.src) {
                    source.src = source.dataset.src;
                    video.load();
                    observer.unobserve(video);
                }
            }
        });
    });
    lazySources.forEach(source => {
        const video = source.parentElement;
        observer.observe(video);
    });
})
