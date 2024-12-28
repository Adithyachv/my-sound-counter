let count = 0; // Keeps track of the number of times the sentence is spoken
const targetSentence = "hare krishna hare krishna krishna krishna hare hare hare rama hare rama rama rama hare hare";
const counterDisplay = document.getElementById("counter");
const alarm = document.getElementById("alarm");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

// Use the Web Speech API for speech recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US"; // Set language to English
recognition.continuous = true; // Keep listening until manually stopped

// Start listening when the Start button is clicked
startBtn.addEventListener("click", () => {
    recognition.start();
    console.log("Listening started...");
});

// Handle speech recognition results
recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim();
    console.log("Detected:", transcript);

    if (transcript.toLowerCase() === targetSentence.toLowerCase()) {
        count++; // Increment the counter
        counterDisplay.textContent = count; // Update the display

        if (count === 108) { // Check if the count has reached 108
            alarm.play(); // Play the alarm
            recognition.stop(); // Stop listening
            alert("108 counts reached!");
        }
    }
    // Restart listening after every recognition (to keep counting continuously)
    recognition.start();
};

// Reset the counter when the Reset button is clicked
resetBtn.addEventListener("click", () => {
    count = 0; // Reset the counter
    counterDisplay.textContent = count; // Update the display
    recognition.stop(); // Stop listening
    console.log("Counter reset.");
});
