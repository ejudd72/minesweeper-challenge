((d) => {

    let width = 10;
    let height = 2;
    let number = 5;

    let main = d.getElementById('grid-container');

    main.style.width = width * 50 + 'px';
    main.style.backgroundColor = 'red';

    let createGrid = (width, height) => { 
        
        for(let i = 1; i <= (width * height); i += 1 ){

            let tile = d.createElement("div");
            tile.setAttribute("class", "tile");
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

            let above = (number - width);
            let below = (+number + width);
            let left = (number - 1);
            let right =  (+number + 1);
            let topLeft = (number - width) - 1;
            let topRight = (number - width) + 1;
            let bottomLeft = (+number + width) - 1;
            let bottomRight = (+number + width) + 1;

            let surrounding = [topLeft, above, topRight, left, right, bottomLeft, below, bottomRight];

            let surroundingTiles = surrounding.filter(current => current > 0);

            console.log('tile: ', number, "surrounding: ", surroundingTiles);

            let closeMines = [];

            // rethink this bit? 
            let mineMatches = surroundingTiles.map(current => {
                return tilesWithMines.filter(mine => current === +mine) > 1;
            }).filter(current => current);

            // console.log(tilesWithMines);
            console.log(mineMatches);
            value = mineMatches.length;

            value > 0 ? current.textContent = value : null;
            });
        } 

    createGrid(width, height);
    addMines(number);
    addNumberMines();

})(document)
