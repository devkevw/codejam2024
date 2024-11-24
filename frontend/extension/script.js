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
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      const messageValue = textarea.value.trim();
      const ratingValue = document.querySelector('input[name="mood"]:checked').value;
  
      try {
        // Get current year, month, and day as integers
        const { year, month, day } = getCurrentDateAsInt();
        const body = JSON.stringify({
          message: messageValue,
          rating: ratingValue,
          year: year,
          month: month,
          day: day,
        });
  
        console.log("Request Body:", body); // Log the request body
  
        const response = await fetchWithTimeout(
          "http://localhost:8000/journalentry/submit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Ensure proper Content-Type
            },
            body: body,
          },
          5000
        ); // 5-second timeout
  
        if (response.ok) {
          const responseData = await response.json();
          setSaveStatus("Save successful.", "success");
          console.log("Response received:", responseData);
        } else {
          setSaveStatus("Save unsuccessful. Try again later.", "error");
          console.error("Failed to send request:", response);
        }
      } catch (error) {
        setSaveStatus("Save unsuccessful. Try again later.", "error");
        console.error("Error occurred or timeout exceeded:", error);
      }
  
      // Clear the status after 3 seconds
      setTimeout(() => {
        saveStatus.textContent = "";
        saveStatus.className = "save-status";
      }, 3000);
    });
  
    // Fetch and populate the form with the current day's entry if it exists
    async function fetchJournalEntryForToday() {
        console.log("Running fectchJournalEntries.")
      try {
        const { year, month, day } = getCurrentDateAsInt();
  
        // Make the GET request for the current date
        const response = await fetch(
          `http://localhost:8000/journalentry?year=${year}&month=${month}&day=${day}`,
          { method: "GET" }
        );
  
        if (response.ok) {
          const entry = await response.json();
  
          // Populate the form fields if an entry exists
          if (entry && entry.message && entry.rating) {
            textarea.value = entry.message;
            radios.forEach((radio) => {
              if (radio.value === entry.rating) {
                radio.checked = true;
              }
            });
  
            toggleButtonState(); // Enable the button if everything is populated
            console.log("Entry found and form populated:", entry);
          }
        } else {
          console.log("No entry found for today.");
        }
      } catch (error) {
        console.error("Error while fetching today's entry:", error);
      }
    }
  
    // Utility function to set save status
    function setSaveStatus(message, statusType) {
      saveStatus.textContent = message;
      saveStatus.className = `save-status ${statusType}`;
    }
  
    // Utility function to add a timeout to fetch
    function fetchWithTimeout(resource, options, timeout = 5000) {
      const controller = new AbortController();
      const signal = controller.signal;
      const fetchPromise = fetch(resource, { ...options, signal });
  
      const timeoutId = setTimeout(() => controller.abort(), timeout);
  
      return fetchPromise.finally(() => clearTimeout(timeoutId));
    }
  
    // Retrieves date and returns it, formatted as string
    function getFormattedDate() {
      const today = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return today.toLocaleDateString("en-US", options);
    }
  
    function getCurrentDateAsInt() {
      const today = new Date();
      return {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
      };
    }
  
    // Fetch today's entry on page load
    fetchJournalEntryForToday();
  });
  