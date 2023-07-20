
window.onload = function() {
    // Get elements
    const flightStatus = document.getElementById("flightStatus");
    const takeoffButton = document.getElementById("takeoff");
    const landingButton = document.getElementById("landing");
    const missionAbortButton = document.getElementById("missionAbort");
    const upButton = document.getElementById("up");
    const downButton = document.getElementById("down");
    const rightButton = document.getElementById("right");
    const leftButton = document.getElementById("left");
    const spaceShuttleHeight = document.getElementById("spaceShuttleHeight");
    const shuttleBackground = document.getElementById("shuttleBackground");
    const rocketImage = document.getElementById("rocket");

    // Shuttle position variables
    let shuttlePositionX = 0; // Initial position at leftmost
    let shuttlePositionY = 0; // Initial position at topmost

    // Function to update shuttle position
    function updateShuttlePosition() {
        shuttleBackground.style.left = shuttlePositionX + "px";
        shuttleBackground.style.top = shuttlePositionY + "px";
    }

    // Attach event handler for "Take off" button
    takeoffButton.addEventListener('click', function() {
        const readyForTakeoff = confirm('Confirm that the shuttle is ready for takeoff.');
        if (readyForTakeoff) {
            flightStatus.innerHTML = 'Shuttle in flight.';
            shuttleBackground.style.backgroundColor = 'blue';
            spaceShuttleHeight.innerHTML = parseInt(spaceShuttleHeight.innerHTML) + 10000;
        }
    });

    // Attach event handler for "Land" button
    landingButton.addEventListener('click', function() {
        alert('The shuttle is landing. Landing gear engaged.');
        flightStatus.innerHTML = 'The shuttle has landed.';
        shuttleBackground.style.backgroundColor = 'green';
        spaceShuttleHeight.innerHTML = '0';
        shuttlePositionX = 0; // Reset the shuttle position to the leftmost
        shuttlePositionY = 0; // Reset the shuttle position to the topmost
        updateShuttlePosition();
        resetRocketPosition();
    });

    // Attach event handler for "Abort Mission" button
    missionAbortButton.addEventListener('click', function() {
        const abortConfirmed = confirm('Confirm that you want to abort the mission.');
        if (abortConfirmed) {
            flightStatus.innerHTML = 'Mission aborted.';
            shuttleBackground.style.backgroundColor = 'green';
            spaceShuttleHeight.innerHTML = '0';
            shuttlePositionX = 0; // Reset the shuttle position to the leftmost
            shuttlePositionY = 0; // Reset the shuttle position to the topmost
            updateShuttlePosition();
            resetRocketPosition();
        }
    });

    // Attach event handler for "Up" button
    upButton.addEventListener('click', function() {
        const currentHeight = parseInt(spaceShuttleHeight.innerHTML);
        spaceShuttleHeight.innerHTML = currentHeight + 10000;
        moveRocket(0, -10); // Move the rocket 10 pixels up
    });

    // Attach event handler for "Down" button
    downButton.addEventListener('click', function() {
        const currentHeight = parseInt(spaceShuttleHeight.innerHTML);
        if (currentHeight >= 10000) {
            spaceShuttleHeight.innerHTML = currentHeight - 10000;
            moveRocket(0, 10); // Move the rocket 10 pixels down
        }
    });

    // Attach event handler for "Right" button
    rightButton.addEventListener('click', function() {
        moveRocket(10, 0); // Move the rocket 10 pixels to the right
    });

    // Attach event handler for "Left" button
    leftButton.addEventListener('click', function() {
        moveRocket(-10, 0); // Move the rocket 10 pixels to the left
    });

    // Function to move the rocket image
    function moveRocket(directionX, directionY) {
        const rocketWidth = rocketImage.clientWidth;
        const rocketHeight = rocketImage.clientHeight;
        const currentX = shuttlePositionX + parseInt(rocketImage.style.left) || 0;
        const currentY = shuttlePositionY + parseInt(rocketImage.style.top) || 0;

        const newX = currentX + directionX;
        const newY = currentY + directionY;

        // Check boundaries to prevent the rocket from flying off the background
        if (newX >= 0 && newX + rocketWidth <= shuttleBackground.clientWidth) {
            rocketImage.style.left = (newX - shuttlePositionX) + "px";
        }

        if (newY >= 0 && newY + rocketHeight <= shuttleBackground.clientHeight) {
            rocketImage.style.top = (newY - shuttlePositionY) + "px";
        }
    }

    // Function to reset the rocket position to its original position
    function resetRocketPosition() {
        rocketImage.style.left = "0px";
        rocketImage.style.top = "0px";
    }

    // Initialize the shuttle position on load
    updateShuttlePosition();
};
