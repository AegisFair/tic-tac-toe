
// Начальная инициализация
    // получение размера сетки
var gamesTicTac=(function(){
    var gridSize=prompt("Размер игрового поля, введите одно число (min=3): ",3);
    if (!isNaN(parseFloat(gridSize) && isFinite(gridSize)) && gridSize>=3) {
        return new Tic_tac(gridSize);
    }else{
        alert("Испугались?=)")
    }
})();
console.log(gamesTicTac);
// Конструктор
// передать размер поля
function Tic_tac(gridSize) {
    // Инициализация сетки
    this.gridSize=gridSize;
    // Отображение сетки

}