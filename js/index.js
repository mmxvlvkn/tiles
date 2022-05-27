//получаем элемент, содержащий все плитки, элемент body и элемент the-end 
const body = document.querySelector('body');
const content = document.querySelector('.play__content');
const theEnd = document.querySelector('.the-end');
const win = document.querySelector('.the-end');
const theEndButton = document.querySelector('.the-end__image');
const winButton = document.querySelector('.win__image');

// массив плиток
let tiles = [];
for (let i = 0; i < 10; i++) {
    tiles.push([]);
}

// заполняем массив плиток
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        tiles[i][j] = {
            value: document.getElementById(`${10*i + j}`),
            isActivated: false,
        };
    }
}

// переменная для координат текущей клетки
const coordinates = {};

// создаем контейнер для верной плитки
let rightTile;

// Запускаем программу
start();

//...............................................................................................................//

//вешаем событие клика на элемент
content.addEventListener('click', function(event) {
    const clickId = event.target.id;
     if (!(Math.floor(clickId / 10) > coordinates.y)) {
        if (!tiles[Math.floor(clickId / 10)][clickId % 10].isActivated) {
            if (rightTile.value === event.target) {
                if (0 <= clickId && clickId < 10) {
                    rightTile.value.classList.add('_activated');
                    rightTile.isActivated = true;

                    setTimeout(function () {
                        body.classList.add('_lock');
                        win.classList.add('_active');
                    }, 300);
                } else {
                    rightTile.value.classList.add('_activated');
                    rightTile.isActivated = true;

                    coordinates.x = clickId % 10;
                    coordinates.y = Math.floor(clickId / 10);
                    rightTile = getRightTile(coordinates);
                    console.log(rightTile);
                }
            } else {
                if (event.target.classList.contains('play__item')) {
                    event.target.classList.add('_the-end');

                    setTimeout(function () {
                        body.classList.add('_lock');
                        theEnd.classList.add('_active');
                    }, 300);
                }
            }
        }
    }
});

//вешаем событие клика на кнопку перезапуска
theEndButton.addEventListener('click', function() {
    body.classList.remove('_lock');
    theEnd.classList.remove('_active');
    start();
});

winButton.addEventListener('click', function() {
    body.classList.remove('_lock');
    win.classList.remove('_active');
    start();
});

//...............................................................................................................//

// функция для обнуления и запуска игры
function start() {
    // чистим поле от классов в плитках
    for (let item of content.querySelectorAll('._activated')) {
        item.classList.remove('_activated');
        tiles[Math.floor(item.id / 10)][item.id % 10].isActivated = false;
    }
    for (let item of content.querySelectorAll('._the-end')) {
        item.classList.remove('_the-end');
    }

    // переменная для рандомных чисел
    let randomNum = random(0, 9);

    // рандомно выбирает первую клетку
    tiles[9][randomNum].value.classList.add('_activated');
    tiles[9][randomNum].isActivated = true;

    // запоминает координаты текущей клетки
        coordinates.x = randomNum;
        coordinates.y = 9;

    // получаем следующую верную клетку
    rightTile = getRightTile(coordinates);
    console.log(rightTile);

}

// функция целочисленно рандома рандома от num1 до num2 включительно
function random(num1, num2) {
    return Math.floor(Math.random() * (num2 - num1 + 1) + num1);
}

// функция получения следующего правильного выбора
function getRightTile(coordinates) {
    //TODO прописать логику боков
    // получение рандомного числа из нужного диапазона в зависимости от позиции: 1-2/1-3
    let randomMax = 3;
    if (tiles[coordinates.y][coordinates.x - 1].isActivated) {
        randomMax = 2;
    } else if (tiles[coordinates.y][coordinates.x + 1].isActivated) {
        randomMax = 2;
    }
    let randomNum = random(1, randomMax);

    // получение нужной клетки
    if (randomNum === 1) {
        return tiles[coordinates.y - 1][coordinates.x];
    } else {
        if (randomMax === 2) {
            if (!tiles[coordinates.y][coordinates.x - 1].isActivated) {
                return tiles[coordinates.y][coordinates.x - 1];
            } else {
                return tiles[coordinates.y][coordinates.x + 1];
            }
        } else {
            if (randomNum === 2) {
                return tiles[coordinates.y][coordinates.x - 1];
            } else {
                return tiles[coordinates.y][coordinates.x + 1];
            }
        }
    }
}

