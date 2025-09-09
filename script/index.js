// spinner
const manageSpinner = (status, type = "card")=> { 
  if(status === true){
    document.getElementById("spinner").classList.remove("hidden");
    if(type === "card"){
      document.getElementById("cardContainer").classList.add("hidden");
    }
  }else{
    document.getElementById("spinner").classList.add("hidden");
    if(type === "card"){
      document.getElementById("cardContainer").classList.remove("hidden");
    }
  }
}


// Modal Section
const modalContainer = document.getElementById("modal-container");

const viewModal = (modalId) => { 
  fetch(`https://openapi.programming-hero.com/api/plant/${modalId}`)
    .then(res => res.json())
    .then(data => displayModal(data.plants))  
};

const displayModal = (plant) => { 
  modalContainer.innerHTML = `
 <div class="space-y-3" >
  <h3 class="font-bold text-xl">${plant.name}</h3>
  <img src="${plant.image}" alt="" class="w-full h-80 rounded-lg">
  <div class="border-2 border-green-500 text-green-500 p-2 w-1/3 text-center  rounded-2xl">
  <p class="font-medium"> ${plant.category}</p>
  </div>
  <p class="font-bold">Price : ৳ <span>${plant.price}</span></p>
  <p class="text-gray-500 text-sm">${plant.description}</p>
 </div>
  `;
  document.getElementById("modal").showModal();
};

// Categories Section
const categoriesLoad = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => {
      displayCategories(data.categories)
     
    });
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById('categories-container');
  categoriesContainer.innerHTML = '';

  categories.forEach(cat => {
    const newElement = document.createElement('ul');
    newElement.innerHTML = `
      <ul class="space-y-4">
        <li id="${cat.id}" class="font-medium hover:bg-[#14803c] hover:text-white p-2 rounded-lg text-sm all-categories mt-1 cursor-pointer">
          ${cat.category_name}
        </li>
      </ul>`;
    categoriesContainer.append(newElement);
  });

  categoriesContainer.addEventListener('click', (e) => {
    const allCategories = document.querySelectorAll('.all-categories');
    allCategories.forEach(cat => cat.classList.remove('bg-[#14803c]', 'text-white'));

    if (e.target.localName === 'li') {
      e.target.classList.add('bg-[#14803c]', 'text-white');
      loadTreeByCategory(e.target.id);
    }
  });
};

categoriesLoad();


// All tree button
document.getElementById('all-tree-btn').addEventListener('click', (e) => {
  document.querySelectorAll('.all-categories').forEach(cat => cat.classList.remove('bg-[#14803c]', 'text-white'));
  e.target.classList.add('bg-[#14803c]', 'text-white');
  allTreeLoad();
});



// Tree Cards Section
const allTreeLoad = () => {
  manageSpinner(true, "card");
  fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
      displayTreeCards(data.plants);
      manageSpinner(false, "card");
    });
};

const loadTreeByCategory = (categoryId) => {
  manageSpinner(true, "card")
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data => {
      displayTreeCards(data.plants);
      manageSpinner(false, "card")
    });
};

const displayTreeCards = (trees) => {
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';

  trees.forEach(tree => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="bg-white p-5 h-full rounded-xl flex flex-col">
    <img src="${tree.image}" alt="" class="h-56 rounded-2xl w-full">
    <div id="${tree.id}" class="flex-1">
      <h3 onclick="viewModal(${tree.id})" class="mt-3 font-semibold cursor-pointer">${tree.name}</h3>
      <p class="text-sm text-gray-600">${tree.description}</p>
    </div>
    <div class="flex justify-between items-center my-2">
      <div class="bg-[#dcfce7] text-green-500 px-3 py-1 rounded-full">
        <p class="text-sm">${tree.category}</p>
      </div>
      <h3 class="font-bold">৳<span>${tree.price}</span></h3>
    </div>
    <div class="mt-3">
      <button class="btn w-full border-none rounded-full bg-[#14803c] hover:bg-[#0f602d] text-white font-medium addToCart-btn">
        Add to Cart
      </button>
    </div>
  </div>
    `
    cardContainer.append(div);
  });
};



// Cart Section
let cart = [];
const addCartContainer = document.getElementById("addCartContainer");

document.getElementById('cardContainer').addEventListener('click', (e) => {
  if (e.target.innerText === 'Add to Cart') {
    const title = e.target.parentNode.parentNode.children[1].children[0].innerText;
    alert(`${title} has been added to cart`)
    handleAddCart(e);
  }
});

// Cart add function
const handleAddCart = (e) => {
  const title = e.target.parentNode.parentNode.children[1].children[0].innerText;
  const price = parseFloat(e.target.parentNode.parentNode.children[2].children[1].children[0].innerText);
  const id = e.target.parentNode.parentNode.children[1].id;

  const addCart = cart.find(item => item.id === id);
  if (addCart) {
    addCart.quantity += 1; 
  } else {
    cart.push({
       id, 
       title, 
       price, 
       quantity: 1 
      });
  }

  showAddCarts(cart);
};

// Cart remove function
const handleAddCartDelete = (cartDeleteId) => { 
  const removeCart = cart.find(item => item.id === cartDeleteId);
  if (removeCart) {
    if (removeCart.quantity > 1) {
      removeCart.quantity -= 1;
    } else {
      cart = cart.filter(item => item.id !== cartDeleteId);
    }
  }
  showAddCarts(cart);
};

// Cart show function
const showAddCarts = (cart) => {
  let total = 0;
  addCartContainer.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.quantity;
    addCartContainer.innerHTML += `
      <div class="bg-[#f0fcf4] flex justify-between items-center mx-4 p-5 rounded-2xl mb-2">
        <div>
          <h3 class="font-semibold">${item.title}</h3>
          <h3 class="text-gray-400 font-medium">৳<span>${item.price}</span> x <span>${item.quantity}</span></h3>
        </div>
        <div class="text-gray-400">
          <i onclick="handleAddCartDelete('${item.id}')" class="fa-solid fa-xmark font-light cursor-pointer"></i>
        </div>
      </div>`;
  });

  addCartContainer.innerHTML += `
    <div class="flex justify-between items-center border-t-2 border-gray-300 pt-2 mx-4 pb-4">
      <h1>Total: </h1>
      <h3>৳<span>${total}</span></h3>
    </div>`;

};


// allTree load 
allTreeLoad();