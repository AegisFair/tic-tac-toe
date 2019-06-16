function Tic_tac() {
    // this ссылается на обьект вызываемого метода
        // т.к "this" в td.onclick, указывает на обьект td
            // поэтому сохраним ссылку на Tic_tac в переменной $this
    // Замкнем переменную для функций
    var $this=this;
    //// Все СВОЙСТВА ////
    //Ход игрока №0/№1 
    this.turn=0;
    // Размер сетки
    this.gridSize;
    // Условие победы
    this.victoryCondition;
    // Массив строк с клетками
    this.arrayTds;
    // Данное решение обеспечивает появление length в объекте
    this.players=[
        {mark:"X", seriesMarks:new this.SeriesMarks(1)},
        {mark:"0", seriesMarks:new this.SeriesMarks(1)}
    ];
    this.clickCell = function(eventObj){
        // Поле не пустое
        if($this.checkCellnoEmpty(eventObj)){
            // можно вывести сообщение
                // с просьбой выбрать другую клетку
            console.log("Выберите другую клетку");
        }else{
            switch ($this.turn) {
                case 1:
                    eventObj.target.innerHTML=$this.players[$this.turn].mark;
                    if($this.checkForVictory(eventObj.target)){
                        $this.clearGamingField();
                    }else{
                        $this.nextTurn();
                    }
                    break;
                default:
                    eventObj.target.innerHTML=$this.players[$this.turn].mark;
                    if($this.checkForVictory(eventObj.target)){
                        $this.clearGamingField();
                    }else{
                        $this.nextTurn();
                    }
                    break;
            }
            if(!($this.isFreeCells())){
                $this.clearGamingField();
            }
        }
    }
}
Tic_tac.prototype.SeriesMarks = function(num){
    this.top=num;
    this.diagonal_top_left=num;
    this.diagonal_top_right=num;
    this.left=num;
    this.right=num;
    this.bottom=num;
    this.diagonal_bottom_left=num;
    this.diagonal_bottom_right=num;
}
Tic_tac.prototype.viewGamingField = function(gridSize,victoryCondition){
    // Проверка корректности входных данных и инициализация
    if(this.isNumeric(gridSize)){
        this.gridSize=gridSize;
    }else{
        this.gridSize=3;    
    }
    // Для случая если размер сетки, меньше условия для победы
    if(this.isNumeric(victoryCondition) && this.gridSize>=victoryCondition){
        this.victoryCondition=victoryCondition;
    }else{
        this.victoryCondition=this.gridSize;
    }
    // Массив строк с клетками)
    this.arrayTds=new Array();
    var wrapper=document.createElement('div'),
    table=document.createElement('table');
    wrapper.className="wrapperGrid";
    table.className="gameGrid";
    for (let i = 0; i <  this.gridSize; i++) {
        this.arrayTds[i]=[];
        var row=document.createElement('tr');
        for (let j = 0; j <  this.gridSize; j++) {
            var td=document.createElement('td');
            td.onclick=this.clickCell;
            // Вот это я молодец...
            row.appendChild(td);
            this.arrayTds[i].push(td);
        }
        
        table.appendChild(row);
    }
    document.querySelector("body").appendChild(wrapper).appendChild(table);
}
Tic_tac.prototype.clearGamingField = function(){
    // Чистка ячеек
    for(let i=0;i<this.gridSize;i++){
        for(let j=0;j<this.gridSize;j++){
            this.arrayTds[i][j].innerHTML="";
        }
    }
    // Ход игрока по умолчанию
    this.turn=0;
    // Колличество серий меток (по направлениям) приводим к начальным значениям
    for (let i = 0; i < this.players.length; i++) {
        this.players[i].seriesMarks= new this.SeriesMarks(1);
    }
}
Tic_tac.prototype.isNumeric = function(n){
    return !isNaN(parseFloat(n) && isFinite(n));
}
Tic_tac.prototype.nextTurn = function(){
    this.turn++;
    if(this.turn>=this.players.length){
        this.turn=0;
    }
}
Tic_tac.prototype.checkForVictory = function(currentTd){
    checkTopArea.call(this,currentTd);
    checkBottomArea.call(this,currentTd);
    checkLeftSide.call(this,currentTd);
    checkRightSide.call(this,currentTd);
    // После рекурсивных проверок всех сторон два условия для вердикта
    ////    ////    ////    ////    ////    ////    ////    ////
    console.log(this.players[this.turn].seriesMarks)
    if(checkSeriesMarks.call(this,this.players[this.turn].seriesMarks)){
        console.log("Победа игрока "+this.turn);
        return true;
    }
    else{
            this.players[this.turn].seriesMarks=new this.SeriesMarks(1);
    }
    return false;
    //// ОБЬЯВЛЕНИЕ вложенных ФУНКЦИЙ ////
    function checkSeriesMarks(Marks){
        for (let side in Marks) {
            if(Marks[side]>=this.victoryCondition){
                return true;
            }
        }
        return false;
    }
    function checkTopArea(currentTd) {
        // Текущие индексы строки/ячейки в массиве this.arrayTds
        var indexTd=currentTd.cellIndex,
            indexRow=currentTd.parentElement.rowIndex,
            mark=this.players[this.turn].mark;
        // Проверка доступности клеток относительно текущего <td>
        /////
        // Проверка существования вверха
        if (this.arrayTds[indexRow-1] && this.arrayTds[indexRow-1][indexTd]!==undefined) {
            var top_td=this.arrayTds[indexRow-1][indexTd];
            // Проверка вверха на наличие меток пользователя
            if(top_td.innerHTML.indexOf(mark)!==-1){
                this.players[this.turn].seriesMarks.top++;
                checkTopArea.call(this,top_td);
                return;
            }
            // Проверка diagonal_top_left
            if(this.arrayTds[indexRow-1][indexTd-1]!==undefined && this.arrayTds[indexRow-1][indexTd-1].innerHTML.indexOf(mark)!==-1){
                var top_left_td=this.arrayTds[indexRow-1][indexTd-1];
                this.players[this.turn].seriesMarks.diagonal_top_left++;
                checkTopArea.call(this,top_left_td);
                return;
            }
            // Проверка diagonal_top_right
            if(this.arrayTds[indexRow-1][indexTd+1]!==undefined && this.arrayTds[indexRow-1][indexTd+1].innerHTML.indexOf(mark)!==-1){
                var top_right_td=this.arrayTds[indexRow-1][indexTd+1];
                this.players[this.turn].seriesMarks.diagonal_top_right++;
                checkTopArea.call(this,top_right_td);
                return;
            }
        }
    }
    function checkBottomArea(currentTd) {
        // Текущие индексы строки/ячейки в массиве $this.arrayTds
        var indexTd=currentTd.cellIndex,
            indexRow=currentTd.parentElement.rowIndex,
            mark=this.players[this.turn].mark;
        // Проверка доступности клеток относительно текущего <td>
        /////
        // Проверка существования низа
        if (this.arrayTds[indexRow+1] && this.arrayTds[indexRow+1][indexTd]!==undefined) {
            var bottom_td=this.arrayTds[indexRow+1][indexTd];
            // Проверка низа на наличие меток пользователя
            if(bottom_td.innerHTML.indexOf(mark)!==-1){
                this.players[this.turn].seriesMarks.top++;
                checkBottomArea.call(this,bottom_td);
                return;
            }
            // Проверка diagonal_bottom_left
            if(this.arrayTds[indexRow+1][indexTd-1]!==undefined && this.arrayTds[indexRow+1][indexTd-1].innerHTML.indexOf(mark)!==-1){
                var bottom_left_td=this.arrayTds[indexRow+1][indexTd-1];
                this.players[this.turn].seriesMarks.diagonal_bottom_left++;
                checkBottomArea.call(this,bottom_left_td);
                return;
            }
            // Проверка diagonal_bottom_right
            if(this.arrayTds[indexRow+1][indexTd+1]!==undefined && this.arrayTds[indexRow+1][indexTd+1].innerHTML.indexOf(mark)!==-1){
                var bottom_right_td=this.arrayTds[indexRow+1][indexTd+1];
                this.players[this.turn].seriesMarks.diagonal_bottom_right++;
                checkBottomArea.call(this,bottom_right_td);
                return;
            }
        }
    }
    function checkLeftSide(currentTd){
        var indexTd=currentTd.cellIndex,
            indexRow=currentTd.parentElement.rowIndex,
            mark=this.players[this.turn].mark;
        // Проверка существования левой ячейки
        if(this.arrayTds[indexRow][indexTd-1]!==undefined && this.arrayTds[indexRow][indexTd-1].innerHTML.indexOf(mark)!==-1){
            var left_td=this.arrayTds[indexRow][indexTd-1];
            // Увеличиваем нашу серию меток...
            this.players[this.turn].seriesMarks.left++;
            checkLeftSide.call(this,left_td);
            return;
        }
    }
    function checkRightSide(currentTd){
        var indexTd=currentTd.cellIndex,
            indexRow=currentTd.parentElement.rowIndex,
            mark=this.players[this.turn].mark;
        // Проверка существования правой ячейки
        if(this.arrayTds[indexRow][indexTd+1]!==undefined && this.arrayTds[indexRow][indexTd+1].innerHTML.indexOf(mark)!==-1){
            var right_td=this.arrayTds[indexRow][indexTd+1];
            // Увеличиваем нашу серию меток...
            this.players[this.turn].seriesMarks.right++;
            checkRightSide.call(this,right_td);
            return;
        }
    }
}
Tic_tac.prototype.isFreeCells = function(){
    for(let i=0;i<this.gridSize;i++){
        for(let j=0;j<this.gridSize;j++){
            if(!(this.arrayTds[i][j].innerHTML)){
                return true;
            }
        }
    }
    return false;
}
Tic_tac.prototype.checkCellnoEmpty = function(e){
    return e.target.innerHTML;
}