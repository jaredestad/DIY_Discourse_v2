$(document).ready(function() {

    $("div.hamburger").click(function(e) { 
        var $menu = $("ul#links");
        e.preventDefault();
        $(this).toggleClass("open");

        /*This section may seem weird as it technically unnecessary, but there is a bug with Safari
         *      * that allows a user to scroll to the right with a trackpad. So even though overflow-x is set to
         *           * hidden, a user can potentially scroll right with a trackpad and see the menu that slides from the
         *                * right. In order to try to circumvent this behavior the follow code will set the menu's height and
         *                     * width to 0 when it is not in use. However, a transitionend (checks that css transition is complete)
         *                          * has been implemented. Currently, if the menu button is clicked rapidly it can cause the menu
         *                               * to become spontaneously hidden. Uncertain if this will be corrected in the future as it is a
         *                                    * minor issue and I have spent too long looking for fixes.
         *                                         * */
        if($menu.hasClass("open")) {

            $menu.toggleClass("open"); 

            function ontransitionend(event) {
                $menu.css({"width": "0px", "height": "0px"});
            }   
            $menu.one("transitionend", ontransitionend); 
        }       
        else {  
            $menu.css({"width": "150px", "height": "90px"});
            $menu.toggleClass("open");
        }       

    });
});
