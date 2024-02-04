import * as model from "../js/model.js";
import recipeView from "../js/views/recipeView.js";
import searchView from "../js/views/searchView.js";
import resultsView from "../js/views/resultsView.js";
import paginationView from "../js/views/paginationView.js";

// Copyright Date (Years)
const copyrightDate = document.querySelector(".copyright-date");
let currentYear = new Date().getFullYear();
copyrightDate.textContent = currentYear;

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//==============================================
// Fetching API
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    const { recipe } = model.state;
    recipeView.render(model.state.recipe);
  }

  catch (error) {
    recipeView.renderError(`Oops... Something went wrong!`);
  }
}

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  }
  catch (error) {
    recipeView.renderError(`Oops... Something went wrong!`);
  }
}

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();