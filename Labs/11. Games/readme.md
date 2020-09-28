# Game Development

<!-- vscode-markdown-toc -->
* 1. [HTML5 games real world examples:](#HTML5gamesrealworldexamples:)
* 2. [Documentation](#Documentation)
* 3. [Demos](#Demos)
* 4. [Frameworks](#Frameworks)
* 5. [Other](#Other)
* 6. [Assignment](#Assignment)
* 7. [Bibliography](#Bibliography)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name='HTML5gamesrealworldexamples:'></a>HTML5 games real world examples:
- Facebook Messenger Instant Games: https://messenger.fb.com/blog/instant-games-now-on-messenger/
- Google Doodles (try them on your smartphone): 
   - SVG: https://www.google.com/doodles/celebrating-50-years-of-kids-coding
   - WebGL / Canvas: https://www.google.com/doodles/valentines-day-2017-day-4 (developed using the Pixi framework)

##  2. <a name='Documentation'></a>Documentation
-   Game development: <https://developer.mozilla.org/en/docs/Games>

##  3. <a name='Demos'></a>Demos
-   <https://developer.mozilla.org/en-US/docs/Games/Examples>
- https://santatracker.google.com/village.html

##  4. <a name='Frameworks'></a>Frameworks
- Phaser ([https://phaser.io](https://phaser.io)): complete HTML5 game engine
- Pixi ([http://www.pixijs.com](http://www.pixijs.com)): fast HTML 5 2D rendering engine that uses webGL with canvas fallback

##  5. <a name='Other'></a>Other
-   HTML5GameDevs community (<http://www.html5gamedevs.com>): includes a list of the most popular game development frameworks

##  6. <a name='Assignment'></a>Assignment
1. Try the "canvas-game" sample by clicking [here](https://ase-multimedia.azurewebsites.net/canvas-game).
2. Check the source code. 
3. Store and display the minimum time in which the game has been won so far. The minimum time should be persisted even if the user closes the browser or navigates to another website.

	Hint: 
	- use the Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API;
	- use `let d = new Date();` to get the current time;
	- you can subtract two `Date` objects to compute the difference between them in milliseconds.
4. The example has a few "physics" issues. For example, we only test if the coordinates of the ball are inside a brick, but in fact we should test if any point on the contour of the ball is touching the brick. The same issue appears when the ball hits the paddle from the side.
5. Try a more advance version of our game, developed using the Phaser.io library: https://phaser.io/examples/v2/games/breakout
5. (opt) Read more about the Phaser.io library at https://phaser.io

##  7. <a name='Bibliography'></a>Bibliography
- https://developer.mozilla.org/en-US/docs/Games
- https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
