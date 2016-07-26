$(document).ready(function() {

    /*Counts number of search fields currently in use*/
    var counter = 0;
    /*Initializes the first select field*/
    var starterString = "<div id=\"search-field_" + counter + "\">" +
    "<form>" +
    "<select name=\"attribute\" class=\"select-attribute\">" +
    "<option disabled selected value>--Select an Option--</option>" +
    "<option value=\"keyword\">Keyword</option>" +
    "<option value=\"substring\">Substring</option>" +
    "<option value=\"tag\">Tag</option>" +
    "<option value=\"id\">ID</option>" +
    "<option value=\"author\">Author</option>" +
    "<option value=\"subreddit\">Subreddit</option>" +
    "<option value=\"body\">Body</option>" +
    "<option value=\"subreddit_id\">Subreddit ID</option>" +
    "<option value=\"parent_id\">Parent ID</option>" +
    "<option value=\"link_id\">Link ID</option>" +
    "<option value=\"name\">Name</option>" +
    "<option value=\"author_flair_text\">Author Flair Text</option>" +
    "<option value=\"author_flair_css_class\">Author Flair CSS Class</option>" +
    "<option value=\"retrieved_on\">Retrieved On</option>" +
    "<option value=\"created_utc\">Created UTC</option>" +
    "<option value=\"ups\">Ups</option>" +
    "<option value=\"downs\">Downs</option>" +
    "<option value=\"score\">Score</option>" +
    "<option value=\"gilded\">Gilded</option>" +
    "<option value=\"controversiality\">Controversiality</option>" +
    "<option value=\"edited\">Edited</option>" +
    "<option value=\"archived\">Archived</option>" +
    "<option value=\"distinguished\">Distinguished</option>" +
    "<option value=\"score_hidden\">Score Hidden</option>" +
    "<option value=\"row_id\">Row ID</option>" +
    "<option value=\"word_count\">Word Count</option>" +
    "<option value=\"long_word_count\">Long Word Count</option>" +
    "<option value=\"sentence_count\">Sentence Count</option>" +
    "<option value=\"lix\">LIX</option>" +
    "</select>" +
    "<div>" +
    "</div>" +
    "</form>" +
    "</div>" +
    "<div class=\"button-area\">" +
    "<button class=\"circle-medium\" id=\"add_field\">+</button>" +
    "<button class=\"circle-medium\" id=\"remove_field\">-</button>" + 
    "<button id=\"reset\">Reset</button>" +
    "<button id=\"search\">Search</button>" +
    "</div>";

$(".search-area").html(starterString);

/*Adds a new search field and increases counter by 1*/
$(".search-area").on("click", "#add_field", function() {
    console.log("ok");
    var next_id_num = counter + 1;
    $("#search-field_" + counter).after("<div id=\"search-field_" + next_id_num + "\">" +
        "<form>" +
        "<select name=\"operation\" style=\"display: block\">" +
        "<option value=\"and\">And</option>" +
        "<option value=\"or\">Or</option>" +
        "</select>" +
        "<select name=\"attribute\" class=\"select-attribute\">" +
        "<option disabled selected value>--Select an Option--</option>" +
        "<option value=\"keyword\">Keyword</option>" +
        "<option value=\"substring\">Substring</option>" +
        "<option value=\"tag\">Tag</option>" +
        "<option value=\"id\">ID</option>" +
        "<option value=\"author\">Author</option>" +
        "<option value=\"subreddit\">Subreddit</option>" +
        "<option value=\"body\">Body</option>" +
        "<option value=\"subreddit_id\">Subreddit ID</option>" +
        "<option value=\"parent_id\">Parent ID</option>" +
        "<option value=\"link_id\">Link ID</option>" +
        "<option value=\"name\">Name</option>" +
        "<option value=\"author_flair_text\">Author Flair Text</option>" +
        "<option value=\"author_flair_css_class\">Author Flair CSS Class</option>" +
        "<option value=\"retrieved_on\">Retrieved On</option>" +
        "<option value=\"created_utc\">Created UTC</option>" +
        "<option value=\"ups\">Ups</option>" +
        "<option value=\"downs\">Downs</option>" +
        "<option value=\"score\">Score</option>" +
        "<option value=\"gilded\">Gilded</option>" +
        "<option value=\"controversiality\">Controversiality</option>" +
        "<option value=\"edited\">Edited</option>" +
        "<option value=\"archived\">Archived</option>" +
        "<option value=\"distinguished\">Distinguished</option>" +
        "<option value=\"score_hidden\">Score Hidden</option>" +
        "<option value=\"row_id\">Row ID</option>" +
        "<option value=\"word_count\">Word Count</option>" +
        "<option value=\"long_word_count\">Long Word Count</option>" +
        "<option value=\"sentence_count\">Sentence Count</option>" +
        "<option value=\"lix\">LIX</option>" +
        "</select>" +
        "<div>" +
        "</div>" +
        "</form>" + 
        "</div>");
    counter = next_id_num;
});

/*Removes a search field and decrease the counter by 1*/
/*@exception Number of search fields cannot be 0 or less*/
$(".search-area").on("click", "#remove_field", function() {
    if(counter != 0) {
        var $field = document.getElementById("search-field_" + counter);
        $field.parentNode.removeChild($field);
        counter--;
    }
});

/*Controls content on selection of search options*/
$(".search-area").on("change", ".select-attribute", function() {
    var value = $(this).val();
    var $div = $(this).next("div");
    //console.log(value);
    var buttons = "<div class=\"button-wrap\">" +
    "<button type=\"button\" class=\"circle-small add_input\">+</button>" +
    "<button type=\"button\" class=\"circle-small remove_input\">-</button>"
    "</div>"; 


if(value == "keyword" || value == "tag") {
    $div.html("<p>is" +
        "<select name=\"relation\">" +
        "<option value=\"equal\">equal</option>" +
        "<option value=\"not equal\">not equal</option>" +
        "</select>" +
        " to" + 
        "<div>" +
        "<input type=\"text\" placeholder=\"Word\" name=\"k0\" />" +
        "</div>" +
        buttons +
        "</p>");
}
else if(value == "substring") {
    $div.html("<p>is" +
            "<select name=\"relation\">" +
            "<option value=\"like\">like</option>" +
            "<option value=\"not like\">not like</option>" +
            "</select>" +
            "<div>" +
            "<input type=\"text\" placeholder=\"Word\" name=\"k0\" /></p>" +
            "</div>" +
            buttons +
            "</p>");
}
else if(value == "id" || value == "author" || value == "subreddit" || value == "body" || value == "author_flair_text" || value == "author_flair_css_class" || value == "subreddit_id" || value == "parent_id" || value == "link_id" || value == "name" || value == "retrieved_on" || value == "created_utc") {
    $div.html("<p>is" +
            "<select name=\"relation\">" +
            "<option value=\"equal\">equal to</option>" +
            "<option value=\"not equal\">not equal to</option>" +
            "<option value=\"like\">like</option>" +
            "<option value=\"not like\">not like</option>" +
            "</select>" +
            "<div>" +
            "<input type=\"text\" placeholder=\"Word\" name=\"k0\" />" +
            "</div>" +
            buttons +
            "</p>");

}
else if(value == "ups" || value == "downs" || value == "score" || value == "word_count" || value == "long_word_count" || value == "sentence_count" || value == "lix" || value == "row_id" || value == "gilded" || value == "controversiality"){
    $div.html("<p>is" +
            "<select name=\"relation\">" +
            "<option value=\"equal\">equal to</option>" +
            "<option value=\"greater than\">greater than</option>" +
            "<option value=\"less than\">less than</option>" +
            "</select>" +
            "<div>" +
            "<input type=\"text\" placeholder=\"Word\" name=\"k0\" />" +
            "</div>" +
            "</p>");

}
else if(value == "edited" || value == "archived" || value == "score_hidden") {
    $div.html("<p>is" +
            "<select name=\"relation\">" +
            "<option value=\"either\">either</option>" +
            "<option value=\"true\">true</option>" +
            "<option value=\"false\">false</option>" +
            "</select>" +
            "<div>" +
            "</div>" +
            "</p>");

}
else if(value == "distinguished") {
    $div.html("<p>is" +
            "<select name=\"relation\">" +
            "<option value=\"either\">either</option>" +
            "<option value=\"null\">null</option>" +
            "<option value=\"not null\">not null</option>" +
            "</select>" +
            "<div>" +
            "</div>" +
            "</p>");
}

});  

$(".search-area").on("click", ".add_input", function() {
    var $div = $(this).closest("div").prev("div");
    if($div.children().length > 0) {
        $div.children().last().after("<input type=\"text\" placeholder=\"Word\" name=\"k" + $div.children().length + "\" />");
    }
});

$(".search-area").on("click", ".remove_input", function() {
    var $div = $(this).closest("div").siblings("div");
    if($div.children().length > 1) {
        $div.children().last().remove();
    }
});

$(".search-area").on("click", "#reset", function() {
    $(".search-area").html(starterString);
    counter = 0;
});

$(".search-area").on("click", "#search", function() {
    var array = new Array();
    $("form").each(function() {
        if( $(this).children(".select-attribute").val() != null) {
            var serializedString = $(this).serializeArray();
            array.push(serializedString);
        }
    });

    $.ajax({
        type: "POST",
        url: "./engine.php",
        dataType: "text",
        data: { "array": array},

        success: function(results) {
            $("#comments_table tbody").html(results);
            console.log(results);
        },
        complete: function() {
                  },
        error: function() {
               }
    });

    console.log(array);
});



$("#display_options").click(function() {
    $(".dropdown dd").toggleClass("dd_open");
});

var ddOffset = $(".dropdown").offset().top;
var theadOffset = $("thead").offset().top;

$thead_fixed = $("thead").clone();
$thead_fixed.addClass("fixed_thead");

console.log("offset is " + ddOffset);
$(window).scroll(function() {
    var offsetTop = $(this).scrollTop();
    var offsetLeft = $(this).scrollLeft();

       if(offsetTop >= ddOffset) {
       $(".dropdown").addClass("fixed_dd");
       }
       else if(offsetTop < ddOffset) {
       $(".dropdown").removeClass("fixed_dd"); 
       }

    if(offsetTop > theadOffset) {
        var newOffset = theadOffset + offsetTop;

        $("thead").css({"position":"fixed", "top":0-offsetTop});
        /*
        $("thead").find("th").each(function(index) {
            $(this).css("min-width", $("tbody").find("td").eq(index).css("min-width") + "px");
        });*/
    }
    console.log("-" + offsetLeft);
    console.log("offsetTop: " + offsetTop +"; theadOffset:" + theadOffset +"; leftoffset: " + offsetLeft);


});


var $table = $("#comments_table"), $bodyCells = $table.find("tbody tr:first").children(),
    colWidth;
$(window).resize(function() {
   
    colWidth = $bodyCells.map(function() {
        return $(this).width();
    }).get(); 

    $table.find("thead").css({"width": "1000px", "height": "200px"});
    $table.find("thead tr").children().each(function(i, v) {
        $(v).css("height", "100px");
        $(v).css("width", colWidth[i]);
    });
}).resize();

$("div.hamburger").click(function(e) { 
    e.preventDefault();
    $(this).toggleClass("open");
    $("ul#links").toggleClass("open");
});


});
