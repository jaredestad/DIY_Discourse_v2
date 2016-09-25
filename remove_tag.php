<?php

$server = "localhost";
$user = "root";
$password = "password";

$conn = mysql_connect($server, $user, $password);
if(! $conn)
{   
    die('Could not connect' . mysql_error());
}   

$id = mysql_real_escape_string($_POST["id"]);
$tag = mysql_real_escape_string($_POST["tag"]);


$query = "UPDATE cinfo SET tags = REPLACE(tags, ';" . $tag . ";', '') WHERE id = '" . $id . "';";

mysql_select_db('reddit');
mysql_set_charset('utf8mb4', $conn);
mysql_query("SET NAMES utf8mb4");
$result = mysql_query($query, $conn);

if(! $result) {
    die('Could not work: ' . mysql_error());
}

mysql_close();
?>
