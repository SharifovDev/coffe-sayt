let basket = document.getElementById("basket");
let cofePrice = document.getElementById("cofe-price");
let totalPrice = document.getElementById("total-price");
let entregaPrice = document.getElementById("entrega-price");
let span = document.getElementById("span");

function updateSpan() {
  if (!span) return;
  let carShop = JSON.parse(localStorage.getItem("car-shop")) || [];
  span.innerText = carShop.length;
}

function drawBasket() {
  let carShop = JSON.parse(localStorage.getItem("car-shop")) || [];

  basket.innerHTML = "";
  let sum = 0;

  carShop.forEach((item) => {
    let product = null;
    let cofes = JSON.parse(localStorage.getItem("cofes")) || [];

    cofes.forEach((cofe) => {
      if (cofe.id == item.cofeId) {
        product = cofe;
      }
    });

    if (!product) return;

    sum += item.count * product.price;

    basket.innerHTML += `<div class="flex items-center gap-4">
        <img src="./images/${product.img}" />
        <div>
          <h1>${product.name}</h1>
          <div class="flex gap-2">
            <div class="flex bg-[#E6E5E5] px-4 rounded-lg gap-2">
              <p onclick="removeCofeToStorage(${product.id})"
                 class="text-[#8047F8] cursor-pointer">-</p>
              <p>${item.count}</p>
              <p onclick="addCofeToStorage(${product.id})"
                 class="text-[#8047F8] cursor-pointer">+</p>
            </div>

            <div onclick="removeCarShop(${product.id})"
              class="flex cursor-pointer items-center gap-2 bg-[#E6E5E5] px-4 rounded-lg">
              <i class="fa-regular fa-trash-can" style="color:#8047f8"></i>
              <h1>Remover</h1>
            </div>
          </div>
        </div>
        <h1 class="mb-6 font-bold">R$ ${product.price * item.count}</h1>
      </div>
      
      <div class="hidden"></div>`;
  });

  cofePrice.innerText = sum;

  let entrega = carShop.length > 0 ? 350 : 0;
  entregaPrice.innerText = entrega;
  totalPrice.innerText = sum + entrega;

  updateSpan();
}

function addCofeToStorage(id) {
  let carShop = JSON.parse(localStorage.getItem("car-shop")) || [];
  let ishave = false;

  carShop.forEach((item) => {
    if (item.cofeId == id) {
      item.count++;
      ishave = true;
    }
  });

  if (!ishave) {
    carShop.push({ cofeId: id, count: 1 });
  }

  localStorage.setItem("car-shop", JSON.stringify(carShop));
  drawBasket();
}

function removeCofeToStorage(id) {
  let carShop = JSON.parse(localStorage.getItem("car-shop")) || [];

  carShop.forEach((item, index) => {
    if (item.cofeId == id) {
      if (item.count > 1) {
        item.count--;
      } else {
        carShop.splice(index, 1);
      }
    }
  });

  localStorage.setItem("car-shop", JSON.stringify(carShop));
  drawBasket();
  if(typeof drawMain === 'function') {
    drawMain();
  }
}

function removeCarShop(id) {
  let carShop = JSON.parse(localStorage.getItem("car-shop")) || [];
  carShop = carShop.filter((item) => item.cofeId != id);
  localStorage.setItem("car-shop", JSON.stringify(carShop));
  drawBasket();
}

function confirmOrder() {
  let fio = document.getElementById("fio").value;
  let location = document.getElementById("location").value;
  let phone = document.getElementById("phone").value;
  
  if(fio.length<3 || location.length<3 || phone.length<7){
    alert("Iltimos malumotlarni to'g'ri kiriting")
    return
  }
  
  let carShop = JSON.parse(localStorage.getItem("car-shop")) || []
  if(carShop.length==0){
    
    return
  }
  
  let newOrder = {
    fio,
    location,
    phone,
    orders: carShop,
    date: new Date().toISOString()
  }

  
  let allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  

  if (!Array.isArray(allOrders)) {
    if (allOrders && Object.keys(allOrders).length > 0) {
      allOrders = [allOrders];
    } else {
      allOrders = [];
    }
  }
  
  
  allOrders.push(newOrder);
  
  
  localStorage.setItem("orders", JSON.stringify(allOrders));
  
  
  clearBasket()
  
  
}


function clearBasket() {

  localStorage.removeItem("car-shop")
  
  
  drawBasket()
  
  
  updateSpan()
}


document.addEventListener('DOMContentLoaded', function() {
  let confirmBtn = document.getElementById("confirm-btn")
  if(!confirmBtn) {
    
    let buttons = document.querySelectorAll('button')
    buttons.forEach(btn => {
      if(btn.textContent.includes('Tasdiqlash') || btn.textContent.includes('Confirm')) {
        btn.id = 'confirm-btn'
        confirmBtn = btn
      }
    })
  }
  
  if(confirmBtn) {
    confirmBtn.addEventListener('click', confirmOrder)
  }
})


document.addEventListener('DOMContentLoaded', function() {
  let ordersContainer = document.querySelector(".border-t-green-500");
  let allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  
  
  if (!Array.isArray(allOrders) && allOrders && Object.keys(allOrders).length > 0) {
    allOrders = [allOrders];
  }
  
  if (allOrders.length > 0 && ordersContainer) {
    let ordersHTML = '';
    
  
    allOrders.forEach((order, index) => {
      ordersHTML += `
        Yetkazib berish manzili ${order.location}<br>
        Buyurtmachi ${order.fio}<br>
        Tel raqam: ${order.phone}<br><br>
          
      `;
    });
    
    ordersContainer.innerHTML = ordersHTML;
  } else if (ordersContainer) {
    ordersContainer.innerHTML = '';
  }
});

updateSpan();
drawBasket();
if(typeof drawMain === 'function') {
  drawMain();
}