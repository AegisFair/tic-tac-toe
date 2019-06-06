function Tic_tac() {
    // this ссылается на обьект вызываемого метода
        // т.к "this" в td.onclick, указывает на обьект td
            // поэтому сохраним ссылку на Tic_tac в переменной $this
    $this=this;
    this.gridSize;
    this.victoryCondition=3;
    //Ход игрока №0/№1 
    this.turn=0;
    // Данное решение обеспечивает появление length в объекте
    this.players=[
        {mark:"X", seriesMarks:new SeriesMarks(1)},
        {mark:"0", seriesMarks:new SeriesMarks(1)}
    ];
    function SeriesMarks(num){
        this.top=num;
        this.diagonal_top_left=num;
        this.diagonal_top_right=num;
        this.left=num;
        this.right=num;
        this.bottom=num;
        this.diagonal_bottom_left=num;
        this.diagonal_bottom_right=num;
    }
    // Массив со (строками с клетками)
    this.arrayTds=new Array();
    // Создание игрового поля
    this.viewGamingField=function (gridSize) {
        this.gridSize=gridSize;
        if(gridSize>4){this.victoryCondition=4;}
        var wrapper=document.createElement('div'),
        table=document.createElement('table');
        wrapper.className="wrapperGrid";
        table.className="gameGrid";
        for (let i = 0; i < gridSize; i++) {
            this.arrayTds[i]=[];
            var row=document.createElement('tr');
            for (let j = 0; j < gridSize; j++) {
                var td=document.createElement('td');
                td.onclick=clickCell;
                // Вот это я молодец...
                row.appendChild(td);
                this.arrayTds[i].push(td);
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
                    checkForVictory(eventObj.target);
                    nextTurn();
                    break;
                default:
                    eventObj.target.innerHTML=$this.players[$this.turn].mark;
                    checkForVictory(eventObj.target);
                    nextTurn();
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
    // Лучше добавить функцию и спастись от увеличения размера другой: clickCell,
        // возможно в будущем, что-то еще будем размещать в клетке вместе с "целевым элементом"
            //поэтому встанет вопрос: отсутсвием какого элемента мы будем считать клетку пустой?.
    function checkCellEmpty(e){
        return e.target.innerHTML;
    }
    function checkForVictory(currentTd){
        checkTopArea(currentTd);
        checkBottomArea(currentTd);
        function checkTopArea(currentTd) {
            // Текущие индексы строки/ячейки в массиве $this.arrayTds
            var indexTd=currentTd.cellIndex,
                indexRow=currentTd.parentElement.rowIndex,
                mark=$this.players[$this.turn].mark;
            // Проверка доступности клеток относительно текущего <td>
            /////
            // Проверка существования вверха
            if ($this.arrayTds[indexRow-1] && $this.arrayTds[indexRow-1][indexTd]!==undefined) {
                var top_td=$this.arrayTds[indexRow-1][indexTd];
                // Проверка вверха на наличие меток пользователя
                if(top_td.innerHTML.indexOf(mark)!==-1){
                    $this.players[$this.turn].seriesMarks.top++;
                    checkTopArea(top_td);
                    return;
                }
                // Проверка diagonal_top_left
                if($this.arrayTds[indexRow-1][indexTd-1]!==undefined && $this.arrayTds[indexRow-1][indexTd-1].innerHTML.indexOf(mark)!==-1){
                    var top_left_td=$this.arrayTds[indexRow-1][indexTd-1];
                    $this.players[$this.turn].seriesMarks.diagonal_top_left++;
                    checkTopArea(top_left_td);
                    return;
                }
                // Проверка diagonal_top_right
                if($this.arrayTds[indexRow-1][indexTd+1]!==undefined && $this.arrayTds[indexRow-1][indexTd+1].innerHTML.indexOf(mark)!==-1){
                    var top_right_td=$this.arrayTds[indexRow-1][indexTd+1];
                    $this.players[$this.turn].seriesMarks.diagonal_top_right++;
                    checkTopArea(top_right_td);
                    return;
                }
            }
        }
        function checkBottomArea(currentTd) {
            // Текущие индексы строки/ячейки в массиве $this.arrayTds
            var indexTd=currentTd.cellIndex,
                indexRow=currentTd.parentElement.rowIndex,
                mark=$this.players[$this.turn].mark;
            // Проверка доступности клеток относительно текущего <td>
            /////
            // Проверка существования низа
            if ($this.arrayTds[indexRow+1] && $this.arrayTds[indexRow+1][indexTd]!==undefined) {
                var bottom_td=$this.arrayTds[indexRow+1][indexTd];
                // Проверка низа на наличие меток пользователя
                if(bottom_td.innerHTML.indexOf(mark)!==-1){
                    $this.players[$this.turn].seriesMarks.top++;
                    checkBottomArea(bottom_td);
                    return;
                }
                // Проверка diagonal_bottom_left
                if($this.arrayTds[indexRow+1][indexTd-1]!==undefined && $this.arrayTds[indexRow+1][indexTd-1].innerHTML.indexOf(mark)!==-1){
                    var bottom_left_td=$this.arrayTds[indexRow+1][indexTd-1];
                    $this.players[$this.turn].seriesMarks.diagonal_bottom_left++;
                    checkBottomArea(bottom_left_td);
                    return;
                }
                // Проверка diagonal_bottom_right
                if($this.arrayTds[indexRow+1][indexTd+1]!==undefined && $this.arrayTds[indexRow+1][indexTd+1].innerHTML.indexOf(mark)!==-1){
                    var bottom_right_td=$this.arrayTds[indexRow+1][indexTd+1];
                    $this.players[$this.turn].seriesMarks.diagonal_bottom_right++;
                    checkBottomArea(bottom_right_td);
                    return;
                }
            }
        }
            // После рекурсивных проверок всех сторон два условия для вердикта
            ////    ////    ////    ////    ////    ////    ////    ////
            // else if($this.players[$this.turn].seriesMarks.some(function(sideSeries){
            //     return(sideSeries>=$this.victoryCondition);
            // })){
            if(checkSeriesMarks($this.players[$this.turn].seriesMarks)){
                console.log("Победа игрока "+$this.turn);
                return null;
            }
            else{
                  $this.players[$this.turn].seriesMarks=new SeriesMarks(1);
            }
        return null;
        function checkSeriesMarks(Marks){
            for (let side in Marks) {
                if(Marks[side]>=$this.victoryCondition){
                    return true;
                }
            }
            return false;
        }
    }
}