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
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("moodForm");
    const submitButton = document.getElementById("submitButton");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form from clearing and reloading
      // You can handle the form data here if needed, e.g., send it to a server.
    });
  
    // Enable the button dynamically (example logic for demonstration)
    const textarea = document.getElementById("textbox");
    const radios = document.querySelectorAll('input[name="mood"]');
  
    textarea.addEventListener("input", () => toggleButtonState());
    radios.forEach((radio) => {
      radio.addEventListener("change", () => toggleButtonState());
    });
  
    function toggleButtonState() {
      const isTextEntered = textarea.value.trim().length > 0;
      const isRadioSelected = Array.from(radios).some((radio) => radio.checked);
      submitButton.disabled = !(isTextEntered && isRadioSelected);
    }
  });
  

//   save status
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("moodForm");
    const saveStatus = document.getElementById("saveStatus");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form from reloading
      setSaveStatus("Saving...", "info"); // Show a temporary saving status
  
      try {
        // Simulate a save operation (replace this with actual save logic, e.g., fetch())
        const isSuccessful = await mockSaveOperation();
  
        if (isSuccessful) {
          setSaveStatus("Save successful.", "success");
        } else {
          setSaveStatus("Save unsuccessful.", "error");
        }
      } catch (error) {
        setSaveStatus("Save unsuccessful.", "error");
      }
  
      // Clear the status after 3 seconds
      setTimeout(() => {
        saveStatus.textContent = "";
        saveStatus.className = "save-status";
      }, 3000);
    });
  
    // Function to simulate saving (returns a random success or failure)
    function mockSaveOperation() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(Math.random() > 0.5); // Randomly resolve true or false
        }, 1000); // Simulate 1-second delay
      });
    }
  
    // Function to set save status
    function setSaveStatus(message, statusType) {
      saveStatus.textContent = message;
      saveStatus.className = `save-status ${statusType}`;
    }
  });
  
