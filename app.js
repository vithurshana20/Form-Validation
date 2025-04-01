const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const togglePassword = document.getElementById('togglePassword');
const strengthBar = document.getElementById('strengthBar');
const successMessage = document.getElementById('successMessage');


const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;


form.addEventListener('submit', handleSubmit);
password.addEventListener('input', updateStrengthMeter);
togglePassword.addEventListener('click', togglePasswordVisibility);

function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}Error`);
    errorElement.textContent = message;
    errorElement.classList.add('show');
    input.style.borderColor = '#dc3545';
}

function clearError(input) {
    const errorElement = document.getElementById(`${input.id}Error`);
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    input.style.borderColor = '#ddd';
}

function validateForm() {
    let isValid = true;
    clearError(username);
    clearError(email);
    clearError(password);
    clearError(confirmPassword);

    if (!usernameRegex.test(username.value)) {
        showError(username, 'Username must be 3-15 characters (letters and numbers only)');
        isValid = false;
    }

    if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    if (!passwordRegex.test(password.value)) {
        showError(password, 'Password must be 8+ characters with uppercase, number, and special character');
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }

    return isValid;
}

function updateStrengthMeter() {
    const value = password.value;
    let strength = 0;

    if (value.length >= 8) strength += 20;
    if (/[A-Z]/.test(value)) strength += 40;
    if (/[0-9]/.test(value)) strength += 30;
    if (/[!@#$%^&*]/.test(value)) strength += 10;

    strengthBar.style.width = `${Math.min(strength, 100)}%`;
    if (strength < 50) {
        strengthBar.style.background = '#dc3545'; 
    } else if (strength < 80) {
        strengthBar.style.background = '#fd7e14'; 
    } else {
        strengthBar.style.background = '#28a745'; 
    }
}

function togglePasswordVisibility() {
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;
    togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
}

function handleSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        
        const userData = {
            username: username.value,
            email: email.value
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        alert("Registration Successfull!");

       
        successMessage.classList.add('show');
        
        
      
        setTimeout(() => {
            form.reset();
            strengthBar.style.width = '0%';
            successMessage.classList.remove('show');
        }, 2000);
    } else {
        const firstInvalid = form.querySelector('.error.show');
        if (firstInvalid) {
            firstInvalid.parentElement.querySelector('input').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
}