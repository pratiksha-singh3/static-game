// Define instructions for 1v1 and multiplayer
const instructions1v1 = [
    "-Create an Account: For an enhanced gaming experience and to access exclusive features, consider creating a PlayNDraw Games account.",
    "-Participants: Decide who will be part of your Scribble Game. Share the game link to your friends you want to join the game.",
    "-Game Setup:",
    "1) Choose the type of DrawNPlay Game you had like:",
    "2) Pictionary: Draw and guess based on prompts.",
    "3) Story your art: Collaboratively create a story through drawings and captions.",
    "4) Guess the drawing: Participants guess the meaning behind each others drawings.",
    "-Drawing Tools: Familiarize yourself with the drawing tools available. These may include various brushes, colors, and an eraser. Get creative!",
    "-Interaction: Use the chat or comment features to communicate with other participants. Share thoughts about drawings, make guesses, or simply chat while playing.",
    "-Enjoy the Experience: Most importantly, have fun! Whether you're playing with friends, family, or colleagues, your personalized Scribble Game is designed for enjoyment and creativity.",
];

const instructionsMultiplayer = [
    "-Create an Account: For an enhanced gaming experience and to access exclusive features, consider creating a PlayNDraw Games account.",
    "-Participants: Join a random party and showcase your art and guesing skills.",
    "-Game Setup:",
    "1) Choose the type of DrawNPlay Game you had like:",
    "2) Pictionary: Draw and guess based on prompts.",
    "3) Story your art: Collaboratively create a story through drawings and captions.",
    "4) Guess the drawing: Participants guess the meaning behind each others drawings.",
    "-Drawing Tools: Familiarize yourself with the drawing tools available. These may include various brushes, colors, and an eraser. Get creative!",
    "-Interaction: Use the chat or comment features to communicate with other participants. Share thoughts about drawings, make guesses, or simply chat while playing.",
    "-Enjoy the Experience: Most importantly, have fun! Whether you're playing with friends, family, or colleagues, your personalized Scribble Game is designed for enjoyment and creativity.",
];

// Function to open modal with dynamic content
document.querySelectorAll('.learn-button').forEach((learnButton) => {
    learnButton.addEventListener('click', function (event) {
        const modal = document.getElementById('instructionsModal');
        const modalContent = document.getElementById('modal-content');
        const instructionsList = document.getElementById('instructionsList');

        if (event.target.id === 'learn1v1') {
            modalContent.querySelector('h2').textContent = "1vs1 Game Instructions";
            instructionsList.innerHTML = ""; // Clear previous instructions
            instructions1v1.forEach(instruction => {
                const li = document.createElement('li');
                li.textContent = instruction;
                instructionsList.appendChild(li);
            });
        } else if (event.target.id === 'learnMultiplayer') {
            modalContent.querySelector('h2').textContent = "Multiplayer Game Instructions";
            instructionsList.innerHTML = ""; // Clear previous instructions
            instructionsMultiplayer.forEach(instruction => {
                const li = document.createElement('li');
                li.textContent = instruction;
                instructionsList.appendChild(li);
            });
        }

        modal.style.display = "block";
    });
});

// Function to close modal
document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('instructionsModal').style.display = "none";
});
