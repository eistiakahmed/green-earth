// const addToCardBtn = document.getElementsByClassName("addToCard-btn")

// for(const btn of addToCardBtn){
//   btn.addEventListener("click", e => {
//     e.preventDefault()
//     console.log(e.target)
//   }
//   )
// }

const categoriesLoad = () => {
  const url = 'https://openapi.programming-hero.com/api/categories';
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

const allTreeBtn = document
  .getElementById('all-tree-btn')
  .addEventListener('click', (e) => {
    const allCategories = document.querySelectorAll('.all-categories');
    allCategories.forEach((cat) => {
      cat.classList.remove('bg-[#14803c]', 'text-white');
    });

    e.target.classList.add('bg-[#14803c]', 'text-white');
    allTreeLoad();
  });

const displayCategories = (category) => {
  const categoriesContainer = document.getElementById('categories-container');
  categoriesContainer.innerHTML = '';
  category.forEach((cat) => {
    // console.log(cat)
    const newElement = document.createElement('ul');
    newElement.innerHTML = `
     <ul class = "space-y-4">
     <li id=${cat.id} class="font-medium hover:bg-[#14803c] hover:text-white p-2 rounded-lg text-sm all-categories mt-1 cursor-pointer">${cat.category_name}</li>
     </ul>
    `;
    categoriesContainer.append(newElement);
  });

  categoriesContainer.addEventListener('click', (e) => {
    const allCategories = document.querySelectorAll('.all-categories');
    // console.log(allCategories)
    allCategories.forEach((category) => {
      category.classList.remove('bg-[#14803c]');
      category.classList.remove('text-white');
    });
    if (e.target.localName === 'li') {
      e.target.classList.add('bg-[#14803c]');
      e.target.classList.add('text-white');
      loadTreeByCategory(e.target.id);
    }
  });
};
categoriesLoad();

// all tree section
const allTreeLoad = () => {
  fetch('https://openapi.programming-hero.com/api/plants')
    .then((res) => res.json())
    .then((data) => allTreeDisplay(data.plants));
};

const allTreeDisplay = (trees) => {
  //  console.log(trees)
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';
  trees.forEach((tree) => {
    // console.log(tree);
    const div = document.createElement('div');
    div.innerHTML = `
     <div class="bg-white p-5 h-full rounded-xl flex flex-col">
              <img src="${tree.image}" alt class="h-60 rounded-2xl w-full">

              <div id="${tree.id}" class="flex-1">
                <h3 class="mt-3 font-semibold">${tree.name}</h3>
                <p class="text-sm text-gray-600">${tree.description}</p>
              </div>
              <div class="flex justify-between items-center my-2">
                  <div
                    class="bg-[#dcfce7] text-green-500 px-3 py-1 rounded-full">
                    <p class="text-sm">${tree.category}</p>
                  </div>
                  <h3 class="font-bold">৳<span>${tree.price}</span></h3>
                </div>
              <div class="mt-3">
                <button
                  class="btn w-full border-none rounded-full bg-[#14803c] hover:bg-[#0f602d] text-white font-medium addToCard-btn">
                  Add to Card
                </button>
              </div>
            </div>
    `;

    cardContainer.append(div);

    // const addToCardBtn = div.querySelector(".addToCard-btn");
    // addToCardBtn.addEventListener("click", e => {
    //   console.log(e.target);
    //   const price =
    //   console.log(price)

    // });
  });
};

let cart = [];

document.getElementById('cardContainer').addEventListener('click', (e) => {
  // console.log(e.target)
  if (e.target.innerText === 'Add to Card') {
    handleAddCart(e);
  }
});

const handleAddCart = (e) => {
  const title =
    e.target.parentNode.parentNode.children[1].children[0].innerText;
  const price =
    e.target.parentNode.parentNode.children[2].children[1].children[0]
      .innerText;
      const id = e.target.parentNode.parentNode.children[1].id;
      // console.log(id)

  cart.push({
    title: title,
    price: price,
    id: id
  });
  // console.log(cart);
  showAddCarts(cart)
};


const handleAddCartDelete = (cartDelete) => { 
  // console.log(cartDelete)
 const deleteCart = cart.filter(cards => cards.id !==  cartDelete)
//  console.log(deleteCart)
  cart = deleteCart
 showAddCarts(cart);
}

  const addCartContainer = document.getElementById("addCartContainer")
const cardContainer = document.getElementById("cardContainer");
const showAddCarts = (cart) => {
  // console.log(cart)
  addCartContainer.innerHTML ="";
  cart.forEach(addCart =>{
    
    addCartContainer.innerHTML +=`
    <div class="bg-[#f0fcf4] flex justify-between items-center mx-4 p-5 rounded-2xl space-y-2 mb-2">
    <div>
                <h3 class="font-semibold">${addCart.title}</h3>
              <h3 class="text-gray-400">৳ <span>${addCart.price}</span> x <span>1</span></h3>
              </div>
              <div class="text-gray-400">
                <i onclick="handleAddCartDelete('${addCart.id}')" class="fa-solid fa-xmark  font-light"></i>
              </div>
    </div>
    
    ` 
  })
}

const loadTreeByCategory = (categoryId) => {
  // console.log(categoryId);
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => loadTreeByCategoryShow(data.plants));
};

const loadTreeByCategoryShow = (cardInfo) => {
  // console.log(cardInfo);
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';
  cardInfo.forEach((card) => {
    console.log(card);
    const div = document.createElement('div');
    div.innerHTML = `
     <div class="bg-white p-5 h-full rounded-xl flex flex-col">
              <img src="${card.image}" alt class="h-60 rounded-2xl w-full">

              <div id="${card.id}" class="flex-1">
                <h3 class="mt-3 font-semibold">${card.name}</h3>
                <p class="text-sm text-gray-600">${card.description}</p>
              </div>
              <div class="flex justify-between items-center my-2">
                  <div
                    class="bg-[#dcfce7] text-green-500 px-3 py-1 rounded-full">
                    <p class="text-sm">${card.category}</p>
                  </div>
                  <h3 class="font-bold">৳<span>${card.price}</span></h3>
                </div>
              <div class="mt-3">
                <button
                  class="btn w-full border-none rounded-full bg-[#14803c] hover:bg-[#0f602d] text-white font-medium addToCard-btn">
                  Add to Card
                </button>
              </div>
            </div>
    `;

    cardContainer.append(div);
    // const addToCardBtn = div.querySelector(".addToCard-btn");
    // addToCardBtn.addEventListener("click", e => {
    //   console.log(e.target);

    // });
  });
};

allTreeLoad();
