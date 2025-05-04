let billAmountInput = document.querySelector(".bill") as HTMLInputElement;
let tipInput = document.querySelector(".tip") as HTMLInputElement;
let calculateBtn = document.querySelector(".calculate") as HTMLButtonElement;
let displayTotal = document.getElementById("total") as HTMLSpanElement

calculateBtn.onclick = () => {
    if (tipInput.value && billAmountInput.value) {
        let billValue :number = +billAmountInput.value;
        let tipValue:number = +tipInput.value;
        calculateTotal(billValue, tipValue);
    }
}
function calculateTotal(billValue:number, tipValue: number):void {
    let total = billValue + ((tipValue * billValue) / 100);
    displayTotal.innerHTML = `$${total.toFixed(2)}`;
}
