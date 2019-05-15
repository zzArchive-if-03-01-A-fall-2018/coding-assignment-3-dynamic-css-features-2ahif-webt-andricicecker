/*function GetTextFields()
{
  let username;
  if(!document.getElementById("blankCheckbox").checked)
  {
    username = document.getElementById("Username");
    username.disabled = true;
    username.value = "";
  }
  let comment = document.getElementById("Comment");
  SendToServer(username, comment);
  AddComent(username, comment);
  comment.value = "";
  username.value = "";
}*/

function AddComent(username, comment)
{
  var section = document.getElementById("Comments");
  section.innerHTML += ' ';
}

function SendToServer(username, comment)
{
  var mySQL = require('mysql');

  var con = mysql.createConnection(
  {
    host: "212.241.114.236",
    user: "andri",
    password: ""
  });

  con.connect(function(err)
  {
    if (err) throw err;
    console.log("Connected!");
  });


}
