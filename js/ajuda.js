//Pulls the master array from main.js so it gets all objects to build the divs in main
const storedMasterArrayString = localStorage.getItem('master'); // Or sessionStorage.getItem('myArray');
const master = JSON.parse(storedMasterArrayString) || [];

// const storedArrayString = localStorage.getItem('info'); // Or sessionStorage.getItem('myArray');
// const info = JSON.parse(storedArrayString);
//master.push(info);

// const masterString = JSON.stringify(master);
// localStorage.setItem('master', masterString);

// console.log(info); // Output: [1, 2, 3, 4, 5]
console.log(master);

//Creates the divs itself, and includes p tag for each entry, although didnt discover how to make multiple arrays in an array yet
function createDivP(paragrafo) {
    const div = document.createElement('div');
    div.classList.add('help-card'); // ✅ add the styling class

    for (const key in paragrafo) {
        if (paragrafo.hasOwnProperty(key)) {
            const p = document.createElement('p');
            p.classList.add('paragraph_about'); // Optional: apply your spacing class
            p.textContent = paragrafo[key];
            div.appendChild(p);
        }
    }

    return div;
}


//For each 'array' inside the master array, it should create a div for them and append them to the main
function createMain(arrayMestre) {
    const main = document.createElement('main');

    arrayMestre.forEach(item => {
        const newdiv = createDivP(item);  // item is now a flat object
        main.appendChild(newdiv);
    });

    return main;
}

// Get reference to footer
const footer = document.querySelector('footer');

const newMain = createMain(master);

const searchContainer = document.createElement('div');
searchContainer.classList.add('search-container');  // add the container class

searchContainer.innerHTML = `
    <input 
        type="text" 
        id="searchInput" 
        placeholder="Procure por Nome, Cidade, etc..." 
        class="search-input">
    
    <button 
        id="searchButton" 
        class="search-button">
    
        Procurar
    </button>
`;

// Insert search bar and main before the footer
document.body.insertBefore(searchContainer, footer);
document.body.insertBefore(newMain, footer);



//Tried making a search 'engine' so it "recreates" the main with only the divs from the search
function filterMasterArray(query, masterArray) {
    const lowerQuery = query.toLowerCase();
    return masterArray.filter(item => {
        // item is a flat object, so check all values directly
        return Object.values(item).some(value =>
            String(value).toLowerCase().includes(lowerQuery)
        );
    });
}

function renderMain(arrayMestre) {
    const existingMain = document.querySelector('main');
    if (existingMain) {
        existingMain.remove();
    }

    const newMain = createMain(arrayMestre);
    document.body.insertBefore(newMain, footer);
}

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    const filtered = filterMasterArray(query, master);
    renderMain(filtered);
});

//this is live search, it may or not be wonky as hell
document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value;
    const filtered = filterMasterArray(query, master);
    renderMain(filtered);
});

//search engine ends here