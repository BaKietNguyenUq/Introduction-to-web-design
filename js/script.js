const contactForm = document.getElementById("contact-form");
const fullName = document.getElementById("full-name");
const emailAddr = document.getElementById("email");
const messageBox = document.getElementById("message-box");

// Displays a validation error message for a given input element by updating the corresponding error container.
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error-msg");
  errorDisplay.innerText = message;
};

// Clear the error messgae inside error container.
const clearError = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error-msg");
  errorDisplay.innerText = "";
};

// Shows a temporary success message then clears it after 3 seconds.
const setSuccess = () => {
  const inputControl = fullName.parentElement;
  const display = inputControl.querySelector(".error-msg");
  display.innerText = "Form submitted successfully!";
  display.style.color = "green";
  setTimeout(() => {
    display.style.color = "red";
    display.innerText = "";
  }, 3000);
};

// Validates if the provided email string follows email format.
const is_valid_email = (email) => {
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return emailPattern.test(email);
};

// Handles contact form submission: prevents default behavior, validates inputs,
// displays error messages if needed, and shows a success message if all fields are valid.
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullNameVal = fullName.value.trim();
  const emailAddrVal = emailAddr.value.trim();
  const messageVal = messageBox.value.trim();

  let valid = true;

  if (fullNameVal === "") {
    setError(fullName, "Name is required");
    valid = false;
  } else {
    clearError(fullName);
  }

  if (emailAddrVal === "") {
    setError(emailAddr, "Email is required");
    valid = false;
  } else if (!is_valid_email(emailAddrVal)) {
    setError(emailAddr, "Enter a valid email");
    valid = false;
  } else {
    clearError(emailAddr);
  }

  if (messageVal === "") {
    setError(messageBox, "Message is required");
    valid = false;
  } else {
    clearError(messageBox);
  }

  if (valid) {
    clearError(fullName);
    clearError(emailAddr);
    clearError(messageBox);
    contactForm.reset();
    setSuccess();
  }
});
