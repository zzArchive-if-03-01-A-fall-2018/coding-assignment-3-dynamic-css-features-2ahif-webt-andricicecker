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
      return false;
    }
    return response.json();
  }).then(jsonanswer => { 
      addingjsondata(jsonanswer);
  }).catch(function(error) {
    serverError();
  });
  return true;
}

function serverError()
{
  alert("Server nicht verfügbar!\n Bitte überprüfen Sie ihre Internetverbindung.");
}

function WriteCommentsInHTML()
{
  return GetComments();
}

function addingjsondata(data) {
  var i;
  let commentArticle = document.getElementById("Feedbacks");
  var com;
  for(i = 0; i < data.length; i++)
  {
    var dat = JSON.stringify(data[i]);
    com = JSON.parse(dat);
    commentArticle.innerHTML +='<div id="Comments">'+ 
                              '<div class="input-group mb-3">'+
                              '<div class="input-group-prepend">'+
                              '<span class="input-group-text" id="basic-addon1">@</span>'+
                              '</div>'+
                              '<input type="text" value=' + com.username + ' id="Username" class="form-control" aria-label="Username" aria-describedby="basic-addon1" readonly>'+
                              '</div>'+
                              '<div class="input-group">'+
                                '<div class="input-group-prepend">'+
                                '<span class="input-group-text">Comment</span>'+
                              '</div>'+
                              '<textarea type="text" id="Comment" rows="' + CountBackslashes(com.comment) + '" class="form-control" aria-label="Comment" maxlength="300" readonly>' + com.comment + '</textarea>'+
                              '</div>'+
                              '<br><br>';
  }
}

function CountBackslashes(comment)
{
  var len = comment.length;
  var counter = 0;
  if(len < 1)
  {
    return 1;
  }
  else
  {
    var i = 0;
    for(i = 0; i < len; i++)
    {
      if(comment[i] === "\n")
      {
        counter++;
      }
    }
  }
  return counter;
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
      setTimeout(PostComment, 3000);
      alert('Success:', JSON.stringify(data));
      return true;
    }
    else{
      console.log('Fail:', JSON.stringify(data));
      serverError();
      return false
    }
  })
  .catch(error => console.error('Error:', error));
}

function PostScores(sc)
{
  var score = parseInt(sc);
  let data = {"points": score};
  fetch('http://localhost:3000/highscores',
  {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function(res) {
    if(res.ok)
    {
      console.log('Success:', JSON.stringify(data))
      setTimeout(PostScores, 3000);
      alert('Success:', JSON.stringify(data));
    }
    return res.json();
  }).catch(error => console.error('Error:', error));
}

function SortPoints(data){
  //Parsing the data so that it's usable
  var ix=JSON.stringify(data);
  var obj=JSON.parse(ix);

  var i;
  var j;
  for (i = 0; i < data.length; i++) {
       for(j = 0 ; j < data.length - i-1; j++){
       if (data[j].points < data[j + 1].points) {
         var temp = data[j];
         data[j] = data[j+1];
         data[j + 1] = temp;
       }
      }
     }

   return data;
}

function GetScores()
{
  fetch('http://localhost:3000/highscores')
  .then(function(response) {
   if(!response.ok)
   {
    console.log(response.statusText);
    serverError();
   }
   return response.json();
  }).then(function(data) {
    var sortedData = SortPoints(data);
    WriteScoresInHTML(sortedData);
  })
  .catch(function(error) {
    serverError();
  });
}

function WriteScoresInHTML(data)
{
  var p = document.getElementById("scores");
  let i;
  if(data.length < 1)
  {
    return;
  }
  for(i = 0; i < data.length; i++)
  {
    p.innerHTML += '<tr>'+
                   '<td>'+
                   (i + 1) +
                   '</td>'+
                   '<td>'+
                   data[i].points+
                   '</td>'+
                   '</tr>';
  }
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
  fetch("http://localhost:3000/feedbacks")
  .then(function(response) {
    if(response.ok)
    {
      alert("Server online!");
      console.log("Server online!");
      return true;
    }
    else
    {
      console.log("Server nicht verfügbar!");
      serverError();
      return false;
    }
  });
}
