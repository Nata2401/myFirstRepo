'use strict';
let title = prompt('Как называется ваш проект?').trim();
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let rollback = 24;
let adaptive = prompt('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let fullPrice = Number(screenPrice) + Number(servicePrice1) + Number(servicePrice2);
let servicePercentPrice = Math.ceil(Number(fullPrice) - Number(fullPrice*(rollback/100)));
let allServicePrices;

const showTypeOf = function(variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function() {
  return servicePrice1 + servicePrice2;
};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getServicePercentPrice = function() {
  return fullPrice - (fullPrice*(rollback/100));
};

const getRollbackMessage = function(price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price > 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else if (price < 0 ) {
      return "Что-то пошло не так";
    }
};

const getTitle = function () {
   return title[0].toUpperCase() + title.slice(1);
};


showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrice();
title = getTitle();

console.log(getTitle());
console.log(getRollbackMessage(fullPrice));
console.log(getAllServicePrices(allServicePrices));
console.log(getFullPrice(fullPrice));
console.log(getServicePercentPrice(servicePercentPrice));
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.length);
console.log(screens.toLowerCase().split(" "));
console.log(`Процент отката посреднику за работу ${fullPrice*(rollback/100)} рублей`);
