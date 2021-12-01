'use strict';
let title;
let screens;
let screenPrice;
let rollback = 24;
let adaptive;
let service1;
let service2;
let servicePrice1;
let servicePrice2;

let fullPrice = Number(screenPrice) + Number(servicePrice1) + Number(servicePrice2);
let servicePercentPrice = Math.ceil(Number(fullPrice) - Number(fullPrice*(rollback/100)));
let allServicePrices;

const isNumber = function(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function() {
  title = prompt('Как называется ваш проект?', 'Калькулятор вёрстки').trim();
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные');

  // while (!isNumber(screenPrice)) {
  //   screenPrice = prompt('Сколько будет стоить данная работа?');
  // }

  do {
    screenPrice = +prompt('Сколько будет стоить данная работа?');
  } while (isNumber(screenPrice) || screenPrice !== null);

  adaptive = prompt('Нужен ли адаптив на сайте?');
};

const showTypeOf = function(variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }

    sum += (() => {
            let n = 0;
            do {
                n = prompt('Сколько это будет стоить?');
            } while (!isNumber(n));
            return +n;
        })();
  }
  return sum;
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

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrice();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getTitle());
console.log(getRollbackMessage(fullPrice));
console.log(getFullPrice(fullPrice));
console.log(getServicePercentPrice(servicePercentPrice));
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.length);
console.log(screens.toLowerCase().split(" "));
console.log(`Процент отката посреднику за работу ${fullPrice*(rollback/100)} рублей`);

console.log('allServicePrices', allServicePrices);