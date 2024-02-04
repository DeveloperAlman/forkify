import { API_KEY } from "./config.js";
export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        page: 1,
        resultsPerPage: 10
    }
};

export const loadRecipe = async function (id) {
    try {
        // Loading data from API recipe
        const response = await fetch(`${API_KEY}${id}`);
        const data = await response.json();

        // Error fecth handling
        if (!response.ok) throw new Error(`${data.message} ${response.status}`);

        let { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingridients: recipe.ingredients
        }
    } catch (error) {
        recipeView.renderError(`Oops... Something went wrong!`);
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const response = await fetch(`${API_KEY}?search=${query}`);
        const data = await response.json();
        console.log(data);

        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            };
        });

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
}

export const updateServings = function (newServings) {
    state.recipe.ingridients.forEach(ingridients => {
        ingridients.quantity = (ingridients.quantity * newServings) / state.recipe.servings;
    });
    state.recipe.servings = newServings;
}