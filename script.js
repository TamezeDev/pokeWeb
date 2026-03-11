const API_URL_BASE = "https://pokeapi.co/api/v2/pokemon/";
let random_poke;

/* MAIN FUNTION TO GET POKEMON DATABASE */
const getRandom_pokemon = async (random_poke) => {
  const res = await fetch(API_URL_BASE + random_poke);

  if (!res.ok) {
    throw new Error(`POKEMON NO ENCONTRADO (Código: ${respuesta.status})`);
  }

  const data = await res.json();
  return data;
};

/* RENDER RANDOM POKEMONS */
const render_Pokemons = async () => {
  const quanty_gallery = 16;
  const pokemon_container = document.querySelector("#gallery");

  for (let i = 0; i < quanty_gallery; i++) {
    random_poke = Math.floor(Math.random() * (250 - 1 + 1) + 1);
    const poke_data = await getRandom_pokemon(random_poke);
    const article = document.createElement("article");
    article.classList.add("poke-card");
    article.innerHTML = `
        <img src="${poke_data.sprites.front_default}" alt="imagen de pokemon" width="200px"/>
        <h3>${poke_data.name}</h3>
    `;
    pokemon_container.appendChild(article);
  }
};

/* RENDER DATA POKEMON SEARCHED */
const render_searcher_pokemon = async (user_pokemon) => {
  const pokeInfo_article = document.querySelector(".poke-info");
  pokeInfo_article.replaceChildren();
  const gallery_container = document.createElement("section");
  gallery_container.classList.add("images");
  const data_container = document.createElement("section");
  data_container.classList.add("searcher-info");

  try {
    const poke_data = await getRandom_pokemon(user_pokemon);
    gallery_container.innerHTML = ` 
      <img src="${poke_data.sprites.front_default}" alt="imagen de pokemon" width="200px"/>
      <img src="${poke_data.sprites.back_default}" alt="imagen de pokemon" width="200px"/>`;

    data_container.innerHTML = `
      <h2>Nombre: ${poke_data.name.toUpperCase()}</h2>
      <p>Número Pokedex: ${poke_data.id}</p>
      <p>Altura: ${poke_data.height / 10} m</p>
      <p>Peso: ${poke_data.weight / 10} kg</p>
      <p>Tipo: ${poke_data.types[0].type.name}</p>`;

    pokeInfo_article.appendChild(gallery_container);
    pokeInfo_article.appendChild(data_container);
    data_container.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    pokeInfo_article.style.display = "block";
    console.log("No se encontro el pokemon", error);
    data_container.innerHTML = `<p>Pokémon no encontrado. Intenta de nuevo.</p>`;
    pokeInfo_article.appendChild(data_container);
  }
};

/* GET USER POKEMON */
const searcher_form = document.querySelector(".poke-searcher");

searcher_form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const searcher = document.querySelector("#searcher");
  const user_pokemon = searcher.value.toLowerCase().trim();

  if (user_pokemon) {
    render_searcher_pokemon(user_pokemon);
  }
});

//REMOVE & ADD CLASS
const click_image = (event) => {
  const current_selected_photo = document.querySelector(".selected_img");
  if (current_selected_photo) {
    current_selected_photo.classList.remove("selected_img");
  }
  event.target.classList.add("selected_img");
};

/* UPLOAD USER-PHOTOS */
const upload_btn = document.querySelector("#upload");
const section_photo = document.querySelector(".personal_photos");

upload_btn.addEventListener("change", (ev) => {
  const user_files = ev.target.files;
  Array.from(user_files).forEach((file) => {
    const imageURL = URL.createObjectURL(file);
    const newImg = document.createElement("img");
    newImg.src = imageURL;
    newImg.alt = "Foto de usuario";
    newImg.addEventListener("click", click_image);
    section_photo.appendChild(newImg);
  });
});

render_Pokemons();
