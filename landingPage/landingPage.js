const form = document.getElementById('passcodeForm');
const input = document.getElementById('passcode');
const error = document.getElementById('passcodeError');
const card = document.querySelector('.passcode-card');

const CORRECT = '2025-10-16';      // placeholder: your real date, YYYY-MM-DD
const NEXT_PAGE = '../surprise/surprise.html'; // placeholder: where to go on success

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value === CORRECT) {
         Swal.fire({
            title: "Yehey!!",
            text: "Cute mo babs",
            imageUrl: "../assets/gif/happyCar.gif",
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: "Happy baby babs"
        });

        setTimeout(() => {
            document.body.classList.add("fade-out");
            window.location.href = NEXT_PAGE;
        }, 2000);

    } else {
        // error.textContent = 'Not quite, try again 😉';
        // card.classList.remove('shake');
        // void card.offsetWidth;     // restart the animation
        // card.classList.add('shake');

        Swal.fire({
            title: "Aray ko!!",
            text: "Aguy hindi naalala",
            imageUrl: "../assets/gif/cryingCar.gif",
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: "Crying car"
        });
    }
});