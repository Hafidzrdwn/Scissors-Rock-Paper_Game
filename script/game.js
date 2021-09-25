const game = () => {
    let pScore=0;
    let cScore=0;
    let maxTrophies=0,maxScores=0,roundOfGame=1;
    const winner = document.querySelector('.winner');
    const compFace = document.querySelector('img.compFace');
    const errorSound = document.getElementById('errorSound');
    const btnSound = document.getElementById('btnSound');
    const getTrophy = document.getElementById('getTrophy');
    const playerChamps = document.getElementById('playerChamps');
    const playerLose = document.getElementById('playerLose');
    const backSong = document.getElementById('backSong');
  
    
    const roundAlert = () =>{
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: `Round ${roundOfGame}`,
            customClass:{
                title:"swal2Toast",
                popup:"swal2Popup",
            }
          })
    }

    // start to game
    const startGame = () =>{
        const btnInfo = document.getElementById('info');
        const playBtn = document.getElementById('start');
        const introScreen = document.querySelector('.opening');
        const customGame = document.querySelector('.user-form');
        const match = document.querySelector('.container');
        const header = document.querySelector('.score');
        const game = document.querySelector('.container > .game');
        const actions = document.querySelector('.actions');
        const btnGroup = document.querySelector('.supBtn');
        const form = document.querySelector('.user-form form'); 

        const startCustomMatch = () =>{
            introScreen.setAttribute("id","fadeOut");
            toCustomGame()
        }

        const toIntro = () =>{
            form.reset()
            introScreen.setAttribute("id","fadeIn");
            customGame.setAttribute("id","fadeOut");
            match.setAttribute("id", "fadeOut");
        }
        window.fadeOutMatch = toIntro;

        const enterMatch = () =>{
                customGame.setAttribute("id","zoomOut");
                match.setAttribute("id", "slide");
                header.setAttribute("id","in");
                game.setAttribute("id","fadeIn");
                actions.setAttribute("id","fadeIn");
                btnGroup.setAttribute("id","fadeIn");
        }

        const toCustomGame = () => {
            match.setAttribute("id", "fadeOut");
            customGame.setAttribute("id","zoomIn");
            header.setAttribute("id"," ");
            game.setAttribute("id"," ");
            actions.setAttribute("id"," ");
            btnGroup.setAttribute("id"," ");
        }
        
        //Open and Close Info Panel
        const infoPanel = document.querySelector(".info-panel");
        btnInfo.addEventListener("click", ()=>{
            infoPanel.classList.toggle('down');
        });
        const closeInfo = document.querySelector(".info-panel > .close");
        closeInfo.addEventListener("click", () => {
            infoPanel.classList.toggle('down');
        });

        // Start Button event
        playBtn.addEventListener('click', () =>{
            backSong.play();
            btnSound.play()
            // add start button animation
            startCustomMatch()
        });

        // btn back from customGame to IntroScreen
        const btnBackToIntro = document.querySelector('.formBtn .formBack');
        // Give event to back button in customGame to IntroScreen
        btnBackToIntro.addEventListener("click", function (e) {
            backSong.pause();
            btnSound.play()
            e.preventDefault()
           toIntro() 
        });
        // btn next from customGame to MatchGame
        const btnNextToMatch = document.querySelector('.formBtn .formNext');
        // Give event to next button in customGame to MatchGame
        btnNextToMatch.addEventListener("click",function(e) {
            e.preventDefault();
            const radioMaxTrophies = document.querySelector('input[name="max-trophies"]:checked');
            const radioMaxScores = document.querySelector('input[name="max-score"]:checked');
            const userName = document.getElementById('userName');
            const userNameValue = userName.value;
            const pName = document.getElementById('pName');
            if(userNameValue != "" && userNameValue.length < 15){
                if(radioMaxTrophies != null && radioMaxScores != null ){
                    backSong.pause()
                    btnSound.play()
                    maxTrophies = radioMaxTrophies.value;
                    maxScores =  radioMaxScores.value;
                    pName.textContent = userNameValue;
                    enterMatch()
                    roundOfGame=1;
                    roundAlert()
                }
                else{
                    errorSound.play()
                    swal.fire({
                        icon:"error",
                        text:"Please choose the maximal trophies of the game and the maximal scores of the game",
                        customClass:{
                            htmlContainer:"swal2Text",
                            popup:"swal2Popup",
                        }
                    });
                }
            }
            else if(userNameValue.length > 15 || userNameValue.length === 15){
                errorSound.play()
                swal.fire({
                    icon:"info",
                    title:"Your name must consist of a maximum of 15 letters",
                    customClass:{
                        title:"swal2Title",
                        popup:"swal2Popup",
                    }
                });
            }
            else if(userNameValue == ""){
                errorSound.play()
                swal.fire({
                    icon:"warning",
                    title:"Enter your name please",
                    customClass:{
                        title:"swal2Title",
                        popup:"swal2Popup",
                    }
                });
            }
        });

        // btn back from match to customGame
        const btnBack = document.querySelector("button.back");
        // Give event to back button in match to customGame
        btnBack.addEventListener("click", function () {
            backSong.play()
            btnSound.play()
            roundOfGame=1;
            form.reset();
            resetTheGame()
            deleteTheTrophy()
            // add back button animation
           toCustomGame()
        });
    };

    //Play Match
    const playMatch = () => {
        const options = document.querySelectorAll('.actions button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.comp-hand');
        const hands = document.querySelectorAll('.game img');
        const overlay = document.querySelector('.overlay');
        const alert = document.querySelector('.alert');
        const resultAlertTrophy = document.querySelector('.alert > .trophy');
        const alertHeading = document.querySelector('.alert > h1');
        const closeOverlay = document.querySelector('.alert > .close');
        const btnReset = document.querySelector('button.reset');
        const loading = document.querySelector('.game .loading');
        
        

        hands.forEach(hand =>{
            hand.addEventListener('animationend', function end() {
                playerHand.style.animation = '';
                computerHand.style.animation = '';
            });
        });

        const pTrophy = document.querySelector('.player-trophy');
        const cTrophy = document.querySelector('.comp-trophy');
        const addTrophy = (player,comp) =>{
        // Add trophy

        const trophyImg = document.createElement("img");

        if(player == maxScores){
            trophyImg.src ="images/player.png";
            pTrophy.appendChild(trophyImg);
            pTrophy.style.backgroundColor = "#222629";
        }
        else if(comp == maxScores){
            trophyImg.src ="images/comp.png";
            cTrophy.appendChild(trophyImg);
            cTrophy.style.backgroundColor = "#222629";
        }
        };

        const deleteTrophy = () =>{
            while (pTrophy.hasChildNodes()) {
                pTrophy.style.backgroundColor = "#374785";
                pTrophy.removeChild(pTrophy.firstChild);
            }
            while (cTrophy.hasChildNodes()) {
                cTrophy.style.backgroundColor = "#374785";
                cTrophy.removeChild(cTrophy.firstChild);
            }
        }
        window.deleteTheTrophy = deleteTrophy;



        // Comp Options
        const compOptions = ['Scissors','Rock','Paper','Paper','Rock','Scissors'];
    
        options.forEach(option => {
            option.addEventListener("click",function() {
                // Computer Choice
                const compNumber = Math.floor(Math.random()*5);
                const compChoice = compOptions[compNumber];
                if(pScore < maxScores && cScore < maxScores){
                    const animate = setTimeout(() => {
                        // Call comparison
                        comparison(this.textContent, compChoice);
                        //Update Images
                        playerHand.src = `images/${this.textContent}.png`;
                        computerHand.src = `images/${compChoice}.png`;
                        // Delete the loading animation
                        loading.style.display = "none";
                        winner.style.color = "black";
                        }, 1000);
                        //Images animation
                playerHand.style.animation = "shakePlayer 1s ease" ;
                computerHand.style.animation = "shakeComputer 1s ease" ;
                // Loading animation
                loading.style.display = "flex";
                // Delete the comparison text
                winner.style.color = "#374785";
                        return
                }
                else if(pScore == maxScores || cScore == maxScores){
                    if(pScore == maxScores){
                        // Call add trophy function
                        addTrophy(pScore,cScore);
                        // Show overlay alert (player win)
                        if(pTrophy.childElementCount == maxTrophies){
                            backSong.pause();
                            playerChamps.play()
                            resultAlertTrophy.src = "images/pChamp.png";
                            resultAlertTrophy.style.width = "250px";
                            alertHeading.textContent = "You are the Champion !!";
                            resultAlert();
                            deleteTrophy();
                            fadeOutMatch();
                        }
                        else{
                            getTrophy.play()
                            resultAlertTrophy.src = "images/resultTrophy.png";
                            resultAlertTrophy.style.width = "150px";
                            alertHeading.textContent = "You get +1 trophy";
                            resultAlert();
                        }
                    }
                    else if(cScore == maxScores){
                        // Call add trophy function
                        addTrophy(pScore,cScore);
                        // Show overlay alert (comp win)
                        if(cTrophy.childElementCount == maxTrophies){
                            backSong.pause();
                            playerLose.play()
                            compFace.style.animation = " compFace 0.6s ease forwards";
                            setTimeout(() => {
                                compFace.style.animation = "closeCompFace 0.6s ease";
                            }, 3500);
                            resultAlertTrophy.src = "images/compChamp.png";
                            resultAlertTrophy.style.width = "250px";
                            alertHeading.textContent = "Computer are the Champion !!";
                            resultAlert();
                            deleteTrophy();
                            fadeOutMatch();
                        }
                        else{
                            getTrophy.play()
                            resultAlertTrophy.src = "images/resultTrophy.png";
                            resultAlertTrophy.style.width = "150px";
                            alertHeading.textContent = "Computer get +1 trophy";
                            resultAlert();
                        }
                    }
                    resetGame()
                }

            });
        }); 
        // Reset Game
        const resetGame = () =>{
                    pScore = 0;
                    cScore = 0;
                    updateScore();
                    winner.textContent = "Choose your option.."
                    playerHand.src = "images/Rock.png";
                    computerHand.src = "images/Rock.png";
        }
        window.resetTheGame = resetGame;

        // Reset Button
        btnReset.addEventListener("click", function () {
            btnSound.play()
            roundOfGame=1;
            roundAlert();
            resetGame()
            deleteTrophy();
        });

        // Display result overlay
        const resultAlert = () =>{
            overlay.style.opacity = "1";
            overlay.style.pointerEvents = "all";
            overlay.style,transition = "0.5s ease";
            alert.style.transform = "translateY(0)";
            alert.style.transition = "0.3s ease 0.2s";
            return
        }

        // Close the result overlay
        closeOverlay.addEventListener("click", function () {
            if(pTrophy.childElementCount != 0 || cTrophy.childElementCount != 0){
               roundOfGame++;
                setTimeout(() => {
                    roundAlert();
                }, 500);
            }
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
            overlay.style.transition = "0.5s ease .2s";
            alert.style.transform = "translateY(500px)";
            alert.style.transition = "0.3s ease ";
            return
        });
    };


        //to Update Score
        const updateScore = () =>{
            const playerScore = document.querySelector('.player_score');
            const compScore = document.querySelector('.computer_score');
            playerScore.textContent = pScore;
            compScore.textContent = cScore;
        }


    //Compare Hands
    const comparison = (playerChoice,compChoice) => {
        const result = ['It is a tie','You Wins','Computer Wins'];
        // Check if tie
        if(playerChoice === compChoice){
            winner.textContent = result[0];
            return
        }
        //Check for rock
        if(playerChoice === 'Rock'){
          if(compChoice === 'Scissors'){
              winner.textContent = result[1];
              pScore++;
              updateScore();
          }
          else{
            winner.textContent = result[2];
            cScore++;
            updateScore();
          }
          return
        }

        //Check for paper
        if(playerChoice === 'Paper'){
            if(compChoice === 'Scissors'){
                winner.textContent = result[2];
                cScore++;
                updateScore();
            }
            else{
              winner.textContent = result[1];
              pScore++;
              updateScore();
            }
            return
          }

        //Check for scissors
        if(playerChoice === 'Scissors'){
            if(compChoice === 'Rock'){
                winner.textContent = result[2];
                cScore++;
                updateScore();
            }
            else{
              winner.textContent = result[1];
              pScore++;
              updateScore();
            }
            return
          }
        
    };

  

    startGame();
    playMatch();
};

// call the main function
game();


//inspired by Dev Ed
//exploration and modification by Me :)
