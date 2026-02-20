
let cofeDiv = document.getElementById("cofe-div");
let span = document.getElementById("span");


let carShop = JSON.parse(localStorage.getItem("car-shop"));

if (span) {
  span.innerText = carShop ? carShop.length : 0;
}


function handleDrawCofeDiv() {
  if (!cofeDiv) return; 

  let cofes = JSON.parse(localStorage.getItem("cofes")) || [];
  cofeDiv.innerHTML = "";

  cofes.forEach((item) => {
   cofeDiv.innerHTML += `
       <div
  class="w-full sm:w-[48%] md:w-[30%] lg:w-[23%] 
         bg-white p-6 mt-14 rounded-2xl shadow-md 
         hover:shadow-xl transition-all duration-300 group">

  <!-- IMAGE -->
  <div class="flex justify-center">
    <img
      class="-mt-14 w-32 h-32 object-contain group-hover:scale-105 transition"
      src="images/${item.img}"
      alt="">
  </div>

  <!-- TAG -->
  <div class="flex justify-center mt-4 mb-5">
    <span
      class="px-4 py-1 text-sm font-semibold rounded-full 
             bg-[#F1E9C9] text-[#C47F17]">
      Tradicional
    </span>
  </div>

  <p class="text-center text-xl font-bold text-[#403937]">
    ${item.name}
  </p>

  <p class="text-[#8D8686] text-center text-sm mt-3 leading-relaxed">
    ${item.description}
  </p>

  <div class="flex items-center justify-between mt-8">
    
    <div class="flex items-end gap-1 item-center">
      <span class="text-sm text-[#574F4D]">R$</span>
      <span class="text-2xl font-extrabold text-[#574F4D]">
        ${item.price}
      </span>
    </div>

    <div
      class="flex items-center bg-[#E6E5E5] rounded-xl px-4 py-2 gap-4 text-lg">
      <button
        onclick="removeCofeToStorage(${item.id})"
        class="text-[#8047F8] font-bold hover:scale-125 transition">
        −
      </button>

      <span id="count${item.id}" class="font-semibold text-[#403937]">
        0
      </span>

      <button
        onclick="addCofeToStorage(${item.id})"
        class="text-[#8047F8] font-bold hover:scale-125 transition">
        +
      </button>
    </div>

    <!-- CART -->
    <button
      class="p-3 bg-[#4B2995] rounded-xl hover:bg-[#3a1f7a] transition">
         <a href="index2.html"><i class="fa-solid fa-cart-shopping text-white"></i></a>
      </button>
  </div>
</div>

        `

  });
}


function countCofe() {
  let carShop = JSON.parse(localStorage.getItem("car-shop"));
  if (!carShop) return;

  carShop.forEach((item) => {
    let p = document.getElementById(`count${item.cofeId}`);
    if (p) p.innerText = item.count;
  });
}


function addCofeToStorage(id) {
  let carShop = JSON.parse(localStorage.getItem("car-shop")) || [];
  let ishave = false;

  carShop.forEach((item) => {
    if (item.cofeId == id) {
      item.count++;
      ishave = true;

      let p = document.getElementById(`count${id}`);
      if (p) p.innerText = item.count;
    }
  });

  if (!ishave) {
    carShop.push({ cofeId: id, count: 1 });

    let p = document.getElementById(`count${id}`);
    if (p) p.innerText = 1;
  }
  
  localStorage.setItem("car-shop", JSON.stringify(carShop));

  if (span) span.innerText = carShop.length;
  if (typeof drawBasket === "function") drawBasket();
  
}


function removeCofeToStorage(id) {
  let carShop = JSON.parse(localStorage.getItem("car-shop"));
  if (!carShop) return;

  carShop.forEach((item, index) => {
    if (item.cofeId == id) {
      if (item.count > 1) {
        item.count--;

        let p = document.getElementById(`count${id}`);
        if (p) p.innerText = item.count;
      } else {
        carShop.splice(index, 1);

        let p = document.getElementById(`count${id}`);
        if (p) p.innerText = 0;
      }
    }
  });

  localStorage.setItem("car-shop", JSON.stringify(carShop));

  if (span) span.innerText = carShop.length;
  if (typeof drawBasket === "function") drawBasket();
}


handleDrawCofeDiv();
countCofe();
