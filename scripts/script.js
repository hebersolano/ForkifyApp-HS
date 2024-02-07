import { fetchTemplate } from "./helpers.js";

const API_key = "e590cbdc-2344-408d-b52f-1306ddad962c";
const PATH = "https://forkify-api.herokuapp.com/api/v2/recipes";
let query = "pizza";

let recipesList = document.querySelector(".recipes");
let search = document.querySelector(".search-input");
let searchBtn = document.querySelector(".searchBtn");
let recipeList = document.querySelector(".results-list-box");

// selecting recipe elements
let recipeContainer = document.querySelector(".recipe-container");

let recipe;

//listeners
searchBtn.addEventListener("click", function () {
  let query = search.value;
  if (!query) return;
  getSearch(search.value);
});

search.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    let query = search.value;
    if (!query) return;
    getSearch(search.value);
  }
});

window.addEventListener("load", function () {
  let url = this.location.href;
  if (url.includes("#")) {
    let id = url.split("#")[1];
    getRecipe(id);
  }
  console.log("window loads");
});

// Change URL
window.addEventListener("hashchange", function (e) {
  e.preventDefault();
  console.log("hashChange");
  let url = e.newURL;
  let id = url.split("#")[1];
  getRecipe(id);
});

const recipesListener = function (e) {
  let resultRecipe = e.currentTarget.querySelector(".result-recipe-link");
  let id = parseInt(resultRecipe.dataset.id);
  console.log(id);
  // window.location.href += id;
  // urlChange(id);
};

let recipeLi = document.querySelectorAll(".result-recipe-li");
for (const recipe of recipeLi) {
  recipe.addEventListener("click", recipesListener);
}

function renderSearchResults(recipe) {
  if (!recipe?.image_url) return;
  let html = `
    <li class="result-recipe-li">
      <a href="#${recipe.id}" class="result-recipe-link" data-id="${recipe.id}">
        <img class="result-recipe-img" src="${recipe.image_url}" alt="recipe" />
        <div class="result-recipe-text">
          <p class="result-recipe-title">${recipe.title}</p>
          <p class="result-recipe-publisher">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;

  recipeList.insertAdjacentHTML("beforeend", html);
}

const getSearch = async function (query) {
  try {
    const data = await fetch(`${PATH}?search=${query}&key=${API_key}`);
    if (!data.ok) throw new Error("GetSearch error fetching");

    const json = await data.json();
    const recipes = json.data.recipes;
    for (let i = 0; i < 10; i++) {
      renderSearchResults(recipes[i]);
    }

    recipeLi = document.querySelectorAll(".recipe-li");
    for (const recipe of recipeLi) {
      recipe.addEventListener("click", recipesListener);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getRecipe = async function (id) {
  console.log("getRecipe");
  try {
    const data = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    if (!data.ok) throw new Error("gerRecipe error!");

    const json = await data.json();
    recipe = json.data.recipe;
    renderRecipe(recipe);
  } catch (error) {
    console.error("myError", error);
  }
};

const renderRecipe = async function (recipe) {
  const recipeTemplate = await fetchTemplate("recipe-tp");

  // insert html template
  recipeContainer.innerHTML = "";
  recipeContainer.insertAdjacentHTML("afterbegin", recipeTemplate);

  // selecting recipe elements
  let imgRecipe = document.querySelector(".img-header");
  let titleRecipe = document.querySelector(".recipe-title");
  let cookTime = document.querySelector(".cooking-time-data");
  let servings = document.querySelector(".servings-data");
  let ingredientsBox = document.querySelector(".recipe-ingredients-box");
  let publisherName = document.querySelector(".publisher-name");

  // insert data to template
  imgRecipe.src = recipe.image_url;
  titleRecipe.textContent = recipe.title;

  cookTime.textContent = recipe.cooking_time;
  servings.textContent = recipe.servings;

  publisherName.textContent = recipe.publisher;

  for (const ingredient of recipe.ingredients) {
    let ingredientsTemplate = `
      <li class="recipe-ingredient">
        <ion-icon class="icon icon-md ingredient-icon" name="checkmark-outline"></ion-icon>
        <p>
          <span class="recipe-amount">${
            ingredient.quantity ? ingredient.quantity : ""
          }</span> <span class="recipe-unit">${ingredient.unit ? ingredient.unit : ""}</span>
          <span class="recipe-ingredient-name">${ingredient.description}</span>
        </p>
      </li>
    `;

    ingredientsBox.insertAdjacentHTML("afterbegin", ingredientsTemplate);
  }
  for (const child of recipeContainer.children) {
    if (child.classList.contains("hidden")) {
      child.classList.remove("hidden");
    }
  }
};
