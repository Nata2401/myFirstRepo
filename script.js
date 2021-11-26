const title = 'Javascript';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 5;
const rollback = 24;
const fullPrice = 1000;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);

console.log(screens.length);

console.log(screens.toLowerCase().split(" "));

console.log(`Процент отката посреднику за работу ${fullPrice*rollback/100} рублей`);




alert("Hello");
console.log("Любой текст сообщения");