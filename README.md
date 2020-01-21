# Minesweeper Technical Challenge, January 2020 – Eleanor Judd
## Project Brief: 
Create a minesweeper board with changeable parameters

## Getting set up: 
If cloning this repo, open the 'minesweeper.html' file to see the result of my code. 

## Parameters:
This programme takes 3 parameters, height of board, width of board and number of mines. For best visual results, set height and width of board to numbers between 6-15. For best functionality, set number of mines to a similar number in the top of the minesweeper.js file, below the ‘changeable parameters’ comment. Open the document by double-clicking minesweeper.html to open it in the browser.

## Methodology:
I created this programme using Javascript in the DOM. This was because creating a grid in this way is familiar to a challenge I've tried before so I would have a starting place.
I split this challenge into 3 different stages, or larger functions. This was so that I could test each one works before moving to the next.
- Creating a grid.
- Generating a random list of mines and plotting them in the grid
- plotting the tiles surrounding each mine

## Decisions:
### Creating the grid:
I began this by creating a document fragment. I used a while loop to generate each tile, with a 'tile' class (so that all could be styled the same), and with a unique id. I then appended each tile to the fragment and appended this to the 'main' section of the document so that it could all be done in one go to reduce page re-rendering.

### Generating random list of mines:
I created this using a while loop and the 'number' parameter entered at the top of the script. For each mine, I used a Math.random() function multiplied by the number of tiles on the grid and rounded up with Math.ceil().

I added each of these into a Javascript Set rather than a standard array. This is because Sets only take unique values and to avoid using too much code to validate for every new random mine added,
which could hinder performance.

For each value in this set then, I added a class of 'mineLocation’ to the corresponding tile in the DOM, and a text content of X.

### Plotting surrounding tiles:
This is the most complex part of the programme. I began by getting the full array of all tiles, and separating this into 2 arrays (of those with and those without mines) using array.filter.

For each tile then that didn't have a mine on it, I used that tile's ID to work out the IDs of the tiles immediately above, below, left and to the right and diagonally surrounding and pushed this into a surroundingTiles array. It was an extra challenge to add in validation here to make sure that mines to the far left on the board and to the far right of the board didn't trigger tiles on the other side as being 'surrounding' just because their IDs were adjacent. For this validation, I used ternary operators to give 'null' for each tile that was to the far edge of the board.

I then mapped through the surrounding tiles array (and named this array 'mineMatches'), and within this mapped through the 'tilesWithMines' array created earlier, for each nearby tile checking whether the ID matched one of those with a mine on it. For each that did, it returned 'true'. This array is then filtered to only show those true values. Then I am returned with an array with a length of the number of surrounding mines. Then within this I set the tile's textContent to the length of this array and gave it a class of 'tile-surrounding' so that I could change the background colour for ease in testing.
