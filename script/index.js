const categoriesLoad = () => {
  const url = 'https://openapi.programming-hero.com/api/categories';
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

//  {
//     "id": 1,
//     "category_name": "Fruit Tree",
//     "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
// }



const displayCategories = (cate) => {
  console.log(cate)
  const categoriesContainer = document.getElementById('categories-container');
  categoriesContainer.innerHTML = '';
  cate.forEach((cat) => {
   const newElement = document.createElement('ul');
    newElement.innerHTML = `
     <ul>
     
     <li class="font-medium hover:bg-[#14803c] hover:text-white p-2 rounded-lg text-sm">${cat.category_name}</li>
     </ul>
    `;
    categoriesContainer.append(newElement);
  });
};
categoriesLoad();


/**
 * 


   
 * */ 