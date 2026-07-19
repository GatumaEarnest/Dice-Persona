/*==================================================
    Personality Dice Game
    player.js
==================================================*/

/*
Snake Order

ENTJ → ENFJ → ISTJ → ISFJ
                         ↓
ISFP ← ISTP ← ENFP ← ENTP
                         ↓
ESTJ → ESFJ → INTJ → INFJ
                         ↓
INFP ← INTP ← ESFP ← ESTP
                         ↓
ET → EF → IT → IF
                         ↓
NP ← NJ ← SJ ← SP
*/

const snakePath = [
    {row:5,col:0,name:"ENTJ"},
    {row:5,col:1,name:"ENFJ"},
    {row:5,col:2,name:"ISTJ"},
    {row:5,col:3,name:"ISFJ"},

    {row:4,col:3,name:"ISFP"},
    {row:4,col:2,name:"ISTP"},
    {row:4,col:1,name:"ENFP"},
    {row:4,col:0,name:"ENTP"},

    {row:3,col:0,name:"ESTJ"},
    {row:3,col:1,name:"ESFJ"},
    {row:3,col:2,name:"INTJ"},
    {row:3,col:3,name:"INFJ"},

    {row:2,col:3,name:"INFP"},
    {row:2,col:2,name:"INTP"},
    {row:2,col:1,name:"ESFP"},
    {row:2,col:0,name:"ESTP"},

    {row:1,col:0,name:"ET"},
    {row:1,col:1,name:"EF"},
    {row:1,col:2,name:"IT"},
    {row:1,col:3,name:"IF"},

    {row:0,col:3,name:"NP"},
    {row:0,col:2,name:"NJ"},
    {row:0,col:1,name:"SJ"},
    {row:0,col:0,name:"SP"}
];

let playerPosition = 0;
let moving = false;


/*=========================================
    RESET PLAYER
=========================================*/

function resetPlayer(){

    playerPosition = 0;

    moveBall(
        snakePath[0].row,
        snakePath[0].col
    );

}


/*=========================================
    CURRENT CELL
=========================================*/

function currentCell(){

    return snakePath[playerPosition];

}


/*=========================================
    PLAYER POSITION
=========================================*/

function currentPosition(){

    return playerPosition;

}


/*=========================================
    PLAYER MOVING?
=========================================*/

function playerMoving(){

    return moving;

}


/*=========================================
    MOVE PLAYER
=========================================*/

function movePlayer(steps, finishedCallback){

    if(moving) return;

    moving = true;

    let target = playerPosition + steps;

    if(target >= snakePath.length){

        target = snakePath.length - 1;

    }

    animateMove(target, finishedCallback);

}


/*=========================================
    ANIMATION
=========================================*/

function animateMove(target, finishedCallback){

    const timer = setInterval(function(){

        if(playerPosition >= target){

            clearInterval(timer);

            moving = false;

            if(typeof finishedCallback === "function"){

                finishedCallback(currentCell());

            }

            return;

        }

        playerPosition++;

        moveBall(
            snakePath[playerPosition].row,
            snakePath[playerPosition].col
        );

    },220);

}


/*=========================================
    FINISHED BOARD?
=========================================*/

function reachedEnd(){

    return playerPosition >= snakePath.length-1;

}


/*=========================================
    SIXTH ROW?
=========================================*/

function onTopRow(){

    return currentCell().row === 0;

}
