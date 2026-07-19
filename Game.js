    /*==================================================
        Personality Dice Game
        game.js
        Part 1
    ==================================================*/
    
    /*=========================================
        GAME STATE
    =========================================*/
    
    let gameStarted = false;
    let gameFinished = false;
    
    let currentRound = 1;
    const TOTAL_ROUNDS = 2;
    
    let moveNumber = 0;
    
    /*=========================================
        HISTORY
    =========================================*/
    
    const visitHistory = [];
    
    /*=========================================
        PERSONALITY TITLES
    =========================================*/
    
    const personalityTitles = {
    
    ENTJ: { title: "Commander", icon: "👑", description: "Bold, strategic leader." },
    ENFJ: { title: "Protagonist", icon: "🤝", description: "Charismatic and inspiring." },
    
    ISTJ: { title: "Inspector", icon: "🛡️", description: "Responsible and dependable." },
    ISFJ: { title: "Defender", icon: "🏠", description: "Loyal and caring." },
    
    ISFP: { title: "Adventurer", icon: "🎨", description: "Creative and flexible." },
    ISTP: { title: "Mechanic", icon: "🔧", description: "Practical problem solver." },
    
    ENFP: { title: "Campaigner", icon: "🌈", description: "Energetic and imaginative." },
    ENTP: { title: "Debater", icon: "💡", description: "Inventive and curious." },
    
    ESTJ: { title: "Executive", icon: "🏛️", description: "Organized and decisive." },
    ESFJ: { title: "Nurse", icon: "❤️", description: "Supportive and warm." },
    
    INTJ: { title: "Architect", icon: "♟️", description: "Independent strategist." },
    INFJ: { title: "Advocate", icon: "🕊️", description: "Insightful and idealistic." },
    
    INFP: { title: "Mediator", icon: "📖", description: "Compassionate and thoughtful." },
    INTP: { title: "Technocrat", icon: "🧠", description: "Logical and analytical." },
    
    ESFP: { title: "Entertainer", icon: "🎭", description: "Spontaneous and lively." },
    ESTP: { title: "Entrepreneur", icon: "🚀", description: "Bold and action-oriented." }
    
};
    /*=========================================
        PAGE ELEMENTS
    =========================================*/
    
    const startBtn = document.getElementById("startBtn");
    const rollBtn = document.getElementById("rollBtn");
    const newGameBtn = document.getElementById("newGameBtn");
    
    const roundDisplay = document.getElementById("roundDisplay");
    const currentCellDisplay = document.getElementById("currentCell");
    const currentPositionDisplay = document.getElementById("currentPosition");
    
    const personalityCode =
    document.getElementById("personalityCode");
    
    const personalityName =
    document.getElementById("personalityName");
    const statsBody = document.getElementById("statsBody");
    
    const historyBody =
    document.getElementById("historyBody");
    
    /*=========================================
        START GAME
    =========================================*/
    
    function startGame(){
    
        gameStarted = true;
        gameFinished = false;
    
        currentRound = 1;
    
        moveNumber = 0;
    
        visitHistory.length = 0;
    
        historyBody.innerHTML = "";
    
        resetBoard();
        resetPlayer();
        resetDice();
    
        roundDisplay.textContent = "1";
    
        currentCellDisplay.textContent = "ENTJ";
    
        currentPositionDisplay.textContent = "1";
    
        personalityCode.textContent = "----";
    
        personalityName.textContent = "Waiting...";
    
        disableStartButton();
        enableRollButton();
    
    }
    
    /*=========================================
        NEW GAME
    =========================================*/
    
    function newGame(){
    
        gameStarted = false;
        gameFinished = false;
    
        currentRound = 1;
    
        moveNumber = 0;
    
        visitHistory.length = 0;
    
        historyBody.innerHTML = "";
    
        resetBoard();
        resetPlayer();
        resetDice();
    
        roundDisplay.textContent = "1";
    
        currentCellDisplay.textContent = "ENTJ";
    
        currentPositionDisplay.textContent = "1";
    
        personalityCode.textContent = "----";
    
        personalityName.textContent = "Waiting...";
    
        enableStartButton();
        disableRollButton();
    
    }
    
    /*=========================================
        UPDATE STATUS
    =========================================*/
    
    function updateStatus(){
    
        const cell = currentCell();
    
        currentCellDisplay.textContent =
            cell.name;
    
        currentPositionDisplay.textContent =
            currentPosition() + 1;
    
        roundDisplay.textContent =
            currentRound;
    
    }
    
    /*=========================================
        BUTTON EVENTS
    =========================================*/
    
    startBtn.addEventListener("click", startGame);
    
    newGameBtn.addEventListener("click", newGame);
    
    /*
    Roll button logic will be added
    in Part 2.
    */
    
    /*=========================================
        INITIAL STATE
    =========================================*/
    
    window.addEventListener("load", function(){
    
        disableRollButton();
    
        newGame();
    
    });
    /*==================================================
        game.js
        PART 2
    ==================================================*/
    
    /*=========================================
        ROLL BUTTON
    =========================================*/
    
    rollBtn.addEventListener("click", function () {
    
        if (!gameStarted) return;
    
        if (gameFinished) return;
    
        if (playerMoving()) return;
    
        if (diceRolling()) return;
    
        disableRollButton();
    
        rollDice(function (diceValue) {
    
            movePlayer(diceValue, function (cell) {
    
                updateStatus();
    
                recordMove(diceValue, cell);
    
                checkRound();
    
            });
    
        });
    
    });
    
    
    /*=========================================
        RECORD MOVE
    =========================================*/
    
    function recordMove(diceValue, cell){
    
        moveNumber++;
    
        visitHistory.push(cell.name);
    
        const row = document.createElement("tr");
    
        row.innerHTML = `
    
            <td>${moveNumber}</td>
    
            <td>${currentRound}</td>
    
            <td>${diceValue}</td>
    
            <td>${cell.row + 1}</td>
    
            <td>${cell.col + 1}</td>
    
            <td><strong>${cell.name}</strong></td>
    
        `;
    
        historyBody.appendChild(row);
    
    }
    
    
    /*=========================================
        ROUND CHECK
    =========================================*/
    
    function checkRound(){
    
        /*
            Round 1 finishes as soon as
            the player reaches ANY square
            on the TOP row.
        */
    
        if(currentRound === 1 && onTopRow()){
    
            setTimeout(startSecondRound,800);
    
            return;
    
        }
    
        /*
            Round 2 finishes when
            the player reaches
            the end of the board.
        */
    
        if(currentRound === 2 && reachedEnd()){
    
            finishGame();
    
            return;
    
        }
    
        enableRollButton();
    
    }
    
    
    /*=========================================
        START ROUND 2
    =========================================*/
    
    function startSecondRound(){
    
        currentRound = 2;
    
        roundDisplay.textContent = "2";
    
        resetPlayer();
    
        updateStatus();
    
        enableRollButton();
    
    }
    
    
    /*=========================================
        FINISH GAME
    =========================================*/
    
    function finishGame(){
    
        gameFinished = true;
    
        disableRollButton();
    
        setTimeout(function(){
    
            buildStatistics();
    
        },500);
    
    }
    /*==================================================
        game.js
        PART 3
    ==================================================*/
    
    /*=========================================
        PERSONALITY CELL LOCATIONS
    =========================================*/
    
    const personalityCells = {
    
        ESTP:{row:2,col:0},
        ESFP:{row:2,col:1},
        INTP:{row:2,col:2},
        INFP:{row:2,col:3},
    
        ESTJ:{row:3,col:0},
        ESFJ:{row:3,col:1},
        INTJ:{row:3,col:2},
        INFJ:{row:3,col:3},
    
        ENTP:{row:4,col:0},
        ENFP:{row:4,col:1},
        ISTP:{row:4,col:2},
        ISFP:{row:4,col:3},
    
        ENTJ:{row:5,col:0},
        ENFJ:{row:5,col:1},
        ISTJ:{row:5,col:2},
        ISFJ:{row:5,col:3}
    
    };
    
    
    /*=========================================
        CALCULATE PERSONALITY
    =========================================*/
    
    function calculatePersonality(){
    
        let EI = {E:0,I:0};
        let SN = {S:0,N:0};
        let TF = {T:0,F:0};
        let JP = {J:0,P:0};
    
        visitHistory.forEach(function(name){
    
            for(const ch of name){
    
                switch(ch){
    
                    case "E":
                        EI.E++;
                        break;
    
                    case "I":
                        EI.I++;
                        break;
    
                    case "S":
                        SN.S++;
                        break;
    
                    case "N":
                        SN.N++;
                        break;
    
                    case "T":
                        TF.T++;
                        break;
    
                    case "F":
                        TF.F++;
                        break;
    
                    case "J":
                        JP.J++;
                        break;
    
                    case "P":
                        JP.P++;
                        break;
    
                }
    
            }
    
        });
    
        const code =
    
            (EI.E >= EI.I ? "E":"I") +
    
            (SN.S >= SN.N ? "S":"N") +
    
            (TF.T >= TF.F ? "T":"F") +
    
            (JP.J >= JP.P ? "J":"P");
    
        displayResult(code);
    
    }
    
    
    /*=========================================
        DISPLAY RESULT
    =========================================*/
    
    function displayResult(code){

    const p = personalityTitles[code];

    personalityCode.innerHTML =
        "Your Personality is<br><br><strong>" + code + "</strong>";

    personalityName.innerHTML =
        p.icon + " <strong>" + p.title + "</strong><br>" +
        "<small>" + p.description + "</small>";

    if(personalityCells[code]){

        highlightResult(

            personalityCells[code].row,

            personalityCells[code].col

        );

    }

}
    function calculatePersonality(){
    
        const counts={};
    
        Object.keys(personalityTitles).forEach(function(key){
    
            counts[key]=0;
    
        });
    
        visitHistory.forEach(function(cell){
    
            if(counts.hasOwnProperty(cell)){
    
                counts[cell]++;
    
            }
    
        });
    
        let winner="ENTJ";
    
        let highest=-1;
    
        for(const code in counts){
    
            if(counts[code]>highest){
    
                highest=counts[code];
    
                winner=code;
    
            }
    
        }
    
        displayResult(winner);
    
    }
    function buildStatistics() {
    
    statsBody.innerHTML = "";
    
    const counts = {};
    
    Object.keys(personalityTitles).forEach(function(code) {
        
        counts[code] = 0;
        
    });
    
    visitHistory.forEach(function(cell) {
        
        if (counts.hasOwnProperty(cell)) {
            
            counts[cell]++;
            
        }
        
    });
    
    /* Total personality visits */
    
    let totalVisits = 0;
    
    for (const code in counts) {
        
        totalVisits += counts[code];
        
    }
    
    /* Find winner */
    
    let winner = "ENTJ";
    
    let highest = -1;
    
    for (const code in counts) {
        
        if (counts[code] > highest) {
            
            highest = counts[code];
            
            winner = code;
            
        }
        
    }
    
    /* Build table */
    
    Object.keys(personalityTitles).forEach(function(code) {
        
        const row = document.createElement("tr");
        
        if (code === winner) {
            
            row.classList.add("winner");
            
        }
        
        const percentage =
            totalVisits === 0 ?
            0 :
            ((counts[code] / totalVisits) * 100);
        
        row.innerHTML = `

<td>${personalityTitles[code].icon}</td>

<td>${code}</td>

<td>${personalityTitles[code].title}</td>

<td>${personalityTitles[code].description}</td>

<td>${counts[code]}</td>

<td>${percentage.toFixed(1)}%</td>

`;

        
        statsBody.appendChild(row);
        
    });
    
    displayResult(winner);
    
}
    
    /*=========================================
        OPTIONAL RESET
    =========================================*/
    
    function clearResult(){
    
        personalityCode.textContent = "----";
    
        personalityName.textContent = "Waiting...";
    
    }
    
    
    /*=========================================
        END
    ==================================================*/
