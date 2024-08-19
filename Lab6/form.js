document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const dobInput = document.getElementById('dob');
    const submitBtn = document.getElementById('submitBtn');
  
    // Validation functions
    function validateName() {
      const nameValue = nameInput.value.trim();
      const isValid = /^[A-Za-z\s]{3,}$/.test(nameValue);
      displayValidation(nameInput, isValid, 'nameError');
      return isValid;
    }
  
    function validateEmail() {
      const emailValue = emailInput.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
      displayValidation(emailInput, isValid, 'emailError');
      return isValid;
    }
  
    function validatePassword() {
      const passwordValue = passwordInput.value.trim();
      const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordValue);
      displayValidation(passwordInput, isValid, 'passwordError');
      validateConfirmPassword();
      return isValid;
    }
  
    function validateConfirmPassword() {
      const passwordValue = passwordInput.value.trim();
      const confirmPasswordValue = confirmPasswordInput.value.trim();
      const isValid = passwordValue === confirmPasswordValue;
      displayValidation(confirmPasswordInput, isValid, 'confirmPasswordError');
      return isValid;
    }
  
    function validateDob() {
      const dobValue = dobInput.value.trim();
      const dobDate = new Date(dobValue);
      const age = calculateAge(dobDate);
      const isValid = age >= 18;
      displayValidation(dobInput, isValid, 'dobError');
      return isValid;
    }
  
    function calculateAge(dob) {
      const diff = Date.now() - dob.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  
    function displayValidation(input, isValid, errorElementId) {
      const errorElement = document.getElementById(errorElementId);
      if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorElement.classList.add('hidden');
      } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorElement.classList.remove('hidden');
      }
    }
  
    // Event listeners for real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    dobInput.addEventListener('input', validateDob);
  
    // Final form validation on submit
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      const isConfirmPasswordValid = validateConfirmPassword();
      const isDobValid = validateDob();
  
      if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isDobValid) {
        // Form is valid, submit the form or display success message
        alert('Registration Successful');
        form.submit(); // Uncomment this line to submit the form
      } else {
        alert('Please fix the errors before submitting the form.');
      }
    });
  });
  