const speech = window.speechSynthesis;
const button = document.getElementById('button');
const apiUrl = "https://joke3.p.rapidapi.com/v1/joke"

function textToSpeech(joke) {
    let utterance = new SpeechSynthesisUtterance(joke.content);
    console.log(utterance);
    speech.speak(utterance); 
    utterance.onstart = () => {
        button.disabled = true;
        console.log('speech started', button.disabled, utterance.onstart);
    }
    utterance.onend = () => {
        button.disabled = false;
        console.log('speech ended', button.disabled)
    }
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

