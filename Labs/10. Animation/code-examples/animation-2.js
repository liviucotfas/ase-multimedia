
$(document).ready(function () {

    // 1. store the current mouse coordinates
    $(document).mousemove(function (e) {
        window.mouseXPos = e.pageX;
        window.mouseYPos = e.pageY;
    });

    //disable the defualt contextual menu
	$(document).on("contextmenu", function(e) { 
        e.preventDefault();
     });

    // 2. create the balls
    for (var i = 0; i < 10; i++)
    {
        var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        
        buildBall(
            Math.floor(Math.random()*$(window).height() - 50), 
            Math.floor(Math.random()*$(window).width() - 50), 
            color);
    }

    // 3. On right click call the playing method on each ball
    $(document).mousedown(function(e){
        if (e.button == 2) {
            $(".ball").each(function(i, ball) { ball.play() });
        }

        e.preventDefault();
    });
});


var buildBall = function (top, left, color) {
    
    var ball = $('<div />', {
        class: 'ball',
    }).appendTo("body");

    ball.offset({"top" : top, "left" : left});
    ball.css( "background", color );
    
    var state = "pause";
    var coordinatesInsideBall = { top: 0, left: 0 };

    var savedCoordinates = [];
    var coordinateIndex = 0;

    var animation = function () {
        if (state === "movement") {
            ball.offset({
                top: window.mouseYPos - coordinatesInsideBall.top,
                left: window.mouseXPos - coordinatesInsideBall.left
            });
            savedCoordinates.push(ball.offset());
        }
        else if (state === "playing") {
            if (coordinateIndex < savedCoordinates.length) {
                ball.offset(savedCoordinates[coordinateIndex]);
                coordinateIndex++;
            }
            else {
                state = "pause";
            }
        }
    }

    ball[0].play = function()
    {
        state = "playing";
        coordinateIndex = 0;
    }
    
    ball.mousedown(function (e) {
        if (e.button == 0) {
            state = "movement";
            coordinatesInsideBall = {
                "top": window.mouseYPos - this.offsetTop,
                "left": window.mouseXPos - this.offsetLeft
            };
        }
        else if (e.button == 2) {
            ball[0].play();
        }

        e.preventDefault();
    })

    ball.mouseup(function () {
        state = "pause";
    });

    setInterval(animation, 15);
}