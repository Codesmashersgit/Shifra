
document.addEventListener("DOMContentLoaded", () => {
    let btn = document.querySelector("button");
    let content = document.querySelector("#para");
    let main = document.querySelector("#voice");

    function speak(text) {
        let textSpeech = new SpeechSynthesisUtterance(text);
        textSpeech.rate = 1;
        textSpeech.pitch = 1;
        textSpeech.volume = 1;
        textSpeech.lang = "en-GB"; 
        window.speechSynthesis.speak(textSpeech);
        console.log("Speaking:", text);
    }

    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!speechRecognition) {
        console.error("Speech recognition is not supported in this browser.");
        alert("Speech recognition is not supported in this browser.");
        return; 
    }

    let recognition = new speechRecognition();
    recognition.lang = 'en-GB'; 

    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        console.log("Transcript received:", transcript);
        takeCommand(transcript);
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        speak("Sorry, I couldn't hear you. Could you please repeat?");
        btn.style.display = "block";
        main.style.display = "none";
    };

    btn.addEventListener("click", () => {
        console.log("Button clicked");
        recognition.start();
        btn.style.display = "none";
        main.style.display = "block";
    });

    function takeCommand(message) {
        btn.style.display = "block";
        main.style.display = "none";
        recognition.stop();

        let lowerCaseMessage = message.toLowerCase(); 
        if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hey")) {
            speak("Hello Sir! What can I help you with today?");
        } else if (lowerCaseMessage.includes("who are you") || lowerCaseMessage.includes("what is your name") || lowerCaseMessage.includes("who invented you")) {
            speak("I am Shifra, a virtual assistant created by suuudhanshu.");
        } else if (lowerCaseMessage.includes("how are you")) {
            speak("I am fine, how about you?");
        } else if (lowerCaseMessage.includes("open youtube") || lowerCaseMessage.includes("opening youtube")) {
            speak("Opening YouTube");
            window.open("https://www.youtube.com/");
        } else if (lowerCaseMessage.includes("open facebook") || lowerCaseMessage.includes("opening facebook")) {
            speak("Opening Facebook");
            window.open("https://www.facebook.com/");
        } else if (lowerCaseMessage.includes("open google") || lowerCaseMessage.includes("opening google")) {
            speak("Opening Google");
            window.open("https://www.google.com/");
        } else if (lowerCaseMessage.includes("open instagram") || lowerCaseMessage.includes("opening instagram")) {
            speak("Opening Instagram");
            window.open("https://www.instagram.com/");
        } else if (lowerCaseMessage.includes("open whatsapp")) {
            speak("Opening WhatsApp");
            window.open("whatsapp://");
        } else if (lowerCaseMessage.includes("time")) {
            let time = new Date().toLocaleTimeString();
            speak(`${time}`);
        } else if (lowerCaseMessage.includes("date")) {
            let date = new Date().toLocaleDateString();
            speak(`${date}`);
        } else {
            speak(`Here's what I found on the internet regarding "${message}"`);
            window.open(`https://www.google.com/search?q=${message}`);
        }
    }
});
