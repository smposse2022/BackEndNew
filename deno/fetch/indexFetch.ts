// https://rickandmortyapi.com/api/character
const response = await fetch(`https://rickandmortyapi.com/api/character`);
const data = await response.json();

console.log(data);
