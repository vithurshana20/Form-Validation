const form = document.getElementById("registerForm");
        const username = document.getElementById("name");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const strengthBar = document.querySelector(".strength-bar");
        const togglePassword = document.querySelector(".toggle-password");

        function showError(input, message) {
            const small = input.nextElementSibling;
            small.textContent = message;
            small.style.display = "block";
        }

        function showSuccess(input) {
            input.nextElementSibling.style.display = "none";
        }

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function validatePasswordStrength(password) {
            let strength = 0;
            if (password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[!@#$%^&*]/)) strength++;
            if (password.length >= 8) strength++;
            return strength;
        }

        password.addEventListener("input", () => {
            const strength = validatePasswordStrength(password.value);
            strengthBar.className = "strength-bar";
            if (strength === 1) strengthBar.classList.add("weak");
            if (strength === 2) strengthBar.classList.add("medium");
            if (strength >= 3) strengthBar.classList.add("strong");
        });

        togglePassword.addEventListener("click", () => {
            if (password.type === "password") {
                password.type = "text";
                togglePassword.textContent = "Hide";
            } else {
                password.type = "password";
                togglePassword.textContent = "Show";
            }
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let valid = true;
            if (!/^[a-zA-Z0-9]{3,15}$/.test(username.value)) {
                showError(username, "Invalid username");
                valid = false;
            } else {
                showSuccess(username);
            }
            if (!validateEmail(email.value)) {
                showError(email, "Invalid email");
                valid = false;
            } else {
                showSuccess(email);
            }
            if (validatePasswordStrength(password.value) < 3) {
                showError(password, "Weak password");
                valid = false;
            } else {
                showSuccess(password);
            }
            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, "Passwords do not match");
                valid = false;
            } else {
                showSuccess(confirmPassword);
            }
            if (valid) {
                localStorage.setItem("username", username.value);
                localStorage.setItem("email", email.value);
                document.getElementById("successMessage").textContent = "Registration successful!";
                form.reset();
                strengthBar.className = "strength-bar";
            }
        });
