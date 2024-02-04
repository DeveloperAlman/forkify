import icons from "url:../../img/icons.svg";
export default class View {
    _data;

    // Preloader spinner
    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>`;

        this._parentElement.insertAdjacentHTML("beforeend", markup);
    }

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("beforeend", markup);
    }
    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const curElements = Array.from(this._parentElement.querySelectorAll("*"));

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            // console.log(curEl, newEl.isEqualNode(curEl));

            // Updates changed TEXT
            if (
                !newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== ''
            ) {
                // console.log('💥', newEl.firstChild.nodeValue.trim());
                curEl.textContent = newEl.textContent;
            }

            // Updates changed ATTRIBUES
            if (!newEl.isEqualNode(curEl))
                Array.from(newEl.attributes).forEach(attr =>
                    curEl.setAttribute(attr.name, attr.value)
                );
        });
    }
    _clear() {
        this._parentElement.innerHTML = "";
    }

    renderError(message) {
        const markup = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>`;

        this._clear();
        this._parentElement.insertAdjacentHTML("beforeend", markup);
    }
}