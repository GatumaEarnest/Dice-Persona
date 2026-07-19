/*====================================================
    Personality Dice Game
    dice.js
====================================================*/

let diceValue = 1;
let diceBusy = false;

const diceDisplay = document.getElementById("diceDisplay");

const faces = [
    "⚀",
    "⚁",
    "⚂",
    "⚃",
    "⚄",
    "⚅"
];

/*====================================================
    UPDATE DISPLAY
====================================================*/

function showDice(value){

    diceValue = value;

    if(diceDisplay){

        diceDisplay.textContent = faces[value - 1];

    }

}

/*====================================================
    CURRENT VALUE
====================================================*/

function getDiceValue(){

    return diceValue;

}

/*====================================================
    IS ROLLING?
====================================================*/

function diceRolling(){

    return diceBusy;

}

/*====================================================
    RESET
====================================================*/

function resetDice(){

    diceBusy = false;

    showDice(1);

}

/*====================================================
    ROLL
====================================================*/

function rollDice(callback){

    if(diceBusy) return;

    diceBusy = true;

    disableRollButton();

    let frame = 0;

    const animation = setInterval(function(){

        frame++;

        const value = Math.floor(Math.random() * 6) + 1;

        showDice(value);

        if(frame >= 15){

            clearInterval(animation);

            const finalRoll = Math.floor(Math.random() * 6) + 1;

            showDice(finalRoll);

            diceBusy = false;

            if(typeof callback === "function"){

                callback(finalRoll);

            }

        }

    },80);

}

/*====================================================
    BUTTONS
====================================================*/

function enableRollButton(){

    const button = document.getElementById("rollBtn");

    if(button){

        button.disabled = false;

    }

}

function disableRollButton(){

    const button = document.getElementById("rollBtn");

    if(button){

        button.disabled = true;

    }

}

/*====================================================
    START BUTTON
====================================================*/

function enableStartButton(){

    const button = document.getElementById("startBtn");

    if(button){

        button.disabled = false;

    }

}

function disableStartButton(){

    const button = document.getElementById("startBtn");

    if(button){

        button.disabled = true;

    }

}

/*====================================================
    INITIALIZE
====================================================*/

window.addEventListener("DOMContentLoaded", function(){

    showDice(1);

});
