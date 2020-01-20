((d) => {

    let width = 10;
    let height = 10;
    let number = 3;

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
            let value = "*";
            // these are the tiles with a mine on them
            let number = +current.id;

            let rowNo = Math.ceil(number / width);

            // column nunber calculated with modulus: if column is on right hand side then it will be the same as width instead. 
            let colNo = number % width === 0 ? width : number % width;

            // working out values for each position relative to the chosen tile. 
            // ternaries to make sure that there isn't a value given for those tiles on the edges of the board 

            let left = colNo !== 1 ? (number - 1) : null;

            let right = colNo !== width ? (number + 1) : null;

            let above = rowNo !== 1 ? (number - width) : null;
            
            let below = number + width;

            // **** 
            let topLeft = left - width;

            let topRight = right - width;
  
            let bottomLeft = left + width;
            
            let bottomRight = right + width;
           
            let surrounding = [topLeft, above, topRight, left, right, bottomLeft, below, bottomRight];

            let surroundingTiles = surrounding.filter(current => current );


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
