let orderTable = document.getElementById("orderTable");


function getOrders() {
  let data = JSON.parse(localStorage.getItem("orders"));
  if (!data) return [];
  if (!Array.isArray(data)) return [data];
  return data;
}


function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}


function drawOrders() {
  let orders = getOrders();
  let cofes = JSON.parse(localStorage.getItem("cofes")) || [];

  orderTable.innerHTML = "";

  orders.forEach((order, index) => {
    let coffeeHTML = "";

    if (order.orders && Array.isArray(order.orders)) {
      order.orders.forEach(item => {
        let product = cofes.find(c => c.id == item.cofeId);

        if (product) {
          coffeeHTML += 
           ` <div class="flex items-center gap-3 mb-2">
              <img class="w-12 h-12"
                   src="./images/${product.img}" />
              <div>
                <p class="font-bold">${product.name}</p>
                <p>Soni: ${item.count}</p>
              </div>
            </div>`
          ;
        }
      });
    }

    orderTable.innerHTML += 
     ` <tr class="">
        <td class="border-2 px-4 py-2 text-xl">${index + 1}</td>
        <td class="border-2 px-4 text-xl">${order.fio}</td>
        <td class="border-2 px-4 text-xl">${order.location}</td>
        <td class="border-2 px-4 text-xl">${order.phone}</td>
        <td class="border-2 px-4 py-2">${coffeeHTML}</td>
        <td class="border-2 px-4 text-center">
          <button onclick="deleteOrder(${index})">
            <i class="fa-regular fa-trash-can  text-xl"></i>
          </button>
        </td>
      </tr>`
    ;
  });
}


function deleteOrder(index) {
  let orders = getOrders();
  orders.splice(index, 1);
  saveOrders(orders);
  drawOrders();
}


drawOrders();