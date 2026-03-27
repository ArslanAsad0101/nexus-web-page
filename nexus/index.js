document.addEventListener('DOMContentLoaded', function() {
    
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    const applyButtons = document.querySelectorAll('.apply-btn');
    
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('footer').scrollIntoView({ 
                behavior: 'smooth' 
            });
            
            navLinks.classList.remove('active');
        });
    });

    const emailModal = document.getElementById('emailModal');
    const closeModal = document.getElementById('closeModal');
    const emailForm = document.getElementById('emailForm');
    const modalMessage = document.getElementById('modalMessage');
    
    setTimeout(function() {
        const isSubscribed = localStorage.getItem('nexus_subscribed');
        
        if (!isSubscribed) {
            emailModal.style.display = 'flex';
        }
    }, 8000);

    closeModal.addEventListener('click', function() {
        emailModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === emailModal) {
            emailModal.style.display = 'none';
        }
    });

    emailForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const userEmailInput = document.getElementById('userEmail');
        const emailValue = userEmailInput.value.trim();
        
        if (validateEmail(emailValue)) {
            localStorage.setItem('nexus_subscribed', 'true');
            localStorage.setItem('nexus_user_email', emailValue);
            
            modalMessage.textContent = 'Thanks! We\'ll keep you updated.';
            modalMessage.className = 'modal-message success-msg';
            
            userEmailInput.value = '';
            
            setTimeout(function() {
                emailModal.style.display = 'none';
            }, 2000);
            
        } else {
            modalMessage.textContent = 'Please enter a valid email.';
            modalMessage.className = 'modal-message error-msg';
        }
    });

    function validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

});
