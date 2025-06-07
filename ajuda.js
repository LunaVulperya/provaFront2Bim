const storedArrayString = localStorage.getItem('info'); // Or sessionStorage.getItem('myArray');
const info = JSON.parse(storedArrayString);
console.log(info); // Output: [1, 2, 3, 4, 5]