var theme = "light";
var page = "Home";
var isAnimating = false;

$( document ).ready(function() {
    document.getElementById("hand").setAttribute("fill", "#FFFFFF");
    document.getElementById("hand").setAttribute("fill-opacity", "1");
    document.getElementById("hand").setAttribute("stroke", "#000");
    document.getElementById("hand").setAttribute("stroke-width", "4");
    document.getElementById("hand").style.position = "relative";
    document.getElementById("hand").style.top = "350px";
    document.getElementById("hand").style.left = "-100px";

    $("#switch").click(function () {
        if (theme == "light") {
            $("#handLine").velocity({fill: "#333333", stroke: "#FFFFFF"}, {duration: 1000});
            $("body").velocity({backgroundColor: "#333333"}, {duration: 1000});
            theme = "dark";
        } else {
            $("#handLine").velocity({fill: "#FFFFFF", stroke: "#000000"}, {duration: 1000});
            $("body").velocity({backgroundColor: "#FFFFFF"}, {duration: 1000});
            theme = "light";
        }
    });
      
}); 

function switchPage(targetPage) {

    if (isAnimating == true) {
        return;
    }   

    if (page != targetPage) {

        isAnimating = true;

        $("#page"+targetPage).css("z-index", "1");
        $("#hand").velocity({left: "200px", top: "150px"}, {duration: 500});
        $("#page"+page).delay(500).velocity({left: "-800px"}, {duration: 500, complete: function(elements) { $.each(elements, function(index, elem) {
            $(elem).css("z-index", "0");
            $("#page"+targetPage).css("z-index", "2");
            $(elem).css("left", "150px");
        }); }});
        $("#hand").velocity({left: "-600px"}, {duration: 500});
        $("#hand").velocity({left: "-100px", top: "350px"}, {duration: 500, complete: function(elements) { isAnimating = false; }});

        page = targetPage;
    }
};