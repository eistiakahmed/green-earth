const categoriesLoad = () => {
  const url = 'https://openapi.programming-hero.com/api/categories';
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

const allTreeBtn = document.getElementById("all-tree-btn").addEventListener("click", (e) => {
  const allCategories = document.querySelectorAll(".all-categories");
  allCategories.forEach((cat) => {
    cat.classList.remove("bg-[#14803c]", "text-white");
  });
   
  e.target.classList.add("bg-[#14803c]", "text-white");
});



const displayCategories = (category) => {
  const categoriesContainer = document.getElementById('categories-container');
  categoriesContainer.innerHTML = '';
  category.forEach((cat) => {
    // console.log(cat)
   const newElement = document.createElement('ul');
    newElement.innerHTML = `
     <ul class = "space-y-4">
     <li id=${cat.id} class="font-medium hover:bg-[#14803c] hover:text-white p-2 rounded-lg text-sm all-categories mt-1">${cat.category_name}</li>
     </ul>
    `;
    categoriesContainer.append(newElement);
  });

  categoriesContainer.addEventListener("click", (e) => { 
    const allCategories = document.querySelectorAll(".all-categories")
    // console.log(allCategories)
    allCategories.forEach(category => { 
      category.classList.remove("bg-[#14803c]")
      category.classList.remove("text-white")
    })
    if(e.target.localName === "li"){
      
      e.target.classList.add("bg-[#14803c]")
      e.target.classList.add("text-white")
      }
    })
};
categoriesLoad();

// all tree section
const allTreeLoad = () => { 
  fetch("https://openapi.programming-hero.com/api/plants")
  .then(res => res.json())
  .then(data => allTreeDisplay(data.plants))
}

// {
//     "id": 27,
//     "image": "https://i.ibb.co.com/4ZrDBFHC/passion-flower-min.jpg",
//     "name": "Passion Flower",
//     "description": "An ornamental and medicinal climber with striking flowers. Known for attracting pollinators like bees and butterflies.",
//     "category": "Climber",
//     "price": 500
// }


const allTreeDisplay = (trees) => { 
//  console.log(trees)
  const cardContainer = document.getElementById("cardContainer")
  cardContainer.innerHTML = "";
  trees.forEach(tree => { 
    // console.log(tree);
    const div = document.createElement("div")
    div.innerHTML =`
     <div class="bg-white p-5 h-full rounded-xl flex flex-col">
              <img src="${tree.image}" alt class="h-40 rounded-2xl w-full">

              <div class="flex-1">
                <h3 class="mt-3 font-semibold">${tree.name}</h3>
                <p class="text-sm text-gray-600">${tree.description}</p>
              </div>
              <div class="flex justify-between items-center my-2">
                  <div
                    class="bg-[#dcfce7] text-green-500 px-3 py-1 rounded-full">
                    <p class="text-sm">${tree.category}</p>
                  </div>
                  <span class="font-bold">৳${tree.price}</span>
                </div>
              <div class="mt-3">
                <button
                  class="btn w-full border-none rounded-full bg-[#14803c] text-white font-medium">
                  Add to Card
                </button>
              </div>
            </div>
    `

    cardContainer.append(div)
  })
}
allTreeLoad();



