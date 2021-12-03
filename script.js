'use strict';
// let title;
// let screens;
// let screenPrice;
// let rollback = 24;
// let adaptive;
// let service1;
// let service2;
// let servicePrice1;
// let servicePrice2;
// let fullPrice;
// let servicePercentPrice;
// let allServicePrices;

const appData = {
 title: '',
 screens: '',
 screenPrice: 0,
 rollback: 24,
 adaptive: true,
 service1: '',
 service2: '',
 servicePrice1: 0,
 servicePrice2: 0,
 fullPrice: 0,
 servicePercentPrice: 0,
 allServicePrices: 0,
    
    asking: function() {
      appData.title = prompt('Как называется ваш проект?', 'Калькулятор вёрстки').trim();
      appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные');

      do {
        appData.screenPrice = prompt('Сколько будет стоить данная работа?');
      } while (!appData.isNumber(appData.screenPrice));

      appData.adaptive = prompt('Нужен ли адаптив на сайте?');
    },

    isNumber: function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
    },
    
    getServicePercentPrice: function() {
  return appData.fullPrice - (appData.fullPrice*(appData.rollback/100));
    },

    getAllServicePrices: function() {
      let sum = 0;

      for (let i = 0; i < 2; i++) {
        let price = 0;

        if (i === 0) {
          appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
          appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
        }

        do {
          price = prompt("Сколько это будет стоить?");
        } while(!appData.isNumber(price));
      }
      return sum;
    },

    getFullPrice: function() {
  return appData.screenPrice + appData.allServicePrices;
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
   return appData.title[0].toUpperCase() + appData.title.slice(1);
   },

  start: function() {
     appData.asking();
     appData.logger();
  },
  logger: function() {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrice();
    appData.title = appData.getTitle();
    
    for (let elem in appData) {
    console.log(elem, appData[elem]);
   }
  },
  
};

appData.start();