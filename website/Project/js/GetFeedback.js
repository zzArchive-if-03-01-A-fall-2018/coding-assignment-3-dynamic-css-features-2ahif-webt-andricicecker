function GetTextFields()
{
  let username;
  if(!document.getElementById("blankCheckbox").checked)
  {
    username = document.getElementById("Username");
  }
  let comment = document.getElementById("Comment");
  SendToServer(username, comment);
}

function SendToServer(firstname, lastname, comment)
{
  
}
