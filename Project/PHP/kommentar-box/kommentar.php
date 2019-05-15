<?php
/*
 *  „Kommentar-Box” - kommentar.php (utf-8)
 *  - https://werner-zenk.de
 */


/* Einstellungen */

// Benutzername
$BENUTZER = "admin"; // user

// Passwort
// Das Passwort sollte mind. 8 Zeichen haben!
$PASSWORT = "admin2019"; // 0000

// E-Mail - Empfänger
$EMAIL = "danielandricic@hotmail.de"; // name@example.com

// Sperre der Anzeige (0 oder 1 = Der Kommentar
// ist nach dem eintragen sofort sichtbar!)
$ANZEIGESPERRE = 0; // 0

// Anzahl der Kommentare pro Seite
$KOMENTARE_SEITE = 10; // 10

// Kommentare nach dem Datum "aufsteigend"
// oder "absteigend" anzeigen!
$SORTIERUNG = "aufsteigend"; // aufsteigend

// Link zum bearbeiten der Einträge in der
// Kommentar-Box anzeigen (ja/nein)
$EDIT = "nein"; // nein

// Sterne-Bewertung
// Eine Zahl zwischen: 10022 und 10042
$STERN = "&#10026;"; // &#10026;

// Verbindungsdaten zur Datenbank
$DB_HOST = "localhost"; // Datenbank-Host
$DB_NAME = "test"; // Datenbank-Name
$DB_BENUTZER = "andri"; // Datenbank-Benutzer
$DB_PASSWORT = "Dani2019"; // Datenbank-Passwort


/* Fortgeschrittene Anwender können
ab hier selbst Änderungen vornehmen. */

// Name der Tabelle (Vorzeichen) -
// nach der Installation bitte nicht mehr ändern!
$TABELLE_PRAEFIX = "db"; // db

// PHP-Fehlermeldungen anzeigen (0/1)
error_reporting(0); // 0

// Hypertext Transfer Protokoll (http:// oder https://)
$HTTP = "http://"; // http://

// Zeitzone setzen
// http://php.net/manual/de/timezones.europe.php
date_default_timezone_set("Europe/Berlin");

// PHP-Version vergleichen
if (version_compare(PHP_VERSION, '5.6.0') < 0)
 die('<p>Aktuelle PHP-Version: ' . PHP_VERSION . '<br>Voraussetzung mind.: 5.6.0</p>');

try {
 // Verbindung zur Datenbank aufbauen
 $db = new PDO("mysql:host=" . $DB_HOST . ";dbname=" . $DB_NAME, $DB_BENUTZER, $DB_PASSWORT,
 [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"]);
}
catch (PDOException $e) {
 // Bei einer fehlerhaften Verbindung eine Nachricht anzeigen
 exit('<p class="statusx">&#10008; Die Verbindung zur Datenbank ist fehlgeschlagen!</p> ' . $e->getMessage());
}

// Dateipfad ermitteln
$dateipfad = str_replace("www.", "", $_SERVER["SERVER_NAME"] . $_SERVER["SCRIPT_NAME"]);
if (basename($dateipfad) == 'kommentar.php' && !isset($_GET["aktion"])  ||
    basename($dateipfad) == 'install.php' && !isset($_GET["aktion"])) exit;


// Aktion ausführen
if (isset($_GET["aktion"])) {
 switch($_GET["aktion"]):


  # Kommentar überprüfen, eintragen und E-Mail versenden
  case "eintragen":
  $eingabefehler = "";

  // Überprüfung auf Eingabefehler
  $eingabefehler .= md5($_POST["zip"]) != $_POST["zip2"] ? '&bull; Die Sicherheitsabfrage ist leider falsch!<br>' : '';
  $eingabefehler .= strlen(trim($_POST["name"])) <= 3 ? '&bull; Bitte geben Sie einen Namen ein!<br>' : '';
  $eingabefehler .= strlen($_POST["kommentar"]) < 15 ? '&bull; Bitte geben Sie einen Kommentar ein!<br>' : '';
  $eingabefehler .= strip_tags($_POST["name"]) != $_POST["name"] ||
                             strip_tags($_POST["kommentar"]) != $_POST["kommentar"] ? '&bull; HTML-Tags sind nicht erlaubt!<br>' : '';

  // Keine Eingabefehler
  if (empty($eingabefehler)) {

   // In die DB-Tabelle eintragen
   $insert = $db->prepare("INSERT INTO `" . $TABELLE_PRAEFIX . "_kommentarbox`
                                         SET
                                           `pfad`= :pfad,
                                           `anzeige`= :anzeige,
                                           `titel`= :titel,
                                           `name`= :name,
                                           `kommentar`= :kommentar,
                                           `bewertung`= :bewertung,
                                           `datum`= NOW()");
   if ($insert->execute([':pfad' => $dateipfad,
                                   ':anzeige' => $ANZEIGESPERRE,
                                   ':name' => strip_tags($_POST["name"]),
                                   ':titel' => strip_tags($_POST["titel"]),
                                   ':kommentar' => strip_tags($_POST["kommentar"]),
                                  ':bewertung' => $_POST["bewertung"]])) {

    print '<fieldset class="kommentarBox">
            <legend id="anker"> Kommentar eingetragen </legend>
            <p>&#10004; Vielen Dank <i>' . strip_tags($_POST["name"]) . '</i>, <br>der Kommentar wurde eingetragen.' .
            ($ANZEIGESPERRE == 0 ?
              '<br>Dieser wird vor der Veröffentlichung geprüft, daher kann es etwas dauern bis er erscheint.' :
              '') .
             '</p>
          </fieldset>';

    // E-Mail an den Admin versenden
    mb_internal_encoding("UTF-8");
    $betreff = mb_encode_mimeheader("Kommentar: " . $_POST["titel"], "UTF-8", "Q");
    $kopfzeile = "MIME-Version: 1.0;\nFrom: " . mb_encode_mimeheader(strip_tags($_POST["name"]), "UTF-8", "Q") .
     // Eine beim Provider registrierte E-Mail Adresse als Absender eintragen!
     "<noreply@example.com>" . "\nContent-Type: text/plain; Charset=UTF-8;\n";
    @mail($EMAIL,
              $betreff,
              "Datum: " . date("d.m.Y H:i") .
              " Uhr\nName: " . strip_tags($_POST["name"]) .
              "\nTitel der Seite: " . strip_tags($_POST["titel"]) .
              "\nKommentar:\n" . strip_tags($_POST["kommentar"]) .
              "\n\nBearbeiten: " . $HTTP . $dateipfad . "?aktion=bearbeiten&id=" . $db->lastInsertId() . "#anker",
             $kopfzeile);
   }
  }
  else {

   // Eingabefehler anzeigen
   print '<fieldset class="kommentarBox">
            <legend id="anker"> Eingabefehler </legend>
            <p class="statusx">&#10008; Ihr Kommentar wurde aus folgendem Grund nicht eingetragen: </p>
            <p>' . $eingabefehler . '</p>
            <a href="javascript:history.back()">&#9668; Zurück zum Formular</a>
           </fieldset>';
  }
  break;


  # Kommentar bearbeiten
  case "bearbeiten":
  if (isset($_GET["id"])) {

   // Kommentar auslesen
   $select = $db->prepare("SELECT `id`, `titel`, `name`, `kommentar`, `bewertung`, `datum`
                                         FROM `" . $TABELLE_PRAEFIX . "_kommentarbox`
                                         WHERE `id`= :id");
   $select->execute([':id' => $_GET["id"]]);
   $kommentar = $select->fetch();

   // Datensatz vorhanden
   if ($select->rowCount() == 1) {

    // Datum formatieren
    sscanf($kommentar["datum"], "%4s-%2s-%2s %5s", $jahr, $monat, $tag, $uhr);

    // Formular anzeigen
    print '<form name="Form" action="' . $_SERVER["SCRIPT_NAME"] . (isset($_GET["seite"]) ? '?seite=' . $_GET["seite"] : '?seite=1') . '&aktion=aendern#anker" method="post">
      <fieldset class="kommentarBox">
      <legend id="anker"> Kommentar bearbeiten </legend>

       <nav>&bdquo;' . $kommentar["titel"] . '</ins>&rdquo; &#10072; ' . $tag . '.' . $monat . '.' . $jahr . ' - ' . $uhr . ' Uhr</nav>

      <p>
       <label> Name: <input type="text" name="name" value="' . $kommentar["name"] . '" size="25" required="required"> </label> &nbsp;
        ' . (bewertung($kommentar["bewertung"], $STERN)) . '
      </p>

      <p>
       <label for="kommentar"> Kommentar:<br>
       <textarea name="kommentar" id="kommentar" rows="12" cols="52" required="required">' . $kommentar["kommentar"] . '</textarea>
      </p>

      <p>
        <input type="radio" name="auswahl" value="edit" id="lbl1" checked="checked"> <label for="lbl1">Kommentar anzeigen </label> &emsp;
        <input type="radio" name="auswahl" value="delete" id="lbl2"> <label for="lbl2">Kommentar löschen </label>
      </p>

      <p>
       <input type="hidden" name="id" value="' . $kommentar["id"] . '">
       <label> Benutzer: <input type="text" name="benutzer" size="20" autocomplete="username" required="required"> </label><br>
       <label> Passwort: <input type="password" name="passwort" size="20" autocomplete="current-password" required="required"> </label>
       &emsp; <input type="submit" value="Ausführen">
      </p>
      </fieldset>
      </form>';
   }
   else {
    print '<p class="statusx" id="anker"> &#10008; Dieser Kommentar ist nicht vorhanden! </p>';
   }
  }
  break;


  # Kommentar ändern / löschen
  case "aendern":
  if ($_POST["passwort"] == $PASSWORT &&
      $_POST["benutzer"] == $BENUTZER) {

   // Ändern
   if ($_POST["auswahl"] == "edit") {
    $update = $db->prepare("UPDATE `" . $TABELLE_PRAEFIX . "_kommentarbox`
                                            SET
                                               `name` = :name,
                                               `kommentar` = :kommentar,
                                               `anzeige` = 1
                                            WHERE
                                               `id` = :id");
    if ($update->execute([':name' => strip_tags($_POST["name"]),
                                      ':kommentar' => strip_tags($_POST["kommentar"]),
                                      ':id' => $_POST["id"]])) {
     print '<p class="status" id="anker"> &#10004; Der Kommentar wurde geändert. </p>';
    }
   }

   // Löschen
   if ($_POST["auswahl"] == "delete") {
    $delete = $db->prepare("DELETE FROM `" . $TABELLE_PRAEFIX . "_kommentarbox`
                                          WHERE `id` = :id");
    if ($delete->execute([':id' => $_POST["id"]])) {
     print '<p class="status" id="anker"> &#10004; Der Kommentar wurde gelöscht. </p>';
    }
   }
  }
  else {
   print '<p class="statusx" id="anker"> &#10008; Sie haben keine Berechtigung! </p>';
  }
  break;


  # Installation
  case "install":
  if (defined('INSTALL')) {

   // Formular anzeigen
   print '<form action="' . $_SERVER["SCRIPT_NAME"] . '?aktion=install_start" method="post">
     <fieldset class="kommentarBox">
     <legend> Installation starten </legend>
     <label> Benutzer: <input type="text" name="benutzer" size="20" autocomplete="username" required="required"> </label><br>
     <label> Passwort: <input type="password" name="passwort" size="20" autocomplete="current-password" required="required"> </label>&nbsp;
     <input type="submit" value="Ausführen">
     </fieldset>
     </form>';
  }
  break;


  # Installation starten
  case "install_start":
   if ($_POST["passwort"] == $PASSWORT &&
       $_POST["benutzer"] == $BENUTZER &&
       defined('INSTALL')) {
    if ($db->query("CREATE TABLE IF NOT EXISTS `" . $TABELLE_PRAEFIX . "_kommentarbox` (
                              `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                              `pfad` VARCHAR(250) COLLATE utf8_unicode_ci NOT NULL,
                              `anzeige` TINYINT(1) NOT NULL,
                              `titel` VARCHAR(150) COLLATE utf8_unicode_ci NOT NULL,
                              `name` VARCHAR(45) COLLATE utf8_unicode_ci NOT NULL,
                              `kommentar` TEXT COLLATE utf8mb4_unicode_ci NOT NULL,
                              `bewertung` TINYINT(1) NOT NULL,
                              `datum` DATETIME NOT NULL
                             ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;")) {

     print '<p class="status"> &#10004; Die Datenbank-Tabelle wurde erstellt. </p>';
     print file_exists("demo.php") ? '<p><a href="demo.php">Zur Demoseite &#9658;</a></p>' : '';
    }
    else {
     print '<p class="statusx"> &#10008; Fehler beim erstellen der Datenbank-Tabelle. </p>';
     print_r($db->errorInfo());
    }
   }
   else {
    print '<p class="statusx"> &#10008; Sie haben keine Berechtigung! </p>';
   }
  break;

  // Falscher Schalter!
  default:
   print '<p class="statusx"> &#10008; Fehler beim aufrufen einer Funktion! </p>';
 endswitch;
}


// Einträge anzeigen
$anzeige = isset($_GET["aktion"]) && $_GET["aktion"] == "bearbeiten" ||
                 isset($_GET["aktion"]) && $_GET["aktion"] == "aendern" ?
                 '' : ' AND `anzeige` = 1';


// Anzahl der Kommentare
$select = $db->query("SELECT `id` FROM `" . $TABELLE_PRAEFIX . "_kommentarbox`
                                   WHERE `pfad` = '" . $dateipfad . "'" . $anzeige) or exit('</body></html>');
$AnzahlKommentare = $select->rowCount();

// Sind Kommentare vorhanden
if ($AnzahlKommentare > 0) {

 // Die Anzahl der Seiten ermitteln
 $AnzahlSeiten = ceil($AnzahlKommentare / $KOMENTARE_SEITE);

 // Die aktuelle Seite ermitteln
 $AktuelleSeite = isset($_GET["seite"]) ?  intval($_GET["seite"]) : 1;

 // Den Wert überprüfen und ggf. ändern
 $AktuelleSeite = $AktuelleSeite < 1 || $AktuelleSeite > $AnzahlSeiten ? 1 : $AktuelleSeite;

 // Den Versatz ermitteln
 $Versatz = $AktuelleSeite * $KOMENTARE_SEITE - $KOMENTARE_SEITE;


 // Kommentare auslesen
 $select = $db->prepare("SELECT `id`, `anzeige`, `name`, `kommentar`, `bewertung`, `datum`
                                      FROM `" . $TABELLE_PRAEFIX . "_kommentarbox`
                                      WHERE `pfad` = '" . $dateipfad . "' " . $anzeige . "
                                      ORDER BY `datum` " . ($SORTIERUNG == "absteigend" ? "DESC" : "ASC") . "
                                      LIMIT :versatz, :dseite");
 $select->bindValue(':versatz', $Versatz, PDO::PARAM_INT);
 $select->bindValue(':dseite', $KOMENTARE_SEITE, PDO::PARAM_INT);
 $select->execute();
 $kommentare = $select->fetchAll();

 // Kommentare
 print '<fieldset class="kommentarBox" id="kommentare"> <legend> ' .
  $AnzahlKommentare . ' Kommentar' . ($AnzahlKommentare > 1 ? 'e' : '') .
  // Link zur Kommentar-Box
  ((count($kommentare) >= 4 && !isset($_GET["aktion"])) ? ' - <a href="#anker">Kommentar eintragen</a>' : '') .
  '</legend>';


 // Navigation
 $navigation = "";
 $modus = isset($_GET["aktion"]) && $_GET["aktion"] == "bearbeiten" ||
                 isset($_GET["aktion"]) && $_GET["aktion"] == "aendern" ?
                '<a href="?seite=' . $AktuelleSeite . '#kommentare" title="Bearbeiten beenden">&#10001; Beenden</a> &emsp;' : '';

 // Navigation nur anzeigen wenn es mehr als X Kommentare gibt
 if ($AnzahlKommentare > $KOMENTARE_SEITE) {

  // Bearbeiten Option
  $bearbeiten = isset($_GET["aktion"]) && $_GET["aktion"] == "bearbeiten" ||
                       isset($_GET["aktion"]) && $_GET["aktion"] == "aendern" ? '&aktion=bearbeiten' : '';

  $navigation = '<nav>' . $modus . 'Seite: ' . $AktuelleSeite . ' von ' . $AnzahlSeiten . ' &emsp; ' .
  (($AktuelleSeite - 1) > 0 ? '<a href="?seite=' . ($AktuelleSeite - 1) . $bearbeiten . '#kommentare" title="Eine Seite zurück">&#9668; Zurück</a> ' : '') . ' ' .
  (($AktuelleSeite + 1)  <= $AnzahlSeiten ? '<a href="?seite=' . ($AktuelleSeite + 1) . $bearbeiten . '#kommentare" title="Eine Seite weiter">Weiter &#9658;</a>' : '') .
  '</nav>';
 }
 else {
  $navigation = '<nav>' . $modus . '</nav>';
 }
 print $navigation;


 // Kommentare anzeigen
 foreach($kommentare as $kommentar) {

  // Bearbeiten Option
  $bearbeiten = isset($_GET["aktion"]) && $_GET["aktion"] == "bearbeiten" ||
                       isset($_GET["aktion"]) && $_GET["aktion"] == "aendern" ?
                       ' <a href="?seite=' . $AktuelleSeite . '&aktion=bearbeiten&id=' . $kommentar["id"] . '#anker" title="Diesen Kommentar bearbeiten">&#10001; Bearbeiten</a>' : '';

  // Aktuellen Kommentar beim bearbeiten markieren
  $markieren = isset($_GET["aktion"]) && $_GET["aktion"] == "bearbeiten" &&
                      isset($_GET["id"]) && $_GET["id"] == $kommentar["id"] ?
                      ' style="background-color: #FFFFE1;"' : '';

  // Kommentar gesperrt
  $gesperrt = $kommentar["anzeige"] == 0 ? ' <mark title="Dieser Kommentar ist gesperrt">&empty;</mark>' : '';

  // Datum formatieren
  sscanf($kommentar["datum"], "%4s-%2s-%2s", $jahr, $monat, $tag);

  // Anzeigen
  print '<dl class="kommentar"' . $markieren . '>' .
          '<dt>' . $kommentar["name"] . $gesperrt .
          ' ' . bewertung($kommentar["bewertung"], $STERN) .
          ' &#10072; <small>' . $tag . '.' . $monat . '.' . $jahr . '</small>' . $bearbeiten . '</dt>' .
          '<dd>' . smileys($kommentar["kommentar"]) . '</dd>' .
          '</dl>';
 }

 // Link zum bearbeiten der Einträge anzeigen
 $edit = ($EDIT == 'ja' &&
             !isset($_GET["aktion"])) ? '<br><a href="?seite=' . $AktuelleSeite . '&aktion=bearbeiten#kommentare">&#10001; Bearbeiten</a>' : '';

 print $navigation . $edit . '</fieldset>';
}


// Formular
if (!isset($_GET["aktion"])) {

 // Sicherheitsabfrage - Rechenaufgabe
 $Z0 = [mt_rand(1, 9), mt_rand(1, 9)];
 $Z1 = max($Z0);
 $Z2 = min($Z0);
 $Spam = $Z1 . " &#43; &#" . (48 + $Z2) . ";";
 $Schutz = md5($Z1 + $Z2);

 // Formular anzeigen
 print '<form name="Form" action="' . $_SERVER["SCRIPT_NAME"] . '?aktion=eintragen#anker" method="post">
 <fieldset class="kommentarBox">
 <legend id="anker"> Kommentar eintragen </legend>

 <p>
  <label> Name: <mark>*</mark>
  <input type="text" name="name" size="20" maxlength="40" required="required"> </label> &emsp;
  <label>Bewertung:
  <select name="bewertung">
   <option value="0" selected="selected"></option>
   <option value="1">' . $STERN . '</option>
   <option value="2">' . $STERN . ' ' . $STERN . '</option>
   <option value="3">' . $STERN . ' ' . $STERN . ' ' . $STERN . '</option>
  </select></label>
 </p>

 <p>
  <label for="kommentar"> Kommentar:</label> <mark>*</mark><br>
  <textarea name="kommentar" id="kommentar" rows="12" cols="54" required="required" spellcheck="true"></textarea>
 </p>

 <p>
  <label> Sicherheitsabfrage: <mark>*</mark> &emsp;
  <em>' . $Spam . '</em> =
  <input type="text" name="zip" size="4" required="required" autocomplete="off"> </label> &emsp;
  <input type="hidden" name="zip2" value="' . $Schutz . '">
  <script> document.write(\'<input type="hidden" name="titel" value="\' + document.title + \'">\'); </script>
  <input type="submit" value="Eintragen">
 </p>
 </fieldset>
</form>
 ';
}


/* Funktionen */
// Smileys
function smileys($kommentar) {
 $smiley = array(
  ":)" => '<span class="smiley1"></span>',
  ":-)" => '<span class="smiley1"></span>',
  ";)" => '<span class="smiley2"></span>',
  ";-)" => '<span class="smiley2"></span>',
  "^^" => '<span class="smiley2"></span>',
  ":(" => '<span class="smiley3"></span>',
  ":-(" => '<span class="smiley3"></span>',
  ":D" => '<span class="smiley4"></span>',
  ":))" => '<span class="smiley4"></span>',
 );
 $kommentar = strtr($kommentar, $smiley);
 return nl2br($kommentar);
}

// Bewertung
function bewertung($punkte, $STERN) {
 if ($punkte < 1) return;
 return ($punkte > 0 ? '<span class="bewertung_ok" title="Bewertung: ' .  $punkte . ' von 3">' . str_repeat($STERN . '&thinsp;' , $punkte) . '</span>' : '') .
 ((3 - $punkte) > 0 ? '<span class="bewertung_ko" title="Bewertung: ' .  $punkte . ' von 3">' . str_repeat($STERN . '&thinsp;' , (3 - $punkte)) . '</span>' : '');
}
?>
