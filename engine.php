<?php

$server = "localhost";
$user = "root";
$password = "password";

$conn = mysql_connect($server, $user, $password);
if(! $conn)
{   
    die('Could not connect' . mysql_error());
}   

$counter = $_POST["counter"];
$attributes_array = $_POST["array"];

$query = "SELECT * FROM cinfo WHERE";

//break down of the array of serializedArrays
for($x = 0; $x < count($attributes_array);$x++)
{
    $ia = $attributes_array[$x]; //selects single serializedArray

    echo count($ia) . "\n";
    print_r($ia);

    $temp = "";
    for($y = 0; $y < count($ia); $y++)
    {
        $addParen = 0;
        if($x == 0)
        {
            $temp .= "(";
        } 
        else if($ia[$y][value] == "and")
        {
            $temp .= " AND ";
            $y++;
        }
        else if($ia[$y][value] == "or")
        {
            $temp .= ") OR (";
            $y++;
        }

        $type = $ia[$y][value];
        $y++;

        $temp .= "(";//move this to where input can be checked
        echo $type . "\n";
        /*This section deals with creating a keyword query */
        if($type == "keyword" || $type == "substring" || $type == "tag")
        {

            $relation = $ia[$y][value];
            $y++;
            if($relation == "equal" || $relation == "like")
            {
                $op = "LIKE";
            }
            else
            {
                $op = "NOT LIKE";
            }
            for($y; $y < count($ia); $y++) //mysql_real_escape_string  
            {
                if( $ia[$y][value] != "")
                {
                    if($type == "keyword")
                    {
                        $temp .= " body " . $op . " '% " . $ia[$y][value] . " %'"; 
                    }
                    else if($type == "substring")
                    {
                        $temp .= " body " . $op . " '%" . $ia[$y][value] . "%'"; 
                    }
                    else
                    {
                        $temp .= " tag " . $op . " '% " . $ia[$y][value] . ";%'"; 
                    }
                }
                if($y != count($ia)-1 && $ia[$y +1][value] != "")
                {
                    $temp .= " AND";
                }
            }
        }
        else if($type == "ups" || $type == "downs" || $type == "score" || $type == "word_count" || $type == "long_word_count" || $type == "sentence_count" || $type == "lix" || $type == "row_id" || $type == "gilded" || $type == "controversiality")
        {

            $relation = $ia[$y][value];
            $y++;
            if( $ia[$y][value] != "")
            {
                if(is_numeric($ia[$y][value]))
                {
                    if($relation == "greater than")
                    {
                        $temp .= " " . $type . " > " . $ia[$y][value] . "";
                    }
                    else if($relation == "equal")
                    {
                        $temp .= " " . $type . " = " . $ia[$y][value] . "";
                    }
                    else
                    {
                        $temp .= " " . $type . " < " . $ia[$y][value] . "";
                    }
                }
            }
        }
        else if($type == "edited" || $type == "archived" || $type == "score_hidden" || $type == "distinguished")
        {

            $relation = $ia[$y][value];
            if($relation != "either")
            {
                echo "ok";
                $temp .= " " . $type . " = '" . $relation . "'"; //may need to change this for nulls
            }
            else
            {
                $temp = "";
                $addParent = 1;
            }

        }
        else
        {

            $relation = $ia[$y][value];
            $y++;

            for($y; $y < count($ia); $y++)
            {
                if( $ia[$y][value] != "")
                {
                    if($relation == "equal")
                    {
                        $temp .= " " . $type . " = '" . $ia[$y][value] . "'";
                    }
                    else if($relation == "not equal")
                    {

                        $temp .= " " . $type . " != '" . $ia[$y][value] . "'";
                    }
                    else if($relation == "like")
                    {
                        $temp .= " " . $type . " LIKE '%" . $ia[$y][value] . "%'";
                    }
                    else
                    {
                        $temp .= " " . $type . " NOT LIKE '%" . $ia[$y][value] . "%'";
                    }
                }
                if($y != count($ia)-1 && $ia[$y +1][value] != "")
                {
                    $temp .= " OR";
                }
            }


        }

        if($addParent != 1)
        {
            $temp .= ")";
        }
    }
    $query .= $temp;
}
$query .= ") LIMIT 100;";

mysql_select_db('reddit');
mysql_set_charset('utf8mb4', $conn);
mysql_query("SET NAMES utf8mb4");
$result = mysql_query($query, $conn);

if(! $result) {
    die('Could not work: ' . mysql_error());
}

$num = 0;
$single_row = "";
$total_rows = "";
while(($row = mysql_fetch_assoc($result)) != null)
{
    $link = substr($row["link_id"], 3);
    $single_row = "<tr>" .
        "<td class=\"author_column\">". 
        "<p><label>Author: </label>". $row["author"] ."</p>".
        "<p><label>Subreddit: </label>". $row["subreddit"] ."</p>". 
        "<p><label>Flair: </label>". $row["author_flair_text"] ."</p>".
        "<p><label>Flair CSS: </label>". $row["author_flair_css_class"] ."</p>".
        "<p><label>Ups: </label>". $row["ups"] ."</p>".
        "<p><label>Downs: </label>". $row["downs"] ."</p>".
        "<p><label>Score: </label>". $row["score"] ."</p>".
        "</td>" .
        "<td class=\"body_column\">" . $row["body"] . "</td>" .
        "<br>" .
        "<a href=\"http://www.reddit.com/comments/" . $link . "/xyzzy/" . $row["id"] . "\">permalink</a>"; 

    $tags = explode(";", $row["tags"]);
    for($z = 0; $z < count($tags); $z++)
    {
        if($tags[$z] != "")
        {
            $single_row .= "<p>#" . $tags[$z] . "</p>";
        }

    }

    $single_row .= "<button type=\"button\">Edit</button>" . "</td>";
    $single_row .= "<td class=\"id_column\">".
        "<label>ID: </label>". $row["id"] ."</p>".
        "<label>Subreddit ID: </label>". $row["subreddit_id"] ."</p>".
        "<label>Parent ID: </label>". $row["parent_id"] ."</p>".
        "<label>Link ID: </label>". $row["link_id"] ."</p>".
        "<label>Name: </label>". $row["name"] ."</p>". 
        "</td>".
        "<td class=\"retrieved_on_column\">" . $row["retrieved_on"] . "</td>" .
        "<td class=\"created_utc_column\">" . $row["created_utc"] . "</td>" .
        "<td class=\"gilded_column\">" . $row["gilded"] . "</td>" .
        "<td class=\"controversiality_column\">" . $row["controversiality"] . "</td>" .
        "<td class=\"edited_column\">" . $row["edited"] . "</td>" . 
        "<td class=\"archived_column\">" . $row["archived"] . "</td>" .
        "<td class=\"distinguished_column\">" . $row["distinguished"] . "</td>" .
        "<td class=\"score_hidden_column\">" . $row["score_hidden"] . "</td>" . 
        "<td class=\"row_id_column\">" . $num . "</td>" .
        "<td class=\"wordcount_column\">" . $row["wordcount"] . "</td>" .
        "<td class=\"lwordcount_column\">" . $row["lwordcount"] . "</td>" .
        "<td class=\"sentcount_column\">" . $row["sentcount"] . "</td>" .
        "<td class=\"lix_column\">" . $row["lix"] . "</td>" . 
        "</tr>";

    $num++;
    echo "\n" . $num . "\n";
    $total_rows .= $single_row;
}


echo "\n" . $query . "\n";
//print_r($attributes_array);

echo $total_rows . "\n this is it\n";

echo count($attributes_array);
//echo json_encode($attributes_array);
?>
