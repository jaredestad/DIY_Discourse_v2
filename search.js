$(document).ready(function() {

    $("#table-area").hide();
    $("#display_opt").hide();
    /*Counts number of search fields currently in use*/
    var counter = 0;
    var button_area = "<div class=\"button-area\">" +
    "<button type=\"button\" class=\"circle-medium\" id=\"add_field\">+</button>" +
    "<button type=\"button\" class=\"circle-medium\" id=\"remove_field\">-</button>" + 
    "<button type=\"button\" id=\"reset\">Reset</button>" +
    "<button type=\"button\" id=\"search\">Search</button>" +
    "</div>";   

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
    "</div>";

$(".search-area").html(starterString);

/*Adds a new search field and increases counter by 1*/
$(".button-area").on("click", "#add_field", function() {
    console.log("counter: " + counter);
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
$(".button-area").on("click", "#remove_field", function() {
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
    /*var buttons = "<div class=\"button-wrap\">" +
    "<button type=\"button\" class=\"circle-small add_input\">+</button>" +
    "<button type=\"button\" class=\"circle-small remove_input\">-</button>"
    "</div>"; 
    */
    var buttons = "";

if(value == "keyword" || value == "tag") {
    $div.html("<p>is" +
        "<select name=\"relation\">" +
        "<option value=\"equal\">equal</option>" +
        "<option value=\"not equal\">not equal</option>" +
        "</select>" +
        "to" + 
        "<div>" +
        "<input type=\"text\" name=\"k0\" />" +
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
            "<input type=\"text\" name=\"k0\" /></p>" +
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
            "<input type=\"text\" name=\"k0\" />" +
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
            "<input type=\"text\" name=\"k0\" />" +
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

$("#reset").click(function() {
    $(".search-area").html(starterString);
    counter = 0;
});

$("#search").click(function() {

    var array = new Array();
    $("form").each(function() {
        if( $(this).children(".select-attribute").val() != null) {
            var serializedString = $(this).serializeArray();
            array.push(serializedString);
        }
    });

    $("#arrow-box").hide();
    $("#loader").show();
    $("#scroll-bottom").css("bottom", "10px");

    //This Timeout function is necessary otherwise the #scroll-bottom animation/transition is not smooth
    setTimeout( function() { 
        $.ajax({
            type: "POST",
            url: "./engine.php",
            dataType: "text",
            data: { "array": array},

            success: function(results) {
                $("#comments_table tbody").html(results);
                console.log(results);

                if( $("#r1").prop("checked")==true ){
                    $(".regular").hide();
                }
                else {
                    $(".compressed").hide();
                }
                checkSelection();
                //need .adder to hide here when info loads
                $(".adder").hide();
                $(".remove_tag").hide();
                $("#loader").hide();
                $("#arrow-box").show();
                $("#scroll-bottom").addClass("bouncing-effect");
                $("#comment_count").text($("#comments_table > tbody > tr").last().find(".row_id_column").text());

            },
            complete: function() {
                      },
            error: function() {
                   }
        });
    }, 400);
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
    var offsetSA = $("#search-area").offset().top + $("#search-area").height();
    var offsetBA = $("#button-area").offset().top + $("#button-area").height();

    console.log("SA: " + offsetSA +", BA: " + offsetBA);

    if(offsetBA > offsetSA){
        $("#button-area").css("visibility", "hidden");
    }

    if(offsetBA < offsetSA){
        $("#button-area").css("visibility", "visible");
    }


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


$(".dropdown input[type='checkbox']").click(function() { 
    var title = $(this).closest("li").find("input[type='checkbox']").attr("id");
    title = "." + title;
    $(title).toggle();
    console.log(title);
});

$("input[type='radio']").change(function() {
    if($(this).val() == "compressed" && $(this).prop("checked", true)){   
        $(".compressed").show();
        $(".regular").hide();
        $("#display_opt").hide();
    }
    else{
        $(".regular").show();
        checkSelection();
        $("#display_opt").show();
        $(".compressed").hide();
    }
});


$("#scroll-bottom").click(function() {
    $("#table-area").show();
    $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, 600);   
    $(this).removeClass("bouncing-effect");
    $(this).css("bottom", "-100px");
    $("body").addClass("stop-scrolling");
    $("#scroll-top").css("top", "10px");
});

$("#scroll-top").click(function() {
    $("body").removeClass("stop-scrolling");
    $("html, body").animate({ scrollTop: 0 }, 600);
    $(this).css("top", "-100px");
    $("#scroll-bottom").css("bottom", "10px");
    setTimeout( function() {$("#table-area").hide()}, 400);
});

$(document).bind("click", function(e) {
    var $clicked = $(e.target);
    if(! $clicked.parents().hasClass("dropdown"))
    $(".dropdown dd").removeClass("dd_open");


}); 

$("tbody").on("click", ".edit_tag", function () {
       $(".edit_tag").hide();
        $(this).next(".adder").show();
        $(this).parent().find("p > span.remove_tag").show();
        //$(".edit_tag").attr("disabled", true);
});

$("tbody").on("click", ".done_tag", function() {
        $(".edit_tag").show();
        $(".remove_tag").hide();
        $(this).parent().hide();
});

$("tbody").on("click", ".add_tag", function() {
        var $this = $(this);
        var $tag = $(this).next("input").val(); 
        $(this).next("input").val("");
        var $id = $(this).next("input").attr("id");
        var $html = "<p>" + $tag + "<span class='remove_tag'>&#10006</span></p>";
        $.ajax({
            type: "POST",
            url: "./add_tag.php",
            dataType: "text",
            data: { "id": $id, "tag": $tag},

            success: function(results) {
                //should have wait/loading function
                $this.parent().prev("button").before($html);
            },
            complete: function() {
                      },
            error: function() {
                       alert(results);
                   }
        });
});

$("tbody").on("click", "p > span", function() {
    var $this = $(this);
    var $id = $(this).parent().nextAll("div").eq(0).find("input").attr("id");
    var $tag = $(this).parent().contents().filter(function() {
      return this.nodeType == 3;   
    }).text(); 
        $.ajax({
            type: "POST",
            url: "./remove_tag.php",
            dataType: "text",
            data: { "id": $id, "tag": $tag},

            success: function(results) {
                $this.parent().remove();
            },
            complete: function() {
                      },
            error: function() {
                       alert(results);
                   }
        });
    });

//referenced http://stackoverflow.com/questions/14977864/fixed-header-table-with-horizontal-scrollbar-and-vertical-scrollbar-on
$("#table-area-wrapper").scroll(function() {
   $("#header-area-wrapper").offset({ left: -1*this.scrollLeft }); 
});

});

/*This function decides which columns will be display from a regular view of the table based on
 * which columns have been checked in the display options
 */
function checkSelection() {

    $(".dropdown input[type='checkbox']").each(function() { 
        if( $(this).prop("checked")==false){
            console.log("hiding");
            var title = $(this).attr("id");
            title = "." + title;
            $(title).hide();
        }
    });
}
