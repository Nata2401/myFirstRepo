'use strict';
const title = document.getElementsByTagName('h1')[0];

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');


const inputRange = document.querySelector('.rollback > .main-controls__range > input[type = range]');
const span = document.querySelector('.rollback > .main-controls__range > .range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

const totalScreens = document.querySelector('.main-controls__input > input[type=text]');
const select = document.querySelectorAll('select');

let screens = document.querySelectorAll('.screen');


const appData = {
    screens: [],
    rollback: 0,
    screenPrice: 0,
    adaptive: true,
    title: "",
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    count: [],
    servicesPercent: {},
    servicesNumber: {},
    isError: false,

    init: function(){
        this.addTitle();        
        startBtn.addEventListener('click', this.checkValues.bind(appData));
        buttonPlus.addEventListener('click', this.addScreenBlock);
        this.addRollback();
    },

    addTitle: function(){
        document.title = title.textContent;
    },

    start: function(){
        this.addScreens();
        this.addServices();
        this.addPrices.call(appData);
        this.addRollback();
        console.log(appData);
        this.showResult();
        this.makeDisable();
    },

    checkValues: function(){
        this.isError = false;
        screens = document.querySelectorAll(".screen");
        screens.forEach(screen => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input[type=text]");

            if(select.value === "" || input.value === ""){
                this.isError = true;
            }
        });

        if(!appData.isError){
            this.start();
        } else {
            alert("заполни поля");
        }
    },
    
    showResult: function(){
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        this.addRollbackValue();
    },

    addScreens: function(){
        screens = document.querySelectorAll(".screen");
        screens.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;

            this.count.push(input.value);

            this.screens.push({
                id: index, 
                name: selectName, 
                price: +select.value * +input.value
            });
        });
    },

    addScreenBlock: function(){
        const cloneScreen = screens[0].cloneNode(true);
        screens = document.querySelectorAll(".screen");
        screens[(screens.length)-1].after(cloneScreen);
    },

    addServices: function(){
        otherItemsNumber.forEach(item => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked){
                this.servicesNumber[label.textContent] = +input.value;
            }
        });

        otherItemsPercent.forEach(item => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked){
                this.servicesPercent[label.textContent] = +input.value;
            }
        });
    },

    addPrices: function (){
        this.screenPrice = this.screens.reduce((accumulator, currentValue) => {
            return +accumulator + (+currentValue.price);
        }, 0);

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key]/100);
        }
        this.fullPrice =  +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

        let screenCount = 0;
        this.count.forEach((screen) => {
            screenCount += +screen;
        });
        totalCount.value = screenCount;
    },

    addRollback: function(){
        inputRange.addEventListener('input', () => {
            span.innerText = inputRange.value + "%";
            this.rollback = inputRange.value;
        
            this.addRollbackValue();
        });       
    },    

    addRollbackValue: function() {
        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback/100));

        totalCountRollback.value = this.servicePercentPrice; 
    },

    titleCorrector: function (){
        this.title = this.title.trim().slice(0, 1).toUpperCase() + this.title.toLowerCase().trim().slice(1);
    },

    makeDisable: function(){
        let viewsSelect = document.querySelectorAll("select[name=views-select]");
        let inputText = document.querySelectorAll(".main-controls__item.screen > div > input[type=text]");
        let inputCheckbox = document.querySelectorAll("input[type=checkbox]");
        
        inputText.forEach(elem => {
            elem.disabled = true;
        });
        
        inputCheckbox.forEach(elem => {
            elem.disabled = true;
        });

        viewsSelect.forEach(elem => {
            elem.disabled = true;
        });

        startBtn.style.display = "none";
        resetBtn.style.display = "block";

        resetBtn.addEventListener('click', () => {
            screens = document.querySelectorAll(".screen");
            screens.forEach((elem,index) => {
                if(index > 0){
                    elem.remove();
                }
            });
            
            viewsSelect.forEach(elem => {
                elem.disabled = false;
                elem.value = "";
            });

            inputText.forEach(elem => {
                elem.disabled = false;
                elem.value = "";
            });
            
            inputCheckbox.forEach(elem => {
                elem.disabled = false;
                elem.checked = false;
            });

            startBtn.style.display = "block";
            resetBtn.style.display = "none";
            inputRange.value = "0";
            span.innerText = "0%";
            

            let mainTotal = document.querySelectorAll(".total-input");
            console.log(mainTotal);
            mainTotal.forEach((elem) => {
                elem.disabled = false;
                elem.value = "0";
                elem.disabled = true;
            });
            this.reset();
        });
    },
    
    reset: function(){
        this.addScreens();
        this.addPrices.call(appData);
        this.addRollback();
        this.init();
    },

    logger: function() {
      
         console.log(this.fullPrice);
    }
};
appData.init();