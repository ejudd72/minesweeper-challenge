((d) => {

    // changeable parameters: width of board, height of board and number of mines
    let width = 15;
    let height = 15;
    let number = 15;

    let main = d.getElementById('grid-container');

    main.style.width = width * 50 + 'px';

    let createGrid = (width, height) => { 

        let fragment = document.createDocumentFragment();
        for(let i = 1; i <= (width * height); i += 1 ){
            let tile = d.createElement("div");
            tile.classList.add("tile");
            tile.setAttribute("id", `${i}`);
            tile.textContent = "";
            fragment.append(tile);
        }

        main.append(fragment);
    }

    createGrid(width, height);

    let addMines = (number) => {
        // using a Set here rather than a standard array as it only accepts unique values. 
        let mines = new Set();

        while (mines.size < number){ 
            mines.add(Math.ceil(Math.random() * (width * height)));
        }

        mines = Array.from(mines).sort();

        mines.forEach(current => {
            let tile = d.getElementById(current);
            tile.classList.add("mine-location");
            tile.textContent = "X";
        });
    }

    addMines(number);

    let plotSurroundingTiles = () => {
        let allTiles = Array.from(d.getElementsByClassName('tile'));

        let tilesWithMines = allTiles.filter(current => current.textContent === "X").map(current => current.id);

        let tilesWithoutMines = allTiles.filter(current => current.textContent !== "X");

        tilesWithoutMines.forEach(current => {
            let number = +current.id;

            let rowNo = Math.ceil(number / width);

            // column nunber calculated with modulus: if column is on right hand side then it will be the same as width instead. 
            let colNo = number % width === 0 ? width : number % width;

            // working out id values for each position relative to the chosen tile. 
            // ternaries to make sure that there isn't a value given for those tiles on the edges of the board 

            //immediate surrounding tiles...
            let left = (colNo - 1) >= 1 ? (number - 1) : null;

            let right = (colNo + 1) <= width ? (number + 1) : null;

            let above = rowNo !== 1 ? (number - width) : null;
            
            let below = rowNo !== width ? (number + width) : null;

            // diagonal surrounding tiles
            let topLeft = left - width >= 1 ? left - width : null;

            let topRight = right - width >= 1 ? right - width : null;
  
            let bottomLeft = left + width;
            
            let bottomRight = right + width;
           
            let surroundingTiles = [topLeft, above, topRight, left, right, bottomLeft, below, bottomRight]
            
            surroundingTiles.filter(current => current !== null );

            // iterate through all the surrounding tiles for this particular tile. 
            let mineMatches = surroundingTiles.map(current => {

                // only return the mines where the surrounding tile matches at least one of the tiles with a mine on it. 
                return tilesWithMines.filter(mine => current === +mine) > 1;

                /// filter through this array to only give true values (otherwise we get an array of true false true false etc..)
            }).filter(current => current);

            // if there is more than 0 mines in surrounding tiles, this number becomes the textcontent and the tile gets a class of tile-surrounding
            value = mineMatches.length > 0 ? mineMatches.length : "*";

            current.textContent = value;

            mineMatches.length > 0 ? current.classList.add("tile-surrounding") : null;

        });
    } 

    plotSurroundingTiles();

})(document)
