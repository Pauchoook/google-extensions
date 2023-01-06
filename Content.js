let url = 'http://localhost:3000/results';
const contentBody = document.querySelector('.content__body');
const contenResult = document.querySelector('.content__result');
const search = document.querySelector('.header__search');

async function fetchData(url) {
  try {
    resultFetch('<h4>Загрузка</h4>');

    const response = await fetch(url);
    const products = await response.json();

    contenResult.textContent = `${products.length} results thought 4 websites`;

    if (!products.length) {
      resultFetch('<h4>Ничего не найдено</h4>');
      return;
    }

    contentBody.innerHTML = '';
    products.forEach((product) => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.insertAdjacentHTML(
        'beforeend',
        `
        <div class="card__preview">
          <div class="card__preview-img">
            <img src="${product.image.product_image}" alt="Карточка" class="card__img-main">
            <img src="${product.image.market_image}" alt="Логотип" class="card__img-mark">
          </div>
          <span class="card__preview-content">${product.market}</span>
        </div>
        <div class="card__info">
          <h2 class="card__title">${product.name}</h2>
          <ul class="card__list">
            <li class="card__item">price <span>${product.price}$</span></li>
            <li class="card__item">delivery <span>1-2 days</span></li>
          </ul>
          <a href=${product.link} target='_blank' class="card__btn">Buy</a>
        </div>
      `,
      );

      contentBody.appendChild(card);
    });
  } catch (e) {
    console.log(e);
  }
}

function resultFetch(string) {
  contentBody.innerHTML = '';
  contentBody.insertAdjacentHTML('beforeend', string);
}

search.addEventListener('input', (e) => {
  const value = e.target.value;
  const searchUrl = url + `?name_like=${value}`

  setTimeout(() => {
    if (value) {
      fetchData(searchUrl);
    } else {
      fetchData(url);
    }
  }, 800);
});

fetchData(url);
