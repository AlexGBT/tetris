// let trashMy = [[1,3],[1,2],[2,1],[0,2],[2,3],[4,2],[4,1],[4,2]];

// // console.log(trashMy);
// // trashMy = trashMy.map(function(el,i){
// //     if ( el[0] == 1 ) {
// //         return [el[0],el[1]]
// //     }
// // });

// let trashMy1 = trashMy.slice(0);
// trashMy = null;
// console.log(trashMy1);










//--------------------------View----------------------
let screen = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
];

let figure =  [[1,3],[1,2],[1,1],[0,2]];
let prevFigure = [[1,3],[1,2],[1,1],[0,2]];
let prevTrash = [];
let trash = [];
let formFigure = 0;

function SetFigureToScreen(figure,screen) {
    prevFigure.forEach(function(currentPoint) {
        if (screen[currentPoint[0]][currentPoint[1]] !=2) {
            screen[currentPoint[0]][currentPoint[1]] = 0;
        }
    });
    figure.forEach(function(currentPoint) {
        screen[currentPoint[0]][currentPoint[1]] = 1;
    });


    for ( let i = 0; i <= 3; i++ ){
        prevFigure[i][0] = figure[i][0];
        prevFigure[i][1] = figure[i][1];
    }
}
function setTrashToScreen(trash,screen){
    prevTrash.forEach(function(currentPoint){
        screen[currentPoint[0]][currentPoint[1]] = 0;
    });
    trash.forEach(function(currentPoint) {
        screen[currentPoint[0]][currentPoint[1]] = 2;
    });
    prevTrash = [];
    trash.forEach(function(currentPoint){
        prevTrash.push([currentPoint[0],currentPoint[1]]);
    });
}
let red = document.querySelector('.red');
let blue = document.querySelector('.blue');
let black = document.querySelector('.black');
let lol = document.querySelector('.lol');


updateScreen = setInterval(function(){
    setTrashToScreen(trash,screen);
    SetFigureToScreen(figure,screen);
    let htmlScreen = document.querySelector('.screen');
    htmlScreen.innerHTML = '';
    screen.forEach(row => {
        row.forEach(element => {
            let redBlock = lol.cloneNode(true);   
            let blueBlock = blue.cloneNode(true);
            if (element == 0) {
                htmlScreen.appendChild(blueBlock);

            } else if (element == 1 || element == 2) {
                htmlScreen.appendChild(redBlock);
            }


            // if (element == 0) {
            //     htmlScreen.innerHTML+= '+';
            // } else if (element == 1 || element == 2) {
            //     htmlScreen.innerHTML+= '*';
            // }     
        })
        htmlScreen.innerHTML+= '<br>';
    });
},100);


//-----------------------------Controller--------------------------

function WhatIsLeftFromFigure(figure,screen) {
    let WhatIsLeft = 0;
    for ( let i = 0; i<=3; i++) {
        if (screen[ figure[i][0] ][ figure[i][1] -1 ] == 2 || screen[ figure[i][0] ][ figure[i][1] - 1 ] == undefined) {
            WhatIsLeft = 1;
            break;
        }  
    }
    return WhatIsLeft;
}
function WhatIsRightFromFigure(figure,screen) {
    let WhatIsRight = 0;
    for ( let i = 0; i<=3; i++) {
        if (screen[ figure[i][0] ][ figure[i][1]  + 1 ] == 2 || screen[ figure[i][0] ][ figure[i][1] + 1 ] == undefined) {
            WhatIsRight = 1;
            break;
        }  
    }
    return WhatIsRight;
}
function WhatIsBottomtFromFigure(figure,screen) {
    let WhatIsBottom = 0;
     for ( let i = 0; i<=3; i++) {                                       
        if (  screen[ figure[i][0] + 1 ] == undefined || screen[ figure[i][0] + 1 ][ figure[i][1] ] == 2) {   
            WhatIsBottom = 1;
            break
        }  
    }
    return WhatIsBottom;
}
// console.log(WhatIsBottomtFromFigure(figure,screen));

function figureToBottom(figure, screen) {
    if (WhatIsBottomtFromFigure(figure,screen)) {
        return 0
    }
    figure.forEach(function(currentPoint){
        currentPoint[0]++;
    });
    return 1
}
function figureToLeft(figure, screen) {
    if (WhatIsLeftFromFigure(figure,screen)) {
        return 0
    }
    figure.forEach(function(currentPoint){
        currentPoint[1]--;
    });
    return 1
}
function figureToRight(figure, screen) {
    if (WhatIsRightFromFigure(figure,screen)) {
        return 0
    }
    figure.forEach(function(currentPoint){
        currentPoint[1]++;
    });
    return 1
}

function goBottom(screen) {
    figure = getFigure();
    let goBottomTimer = setInterval(function(){
        if (!figureToBottom(figure,screen)) {
            figureToTrash(figure,trash);
            figure = getFigure();
            deleteFullRaws(checkFullRaw(trash));
            clearInterval(goBottomTimer);
            goBottom(screen);
        }
    },100);
}
goBottom(screen);

function checkFullRaw(trash){
    let fullRaws = [];
    for ( let i = screen.length - 1; i >= 0; i--) {
        let counter = 0;  
        trash.forEach(function(currentPoint){
            if ( currentPoint[0] == i ) {
                counter++;
                if (counter == screen[0].length) {
                    fullRaws.push(i);
                    counter = 0;
                }
            }
        }); 
    } 
    return fullRaws
}

function deleteFullRaws(fullRaws) {
    if ( fullRaws.length !=0 ) {
        let trash1 = trash.slice(0);
        fullRaws.forEach(function(row){ 
            trash.forEach(function(currentPoint,i){
                if (currentPoint[0] == row) {
                    delete trash1[i];
                }
            });
        });
        trash = null;
        trash = [];
        trash1.forEach(function(el,i){
            if (el != undefined) {
                trash.push(trash1[i]);
            }
        });
        fullRaws.reverse();
        fullRaws.forEach(function(row){
            for ( let i = 0; i< trash.length; i++ ) {
                if ( trash[i][0] < row) {
                    trash[i][0] = trash[i][0] + 1;
                }
            }
        });
    }    
}

function figureToTrash(figure,trash){
    for ( let i = 0; i <= 3; i++) {
        trash.push([figure[i][0],figure[i][1]]);
    }
}
function getFigure() {
    formFigure = rand();
    let figures = [
        [[1,4],[1,3],[1,2],[0,3]],
        [[3,2],[2,2],[1,2],[0,2]],
        [[1,3],[0,2],[1,4],[0,3]],
        [[1,3],[1,2],[0,3],[0,2]]
    ];               
    let figure = figures[formFigure];
    return figure;
}
 
function rand(){
    let x = Math.round(Math.random()*3.499 );
    return x;
}

document.onkeypress  = function(e){
    if ( e.keyCode == 97 ){ 
        figureToLeft(figure, screen)
    }
    if ( e.keyCode == 100 ) {
        figureToRight(figure, screen)
    }
    if ( e.keyCode == 113) {
        rotateFigure(figure);
    }
}
 
