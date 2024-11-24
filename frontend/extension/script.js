document.getElementById('submitButton').addEventListener('click', async () => {
    const userIdValue = document.getElementById('userId').value;
    const messageValue = document.getElementById('textbox').value;
    const ratingValue = parseInt(document.getElementById('rating').value, 10);

    // Ensure all fields have valid input
    if (!userIdValue || !messageValue || isNaN(ratingValue)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Example POST request using Fetch API
    try {
        console.log('Sending request...');
        const response = await fetch('http://localhost:8000/journalentry/daily', { // Replace with your URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userIdValue,  // Match `JournalEntry` model field
                message: messageValue, // Match `JournalEntry` model field
                rating: ratingValue    // Match `JournalEntry` model field
            })
        });

        if (response.ok) {
            console.log("Response received: ", response);
            const responseData = await response.json();
            alert('Response received: ' + JSON.stringify(responseData));
        } else {
            console.error('Failed to send request:', response);
            alert('Failed to send request: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        alert('An error occurred while sending the request.');
    }
});


// to edit default message 
const textarea = document.getElementById('textbox');
const radioButtons = document.querySelectorAll('input[name="mood"]');
const submitButton = document.getElementById('submitButton');

function validateForm() {
  const isTextValid = textarea.value.trim().length > 0; // At least 1 character
  const isRadioSelected = Array.from(radioButtons).some(radio => radio.checked); // At least 1 radio selected

  // Enable the button if both conditions are met
  submitButton.disabled = !(isTextValid && isRadioSelected);
}

// Attach event listeners to dynamically validate
textarea.addEventListener('input', validateForm);
radioButtons.forEach(radio => radio.addEventListener('change', validateForm));

// Initial validation check on page load
validateForm();
