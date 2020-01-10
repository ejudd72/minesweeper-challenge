    let width = 10;
    let height = 2;
    let number = 20;

    let addMines = (number) => {

        let mines = new Set();

        while (mines.size < number){ 
            mines.add(Math.ceil(Math.random() * (width * height)));
        }

        mines = Array.from(mines).sort();

        console.log(mines);


        // mines.forEach(current => {
        //     let tile = d.getElementById(current);
        //     tile.classList.add("mine-location");
        // });
    }
addMines(number);

