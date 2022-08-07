const pokedex = document.getElementById('pokedex');
const url = 'https://pokeapi.co/api/v2/pokemon/';
// const page2 = document.getElementById('pokedex');
// page2.addEventListener('click', function() {
    //     window.open('index2.html','_self');
    // })
let num = 10, i = 1;
const promises = [];
const fetchPokemon = () => {
    while (i <= num) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
        i++;
    }
    num = num+10;
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
    .map(
        (pokeman) => `
        <li class="card" onclick = "selectPokemon(${pokeman.id})">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}.${pokeman.name}</h2>
        <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
        `
        )
        .join('');
        pokedex.innerHTML = pokemonHTMLString;
    };

const selectPokemon = async (id) => {
   const url_new =  `https://pokeapi.co/api/v2/pokemon/${id}`;
   const res = await fetch(url_new);
   const pokeman = await res.json();
   displayPopup(pokeman);
};

const displayPopup = (pokeman) => {
   const type = pokeman.types.map((type) => type.type.name).join(', ');
   const image = pokeman.sprites['front_default'];
   const htmlString =  `
   <div class = "popup">
   <button id = "closeBtn" onclick = "closePopup()">CLose</button>
   <div class="card" >
        <img class="card-image" src="${image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p><small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} | <small>Type: </small>${type}
   </div>
   <div/>
   `;
   pokedex.innerHTML = htmlString + pokedex.innerHTML;
   console.log(htmlString);
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
    fetchPokemon();
};

window.addEventListener('scroll',()=>{
    console.log(window.scrollY) //scrolled from top
    console.log(window.innerHeight) //visible part of screen
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
    fetchPokemon();
    }
})

fetchPokemon();
