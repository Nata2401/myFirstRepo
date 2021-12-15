'use strict';

let title = document.getElementsByTagName('h1')[0];
let btnStart = document.getElementsByClassName("handler_btn")[0];
let btnReset = document.getElementsByClassName("handler_btn")[1];
let btnPlus = document.querySelector(".screen-btn");
let number = document.querySelectorAll(".other-items.number");
let percent = document.querySelectorAll(".other-items.percent");
let rollbackInput = document.querySelector(".rollback > div > input[type=range]");
let rangeValue = document.querySelector(".rollback > div > span.range-value");
let totalInputHtml = document.getElementsByClassName("total-input")[0];
let totalInputScreens = document.getElementsByClassName("total-input")[1];
let totalInputServices = document.getElementsByClassName("total-input")[2];
let totalInputValue = document.getElementsByClassName("total-input")[3];
let totalInputRollback = document.getElementsByClassName("total-input")[4];
let screens = document.querySelectorAll(".screen");

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
        btnStart.addEventListener('click', this.checkValues.bind(appData));
        btnPlus.addEventListener('click', this.addScreenBlock);
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
        totalInputHtml.value = this.screenPrice;
        totalInputServices.value = this.servicePricesPercent + this.servicePricesNumber;
        totalInputValue.value = this.fullPrice;
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
        number.forEach(item => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked){
                this.servicesNumber[label.textContent] = +input.value;
            }
        });

        percent.forEach(item => {
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
        totalInputScreens.value = screenCount;
    },

    addRollback: function(){
        rollbackInput.addEventListener('input', () => {
            rangeValue.innerText = rollbackInput.value + "%";
            this.rollback = rollbackInput.value;
        
            this.addRollbackValue();
        });       
    },    

    addRollbackValue: function() {
        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback/100));

        totalInputRollback.value = this.servicePercentPrice; 
    },

    titleCorrector: function (){
        this.title = this.title.trim().slice(0, 1).toUpperCase() + this.title.toLowerCase().trim().slice(1);
    },

    makeDisable: function(){
        let viewsSelect = document.querySelectorAll("select[name=views-select]");
        let inputText = document.querySelectorAll(".main-controls__item.screen > div > input");
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

        btnStart.style.display = "none";
        btnReset.style.display = "block";

        btnReset.addEventListener('click', () => {
            screens = document.querySelectorAll(".screen");
            screens.forEach((elem,index) => {
                if(index > 0){
                    elem.remove();
                }
            });
            console.log(screens);
            let g = screens[0];
            screens = [];
            screens.push(g);
            console.log(screens);
            
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

            btnStart.style.display = "block";
            btnReset.style.display = "none";
            rollbackInput.value = "0";
            rangeValue.innerText = "0%";

            let mainTotal = document.querySelectorAll(".total-input");
            mainTotal.forEach((elem) =>{
                elem.disabled = false;
                elem.value = "0";
                elem.disabled = true;
            });
            this.reset();
        });
    },
    
    reset: function(){
        this.screens = [];
        this.rollback = 0;
        this.screenPrice = 0;
        this.adaptive = true;
        this.title = "";
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.count = [];
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.init();
    },

    logger: function() {
         console.log(this.fullPrice); 
    }
};
appData.init();