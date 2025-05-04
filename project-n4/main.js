var billAmountInput = document.querySelector(".bill");
var tipInput = document.querySelector(".tip");
var calculateBtn = document.querySelector(".calculate");
var displayTotal = document.getElementById("total");
calculateBtn.onclick = function () {
    if (tipInput.value && billAmountInput.value) {
        var billValue = +billAmountInput.value;
        var tipValue = +tipInput.value;
        calculateTotal(billValue, tipValue);
    }
};
function calculateTotal(billValue, tipValue) {
    var total = billValue + ((tipValue * billValue) / 100);
    displayTotal.innerHTML = "$".concat(total.toFixed(2));
}
