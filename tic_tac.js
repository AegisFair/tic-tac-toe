function Tic_tac() {
    // this ссылается на обьект вызываемого метода
        // т.к "this" в td.onclick, указывает на обьект td
            // поэтому сохраним ссылку на Tic_tac в переменной $this
    $this=this;
    //Ход игрока 1|2
    this.turn=1;
    this.players={
        tic:"X",
        toe:"0"
    };
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
                // Вот это я молодец...
                row.appendChild(td);
            }
            table.appendChild(row);
        }
        document.querySelector("body").appendChild(wrapper).appendChild(table);
    };
    function clickCell(eventObj){
        // Поле не пустое
        if(eventObj.target.innerHTML){
            // можно вывести сообщение
                // с просьбой выбрать другую клетку
        }else{
            switch ($this.turn) {
                case 1:
                    eventObj.target.innerHTML=$this.players.tic;
                    $this.turn=2;
                    break;
                default:
                    eventObj.target.innerHTML=$this.players.toe;
                    $this.turn=1;
                    break;
            }
            /*if($this.turn==1){
                eventObj.target.innerHTML=$this.players.tic;
                $this.turn=2;
            }else{
                eventObj.target.innerHTML=$this.players.toe;
                $this.turn=1;
            }*/
        }
    }
    function checkCellEmpty(cell){

    }
}