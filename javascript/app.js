const cards = document.querySelector('.cards__container');
const footer = document.querySelector('.footer');
const searchInput = document.querySelector('.header__input');
const list = document.querySelector('.list__buttons');
const search = document.querySelector('.search');
/* let ofset = 0; */

document.addEventListener('DOMContentLoaded', () => {
  consultaAPI();
});
// Get total Heroes
const consultaAPI = async (valuePagina) => {
  const heroesFetch = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=${valuePagina}&ts=1&apikey=449e67f0064770ae571df4bd3b8c6730&hash=f486e005bd98d71208ed9f26960fba6e`
  );
  const heroes = await heroesFetch.json();
  const heroesArray = heroes.data.results;
  cardsHtlm(heroesArray);
};

/* Create html  */
const cardsHtlm = (heroes) => {
  heroes.map(({ name, thumbnail: { path, extension } }) => {
    cards.innerHTML += `
        <div class="heroes__box">
        <img src="${path}.${extension}" loading="lazy" alt="${name}" class="heroes__img" />
        <h5 class="heroes__name">${name}</h5>
         </div>
         `;
  });
};

/* Search Addvenlistener */
searchInput.addEventListener('keyup', (e) => {
  limpiarHtml();
  let heroe = encodeURIComponent(e.target.value);
  const consultaSearchAPI = async (heroe) => {
    const consultaSearchAPI = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?name=${heroe}&ts=1&apikey=449e67f0064770ae571df4bd3b8c6730&hash=f486e005bd98d71208ed9f26960fba6e`
    );
    const consultaSearch = await consultaSearchAPI.json();
    let heroeSearch = consultaSearch.data.results;
    cardsHtlm(heroeSearch);
  };
  heroe.length > 1 ? consultaSearchAPI(heroe) : consultaAPI();
});
/* Search */

// View Description Heroes
const cardBox = document.querySelector('.heroes__box');
cards.addEventListener('click', (e) => {
  if (
    e.target.className === 'heroes__name' ||
    e.target.className === 'heroes__img'
  ) {
    heroesPop(e.target.textContent);
    heroesPop(e.target.getAttribute('alt'));
    limpiarHtml();
  }
});
// Select of Heroe
const heroesPop = (heroeSelect) => {
  heroes = encodeURIComponent(heroeSelect);
  const consultaHeroeSelectAPI = async (heroes) => {
    const heroeSelectFetch = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?name=${heroes}&ts=1&apikey=449e67f0064770ae571df4bd3b8c6730&hash=f486e005bd98d71208ed9f26960fba6e`
    );
    const heroeSelectJson = await heroeSelectFetch.json();
    let heroeSelect = heroeSelectJson.data.results;

    heroeSelect.map(({ name, description, thumbnail: { path, extension } }) => {
      cards.innerHTML += `
        <div class="heroesp__box">
        <img src="${path}.${extension}" loading="lazy" alt="${name}" class="heroesp__img" />
       <div class="heroesp__text">
       <h5 class="heroesp__name">${name}</h5>
        <p class="heroesp__description">${description}</p>
        <div>
         </div>
         `;
    });
  };
  consultaHeroeSelectAPI(heroes);
};
// Clean Html
const limpiarHtml = () => {
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
};
/* PAGINADOR */
const btnDecrementar = document.querySelector('.btn__decrementar');
const btnIncrementar = document.querySelector('.btn__incrementar');
const pagina = document.querySelector('.btn__paginas');
let numPagina = 0;
let valuePagina = 100;
pagina.textContent = 1;
pagina.value = valuePagina;

btnIncrementar.addEventListener('click', () => {
  pagina.textContent = numPagina++ + 1;
  pagina.value = valuePagina * numPagina;

  limpiarHtml();
  consultaAPI(pagina.value);
});

btnDecrementar.addEventListener('click', () => {
  pagina.textContent = numPagina--;
  pagina.value = valuePagina / numPagina;
  consultaAPI(pagina.value);
  limpiarHtml();
});
