const dishInput = document.getElementById("dish");
const priceInput = document.getElementById("price");
const tableInput = document.getElementById("table");
const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const dishValue = dishInput.value;
    const priceValue = priceInput.value;
    const tableValue = tableInput.value;

    if (!dishValue || !priceValue) {
        alert("Please enter both dish name and price.");
        return;
    }

    const order = {
        id: Date.now(), 
        dish: dishValue,
        price: priceValue,
        table: tableValue
    };
    
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    dishInput.value = "";
    priceInput.value = "";
    tableInput.value = "Table 1";

    loadOrders();
});

function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    document.getElementById("table1Orders").innerHTML = "";
    document.getElementById("table2Orders").innerHTML = "";
    document.getElementById("table3Orders").innerHTML = "";

    let totalTable1 = 0;
    let totalTable2 = 0;
    let totalTable3 = 0;

    let indexTable1 = 1;
    let indexTable2 = 1;
    let indexTable3 = 1;

    orders.forEach(order => {
        const orderRow = document.createElement("tr");
        let index;
        let price = parseFloat(order.price);

        if (order.table === "Table 1") {
            index = indexTable1++;
            totalTable1 += price;
            document.getElementById("table1Orders").appendChild(orderRow);
        } else if (order.table === "Table 2") {
            index = indexTable2++;
            totalTable2 += price;
            document.getElementById("table2Orders").appendChild(orderRow);
        } else if (order.table === "Table 3") {
            index = indexTable3++;
            totalTable3 += price;
            document.getElementById("table3Orders").appendChild(orderRow);
        }

        orderRow.innerHTML = `
            <td>${index}</td>
            <td>${order.dish}</td>
            <td>₹${order.price}</td>
            <td>
                <button onclick="editOrder(${order.id})" class="edit-btn">Edit</button>
               <button onclick="deleteOrder(${order.id})" class="delete-btn">Delete</button>
            </td>
        `;
    });

    document.getElementById("totalTable1").textContent = `Total: ₹${totalTable1.toFixed(2)}`;
    document.getElementById("totalTable2").textContent = `Total: ₹${totalTable2.toFixed(2)}`;
    document.getElementById("totalTable3").textContent = `Total: ₹${totalTable3.toFixed(2)}`;
}

function deleteOrder(orderId) {
    if (confirm("Do you want to delete this order?")) {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders = orders.filter(order => order.id !== orderId);
        localStorage.setItem("orders", JSON.stringify(orders));
        loadOrders();
    }
}


function editOrder(orderId) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let orderToEdit = orders.find(order => order.id === orderId);

    if (!orderToEdit) return;

    dishInput.value = orderToEdit.dish;
    priceInput.value = orderToEdit.price;
    tableInput.value = orderToEdit.table;

    orders = orders.filter(order => order.id !== orderId);
    localStorage.setItem("orders", JSON.stringify(orders));

    loadOrders();
    window.scrollTo({ top: 0, behavior: "smooth" });
}


window.onload = loadOrders;
