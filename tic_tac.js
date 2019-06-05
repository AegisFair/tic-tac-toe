function Tic_tac() {
    // this ссылается на обьект вызываемого метода
        // т.к "this" в td.onclick, указывает на обьект td
            // поэтому сохраним ссылку на Tic_tac в переменной $this
    $this=this;
    this.gridSize;
    //Ход игрока №0/№1 
    this.turn=0;
    // Данное решение обеспечивает появление length в объекте
    this.players=[{mark:"X"},{mark:"0"}];
    // Массив со всеми клетками
    this.arrayTds=new Array();
    // Создание игрового поля
    this.viewGamingField=function (gridSize) {
        this.gridSize=gridSize;
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
                this.arrayTds.push(td);
            }
            table.appendChild(row);
        }
        document.querySelector("body").appendChild(wrapper).appendChild(table);
    };
    function nextTurn(){
        $this.turn++;
        if($this.turn>=$this.players.length){
            $this.turn=0;
        }
    }
    function clickCell(eventObj){
        // Поле не пустое
        if(checkCellEmpty(eventObj)){
            // можно вывести сообщение
                // с просьбой выбрать другую клетку
        }else{
            switch ($this.turn) {
                case 1:
                    eventObj.target.innerHTML=$this.players[$this.turn].mark;
                    nextTurn();
                    break;
                default:
                    eventObj.target.innerHTML=$this.players[$this.turn].mark;
                    nextTurn();
                    break;
            }
            checkForVictory(eventObj.target);
            /*if($this.turn==1){
                eventObj.target.innerHTML=$this.players.tic;
                $this.turn=2;
            }else{
                eventObj.target.innerHTML=$this.players.toe;
                $this.turn=1;
            }*/
        }
    }
    // Лучше добавить функцию и спастись от увеличения размера другой: clickCell,
        // возможно в будущем, что-то еще будем размещать в клетке вместе с "целевым элементом"
            //поэтому встанет вопрос: отсутсвием какого элемента мы будем считать клетку пустой?.
    function checkCellEmpty(e){
        return e.target.innerHTML;
    }
    function checkForVictory(currentTd){
        // Узнаем index нужной <td>, в массиве this.arrayTds
        var indexTd=$this.gridSize*currentTd.parentElement.rowIndex+currentTd.cellIndex,
            mark=$this.players[$this.turn].mark;
        var top,
                diagonal_top_left,
                diagonal_top_right,
            left,
            right,
            bottom,
                diagonal_bottom_left,
                diagonal_bottom_right;
        // Проверка доступности клеток относительно текущего <td>
            // вверх
            if ($this.arrayTds[indexTd-$this.gridSize]!==undefined) {
                // Проверка вверх

            }
    }
}