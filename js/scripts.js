
let pokemonRepository = function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    function add(pokemon) {
        if (
            typeof pokemon === 'object' && 'name' in pokemon
        ){
            pokemonList.push(pokemon);
        }else{
            console.log('This is not a pokemon!');
        }
    };

    function loadList () {
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name, detailsUrl: item.url 
                };
                add(pokemon);
                console.log(pokemon)
            });
        }).catch(function(e) {
            console.error(e);
        })
    }
    
    function getAll() {
        return pokemonList;
    };
    function listItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li")
        let button = document.createElement("button")
        addPokemonListener(button, pokemon);
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        //showDetails(pokemon);
        }
    
    function showModal (pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';//clear all content
        let modal = document.createElement('div');//create the div that will hold the modal
        modal.classList.add('modal');//add the class list "modal"
        //start adding the modal content
        let closeButtonElement = document.createElement('button');//create the button for closing the modal
        closeButtonElement.classList.add('modal-close');//add the classlist for the clse button
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        let titleElement = document.createElement('h1');//fpr creating the title
        titleElement.innerText = pokemon.name, pokemon.imageUrl;
        let contenElement = document.createElement('p');//create the content
        contenElement.innerText = `height: ${pokemon.height}`
        let pokemonImage = document.createElement('img');
        pokemonImage.classList.add('img-element');
        pokemonImage.src = pokemon.imageUrl;


        modal.appendChild(closeButtonElement);//append to the DOM
        modal.appendChild(titleElement);
        modal.appendChild(pokemonImage);
        modal.appendChild(contenElement);
        modalContainer.appendChild(modal);



        modalContainer.classList.add('is-visible')

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if(target === modalContainer) {
                hideModal();
            }
        }); 
    }

    function hideModal () {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    })
    //adding the click functions
    //document.querySelector('#show-modal').addEventListener('click', () => {
        //showModal(title, text);
    //});
        

    function addPokemonListener(button, pokemon) {
        button.addEventListener('click', function() {
            showDetails(pokemon);
        })
    }



    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e) {
            console.log(e);
        })
    }
    function showDetails(pokemon) {
        console.log(pokemon);
        loadDetails(pokemon).then(()=> {
            showModal(pokemon);
        })
    }

    return {
        add: add,
        getAll: getAll,
        listItem: listItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
}();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.listItem(pokemon);
    });
});
