function fetchAPI()
{
  fetch('http://localhost:3000/posts/4')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
    console.log(JSON.stringify(myJson.title));
    console.log(JSON.stringify(myJson.author));
    console.log(JSON.stringify(myJson.id));
  });

  fetch('http://212.241.114.236:3000/posts/3')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
    console.log(JSON.stringify(myJson.title));
    console.log(JSON.stringify(myJson.author));
    console.log(JSON.stringify(myJson.content));
    console.log(JSON.stringify(myJson.id));
  });
}
