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

    // Loop through key-value pairs in the object
    for (const key in paragrafo) {
        if (paragrafo.hasOwnProperty(key)) {
            const p = document.createElement('p');
            p.textContent = paragrafo[key];  // Display value like "Nome: João"
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

const newMain = createMain(master);
document.body.appendChild(newMain);

const searchContainer = document.createElement('div');
searchContainer.innerHTML = `
    <input type="text" id="searchInput" placeholder="Search by name, city, etc...">
    <button id="searchButton">Search</button>
`;
document.body.prepend(searchContainer);



//Tried making a search 'engine' so it "recreates" the main with only the divs from the search
function filterMasterArray(query, masterArray) {
    const lowerQuery = query.toLowerCase();
    return masterArray.filter(subArray => {
        return subArray.some(obj => {
            if (typeof obj === 'object') {
                return Object.values(obj).some(value =>
                    String(value).toLowerCase().includes(lowerQuery)
                );
            }
            return false;
        });
    });
}

function renderMain(arrayMestre) {
    const existingMain = document.querySelector('main');
    if (existingMain) {
        existingMain.remove();
    }

    const newMain = createMain(arrayMestre);
    document.body.appendChild(newMain);
}

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    const filtered = filterMasterArray(query, master);
    renderMain(filtered);
});

//search engine ends here