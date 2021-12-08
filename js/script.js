'use strict';
const title = document.getElementsByTagName('h1');
console.log(title[0]);

const buttonHandler1 = document.getElementsByClassName('handler_btn')[0];
console.log(buttonHandler1);
const buttonHandler2 = document.getElementsByClassName('handler_btn')[1];
console.log(buttonHandler2);

const buttonScreen = document.querySelector('.screen-btn');
console.log(buttonScreen);

const otherItem1 = document.querySelectorAll('.other-items.percent');
console.log(otherItem1);
const otherItem2 = document.querySelectorAll('.other-items.number');
console.log(otherItem2);

const inputRange = document.querySelector('.rollback > .main-controls__range > [type = range]');
console.log(inputRange);

const span = document.querySelector('.rollback > .main-controls__range > .range-value');
console.log(span);

const totalInput1 = document.getElementsByClassName('total-input')[0];
console.log(totalInput1);
const totalInput2 = document.getElementsByClassName('total-input')[1];
console.log(totalInput2);
const totalInput3 = document.getElementsByClassName('total-input')[2];
console.log(totalInput3);
const totalInput4 = document.getElementsByClassName('total-input')[3];
console.log(totalInput4);
const totalInput5 = document.getElementsByClassName('total-input')[4];
console.log(totalInput5);

let screens = document.querySelectorAll('.screen');
console.log(screens);


const appData = {
 title: '',
 screens: [],
 screenPrice: 0,
 rollback: 24,
 adaptive: true,
 services: {},
 servicePrice1: 0,
 servicePrice2: 0,
 fullPrice: 0,
 servicePercentPrice: 0,
 allServicePrices: 0,
 start: function() {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrice();
    appData.getTitle();
  
     
    appData.logger();
  },
  isNumber: function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  isString: function (str, comma = false) {
    const pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z0-9]+$/ : /^[ а-яА-ЯёЁa-zA-Z0-9]+$/;
    return pattern.test(str);
  },
  asking: function() {
      do {
      appData.title = prompt('Как называется ваш проект?', 'Калькулятор вёрстки');
      } while(!appData.isString(appData.title) || appData.isNumber(appData.title));

      for (let i = 0; i < 2; i++) {
        let name = '';
        do {
        name = prompt('Какие типы экранов нужно разработать?').trim();
        } while (!appData.isString(name) || appData.isNumber(name));
        
        let price = 0;

        do {
          price = prompt('Сколько будет стоить данная работа?').trim();
      } while (!appData.isNumber(price));

      appData.screens.push({id: i, name: name, price: price});

      }

      for (let i = 0; i < 2; i++) {
        let name = '';
        do {
          name = prompt('Какой дополнительный тип услуги нужен?').trim();
        } while (!appData.isString(name) || appData.isNumber(name));

          let price = 0;

          do {
              price = prompt("Сколько это будет стоить?");
          } while(!appData.isNumber(price));
          
          appData.services[name] = +price;
      }

      appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },  
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }  

    for(let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  getServicePercentPrice: function() {
    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice*(appData.rollback/100));
  },
  getFullPrice: function() {
     appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },
  getRollbackMessage: function(price) {
     if (price >= 30000) {
       return "Даем скидку в 10%";
     } else if (price >= 15000 && price < 30000) {
       return "Даем скидку в 5%";
     } else if (price > 0 && price < 15000) {
       return "Скидка не предусмотрена";
     } else if (price < 0 ) {
       return "Что-то пошло не так";
     }
  },
  getTitle: function () {
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLocaleLowerCase();
  },
  logger: function() {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
};

appData.start();