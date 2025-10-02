window.HELP_IMPROVE_VIDEOJS = false;

// Scenario switching function
function showScenario(scenarioId) {
    // Hide all scenario contents
    const allScenarios = document.querySelectorAll('.scenario-content');
    allScenarios.forEach(scenario => {
        scenario.classList.remove('active');
    });
    
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.scenario-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected scenario
    const selectedScenario = document.getElementById('scenario-' + scenarioId);
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
})
