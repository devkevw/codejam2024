document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("date").innerHTML = getFormattedDate();
  const form = document.getElementById("moodForm");
  const submitButton = document.getElementById("submitButton");
  const saveStatus = document.getElementById("saveStatus");
  const textarea = document.getElementById("textbox");
  const radios = document.querySelectorAll('input[name="mood"]');

  // Enable button dynamically
  textarea.addEventListener("input", () => toggleButtonState());
  radios.forEach((radio) => {
    radio.addEventListener("change", () => toggleButtonState());
  });

  function toggleButtonState() {
    const isTextEntered = textarea.value.trim().length > 0;
    const isRadioSelected = Array.from(radios).some((radio) => radio.checked);
    submitButton.disabled = !(isTextEntered && isRadioSelected);
  }

  // Handle form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form reload
    setSaveStatus("Saving...", "info");

    // Ensure that the "Saving..." message stays for at least 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    const messageValue = textarea.value.trim();
    const ratingValue = document.querySelector('input[name="mood"]:checked').value;

    try {
      const response = await fetchWithTimeout('http://localhost:8000/journalentry/daily', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageValue,
          rating: ratingValue,
        }),
      }, 5000); // 5-second timeout

      if (response.ok) {
        const responseData = await response.json();
        setSaveStatus("Save successful.", "success");
        console.log("Response received:", responseData);
      } else {
        setSaveStatus("Save unsuccessful. Try again later.", "error");
        console.error("Failed to send request:", response);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        setSaveStatus("Save unsuccessful. Try again later.", "error");
      } else {
        setSaveStatus("Save unsuccessful. Try again later.", "error");
      }
      console.error("Error occurred or timeout exceeded:", error);
    }

    // Clear the status after 3 seconds
    setTimeout(() => {
      saveStatus.textContent = "";
      saveStatus.className = "save-status";
    }, 3000);
  });

  // Function to set save status
  function setSaveStatus(message, statusType) {
    saveStatus.textContent = message;
    saveStatus.className = `save-status ${statusType}`;
  }

  // Utility function to add a timeout to fetch
  function fetchWithTimeout(resource, options, timeout = 5000) {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchPromise = fetch(resource, { ...options, signal });

    // Set a timeout to abort the fetch
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    return fetchPromise.finally(() => clearTimeout(timeoutId));
  }

  // Retrieves date and returns it, formatted as string
  function getFormattedDate() {
    const today = new Date();

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return today.toLocaleDateString('en-US', options);
  }
});