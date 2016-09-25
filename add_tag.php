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

$query = "SELECT tags FROM cinfo WHERE id = '" . $id . "' and tags LIKE '%;" . $tag . ";%';";

$update = "UPDATE cinfo SET tags = CONCAT(tags, ';" . $tag . ";') WHERE id = '" . $id . "';";

mysql_select_db('reddit');
mysql_set_charset('utf8mb4', $conn);
mysql_query("SET NAMES utf8mb4");
$result = mysql_query($query, $conn);

if(! $result) {
    die('Could not work: ' . mysql_error());
}

if(mysql_num_rows($result) == 1)
    {
        $result2 = mysql_query($update, $conn);
        if(! $result2) {
            die('Could not work: ' . mysql_error());
        }
    }
mysql_close();
?>
