'use strict';
let title = prompt('Как называется ваш проект?');
console.log(title);

let screens = prompt('Какие типы экранов нужно разработать?');
console.log(screens);

let screenPrice = prompt('Сколько будет стоить данная работа?');
console.log(screenPrice);

let rollback = 24;
let fullPrice = 1000;


let adaptive = prompt('Нужен ли адаптив на сайте?');
console.log(adaptive);

let service1 = prompt('Какой дополнительный тип услуги нужен?');
console.log(service1);
let servicePrice1 = prompt('Сколько это будет стоить?');
console.log(servicePrice1);
let service2 = prompt('Какой дополнительный тип услуги нужен?');
console.log(service2);
let servicePrice2 = prompt('Сколько это будет стоить?');
console.log(servicePrice2);

fullPrice = Number(screenPrice) + Number(servicePrice1) + Number(servicePrice2);
console.log(fullPrice);

let servicePercentPrice = Math.ceil(Number(fullPrice) - Number(fullPrice*(rollback/100)));
console.log(servicePercentPrice);


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);

console.log(screens.length);

console.log(screens.toLowerCase().split(" "));

console.log(`Процент отката посреднику за работу ${fullPrice*(rollback/100)} рублей`);

if (fullPrice >= 30000) {
  console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log('Даем скидку в 5%');
} else if (fullPrice > 0 && fullPrice < 15000) {
  console.log('Скидка не предусмотрена');
} else if (fullPrice < 0 ) {
  console.log('Что-то пошло не так');
}







alert("Hello");
console.log("Любой текст сообщения");