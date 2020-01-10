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
        });
    }

    createGrid(width, height);
    addMines(number);

})(document)
