((d) => {

    let width = 10;
    let height = 2;
    let number = 20;

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
        let mines = [];

        for(let i = 0; i < number; i += 1){

            console.log('for loop started');
            let makeMine = () => {
               
                let newMine = Math.floor(Math.random() * (width * height));

                mines.push(newMine);
            
            }
            makeMine();
        }
        console.log(mines);
    }

    createGrid(width, height);
    addMines(number);


})(document)
