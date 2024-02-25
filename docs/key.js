// key.js by qxxst

function getRandomCharacter() {
    const characters = 'ABCDEF0123456789';
    return characters[Math.floor(Math.random() * characters.length)];
}

function getUniqueCharacter() {
    const character17Elligible = ["8", "B", "A", "9"];
    return character17Elligible[Math.floor(Math.random() * character17Elligible.length)];
}

function checkLength(key) {
    const sampleKey = "9737A60D-986B-4009-B759-D97743072D7D"; // A real key that has already expired.
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
    } else {
        throw new Error("Invalid key length.");
    }
}

function playSound(id) {
    const audio = document.getElementById(id);
    audio.play();
}

function generateKey() {
    let outputField = document.getElementById("output");
    const weFeelLikeIt = Math.floor(Math.random() * 2) == 1;
    const errorText = "Unable to generate key. Please try again later.";
    const generatingText = "Generating...";
    
    outputField.innerHTML = generatingText;

    let returnText = "";
    if (weFeelLikeIt) {
        returnText = key();
    } else {
        returnText = errorText;
    }

    setTimeout(() => {
        setTimeout(() => {
            outputField.innerHTML = returnText;
            playSound("sbox");
        }, (Math.random() * 2) * 1000);
    }, 1000);
}

