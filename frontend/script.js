document.getElementById('submitButton').addEventListener('click', async () => {
    const textValue = document.getElementById('textbox').value;

    // Ensure the text value is not empty
    if (!textValue) {
        alert('Please enter some text.');
        return;
    }

    // Example POST request using Fetch API
    try {
        const response = await fetch('https://localhost:8000//journalentry/daily', { // Replace with your URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: textValue }) // Send text value as JSON
        });

        if (response.ok) {
            const responseData = await response.json();
            alert('Response received: ' + JSON.stringify(responseData));
        } else {
            alert('Failed to send request: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        alert('An error occurred while sending the request.');
    }
});
