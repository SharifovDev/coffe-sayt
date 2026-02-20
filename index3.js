document.addEventListener('DOMContentLoaded', function () {
  let ordersContainer = document.getElementById("orders-container");
  let allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  let cofeImg = document.getElementById("img-select")




  if (!Array.isArray(allOrders) && allOrders && Object.keys(allOrders).length > 0) {
    allOrders = [allOrders];
  }

  if (allOrders.length > 0 && ordersContainer) {
    let ordersHTML = '';

    allOrders.forEach((order, index) => {

      ordersHTML += `
  <div class="bg-white rounded-2xl p-10 shadow hover:shadow-lg w-100">

    <div class="flex gap-3 items-center">
      <i class="fa-solid fa-location-dot text-[#8047f8] text-xl mt-1"></i>
      <div class="flex items-center gap-16">
        <p class="text-xs text-gray-400 uppercase font-semibold">Location</p>
        <p class="text-base font-medium text-gray-500">
          ${order.location}
        </p>
      </div>
    </div>

    <div class="flex gap-3  items-center mb-7 mt-7">
      <i class="fa-solid fa-user-secret text-[#DBAC2C] text-xl mt-1"></i>
      <div class="flex items-center gap-24.5 justify-between">
        <p class="text-xs text-gray-400 uppercase font-semibold">F.I.O</p>
        <p class="text-base font-medium text-gray-500">
          ${order.fio}
        </p>
      </div>
    </div>

    <div class="flex gap-3 items-start items-center">
      <i class="fa-solid fa-phone text-green-600 text-xl mt-1"></i>
      <div  class="flex items-center gap-13.5">
        <p class="text-xs text-gray-400 uppercase font-semibold">
          Tel raqam
        </p>
        <p class="text-base font-semibold text-blue-600">
          ${order.phone}
        </p>
      </div>
    </div>

  </div>
`;
    });

      ordersContainer.innerHTML = ordersHTML;
    } else if (ordersContainer) {
      ordersContainer.innerHTML =
        `
    <div class="space-y-4 text-gray-800">

          <div class="flex gap-4 items-start">
            <i class="fa-solid fa-location-dot text-[#8047f8] text-xl mt-1"></i>
            <div>
              <h1 class="text-sm font-semibold text-gray-500 uppercase">
                Location
              </h1>
              <p class="text-lg font-medium">
                ${orderData.location}
              </p>
            </div>
          </div>

          <div class="flex gap-4 items-start">
            <i class="fa-solid fa-user-secret text-[#DBAC2C] text-xl mt-1"></i>
            <div>
              <h1 class="text-sm font-semibold text-gray-500 uppercase">
                F.I.O
              </h1>
              <p class="text-lg font-medium">
                ${orderData.fio}
              </p>
            </div>
          </div>

          <div class="flex gap-4 items-start">
            <i class="fa-solid fa-phone text-green-600 text-xl mt-1"></i>
            <div>
              <h1 class="text-sm font-semibold text-gray-500 uppercase">
                Tel raqam
              </h1>
              <p class="text-lg font-medium text-blue-600">
                ${orderData.phone}
              </p>
            </div>
          </div>

        </div>

    `;
    }
  });
