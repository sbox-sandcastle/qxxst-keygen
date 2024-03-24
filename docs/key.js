"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let rateLimited = false;
let canBeRateLimited = false;
let songID = 1;
function getRandomCharacter() {
    const characters = 'ABCDEF0123456789';
    return characters[Math.floor(Math.random() * characters.length)];
}
function getUniqueCharacter() {
    const character17Elligible = ["8", "B", "A", "9"];
    return character17Elligible[Math.floor(Math.random() * character17Elligible.length)];
}
function checkLength(key) {
    const sampleKey = "9737A60D-986B-4009-B759-D97743072D7D";
    const expectedLength = sampleKey.length;
    return key.length == expectedLength;
}
function key() {
    let key = "";
    const dash = "-";
    for (let i = 0; i < 8; i++) {
        key += getRandomCharacter();
    }
    key += dash;
    for (let i = 0; i < 4; i++) {
        key += getRandomCharacter();
    }
    key += dash;
    key += "4"; // Character 13 is always 4.
    for (let i = 0; i < 3; i++) {
        key += getRandomCharacter();
    }
    key += dash;
    key += getUniqueCharacter();
    for (let i = 0; i < 3; i++) {
        key += getRandomCharacter();
    }
    key += dash;
    for (let i = 0; i < 12; i++) {
        key += getRandomCharacter();
    }
    if (checkLength(key)) {
        return key;
    }
    else {
        throw new Error("Invalid key length.");
    }
}
function getSong() {
    const apiURL = "https://co.wuk.sh/api/json";
    const songs = [
        /* "https://www.youtube.com/watch?v=HDIapOhV1FM", // The S&box Song
        "https://www.youtube.com/watch?v=JpvDz9ZElUY", // The S&box Song 2 (ft. Rick and Morty)
        "https://www.youtube.com/watch?v=MoypGwGuY04", // The S&box Song - at 3 AM
        "https://www.youtube.com/watch?v=TRNoQ_RYhko", // IT'S TIME FOR THE S&BOX NEWS! (Song) */
        "https://youtube.com/watch?v=Ih4w_JsZKfA", // S&Box Keygen AI Rap (Unlock The Game)
        "https://youtube.com/watch?v=gGKcwfkETbs" // S&Box Key Denier AI Rap (Unlock The Game 2)
    ];
    songID = Math.floor(Math.random() * songs.length);
    const songUrl = songs[songID];
    const postData = {
        url: songUrl,
        isAudioOnly: true
    };
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    };
    return fetch(apiURL, options)
        .then(response => response.json())
        .then(data => {
        const audio = new Audio(data.url);
        return audio;
    });
}
function playSound() {
    return __awaiter(this, void 0, void 0, function* () {
        const audio = yield getSong();
        audio.volume = 0.1;
        audio.play();
    });
}
function applyRateLimit() {
    const outputField = document.getElementById("output");
    const generateButton = document.getElementById("generateButton");
    const rateLimitText = "You are being rate limited.";
    rateLimited = true;
    outputField.innerHTML = rateLimitText;
    generateButton.disabled = true;
}
function generateKey() {
    const outputField = document.getElementById("output");
    const generateButton = document.getElementById("generateButton");
    if (!rateLimited) {
        if (!canBeRateLimited) {
            const weDontFeelLikeIt = Math.floor(Math.random() * 3) == 1;
            const errorText = "Unable to generate key. Please try again later.";
            const generatingText = "Generating...";
            outputField.innerHTML = generatingText;
            document.getElementsByTagName("button")[0].classList.add("qm-fade-in-out");
            let returnText = "";
            if (!weDontFeelLikeIt) {
                returnText = key();
            }
            else {
                returnText = errorText;
            }
            canBeRateLimited = true;
            setTimeout(() => {
                setTimeout(() => {
                    if (generateButton !== null) {
                        generateButton.classList.remove("qm-fade-in-out");
                    }
                    if (!rateLimited) {
                        outputField.innerHTML = returnText;
                        playSound();
                        // document.getElementsByTagName("body")[0].classList.add("qm-fade-in-out");
                        canBeRateLimited = false;
                    }
                }, (Math.random() * 2) * 1000);
            }, 1000);
        }
        else {
            applyRateLimit();
        }
    }
    else {
        applyRateLimit();
    }
}
