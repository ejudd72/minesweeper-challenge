((d) => {

    let width = 10;
    let height = 10;
    let number = 10;

    let main = d.getElementById('grid-container');

    main.style.width = width * 50 + 'px';


    let createGrid = (width, height) => { 
        
        for(let i = 1; i <= (width * height); i += 1 ){

            let tile = d.createElement("div");
            tile.classList.add("tile");
            tile.setAttribute("id", `${i}`);
            tile.textContent = "";
            main.append(tile);
        }
    }

    let addMines = (number) => {
        let mines = new Set();

        while (mines.size < number){ 
            mines.add(Math.ceil(Math.random() * (width * height)));
        }

        mines = Array.from(mines).sort();

        console.log(mines);

        mines.forEach(current => {
            let tile = d.getElementById(current);
            tile.classList.add("mine-location");
            tile.textContent = "X";
        });
    }

    let addNumberMines = () => {
        let allTiles = Array.from(d.getElementsByClassName('tile'));

        let tilesWithMines = allTiles.filter(current => current.textContent === "X").map(current => current.id);

        let tilesWithoutMines = allTiles.filter(current => current.textContent !== "X");

        tilesWithoutMines.forEach(current => {
            let value = 0;
            // these are the tiles with a mine on them
            let number = current.id;

            // working out values for each position relative to the chosen tile. 
            // ternaries to make sure that there isn't a value given for those tiles on the edges of the board (otherwise a mine to the far left would be read as adjacent to a tile on the far right and vice versa) 

            let left = (number  - 1) % width === 0 ? null : (number - 1);

            let right = number  % width === 0 ? null : (+number + 1);

            let above = number  / 5 <= 1 ? null : (number - width);
            
            let topLeft = number  / 5 <= 1 ? null : (
                (number  - 1) % width === 0 ? null : (number - width) - 1);

            let topRight =number / 5 <= 1 ? null : (
               number % width === 0 ? null : (number - width) + 1);

            let below = (+number + width);
            
            let bottomLeft =  (number  - 1) % width === 0 ? null : (+number + width) - 1;
            
            let bottomRight =number % width === 0 ? null : (+number + width) + 1;

            let surrounding = [topLeft, above, topRight, left, right, bottomLeft, below, bottomRight];

            let surroundingTiles = surrounding.filter(current => current > 0);

            console.log('tile: ', number, "surrounding: ", surroundingTiles);

            // iterate through all the surrounding tiles for this particular tile. 
            let mineMatches = surroundingTiles.map(current => {
                // only return the mines where the surrounding tile matches one of the tiles with a mine on it. 
                return tilesWithMines.filter(mine => current === +mine) > 1;
                /// filter through this array to only give true values (otherwise we get an array of true false true false etc..)
            }).filter(current => current);

            // console.log(tilesWithMines);
            console.log(mineMatches);
            value = mineMatches.length > 0 ? mineMatches.length : "*";

            current.textContent = value;

            mineMatches.length > 0 ? current.classList.add("tile-surrounding") : null;

            // value > 0 ? current.textContent = value : null;
            });
        } 

    createGrid(width, height);
    addMines(number);
    addNumberMines();

})(document)
