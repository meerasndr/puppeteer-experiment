import nodeFetch from  "node-fetch";
nodeFetch('https://swapi.dev/api/people/1')
.then((response) => {
  response.json().then((data) => console.log(data))
})
