let rateLimited: boolean = false;
let canBeRateLimited: boolean = false;

let currentSong: string | null = null;
let currentAuthor: string| null = null;

function getRandomCharacter() {
    const characters: string = 'ABCDEF0123456789';
    return characters[Math.floor(Math.random() * characters.length)];
}

function getUniqueCharacter() {
    const character17Elligible: string[] = ["8", "B", "A", "9"];
    return character17Elligible[Math.floor(Math.random() * character17Elligible.length)];
}

function checkLength(key: string) {
    const sampleKey: string = "9737A60D-986B-4009-B759-D97743072D7D";
    const expectedLength: number = sampleKey.length;
    return key.length == expectedLength;
}

function key(): string {
    let key: string = "";

    const dash: string = "-";

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

function getSong() {
    const rappers: { [key: string]: string } = {
        qxxst: "50 Qxxst",
        skadz: "Skadz the Rapper",
    }

    const apiURL: string = "https://co.wuk.sh/api/json";

    /* "https://www.youtube.com/watch?v=HDIapOhV1FM", // The S&box Song
    "https://www.youtube.com/watch?v=JpvDz9ZElUY", // The S&box Song 2 (ft. Rick and Morty)
    "https://www.youtube.com/watch?v=MoypGwGuY04", // The S&box Song - at 3 AM
    "https://www.youtube.com/watch?v=TRNoQ_RYhko", // IT'S TIME FOR THE S&BOX NEWS! (Song) */

    const songs: { [key: number]: { title: string, author: string, url: string } } = {
        4: {
            title: "Unlock The Game",
            author: rappers.skadz,
            url: "https://youtube.com/watch?v=Ih4w_JsZKfA",
        },
        5: {
            title: "Unlock The Game 2",
            author: rappers.skadz,
            url: "https://youtube.com/watch?v=gGKcwfkETbs",
        },
        6: {
            title: "Sandbox Millionaire",
            author: rappers.qxxst,
            url: "https://streamable.com/0y951d",
        },
        7: {
            title: "s&box cypher",
            author: rappers.skadz,
            url: "https://www.youtube.com/watch?v=l9nzt1KFcDw",
        },
        8: {
            title: "s&box cypher (Alternative Version)",
            author: rappers.skadz,
            url: "https://www.youtube.com/watch?v=7blBy3NdoNo",
        },
        9: {
            title: "Key Master",
            author: rappers.skadz,
            url: "https://www.youtube.com/watch?v=RYyBz6E5B4o",
        },
        10: {
            title: "Need That Key",
            author: rappers.skadz,
            url: "https://www.youtube.com/watch?v=q_p-V9stR-E",
        },
    };

    const currentPool: number[] = [4, 5, 6, 7, 8, 9, 10];
    let randomIndex = Math.floor(Math.random() * currentPool.length);
    let songID = currentPool[randomIndex];
    currentSong = songs[songID].title;
    currentAuthor = songs[songID].author;
    let songUrl = songs[songID].url as string;

    let postData = {
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

async function playSound() {
    const audio: any = await getSong();
    audio.volume = 0.1;
    audio.play();
}

function applyRateLimit() {
    const outputField = document.getElementById("output") as HTMLElement;
    const generateButton = document.getElementById("generateButton") as HTMLButtonElement;

    const rateLimitText: string = "You are being rate limited.";

    rateLimited = true;
    outputField.innerHTML = rateLimitText;
    generateButton.disabled = true;
}

function generateKey() {
    const outputField = document.getElementById("output") as HTMLElement;
    const generateButton = document.getElementById("generateButton") as HTMLButtonElement;
    const funnyText = document.getElementById("funny-text") as HTMLElement;

    if (!rateLimited) {
        if (!canBeRateLimited) {
            const generatingText: string = "Generating...";
            
            outputField.innerHTML = generatingText;
            document.getElementsByTagName("button")[0].classList.add("qm-fade-in-out");

            let returnText: string = "";
            returnText = key();

            canBeRateLimited = true;
            setTimeout(() => {
                setTimeout(() => {
                    if (generateButton !== null) {
                        generateButton.classList.remove("qm-fade-in-out");
                    }
                    if (!rateLimited) {
                        outputField.innerHTML = returnText;
                        playSound();
                        canBeRateLimited = false;
                        funnyText.style.display = "block";
                        funnyText.innerHTML = `Now playing: ${currentSong} by ${currentAuthor}`;
                    }
                }, (Math.random() * 2) * 1000);
            }, 1000);
        } else {
            applyRateLimit();
        }
    } else {
        applyRateLimit();
    }
}