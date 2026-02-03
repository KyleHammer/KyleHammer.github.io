/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
// Scripts

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// EmailJS Integration
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("M7i2D9Axec5u6MMD2");

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // EmailJS template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
        };

        // Send email
        emailjs.send('service_portfolio', 'template_kxnkma5', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById('responseMessage').innerHTML = '<div class="text-success">Your message was sent successfully. Thank you for reaching out!</div>';
                // Clear form
                document.getElementById('contactForm').reset();
            }, function(error) {
                console.log('FAILED...', error);
                
                // Check if it's the Gmail authentication error
                if (error.status === 412 && error.text.includes('Gmail')) {
                    // Send error notification to yourself using backup service
                    emailjs.send('BACKUP_SERVICE_ID', 'BACKUP_TEMPLATE_ID', {
                        error_type: 'Gmail Authentication Failed',
                        error_status: error.status,
                        error_message: error.text,
                        timestamp: new Date().toLocaleString(),
                        page_url: window.location.href
                    }).then(function() {
                        console.log('Error notification sent successfully');
                    }).catch(function(notificationError) {
                        console.log('Failed to send error notification:', notificationError);
                    });
                }
                
                document.getElementById('responseMessage').innerHTML = '<div class="text-danger">There was an error sending your message. Please try again later.</div>';
            });
    });
});