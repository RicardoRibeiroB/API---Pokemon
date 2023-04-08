//criação das variaveis e pegando os ids do html
const informacao_pokemon = document.getElementById('caracteristicas');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
let imagemPokemon = document.createElement("img");

//aqui é como vai ficar no html
const defaultContent = {
  nomePokemon: '',
  habilidade: 'Habilidade',
  formas: 'Formas',
  especies: 'Espécie',
  tipos: 'Tipos',
  xp: 'Experiência',
  altura: 'Altura'
}


//Aqui foi para que as infos dos pokemons resetassem depois que eu procurava outro 
function resetPokemonInfo() {
  document.querySelector("#nomePokemon").innerHTML = defaultContent.nomePokemon.toUpperCase();
  document.querySelector("#habilidade").innerHTML = defaultContent.habilidade.toUpperCase();
  document.querySelector("#formas").innerHTML = defaultContent.formas.toUpperCase();
  document.querySelector("#especies").innerHTML = defaultContent.especies.toUpperCase();
  document.querySelector("#tipos").innerHTML = defaultContent.tipos.toUpperCase();
  document.querySelector("#altura").innerHTML = defaultContent.altura.toUpperCase();
  document.querySelector("#xp").innerHTML = defaultContent.xp.toUpperCase();
}

//aqui é para chamar a api pelo search
searchButton.addEventListener('click', () => {
  const nomePokemon = searchInput.value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}?language=pt-br`;
  getItem(url);

});

function getItem(url) {
  fetch(url)
    .then(response => response.json())
    .then(dados => {
      resetPokemonInfo();
      infoPokemon(dados);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      console.log('Processo finalizado!');
    });
}
//aqui é para mandar as infos dos pokemons para o html
function infoPokemon(pokemon) {
  //isso aqui eu tive que criar a variavel para as infos da api, pq se não criasse dava que nao existia ela (tive que consultar o chatGPT para conseguir resolver esse problema que estava tendo)
  const { name, abilities, types, height, base_experience, sprites, species, forms } = pokemon;

  //criando html nome do pokemon
  let nomePokemon = document.createElement("div");
  nomePokemon.textContent = `${name}`;
  nomePokemon.id = 'nomePokemon';

  //aqui eu apago a imagem que estava antes de eu procurar outro pokemon
  document.querySelector("#img").innerHTML = '';

  //criando html imagem do pokemon
  let imagemPokemon = document.createElement("img");
  imagemPokemon.src = sprites.other['official-artwork'].front_default;

  imagemPokemon.alt = name;

  //mexendo no css da imagem
  imagemPokemon.width = 150;
  imagemPokemon.height = 150;
  imagemPokemon.style.marginLeft = "33%";
  imagemPokemon.style.backgroundColor = 'white';
  imagemPokemon.style.borderRadius = '15px';  


  //criando html habilidade do pokemon
  let habilidadePokemon = document.createElement("div");
  habilidadePokemon.innerHTML = ` ${abilities.map(ability => `<span>${ability.ability.name}</span>`).join(', ')}`;
  habilidadePokemon.id = 'habilidadePokemon';

  //criando html formas do pokemon
  let formasPokemon = document.createElement("div");
  formasPokemon.textContent = ` ${forms[0].name}`;
  formasPokemon.id = 'formasPokemon';

  //criando html especies do pokemon
  let especiesPokemon = document.createElement("div");
  especiesPokemon.textContent = ` ${species.name}`;
  especiesPokemon.id = 'especiesPokemon';

  //criando html tipos do pokemon
  let tiposPokemon = document.createElement("div");
  tiposPokemon.innerHTML = `${types.map(tipo => `<span>${tipo.type.name}</span>`).join(', ')}`;
  tiposPokemon.id = 'tiposPokemon';

  //criando html experiencia do pokemon
  let experienciaPokemon = document.createElement("div");
  experienciaPokemon.textContent = `${base_experience}`;
  experienciaPokemon.id = 'xpPokemon';
  
  //criando html altura do pokemon
  let alturaPokemon = document.createElement("div");
  alturaPokemon.textContent = `${height}`;
  alturaPokemon.id = 'alturaPokemon';

  //adiciona os novos elementos HTML para exibir as informações do Pokemon atual
  document.querySelector("#nomePokemon").appendChild(nomePokemon);
  document.querySelector("#img").appendChild(imagemPokemon);
  document.querySelector("#habilidade").appendChild(habilidadePokemon);
  document.querySelector("#formas").appendChild(formasPokemon);
  document.querySelector("#especies").appendChild(especiesPokemon);
  document.querySelector("#tipos").appendChild(tiposPokemon);
  document.querySelector("#altura").appendChild(alturaPokemon);
  document.querySelector("#xp").appendChild(experienciaPokemon);
}
