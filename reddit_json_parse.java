/*
*@author Jared Estad
*@version 1.0
*@date 4/5/2016
*@description This program is design to parse through information in a JSON file format. The parsed data will be saved into a database. Any addition features that include adding information to a database should be here as well.
 *@reference1 http://stackoverflow.com/questions/811851/how-do-i-read-input-character-by-character-in-java
*/

import java.io.*;
import java.sql.*;
import java.util.Scanner;
import java.nio.charset.Charset;
import java.util.ArrayList;

public class reddit_json_parse
{
    public static int last_count = 32413291;//32413291
    //if we ran this program before and it errored before completion this number will help count lines up to where the error occurred

    public static void main(String[] args) throws IOException
    {
     
        Charset encoding = Charset.defaultCharset();
        //mysql_createDB();
        for(String filename : args){
            File file = new File(filename);
            fileReader(file, encoding);
        }       

    }
    private static void fileReader(File file, Charset encoding) throws IOException
    {
        try( InputStream in = new FileInputStream(file);
            Reader reader = new InputStreamReader(in, encoding);
            Reader buffer = new BufferedReader(reader))
        {
            charReader(buffer);
            in.close();
        }
    
    }
    private static void charReader(Reader reader) throws IOException
    {
        int r;
        int count = 0;
        int prev_count = 0;
        while((r = reader.read()) != -1)
        {
            char ch = (char) r;
            if( ch == '{')
            {
                String[] array = parseJson(reader, ch);
                count++;
                if(count > last_count)
                {
                    array[10] = unslashUnicode(array[10]);
                    int wordcount = wordcount(array[10]);
                    int longwordcount = longwordcount(array[10]);
                    int sentencecount = sentencecount(array[10]);
                    int lix;
                    if(wordcount > 0 && sentencecount > 0)
                    {
                        lix = wordcount/sentencecount + (longwordcount * 100)/wordcount;
                    }
                    else{
                        lix = 0;
                    }
                    
                    int[] numbers = {wordcount, longwordcount, sentencecount, lix};
                    
                    mysql_handler(array, numbers);
                }
                
                if(count == 1000000)
                {
                    prev_count = count;
                }
                
                if(count == prev_count+1000000)
                {
                    System.out.println(count);
                    prev_count = count;
                }
                
            }
        }
    }
    private static void mysql_createDB()
    {
        String server = "jdbc:mysql://localhost/reddit?useUnicode=true&useSSL=false";
        String user = "root";
        String password = "password";
        String database = "database";
        Connection conn = null;
        Statement statement = null;
        
        try {
            
            String drop_query = "DROP TABLE cinfo;";
            String create_query = "CREATE TABLE cinfo (gilded INT(10), author_flair_text TEXT, author_flair_css_class TEXT, retrieved_on INT(30), ups INT(10), subreddit_id TEXT, edited TEXT, controversiality INT(10), parent_id TEXT, subreddit TEXT, body TEXT, created_utc INT(30), downs INT(10), score INT(10), author TEXT, archived TEXT, distinguished TEXT, id TEXT, score_hidden TEXT, name TEXT, link_id TEXT, tags TEXT, wordcount INT, lwordcount INT, sentcount INT, lix INT);";

            
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(server, user, password);
            statement = conn.createStatement();
            statement.executeUpdate(drop_query);
            statement.executeUpdate(create_query);
            conn.close();
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }
    private static void mysql_handler(String[] array, int[] numbers)
    {
        String server = "jdbc:mysql://localhost/reddit?useUnicode=true&useSSL=false";
        String user = "root";
        String password = "password";
        String database = "database";
        Connection conn = null;
        Statement statement = null;
        
        try {
        String insert_query = "INSERT INTO cinfo(gilded, author_flair_text, author_flair_css_class, retrieved_on, ups, subreddit_id, edited, controversiality, parent_id, subreddit, body, created_utc, downs, score, author, archived, distinguished, id, score_hidden, name, link_id, wordcount, lwordcount, sentcount, lix) VALUES ('" + array[0] + "', '" + array[1] + "', '" + array[2] + "', '" + array[3] + "', '" + array[4] + "', '" + array[5] + "', '" + array[6] + "', '" + array[7] + "', '" + array[8] + "', '" + array[9] + "', '" + array[10] + "', '" + array[11] + "', '" + array[12] + "', '" + array[13] + "', '" + array[14] + "', '" + array[15] + "', '" + array[16] + "', '" + array[17] + "', '" + array[18] + "', '" + array[19] + "', '" + array[20] + "', '"+ numbers[0] + "', '" + numbers[1] + "', '" + numbers[2] + "', '" + numbers[3] + "');";
            
            
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(server, user, password);
            statement = conn.createStatement();
            statement.executeUpdate(insert_query);
            conn.close();
            
            
            
        }
        catch(Exception e)
        {
            e.printStackTrace();
            System.out.println(array[17] + " " + array[20] + " " + array[10] + " wordcount: " + numbers[0] + " lwordcount: " + numbers[1] + " sentcount: " + numbers[2] + " lix: " + numbers[3]);
        }
    }
    private static int sentencecount(String str)
    {
        String parts[] = str.split("[!?.]+");
        int counter = 0;
        for(int x = 0; x < parts.length; x++)
        {
            //System.out.println(x + ". " + parts[x]);
            if(parts[x].length() > 2)
            {
                counter++;
            }
        }
        //System.out.println(counter);
        return parts.length;
        
    }
    private static int wordcount(String str)
    {
        String parts[] = str.split(" ");
        for(int x = 0; x < parts.length; x++)
        {
            //System.out.println(x + ". " + parts[x]);
        }
        return parts.length;
    }
    private static int longwordcount(String str)
    {
        
        str = str.replaceAll("\r'", " ");
        str = str.replaceAll("\n", " ");
        str = str.replaceAll("\b", " ");
        str = str.replaceAll("\t", " ");
        
        str = str.replaceAll("\\=", "");
        str = str.replaceAll("\\~", "");
        str = str.replaceAll("\\.", "");
        str = str.replaceAll("\\'", "");
        str = str.replaceAll("\\,", "");
        str = str.replaceAll("\\?", "");
        str = str.replaceAll("\\!", "");
        str = str.replaceAll("\\;", "");
        str = str.replaceAll("\\:", "");
        str = str.replaceAll("\"", "");
        str = str.replaceAll("\\*", "");
        str = str.replaceAll("\\\\", "");
         
        str = str.replaceAll("\\p{P}", " ");
        //System.out.println(str);
        String parts[] = str.split(" ");
        int counter = 0;
        for(int x = 0; x < parts.length; x++)
        {
            if(parts[x].length() > 6)
            {
                //System.out.println(">6 " + parts[x]);
                counter++;
            }
        }
        return counter;
    }
    private static String[] parseJson(Reader reader, char character) throws IOException
    {
        char ch = character;
        
        String[] jtitles = {"gilded", "author_flair_text", "author_flair_css_class", "retrieved_on", "ups", "subreddit_id", "edited", "controversiality", "parent_id", "subreddit", "body", "created_utc", "downs", "score", "author", "archived", "distinguished", "id", "score_hidden", "name", "link_id"};
        String[] jcontent = new String[21];
        int num = 0;
        String jtitle = "";
        boolean goParse = false;
        
        while( (ch = (char) reader.read()) != '}')//read until ending bracket is found
        {
            goParse = false;
            //System.out.println(ch);
            if(ch == '\"')//quotation here denote beginning of data type
            {
                jtitle = "";
                while( (ch = (char) reader.read()) != '\"')
                {
                    //System.out.println(ch);
                    jtitle += ch;//concat data type
                    
                }
                goParse = true;
            }
            
           
            
            if(goParse == true)
            {
                //System.out.println("jtitle = " + jtitle);
                for(int x = 0; x < jtitles.length; x++)
                {
                    if(jtitle.equals(jtitles[x]))//finds matching data type in the jtitles array
                    {
                        num = x;
                    }
                }
                
                
                
                
                String contents = "";
                reader.read();//clear colon after data type
                ch = (char) reader.read();
                if(ch == '\"')//check for string
                {
                    
                    boolean end = false;
                    boolean go = true;
                    while(end == false)
                    {
                        
                        if(go == true)
                        {
                            ch = (char) reader.read();
                        }
                        //System.out.println(ch);
                        go = true;
                        if(ch == '\\')
                        {
                            ch = (char) reader.read();
                            
                            if(ch == 'n')
                            {
                                contents += '\n';
                            }
                            else if(ch == '\"')
                            {
                                contents += '"';
                            }
                            else if(ch == '\\')
                            {
                                contents += '\\';
                                contents += '\\';
                            }
                            else if(ch == 'r')
                            {
                                contents += '\r';
                            }
                            else if(ch == 'b')
                            {
                                contents += '\b';
                            }
                            else if(ch == 't')
                            {
                                contents += '\t';
                            }
                            else
                            {
                                //contents += '\\';
                                contents += '\\';
                                go = false;
                            }
                        }
                        else if(ch != '\"')
                        {
                            if(ch == '\'')
                            {
                                contents += '\\';
                            }
                            contents += ch;
                        }
                        else
                        {
                            end = true;
                        }
                        
                    }
                    
                }
                else if(Character.isLetter(ch))//check if ch is letter
                {
                    do{
                        contents += ch;
                    }while( (ch = (char) reader.read()) != ',' && ch != '}');
                }
                else if(Character.isDigit(ch) || ch == '-')//check if ch is number or negative
                {
                    do{
                        contents += ch;
                    }while( (ch = (char) reader.read()) != ',' && ch != '}');
                }
                //else if(Character.isSpaceChar(ch));
                else
                {
                    System.out.println("ERROR: Uncategoriezed character " + ch);//unknown char
                }
                
                jcontent[num] = contents;
                //System.out.println("Contents: " + contents);
                
                if(ch == '}')
                {
                    break;
                }
            }
        }//end while
        return jcontent;
    }
    
    /**
     * Strips /uXXXX from a string and replaces it with the correct unicode character (for example: '\u1E09')
     *
     * @param slashed string containing '/uXXXX' to be replaced with their Unicode characters
     * @return Unicode string with '/uXXXX' converted into Unicode.
     * @author Michael Robinson mike@pagesofinterest.net
     *http://pagesofinterest.net/blog/2009/02/strip-uxxxx-from-string-and-replace-it-with-the-correct-unicode-character/
     * Added modified for cases like \\user\\root etc.
     */
    public static String unslashUnicode(String slashed){
        
        ArrayList<String> pieces = new ArrayList<String>();//array of different string parts. These will be added back to the string after characters have been converted.
        boolean hasit = false;//confirms that string contains \\u
        
        while(slashed.indexOf("\\u") != -1){//while there is \\uXXXX or \\u in the string
            
            if(slashed.contains("\\u")){ //checks if string contains \\u
                hasit = true;//sets hasit to true based on the above conditional. Testing purposes only.
                try { //this try-catch block helps to catch a string with an unexpect \\u substring eg. \\u\\, \\users\\Computers (Yes. I have encountered strings like these.)
                    String piece = (slashed.substring(0,slashed.indexOf("\\u")));//add the bit before the \\uXXXX. Substring from the beginning of the string up to the \\u.
                    if(!(piece.equals("")))//checks that the piece is not empty
                        pieces.add(piece);//add the non-empty piece to the array of string parts
                    
                    
                    //System.out.println("pieces: " + pieces);
                    char c = (char) Integer.parseInt(slashed.substring(slashed.indexOf("\\u")+2,slashed.indexOf("\\u")+6), 16);//parses the \\uXXXX section to the correct character. The +2 and +6 are the start and end of the section.
                    
                    slashed = slashed.substring(slashed.indexOf("\\u")+6,slashed.length());//slashed (aka our string) is set to start at the end of the \\uXXXX (+6) section.
                    
                    pieces.add(c+"");//add the  unicode
                }
                catch(NumberFormatException e)
                {
                    pieces.add(slashed.substring(slashed.indexOf("\\u"), slashed.indexOf("\\u")+2));//parse out the \\u section
                    slashed = slashed.substring(slashed.indexOf("\\u")+2,slashed.length());//string with above section cut out
                }
                catch(Exception e)
                {
                    pieces.add(slashed.substring(slashed.indexOf("\\u"), slashed.indexOf("\\u")+2));
                    slashed = slashed.substring(slashed.indexOf("\\u")+2,slashed.length());
                }
            }
            else{
                System.out.println("breaking");
                break;//breaks loop if no \\u is found
            }
            //System.out.println("pieces :" + pieces);
            
        }
        String temp = "";
        
        
        for(String s : pieces){
            temp = temp + s;//put pieces back together in a single string
        }
        slashed = temp + slashed;//finished string with unicode replaced
        
        //if(hasit == true)
            //System.out.println(slashed);
        
        //System.out.println("pieces: " + pieces);
        return slashed;
    }

    
}
