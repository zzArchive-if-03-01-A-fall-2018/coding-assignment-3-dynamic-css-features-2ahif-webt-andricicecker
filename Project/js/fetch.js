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
function FetchComments()
{
  if(fetchAPI())
  {
    let username = document.getElementById('username');
    let comment = document.getElementById('comment');
    PostComment(username, comment);
  }
  else
  {
      console.log('Posten nicht möglich, aufgrund von Server-Problemen oder nicht verfügbar');
  }
}

function fetchAPI()
{
  fetch("http://192.168.0.5:3000/db.json").onload = function(){
    alert('Der Server ist online!');
  }
  .then(function(response) {
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
  fetch("http://192.168.0.5:3000/db.json").onerror = function()
  {
    alert('Der Server ist nicht online!');
  };
}

function PostComment(username, comment)
{
  var url = 'https://192.168.0.5:3000/comments';
  var data = {username: username, comment: comment};

  return fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Accept': 'application/json',
      'comments': 'application/json'
    }
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
}
