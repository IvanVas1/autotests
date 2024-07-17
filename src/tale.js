function kolobok (character) {
     switch (character) {
             case "дедушка":
                 console.log("Я от дедушки ушел");
                 break;
             case "лиса":
                 console.log("Меня съели");
                 break;
             case "заяц":
                 console.log("Я от зайца ушел");
                 break;
             default:
                 console.log("Недопустимое значение")
     }
}

function newYear (personage) {
    if (personage === 'Дед Мороз' || personage === 'Снегурочка') {
        console.log(`${personage}! `.repeat(3));
    } else {
        console.log("Персонаж не определен");
    }
}
