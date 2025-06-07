var master = [];

const storedMasterArrayString = localStorage.getItem('master'); // Or sessionStorage.getItem('myArray');
master = JSON.parse(storedMasterArrayString);


const storedArrayString = localStorage.getItem('info'); // Or sessionStorage.getItem('myArray');
const info = JSON.parse(storedArrayString);
master.push(info);

const masterString = JSON.stringify(master);
localStorage.setItem('master', masterString);

console.log(info); // Output: [1, 2, 3, 4, 5]
console.log(master);


function createDivP(paragrafo) {
    // Create the div element
    const div = document.createElement('div');

    // Loop through the provided texts and create paragraph elements
    paragrafo.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        div.appendChild(p);
    });

    // Return the created div element
    return div;
}

function createMain(arrayMestre){
    const main = document.createElement('main');
    arrayMestre.forEach(arrayItem => {
        newdiv = createDivP(arrayItem);
        document.main.appendChild(newdiv);
    });
}

const newMain = createMain(master);
document.body.appendChild(newMain);