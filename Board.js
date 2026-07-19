/*====================================================
    Personality Dice Game
    board.js
====================================================*/

const canvas = document.getElementById("boardCanvas");
const ctx = canvas.getContext("2d");

/*====================================================
    BOARD SETTINGS
====================================================*/

const COLS = 4;
const ROWS = 6;

const CELL_W = 70;
const CELL_H = 70;

const GRID_X = 160;
const GRID_Y = 180;

const GRID_W = COLS * CELL_W;
const GRID_H = ROWS * CELL_H;


/*====================================================
    CELL DATA
====================================================*/

const board = [

[
{text:"SP",color:"#cc0000"},
{text:"SJ",color:"#cc0000"},
{text:"NJ",color:"#0033cc"},
{text:"NP",color:"#0033cc"}
],

[
{text:"ET",color:"#cc0000"},
{text:"EF",color:"#cc0000"},
{text:"IT",color:"#0033cc"},
{text:"IF",color:"#0033cc"}
],

[
{text:"ESTP",color:"#cc3300"},
{text:"ESFP",color:"#cc33cc"},
{text:"INTP",color:"#cc00cc"},
{text:"INFP",color:"#6633ff"}
],

[
{text:"ESTJ",color:"#cc3300"},
{text:"ESFJ",color:"#cc3300"},
{text:"INTJ",color:"#009933"},
{text:"INFJ",color:"#3333cc"}
],

[
{text:"ENTP",color:"#cc3300"},
{text:"ENFP",color:"#33aa33"},
{text:"ISTP",color:"#cc3300"},
{text:"ISFP",color:"#3333cc"}
],

[
{text:"ENTJ",color:"#cc3300"},
{text:"ENFJ",color:"#cc6600"},
{text:"ISTJ",color:"#996600"},
{text:"ISFJ",color:"#3333cc"}
]

];


/*====================================================
    PLAYER
====================================================*/

let player = {

row:5,

col:0

};


/*====================================================
    FINAL PERSONALITY CELL
====================================================*/

let finalCell = null;


/*====================================================
    DRAW BOARD
====================================================*/

function drawBoard(){

ctx.clearRect(0,0,canvas.width,canvas.height);

drawPerspective();

drawGrid();

drawBall();

}


/*====================================================
    RED PERSPECTIVE LINES
====================================================*/

function drawPerspective(){

const topX = GRID_X + GRID_W/2;
const topY = 40;

const bottomX = GRID_X + GRID_W/2;
const bottomY = GRID_Y + GRID_H + 220;


/* outer */

ctx.strokeStyle="red";
ctx.lineWidth=4;

ctx.beginPath();
ctx.moveTo(topX,topY);
ctx.lineTo(GRID_X,GRID_Y);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(topX,topY);
ctx.lineTo(GRID_X+GRID_W,GRID_Y);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(bottomX,bottomY);
ctx.lineTo(GRID_X,GRID_Y+GRID_H);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(bottomX,bottomY);
ctx.lineTo(GRID_X+GRID_W,GRID_Y+GRID_H);
ctx.stroke();


/* centre */

ctx.beginPath();
ctx.moveTo(topX,topY);
ctx.lineTo(topX,GRID_Y);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(bottomX,bottomY);
ctx.lineTo(bottomX,GRID_Y+GRID_H);
ctx.stroke();


/* inner */

ctx.lineWidth=3;

ctx.beginPath();
ctx.moveTo(topX,topY);
ctx.lineTo(GRID_X+CELL_W,GRID_Y);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(topX,topY);
ctx.lineTo(GRID_X+CELL_W*3,GRID_Y);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(bottomX,bottomY);
ctx.lineTo(GRID_X+CELL_W,GRID_Y+GRID_H);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(bottomX,bottomY);
ctx.lineTo(GRID_X+CELL_W*3,GRID_Y+GRID_H);
ctx.stroke();


/* numbers */

ctx.fillStyle="black";
ctx.font="42px Arial";
ctx.textAlign="center";

ctx.fillText("1",topX,30);

ctx.fillStyle="#cc00cc";
ctx.fillText("5",bottomX,bottomY+45);


/* purple dot */

ctx.beginPath();

ctx.arc(bottomX,bottomY-85,14,0,Math.PI*2);

ctx.fillStyle="#cc00ff";

ctx.fill();

}


/*====================================================
    GRID
====================================================*/

function drawGrid(){

ctx.lineWidth=5;

ctx.strokeStyle="black";

ctx.font="18px Arial";

ctx.textAlign="center";
ctx.textBaseline="middle";

for(let r=0;r<ROWS;r++){

for(let c=0;c<COLS;c++){

const x=GRID_X+c*CELL_W;
const y=GRID_Y+r*CELL_H;


/* final result highlight */

if(finalCell &&
finalCell.row===r &&
finalCell.col===c){

ctx.fillStyle="gold";

ctx.fillRect(x,y,CELL_W,CELL_H);

}


/* current player */

if(player.row===r &&
player.col===c){

ctx.fillStyle="#f6d8ff";

ctx.fillRect(x,y,CELL_W,CELL_H);

}


ctx.strokeRect(x,y,CELL_W,CELL_H);


ctx.fillStyle=board[r][c].color;

ctx.fillText(

board[r][c].text,

x+CELL_W/2,

y+CELL_H/2

);

}

}

}


/*====================================================
    PURPLE BALL
====================================================*/

function drawBall(){

const x=

GRID_X+

player.col*CELL_W+

CELL_W/2;

const y=

GRID_Y+

player.row*CELL_H+

CELL_H/2;


ctx.beginPath();

ctx.arc(x,y,12,0,Math.PI*2);

ctx.fillStyle="#cc00ff";

ctx.fill();

ctx.lineWidth=2;

ctx.strokeStyle="#770088";

ctx.stroke();

}


/*====================================================
    MOVE BALL
====================================================*/

function moveBall(row,col){

player.row=row;

player.col=col;

drawBoard();

}


/*====================================================
    HIGHLIGHT RESULT
====================================================*/

function highlightResult(row,col){

finalCell={

row,

col

};

drawBoard();

}


/*====================================================
    RESET
====================================================*/

function resetBoard(){

player.row=5;

player.col=0;

finalCell=null;

drawBoard();

}


/*====================================================
    INITIAL DRAW
====================================================*/

drawBoard();
