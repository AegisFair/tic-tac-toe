function Tic_tac() {
    //Ход игрока 1|2
    this.turn=1;
    // Создание игрового поля
    this.viewGamingField=function (gridSize) {
        var wrapper=document.createElement('div'),
        table=document.createElement('table');
        wrapper.className="wrapperGrid";
        table.className="gameGrid";
        for (let i = 0; i < gridSize; i++) {
            var row=document.createElement('tr');
            for (let j = 0; j < gridSize; j++) {
                var td=document.createElement('td');
                td.onclick=clickCell;
                row.appendChild(document.createElement('td'));
            }
            table.appendChild(row);
        }
        document.querySelector("body").appendChild(wrapper).appendChild(table);
    };
    function clickCell(cell){
        // Поле пустое
        // if(cell.target.innerHTML)
        console.log(cell.target.innerHTML);
    }
    function checkCellEmpty(cell){

    }
}