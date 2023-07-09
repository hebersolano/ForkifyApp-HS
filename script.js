const API_key = "e590cbdc-2344-408d-b52f-1306ddad962c";
const PATH = "https://forkify-api.herokuapp.com/api/v2/recipes";
let query = "pizza";

let recipesList = document.querySelector(".recipes");
let search = document.querySelector("#searchField");
let searchBtn = document.querySelector(".searchBtn");
let recipeLi = document.querySelector(".recipe-list");

console.log(search);
searchBtn.addEventListener("click", function () {
  let query = search.value;
  if (!query) return;
  getSearch(search.value);
});

function render(recipe) {
  console.log(recipe);
  if (!recipe?.image_url) return;
  let html = `
    <div class="recipe-li">
      <img class="recipe-li-img" src="${recipe.image_url}" alt="recipe" />
      <p class="recipe-li-title">${recipe.title}</p>
    </div>
    <div class="line"></div>
  `;

  recipeLi.insertAdjacentHTML("beforeend", html);
  // let listEl = document.createElement("li");
  // listEl.innerHTML = html;
  // recipesList.appendChild(listEl);
}

async function getSearch(query = "pizza") {
  try {
    const data = await fetch(`${PATH}?search=${query}&key=${API_key}`);
    console.log(data);
    const json = await data.json();
    const recipes = json.data.recipes;
    console.log(json.data.recipes);
    render();
    recipes.map((recipe) => {
      render(recipe);
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
