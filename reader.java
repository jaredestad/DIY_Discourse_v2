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

public class reader
{

    public static int input_value = 32413291;
    //public static int input_value = 20;
    public static int count = 0;
    public static void main(String[] args) throws IOException
    {
     
        Charset encoding = Charset.defaultCharset();
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
        int last_count = 0;
        while((r = reader.read()) != -1)
        {
            char ch = (char) r;
            if( ch == '{')
            {
                String[] array = parseJson(reader, ch);
                count++;
                
                if(count == 1000000)
                {
                    last_count = count;
                }
                
                if(count == last_count+1000000)
                {
                    System.out.println(count);
                    last_count = count;
                }
                
                if(count > input_value)
                {
                    System.out.println(count + ". " + array[10]);
                    if(count == input_value+10)
                        break;
                }
            }
        }
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

    
}
