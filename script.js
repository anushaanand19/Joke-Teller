const speech = window.speechSynthesis;
const button = document.getElementById('button');
const apiUrl = "https://joke3.p.rapidapi.com/v1/joke"

//Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

function textToSpeech(joke) {
    const utterance = new SpeechSynthesisUtterance(joke.content);
    speech.speak(utterance); 
    utterance.onstart = () => toggleButton();
    utterance.onend = () => toggleButton();
}

async function getJokes() {
    const headers = await fetch("headers.json");
    let data = await headers.json();
    const getJoke = await fetch(apiUrl, {
        "method": "GET",
        "headers": data
    });
    const joke = await getJoke.json();
    textToSpeech(joke);   
    
}

button.addEventListener('click', getJokes);

