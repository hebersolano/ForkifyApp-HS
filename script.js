const API_key = "e590cbdc-2344-408d-b52f-1306ddad962c";
const PATH = "https://forkify-api.herokuapp.com/api/v2/recipes";
let query = "pizza";

let recipesList = document.querySelector(".recipes");
let search = document.querySelector(".search-input");
let searchBtn = document.querySelector(".searchBtn");
let recipeList = document.querySelector(".results-list-box");

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

const recipesListener = function (e) {
  let id;
  let parentL1 = e.target.parentElement;
  let parentL2 = e.target.parentElement.parentElement;
  if (parentL1.classList.contains("recipe-li")) {
    id = parentL1.dataset.id;
    parentL1.classList;
  } else if (parentL2.classList.contains("recipe-li")) {
    id = parentL2.dataset.id;
  }
  // urlChange(id);
};

let recipeLi = document.querySelectorAll(".recipe-li");
for (const recipe of recipeLi) {
  recipe.addEventListener("click", recipesListener);
}

function render(recipe) {
  if (!recipe?.image_url) return;
  let html = `
    <li>
      <a href="#${recipe.id}"  class="recipe-li" data-id="${recipe.id}">
        <img
          class="recipe-li-img"
          src="${recipe.image_url}"
          alt="recipe"
        />
        <div class="text">
          <p class="recipe-li-title">
            ${recipe.title}
          </p>
          <p class="recipe-publisher">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;

  recipeList.insertAdjacentHTML("beforeend", html);
}

async function getSearch(query = "pizza") {
  try {
    const data = await fetch(`${PATH}?search=${query}&key=${API_key}`);
    const json = await data.json();
    const recipes = json.data.recipes;
    render();
    recipes.map((recipe) => {
      render(recipe);
    });

    recipeLi = document.querySelectorAll(".recipe-li");
    for (const recipe of recipeLi) {
      recipe.addEventListener("click", recipesListener);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Change URL
const urlChange = function (id) {
  const nextURL = `${window.location.href}/${id}`;
  const nextTitle = `Forkify App - `;
  const nextState = { additionalInformation: "Updated the URL with JS" };

  // This will create a new entry in the browser's history, without reloading
  window.history.pushState(nextState, nextTitle, nextURL);

  // This will replace the current entry in the browser's history, without reloading
  window.history.replaceState(nextState, nextTitle, nextURL);
};

window.addEventListener("hashchange", function (e) {
  console.log(e, this.href);
});

const getRecipe = async function () {
  const data = await fetch(
    "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
  );
  console.log(data);
  const json = await data.json();
  recipe = json.data.recipe;
  console.log(json, recipe);
};
