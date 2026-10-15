const messages = [
    "Preparing something special... 💕",
    "Gathering our memories... 🥰",
    "Almost ready, baby babs..."
];

let index = 0;

const messageInterval = setInterval(() => {
    document.querySelector("#loader h2").textContent = messages[index];
    index = (index + 1) % messages.length;
}, 1500);

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
        clearInterval(messageInterval);
         setTimeout(() => {
            document.body.classList.add("fade-out");
            window.location.href = "landingPage/landingPage.html"
        }, 1000);
        
    }, 6000);
   
       
});

