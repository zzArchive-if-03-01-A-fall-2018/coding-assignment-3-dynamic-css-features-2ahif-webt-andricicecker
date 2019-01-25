function GetTextFields()
{
  let firstName = document.getelementbyid("firstnameText").value;
  let lastName = document.getelementbyid("lastnameText").value;
  let comment = document.getelementbyid("commentText").value;
  let gender = document.getelementbyid("genderText").value;

  document.getelementbyid("firstnameText").value = "Max";
  document.getelementbyid("lastnameText").value = "Mustermann";
  document.getelementbyid("commentText").value = "";

  SendToServer(firstname, lastname, comment);
}

function SendToServer(firstname, lastname, comment)
{

}
