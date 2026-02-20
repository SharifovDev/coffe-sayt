let cofes = [
  {
    id: 1,
    name: "Expresso Americano",
    description: "O tradicional café feito com água quente e grãos moídos",
    price: 800,
    img: "card_2.svg",
  },
  {
    id: 2,
    name: "Expresso Cremoso",
    description: "O tradicional café feito com água quente e grãos moídos",
    price: 490,
    img: "card_3.svg",
  },
  {
    id: 3,
    name: "Expresso Gelado",
    description: "O tradicional café feito com água quente e grãos moídos",
    price: 905,
    img: "card_4.svg",
  },
  {
    id: 4,
    name: "Café com Leite",
    description: "O tradicional café feito com água quente e grãos moídos",
    price: 450,
    img: "card_5.svg",
  },
  {
    id: 5,
    name: "Latte",
    description: "O tradicional café feito com água quente e grãos moídos",
    price: 400,
    img: "card_6.svg",
  },
  {
    id: 6,
    name: "Capuccino",
    description: "O tradicional café feito com água quente e grãos moídos",
    price: 690,
    img: "card_7.svg",
  },
  {
    id: 7,
    name: "Macchiato",
    description: "O tradicional café feito com água quente e grãos moídos",
    price: 980,
    img: "card_8.svg",
  },
  {
    id: 8,
    name: "Expresso Tradicional",
    description: "O tradicional café feito com água quente e grãos moídos",
    price: 990,
    img: "card_1.svg",
  },
  
];

let locCofes = JSON.parse(localStorage.getItem("cofes"));

if (locCofes == null) {
  localStorage.setItem("cofes", JSON.stringify(cofes));
}
let isEditCofe=-1

let images = [
  "card_1.svg",
  "card_2.svg",
  "card_3.svg",
  "card_4.svg",
  "card_5.svg",
  "card_6.svg",
  "card_7.svg",
  "card_8.svg",
];

let imgSelect = document.getElementById("img-select");
imgSelect.innerHTML = "";
images.forEach((item) => {
  console.log(item);
  imgSelect.innerHTML += `
    <option>${item}</option>
    `;
});

let productTable = document.getElementById("productTable");

function handleDrawCofes() {
  let cofes = JSON.parse(localStorage.getItem("cofes"));
  productTable.innerHTML = "";
  cofes.forEach((element, index) => {
   productTable.innerHTML += `
      <tr class="border-b hover:bg-gray-50 transition">
        <td class="px-4 py-4 text-lg font-semibold text-gray-700">
          ${element.id}
         </td>

         <td class="px-4 py-4">
          <img
            src="./images/${element.img}"
            class="w-16 h-16 object-cover rounded-xl shadow"
          />
        </td>

        <td class="px-4 py-4 text-lg text-gray-800 font-medium">
          ${element.name}
        </td>

        <td class="px-4 py-4 text-lg font-semibold text-blue-600">
          $${element.price}
        </td>

        <td class="px-4 py-4">
          <div class="flex gap-3">
            <button
              onclick="handleEditeCofe(${index})"
              class="flex items-center justify-center px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 transition shadow">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>

            <button
              onclick="handleDeleteCofe(${index})"
              class="flex items-center justify-center px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition shadow">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>

    `;

  });
}

function handleSaveCofe() {
  let cofeName = document.getElementById("cofe-name").value;
  let cofeDescription = document.getElementById("cofe-description").value;
  let cofePrice = document.getElementById("cofe-price").value;
  let cofeImg = document.getElementById("img-select").value;

  let cofes = JSON.parse(localStorage.getItem("cofes"));
  let id = cofes[cofes.length - 1].id;
  if (cofes == null) {
    cofes = [];
  }
  let cofe = {
    id: id + 1,
    name: cofeName,
    description: cofeDescription,
    price: cofePrice,
    img: cofeImg,
  };
  console.log(cofe);

  if(isEditCofe==-1){
 cofes.push(cofe);
  }else{
   cofe.id=cofes[isEditCofe].id
    cofes[isEditCofe]=cofe
  }

  if(cofePrice.length[1]==0){
    return
  }
 
  localStorage.setItem("cofes", JSON.stringify(cofes));
  document.getElementById("cofe-name").value=""
  document.getElementById("cofe-description").value=""
  document.getElementById("cofe-price").value=0
  document.getElementById("img-select").value=""
  handleDrawCofes();
  isEditCofe=-1
}

function handleRefreshCofe(){
  document.getElementById("cofe-name").value=""
  document.getElementById("cofe-description").value=""
  document.getElementById("cofe-price").value=0
  document.getElementById("img-select").value=""
}

function handleDeleteCofe(index){
  console.log("salom");
  
    let cofes = JSON.parse(localStorage.getItem("cofes"));
    cofes.splice(index, 1)
    console.log(cofes);
    
localStorage.setItem("cofes", JSON.stringify(cofes));
handleDrawCofes()
}


function handleEditeCofe(index){
  isEditCofe=index
  let cofes = JSON.parse(localStorage.getItem("cofes"));

   let cofeName = document.getElementById("cofe-name").value=cofes[index].name;
  let cofeDescription = document.getElementById("cofe-description").value=cofes[index].description;
  let cofePrice = document.getElementById("cofe-price").value=cofes[index].price;
  let cofeImg = document.getElementById("img-select").value=cofes[index].img;
}


handleDrawCofes();


