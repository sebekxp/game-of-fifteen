# Game of Fifteen
## You can play here: https://sebekxp.github.io/game-of-fifteen/

My favorite project so far. This simple game was created as part of learning Javascript.

## Short description of the project

A grid with a sequence of numbers is represented as a two-dimensional array, in which each element is a separate tile with its own event listener. 
Elements (div) are created dynamically based on the maximum size of each level. 
Numbers in the array are generated randomly until a solvable combination is generated. 
To change the tiles I used a simple algorithm to find an empty tile among neighbors, if the 
algorithm finds it, I change the styles and positions of the empty and clicked tile. 
After changing the game level, the whiteboard is cleared and a new level is automatically created. 
The progress bar is based on the current number of tiles that are already in the right places. 
The width of the progress bar is calculated and changed automatically after each click based on the formula: 
```js
countTile * 100 / (N * N -1)
``` 
- countTile - is the number of tiles in the appropriate places, 
- N - the size of the table. 
In the game we also have a counter, a timer and a button to stop the game. 
After changing the level, the above mentioned functionalities along with the progress bar are reset.
For tracking on which level we are currently used a simple indicator indicating the current level of the game.

### Screenshot:<br/>
<img src="https://i.imgur.com/IeLDAdN.png" width="550px" height="700px"/>
