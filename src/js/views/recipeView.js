import icons from "url:../../img/icons.svg";
import { Fraction } from "fractional";
import View from "./View.js";

class RecipeView extends View {
    _parentElement = document.querySelector('.recipe');

    addHandlerRender(handler) {
        return window.addEventListener("hashchange", handler);
    }

    addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--update-servings");
            if (!btn) return;
            const updateTo = Number(btn.dataset.updateTo);
            console.log(updateTo)
            if (updateTo > 0) handler(updateTo);
        });
    }

    _generateMarkup() {
        const servingsNotation = () => this._data.servings > 1 ? "servings" : "serving";

        return `
            <figure class="recipe__fig">
                <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
                <h1 class="recipe__title"><span>${this._data.title}</span></h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="${icons}#icon-clock"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                    <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="${icons}#icon-users"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                    <span class="recipe__info-text">${servingsNotation()}</span>

                   <div class="recipe__info-buttons">
    <button class="btn--tiny btn--update-servings"
        data-update-to="${this._data.servings - 1}">
           <svg>
            <use href="${icons}#icon-minus-circle"></use>
           </svg>
    </button>
    <button class="btn--tiny btn--update-servings"
     data-update-to="${this._data.servings + 1}">
            <svg>
             <use href="${icons}#icon-plus-circle"></use>
            </svg>
    </button>
</div>
                </div>

                <div class="recipe__user-generated">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                </div>
                <button class="btn--round">
                    <svg class="">
                        <use href="${icons}#icon-bookmark-fill"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                    ${this._data.ingridients ? this._data.ingridients.map(ingredient => `
                        <li class="recipe__ingredient">
                            <svg class="recipe__icon">
                                <use href="${icons}#icon-check"></use>
                            </svg>
                            <div class="recipe__quantity">${ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ""}</div>
                            <div class="recipe__description">
                                <span class="recipe__unit">${ingredient.unit}</span>
                                ${ingredient.description}
                            </div>
                        </li>
                    `).join('') : ''}
                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
                    directions at their website.
                </p>
                <a class="btn--small recipe__btn" href="${this._data.sourceUrl}" target="_blank">
                    <span>Learn more</span>
                </a>
            </div>
        `;
    }
}

export default new RecipeView();