let bugged: boolean = false;
let songID: number = 1;

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

function realKey() {
    const sampleKeys: string[] = [
        "C9C97725-82EE-94F6-6F1D-CF72BBDA21E4",
        "520DE514-ED2E-1BBD-08B1-F459BA3B1E3E",
        "3DBE5467-E9CB-CC9F-1A46-2FC65BC5C50B",
        "7EFA664D-F23A-AF70-ACEE-00E314055398",
        "79A75C3B-645E-ADD0-0C3C-6C9257C48570",
        "617C8B5A-8BB9-0AEF-4C46-87D3544B1111",
        "52D1A71B-48AC-4F88-1E7C-5C7E28181834",
        "2FF4AFDE-0E5C-B7DE-BDA9-841C76BDEB2F",
        "354FFAE7-18C3-07D6-D987-0E61567FDA02",
        "23769D96-358D-291A-D579-01D32186984C",
        "6B9B706C-1422-4818-94E6-C36B8E64A539",
        "C06FDC5C-A5EB-4FA4-88D0-1D82BC09D65E",
        "480EB61B-CEFB-49F6-BFC5-68079929233A",
        "A5EC2713-F5B7-43FA-B8CC-41D321381D53",
        "DC05F1F6-8568-45EF-A094-00F7E614B668",
        "877B7F40-9182-4EF9-B0B7-04EF609B4479",
        "1482CF5B-758A-4BA9-9814-5E07588CF686",
        "3DC554BA-48EC-4399-8FA0-FB88EBC56D37",
        "37B20145-947E-42EA-8541-5475D9DCD1C7",
        "26D3A7DA-67B6-4EF2-99D5-00CB8EBF6D5E",
        "9EABDDBE-994B-4BD2-A92A-389BC00437DA",
        "D8906A38-A156-47AB-9EDB-CF56DFD4C6C4",
        "9295AD6D-3835-48F2-BC5A-90A4B2935283",
        "5C577A2B-4795-4E22-87E3-E30BB7F92F93",
        "6D03515F-23C3-4B2B-9EFB-D9D9C1648BA7",
        "9746D022-6A2F-48C9-BB39-DB92768627CC",
        "505CB7FC-9589-4E8D-9140-31B5B76394E9",
        "C03AEBA7-C24C-4CE6-8FB0-FF6102B15D67",
        "09D8C2A2-DF18-4B56-8C1C-DFC8E0277ED7",
        "83D7C56F-550C-44B4-A454-C6EB0D41DB74",
        "BD7F4E75-5FCC-4F8E-8624-D64AF9BBC18C",
        "BF565CEE-66BA-4710-A9DB-EA828ED9D312",
        "BCF70287-E27D-4709-89EA-7EEAD0C533B3",
        "1BF8212F-E3DC-460C-A29A-53CE1EA7F88A",
        "9737A60D-986B-4009-B759-D97743072D7D"
    ];
    return sampleKeys[Math.floor(Math.random() * sampleKeys.length)];
}

function key(method: number) {
    let key: string = "";

    if (method == 1) {
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
    }

    if (method == 2) {
        key = realKey();
    }

    if (checkLength(key)) {
        return key;
    } else {
        throw new Error("Invalid key length.");
    }
}

function getSong() {
    const apiURL: string = "https://co.wuk.sh/api/json";
    const songs: string[] = [
        "https://www.youtube.com/watch?v=HDIapOhV1FM", // The S&box Song
        "https://www.youtube.com/watch?v=JpvDz9ZElUY", // The S&box Song 2 (ft. Rick and Morty)
        "https://www.youtube.com/watch?v=MoypGwGuY04", // The S&box Song - at 3 AM
        "https://www.youtube.com/watch?v=TRNoQ_RYhko", // IT'S TIME FOR THE S&BOX NEWS! (Song)
        "https://www.youtube.com/watch?v=hUqvo7NJRCQ" // S&BOX (Sandbox Song) - Aryan Shaim (original by Mungus)
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

async function playSound() {
    const audio: any = await getSong();
    audio.play();
}

function generateKey(method: number) {
    const outputField = document.getElementById("output") as HTMLElement;
    const weFeelLikeIt: boolean = Math.floor(Math.random() * 2) == 1;
    const errorText: string = "Unable to generate key. Please try again later.";
    const generatingText: string = "Generating...";
    
    outputField.innerHTML = generatingText;
    document.getElementsByTagName("button")[0].classList.add("qm-fade-in-out");

    let returnText: string = "";
    if (weFeelLikeIt && bugged == false) {
        returnText = key(method);
    } else {
        returnText = errorText;
        bugged = true;
    }

    setTimeout(() => {
        setTimeout(() => {
            document.getElementsByTagName("button")[0].classList.remove("qm-fade-in-out");
            outputField.innerHTML = returnText;
            playSound();
            // document.getElementsByTagName("body")[0].classList.add("qm-fade-in-out");
        }, (Math.random() * 2) * 1000);
    }, 1000);
}