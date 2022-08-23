const pokedex = document.getElementById("pokedex");
var num = 10,
  i = 1;
const promises = [];
const fetchPokemon = () => {
  while (i <= num) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
    i++;
  }
  num += 10;
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites["front_shiny"],
      type: result.types.map((type) => type.type.name).join(", "),
      id: result.id
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
    <li class="card" onclick = "exporting_function(${pokeman.id})"> 
    <img class="card-image" src="${pokeman.image}"/> 
    <h2 class="card-title">${pokeman.id}.${pokeman.name}</h2>
    </li>
    `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

const exporting_function = (id) => {
  localStorage.removeItem("pokemon");  
  let text = id.toString();
  localStorage.setItem("pokemon", text);
  window.open("index_page2.html", "_self");
};

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    fetchPokemon();
  }
});

fetchPokemon();
