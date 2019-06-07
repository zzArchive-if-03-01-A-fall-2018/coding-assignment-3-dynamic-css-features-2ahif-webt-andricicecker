/*function fetchAPI()
{
  fetch('http://212.241.114.236:3000/posts/4')
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
*/
function FetchComments(username, comment)
{
  fetchAPI();
}

function fetchAPI()
{
  fetch("http://212.241.114.236:3000/db.json").onload = function()
  {
    alert('Der Server ist online!');
  };
  .then(function (response) {
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.url);
    console.log(response.type);

    return response.json();
  })
  .then(
    function (json) {
      console.log(json["Test"]);
    }
  );
  fetch("http://212.241.114.236:3000/db.json").onerror = function()
  {
    alert('Der Server ist nicht online!');
  };
}

function PostComment()
{
  (async () => {
  const rawResponse = await fetch('https://212.241.114.236:3000/post', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({a: 1, b: 'Textual content'})
  });
  const content = await rawResponse.json();

  console.log(content);
})();
}
