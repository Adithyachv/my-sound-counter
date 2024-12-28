let count = 0; // Keeps track of the number of times the sentence is spoken
const targetSentence = "hello"; // Use "hello" for testing
const counterDisplay = document.getElementById("counter");
const alarm = document.getElementById("alarm");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

// Initialize the Speech Recognition API
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US"; // Set language to English
recognition.continuous = true; // Keep listening until manually stopped
recognition.interimResults = false; // Get only final results to prevent processing too often

// Flag to avoid multiple recognition triggers
let isProcessing = false;

// Log when speech recognition starts
recognition.onstart = () => {
    console.log("Speech recognition started...");
};

// Log any errors
recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    alert("Error: " + event.error);
};

// Log the result of speech recognition
recognition.onresult = (event) => {
    // Only process the final result (after the user finishes speaking)
    const transcript = event.results[event.results.length - 1][0].transcript.trim();
    console.log("Detected:", transcript);

    // Check if the transcript matches the target sentence
    if (transcript.toLowerCase() === targetSentence.toLowerCase() && !isProcessing) {
        isProcessing = true; // Set the flag to avoid re-processing while counting
        count++; // Increment the counter
        counterDisplay.textContent = count; // Update the display

        // If the count reaches 108, stop listening and play alarm
        if (count === 108) {
            alarm.play(); // Play the alarm
            recognition.stop(); // Stop listening
            alert("108 counts reached!");
        }

        // Reset the flag after a short delay (1 second)
        setTimeout(() => {
            isProcessing = false;
        }, 1000); // Set a small delay to allow processing without repeated counts
    }
};

// Start listening when the Start button is clicked
startBtn.addEventListener("click", () => {
    recognition.start();
    console.log("Listening started...");
});

// Reset the counter and stop listening when the Reset button is clicked
resetBtn.addEventListener("click", () => {
    count = 0; // Reset the counter
    counterDisplay.textContent = count; // Update the display
    recognition.stop(); // Stop listening
    console.log("Counter reset and listening stopped.");
});
