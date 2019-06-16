var allComments;

function GetComments()
{
  let data;
  

  var myInit = { method: 'GET',
               headers: {'Accept': 'application/json','Content-Type': 'application/json'},
               cache: 'default'};

  var myRequest = new Request('http://localhost:3000/feedbacks', myInit);

  fetch(myRequest)
  .then(function(response) {
    if(!response.ok)
    {
      console.log(response.ok + ' ' + response.status);
      return;
    }
    return response.json();
  }).then(jsonanswer => {
      allComments = jsonanswer;
      addingjsondata(allComments);
  });
}

function addingjsondata(data) {
  var i;
  let commentArticle = document.getElementById("Comments");
  var com;
  for(i = 0; i < data.length; i++)
  {
    var dat = JSON.stringify(data[i]);
    com = JSON.parse(dat);
    commentArticle.innerHTML += '<div class="input-group mb-3">'+
                              '<div class="input-group-prepend">'+
                              '<span class="input-group-text" id="basic-addon1">@</span>'+
                              '</div>'+
                              '<input type="text" value=' + com.username + ' id="Username" class="form-control" aria-label="Username" aria-describedby="basic-addon1" readonly>'+
                              '</div>'+
                              '<div class="input-group">'+
                                '<div class="input-group-prepend">'+
                                '<span class="input-group-text">Comment</span>'+
                              '</div>'+
                              '<input type="text" id="Comment" value="' + com.comment + '" class="form-control" aria-label="Comment" maxlength="300" readonly></input>'+
                              '<br><br>';
  }
}

function FetchComments()
{
  if(TestServerConnection())
  {
    return GetComments();
  }
  else
  {
    alert('Aufrufen der Kommentare nicht möglich, aufgrund von Server-Problemen oder nicht verfügbar');
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
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => function(response) {
    if(response.ok)
    {
      console.log('Success:', JSON.stringify(data));
      alert('Success:', JSON.stringify(data));
    }
    else{
      console.log('Fail:', JSON.stringify(data));
      alert('Fail:', JSON.stringify(data));
    }
  })
  .catch(error => console.error('Error:', error));
}



function PostScores(finalScore)
{
  var score = parseInt(finalScore.value);
  let data = {"points": score};
  fetch('http://localhost:3000/highscores',
  {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(data)))
  .catch(error => console.error('Error:', error));
}

function GetScores()
{
  fetch('examples/example.json')
  .then(function(response) {
   if(!response.ok)
   {
    throw new Error(response.statusText);
   }
   return response.json();
  })
  .catch(function(error) {
    console.log('Looks like there was a problem: \n', error);
    throw new Error(error);
  });
}

function CheckBox()
{
  let username = document.getElementById("Username");
  let checkbox = document.getElementById("blankCheckbox");

  if(checkbox.checked == true)
  {
    username.disabled = true;
    return true;
  }
  else
  {
    username.disabled = false;
    return false;
  }
}

function TestServerConnection()
{
  fetch("http://localhost:3000/profile")
  .then(function() {
    alert("Server online!");
    console.log("Server online!");
    return true;
  })
  .catch(function() {
    alert("Server nicht verfügbar!");
    console.log("Server nicht verfügbar!");
    return false;
  });
}
