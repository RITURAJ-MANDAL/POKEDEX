const pokedex = document.getElementById("pokedex");
let id_sent = localStorage.getItem("pokemon");
const url_new = `https://pokeapi.co/api/v2/pokemon/${id_sent}`;
const func = () => {
  fetch(url_new)
    .then((res) => res.json())
    .then((result) => {
      displayPopup({
        name: result.name,
        image: result.sprites["front_shiny"],
        type: result.types.map((type) => type.type.name).join(", "),
        id: result.id,
        height: result.height,
        weight: result.weight
      });
    });
};

const displayPopup = (pokeman) => {
  const image = pokeman.image;
  const htmlstring = `
<div class = "popup">
<div class="card">
<img class="card-image" src="${image}"/>
<h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
<p><small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} | <small>Type: </small>${pokeman.type}
</div>
<div/>
`;
  pokedex.innerHTML = htmlstring;
};
func();
