"use strict";

$(document).ready(function () {

    var state = "pause";

    var savedCoordinates = [];
    var coordinateIndex = 0;

    var ball = $("#ball");
    var coordinatesInsideBall = { top: 0, left: 0 };

    //store the current mouse coordinates
    var mouseXPos;
    var mouseYPos;
    $(document).mousemove(function (e) {
        mouseXPos = e.pageX;
        mouseYPos = e.pageY;
    });

    //disable the default contextual menu
	$(document).on("contextmenu", function(e) { 
        e.preventDefault();
     });

    function animation() {
        if (state == "movement") {
            ball.offset({
                top: mouseYPos - coordinatesInsideBall.top,
                left: mouseXPos - coordinatesInsideBall.left
            });
            savedCoordinates.push(ball.offset());
        }
        else if (state == "playing") {
            if (coordinateIndex < savedCoordinates.length) {
                ball.offset(savedCoordinates[coordinateIndex]);
                coordinateIndex++;
            }
            else {
                state = "pause";
            }
        }
    }

	ball.mousedown(function(e) {
        if (e.button == 0) {
            //MouseEvent.button - The button number that was pressed when the mouse event was fired.
            //https://developer.mozilla.org/en/docs/Web/API/MouseEvent 
			state = "movement";
			coordinatesInsideBall = {
                //offsetTop read-only property returns the distance of the current element relative to the top of the offsetParent node.
				"top": mouseYPos - this.offsetTop, 
				"left": mouseXPos - this.offsetLeft
			};
		} else if (e.button == 2) {
			state = "playing";
			coordinateIndex = 0;
		}

		e.preventDefault();
	});
    

    ball.mouseup(function () {
        state = "pause";
    });

    setInterval(animation, 15);
});