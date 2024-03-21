if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("worker.js").then(registration => {
        console.log("Service Worker registered.");
        console.log(registration);
    }).catch(error => {
        console.log("Service Worker registration failed.");
        console.log(error);
    })
}
else {
    console.log("Your browser does not support service workers.");
}
