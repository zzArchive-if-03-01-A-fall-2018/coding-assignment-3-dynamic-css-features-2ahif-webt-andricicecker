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
  fetch("http://localhost:3000/feedbacks").onload = function(){
    alert('Der Server ist online!');
    return true;
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
  fetch("http://localhost:3000/feedbacks").onerror = function()
  {
    alert('Der Server ist nicht online!');
    return false
  };
}

function PostComment(username, comment)
{
  var url = 'http://localhost:3000/feedbacks';
  var data = {"username":username, "comment":comment};

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Accept': 'application/json',
    }
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(data)))
  .catch(error => console.error('Error:', error));
}
