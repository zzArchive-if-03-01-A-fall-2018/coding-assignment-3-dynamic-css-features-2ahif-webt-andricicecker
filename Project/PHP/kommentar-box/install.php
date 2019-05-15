<!DOCTYPE html>
<html lang="de">
 <head>
  <meta charset="UTF-8">
  <title>Kommentar-Box - Installation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="kommentar.css">

  <style>
  a:link,
  a:visited {
   color: #4169E1;
   text-decoration: None;
  }
  </style>

 </head>
<body>

<h2>&bdquo;Kommentar-Box&rdquo; - Installation</h2>

<?php
/*
 *  „Kommentar-Box” - install.php (utf-8)
 *  - https://werner-zenk.de
 */

if (!isset($_GET["aktion"])) {
 echo '<p><a href="install.php?aktion=install">Installation starten &#9658;</a></p>';
}
define('INSTALL', 'IB4WIgWnlqeFIDtEl1h');
include "kommentar.php";
?>

</body>
</html>