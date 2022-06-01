
$(document).on("keypress", function(e) {
    console.log(e.key);
    restartGame();
    $("h1").text("Level 1");
    play();
});



$(".btn").on("click", function(e) {
    console.log(typeof(this));

    //User must press a key before starting playing
    if (gameStep != 0) {
        pressButton(this.id);

        checkPlay(this.id);
    }
});


var sequence = [];
var gameStep = 0;
var playerStep = 0;

function restartGame() {
      
    sequence = [];

    gameStep = 0;

    playerStep = 0;
      
}

function play()
{
    var colors = ["green", "red","yellow", "blue"];

    var btn = Math.floor(Math.random() * 4);

    playSound(colors[btn]);

    pressButton(colors[btn])

    sequence.push(colors[btn]);

    gameStep++;
    playerStep = 0;

    $("h1").text("Level " + gameStep);

    console.log(sequence);
    console.log(gameStep);
}

function pressButton(btn) {
    var b = $("#" + btn);

    console.log(b);
    
    b.addClass("pressed");

    setTimeout(function() {
        b.removeClass("pressed");
    }, 100);
}

function checkPlay(id) {
    console.log("gameStep: "+gameStep);
    console.log("playerStep: "+playerStep);

    if(sequence[playerStep] === id) {
        playSound(id);
        playerStep++;

        if(playerStep === gameStep) {
            setTimeout(play,500);        
        }        
    }
    else {
        var msg = "Game Over !!!\nYour score: level " + gameStep + "\nPress any key to restart!"
        $("h1").html(msg).wrap('<pre />');; /*wrap(pre) added only to make newline work*/
        playSound("wrong");
        $("body").addClass("game-over");
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        
        restartGame();
    }

}

function playSound(buttonId) {

    var audio = new Audio();

    console.log(buttonId);

    switch (buttonId) {
        case "green":
            audio = new Audio("sounds/green.mp3");
        break;
        case "red":
            audio = new Audio("sounds/red.mp3");
        break;
        case "yellow":
            audio = new Audio("sounds/yellow.mp3");
        break;
        case "blue":
            audio = new Audio("sounds/blue.mp3");
        break;
        case "wrong":
            audio = new Audio("sounds/wrong.mp3");
        break;
        default:
            console.log(buttonId);  
            return ;      
    }

    audio.play();
}