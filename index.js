const dishInput = document.getElementById("dish");
const priceInput = document.getElementById("price");
const tableInput = document.getElementById("table");
const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const dishValue = document.getElementById("dish").value;
    const priceValue = document.getElementById("price").value;
    const tableValue = document.getElementById("table").value;

    const order = {
        dish : dishValue,
        price : priceValue,
        table : tableValue
    }
    
    localStorage.setItem("order",JSON.stringify(order));

    dishInput.value = "";
    priceInput.value = "";
    tableInput.value = "Table 1";

    console.log("Dish:", dishValue);
    console.log("Price:", priceValue);
    console.log("Table:", tableValue);
    
});

const savedOrder = JSON.parse(localStorage.getItem("order"));
console.log(savedOrder);

