((d) => {
    //marks code from checkers 
//     let c=doc.getElementById("checkers");
//     const w=50;

//     for(let i = 0; i < 64; i += 1){
//         let d=doc.createElement("div");
//         d.setAttribute("class", "block");
//         let col=(i % 8);
//         let row=Math.floor(i / 8);
//         d.setAttribute("style",`left:${col * w}px;
// top:${row * w}px`);
//         if (col===7)d.classList.add("right");
//         if(row===7)d.classList.add("bottom");
//         c.append(d);
//     }
// })    

    let width = 10;
    let height = 2;
    let number = 20;

    let main = d.getElementById('grid-container');
    // let tiles = Array.from(main.children);

    main.style.width = width * 50 + 'px';
    main.style.backgroundColor = 'red';
    // 
    
    // let tiles = d.createElement('div');

    let createGrid = (width, height) => { 
        
        for(let i = 1; i <= (width * height); i += 1 ){

            let tile = d.createElement("div");
            tile.setAttribute("class", "tile");
            tile.setAttribute("id", `${i}`);

            // tile.setAttribute("style", "background-color: black;");

            tile.textContent = "";

            main.append(tile);
        }
    }

    let addMines = (number) => {
        let mines = [];

        for(let i = 0; i < number; i += 1){

            console.log('for loop started');
            let makeMine = () => {
                // console.log('makeminestarted');

                // generate random number that falls within the range of the grid
                let newMine = Math.floor(Math.random() * (width * height));

                console.log("newMine = ", newMine);
                
                console.log("mines = ", mines);
                // filter through all mines currently to check whether the mine is already at that tile
                let newMineCheck = () => mines.filter(current => {
                   if (newMine === current){
                       return current;
                   } else {
                       return [];
                   }
                });

                console.log("newMineCheck = ", newMineCheck());

                // newMineCheck === [] ? mines.push(newMine) : makeMine();
                // if a check for the mines reveals the tile is already being used, run the check again
                
                // console.log(newMineCheck);

                if (newMineCheck() === []){
                    mines.push(newMine);
                    // console.log(mines);
                } 

            }
            makeMine();
        }
        console.log(mines);
    }
    // tiles.forEach((tile, i) => { 
    //     let evenRows = (i % 2 === 0) && ((Math.floor(i / 8) % 2) === 0);
    //     let oddRows = (i % 2 === 1) && ((Math.floor(i / 8) % 2) === 1);

    //     if (evenRows || oddRows) {
    //         tile.style.backgroundColor = 'black'
    //     }
    
    // });

    createGrid(width, height);
    addMines(number);


})(document)
