const dishInput = document.getElementById("dish");
const priceInput = document.getElementById("price");
const tableInput = document.getElementById("table");
const orderForm = document.getElementById("orderForm");
const editOrderInput = document.getElementById("editOrder");
const apiUrl = "https://crudcrud.com/api/e59f97c66c58474b94b8fa3c6ad37cf2/order";

orderForm.addEventListener("submit",async function (event) {
    event.preventDefault();

    const dishValue = dishInput.value;
    const priceValue = priceInput.value;
    const tableValue = parseInt(tableInput.value);
    const orderId = editOrderInput.dataset.editingId;
    

    if (!dishValue || !priceValue) {
        alert("Please enter both dish name and price.");
        return;
    }

    const order = { 
        dish: dishValue,
        price: priceValue,
        table: tableValue
    };
    
    try {
        if (orderId) {
            
            await axios.put(`${apiUrl}/${orderId}`, order, {
                    headers: { "Content-Type": "application/json" }
                });
            delete editOrderInput.dataset.editingId; 
            dishInput.value = "";
            priceInput.value = "";
            tableInput.value = "1";
            loadOrders();
        } else {
            await axios.post(apiUrl, order);
            dishInput.value = "";
            priceInput.value = "";
            tableInput.value = "1";
            loadOrders();
        }
    } catch(error){
        console.error("Error adding order:", error);
    }   

    
});

async function loadOrders() {
  try 
  {
        const response = await axios.get(apiUrl);
        const orders = response.data;

        //const orders = JSON.parse(localStorage.getItem("orders")) || [];

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

            if (order.table === 1) {
                index = indexTable1++;
                totalTable1 += price;
                document.getElementById("table1Orders").appendChild(orderRow);
            } else if (order.table === 2) {
                index = indexTable2++;
                totalTable2 += price;
                document.getElementById("table2Orders").appendChild(orderRow);
            } else if (order.table === 3) {
                index = indexTable3++;
                totalTable3 += price;
                document.getElementById("table3Orders").appendChild(orderRow);
            }

            orderRow.innerHTML = `
                <td>${index}</td>
                <td>${order.dish}</td>
                <td>₹${order.price}</td>
                <td>
                    <button onclick="editOrder('${order._id}')" class="edit-btn">Edit</button>
                <button onclick="deleteOrder('${order._id}')" class="delete-btn">Delete</button>
                </td>
            `;
        });

        document.getElementById("totalTable1").textContent = `Total: ₹${totalTable1.toFixed(2)}`;
        document.getElementById("totalTable2").textContent = `Total: ₹${totalTable2.toFixed(2)}`;
        document.getElementById("totalTable3").textContent = `Total: ₹${totalTable3.toFixed(2)}`;

  } catch (error) {
        console.error("Error loading orders:", error);
    }   
}

async function deleteOrder(orderId) {
    if (confirm("Do you want to delete this order?")) {
        try {
            await axios.delete(`${apiUrl}/${orderId}`);
            loadOrders();
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    }
}


async function editOrder(orderId){
    
    try {
        const response = await axios.get(`${apiUrl}/${orderId}`);
        const orderToEdit = response.data;

        dishInput.value = orderToEdit.dish;
        priceInput.value = orderToEdit.price;
        tableInput.value = orderToEdit.table;

        editOrderInput.dataset.editingId = orderId;
    
        window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {
        console.error("Error editing order:", error);
    }
}


window.onload = loadOrders;
