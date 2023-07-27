const inputBill = document.querySelector('#input-bill');
const inputTip = document.querySelector('#input-tip');
const inputPeople = document.querySelector('#input-people');
const tipBtns = document.querySelectorAll('.tip-box');
const resetBtn = document.querySelector('.reset-btn');
const tipAmount = document.querySelector('#tip-amount');
const totalPerPerson = document.querySelector('#total-person-amount');
const textoFail = document.querySelector('.fail-text');
let bill;
let tip;
let people;
let hayBill = false;
let hayTip = false;
let hayPeople = false;

function reflejarResultados(){
    let tipPorPersona = (bill*(tip/100))/people;
    tipPorPersona = tipPorPersona.toFixed(2);
    let totalPorPersona = (bill+(bill*(tip/100)))/people;
    totalPorPersona = totalPorPersona.toFixed(2)
    tipAmount.innerHTML = `$${tipPorPersona}`;
    totalPerPerson.innerHTML = `$${totalPorPersona}`;
    resetBtn.classList.add('no-opacity');
}

function resetarValores(){
    tipAmount.innerHTML = `$0.00`;
    totalPerPerson.innerHTML = `$0.00`;
    hayBill = false;
    hayTip = false;
    hayPeople = false;
    inputBill.value = "";
    tipBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    inputTip.value = "";
    inputPeople.value = "";
    textoFail.classList.add('none');
    resetBtn.classList.remove('no-opacity');
}

inputBill.addEventListener('focusout',() =>{
    bill = parseFloat(inputBill.value);
    resetBtn.classList.remove('no-opacity');
    if (inputBill.value === ""){
        hayBill = false;
    }
    else{
        hayBill = true;
    }
    if(hayBill && hayPeople && hayBill){
        reflejarResultados();
    }
    console.log(hayBill);
})

tipBtns.forEach(boton => {
    resetBtn.classList.remove('no-opacity');
    boton.addEventListener('click',() =>{
        tipBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        boton.classList.add('active');
        tip = parseFloat(boton.value);
        hayTip = true;
        if(hayBill && hayPeople && hayBill){
            reflejarResultados();
        }
    })
});

inputTip.addEventListener('focusout',() =>{
    resetBtn.classList.remove('no-opacity');
    hayTip = false;
    tipBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    if(inputTip.value === ""){
        hayTip = false;
    }
    else{
        hayTip = true;
        tip = parseFloat(inputTip.value);
        if(hayBill && hayPeople && hayBill){
            reflejarResultados();
        }
    }
})

inputPeople.addEventListener('focusout',() =>{
    resetBtn.classList.remove('no-opacity');
    textoFail.classList.add('none');
    inputPeople.classList.remove('fail-input');
    if(inputPeople.value === ""){
        hayPeople = false;
    }
    else if (inputPeople.value === '0'){
        textoFail.classList.remove('none');
        hayPeople = false;
        inputPeople.classList.add('fail-input');
    }
    else{
        hayPeople = true;
        people = parseFloat(inputPeople.value);
        if(hayBill && hayPeople && hayBill){
            reflejarResultados();
        }
    }
})

resetBtn.addEventListener('click', resetarValores);

