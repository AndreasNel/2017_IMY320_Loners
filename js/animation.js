var theme = "light";
var page = "Home";
var isAnimating = false;

$(document).ready(function() {
    setTimeout(function() {
        $('#cat').fadeOut('fast');
    }, 5000);
    $("#switch").click(function() {
        if (theme == "light") {

            if (page == "Home") {
                document.getElementById('pageHome').contentWindow.changeBannerTo("dark");
            }

            $("#handLine").velocity({ fill: "#333333", stroke: "#FFFFFF" }, { duration: 1000 });

            $("body").velocity({ backgroundColor: "#333333" }, { duration: 1000 });

            $("#overlay").velocity({ opacity: "1" }, {
                duration: 500,
                complete: function(elements) {
                    $("body").attr("class", "dark");
                }
            });

            $("#overlay").velocity({ opacity: "0" }, { duration: 500 });
            theme = "dark";

            $("#switch").removeClass("black");
            $("#switch").addClass("white");
            $("#switch").css("color", "black");
            myMove();

        } else {

            if (page == "Home") {
                document.getElementById('pageHome').contentWindow.changeBannerTo("light");
            }

            $("#handLine").velocity({ fill: "#FFFFFF", stroke: "#000000" }, { duration: 1000 });

            $("body").velocity({ backgroundColor: "#FFFFFF" }, { duration: 1000 });

            $("#overlay").velocity({ opacity: "1" }, {
                duration: 500,
                complete: function(elements) {
                    $("body").attr("class", "light");
                }
            });

            $("#overlay").velocity({ opacity: "0" }, { duration: 500 });
            theme = "light";

            $("#switch").removeClass("white");
            $("#switch").addClass("black");
            $("#switch").css("color", "white");

        }
    });

});

function switchPage(targetPage) {

    if (isAnimating == true) {
        return;
    }

    if (page != targetPage) {

        isAnimating = true;

        $("#switch" + page).removeClass("purple");
        $("#switch" + page).addClass("grey");

        $("#switch" + targetPage).removeClass("grey");
        $("#switch" + targetPage).addClass("purple");

        $("#page" + targetPage).css("z-index", "1");
        $("#hand").velocity({ left: "200px", top: "50vh" }, { duration: 500 });
        $("#page" + page).delay(500).velocity({ left: "-150vh" }, {
            duration: 500,
            complete: function(elements) {
                $.each(elements, function(index, elem) {
                    $(elem).css("z-index", "0");
                    $("#page" + targetPage).css("z-index", "2");
                    $(elem).css("left", "10vw");
                });
            }
        });

        $("#hand").velocity({ left: "-600px" }, { duration: 500 });
        $("#hand").velocity({ left: "-100px", top: "75vh" }, { duration: 500, complete: function(elements) { isAnimating = false; } });

        page = targetPage;
    }
};

function changeBannerTo(color) {
    if (color == "dark") {
        $("#lBanner").velocity({
            opacity: "0"
        }, {
            duration: 500,
            complete: function(elements) {
                $("#lBanner").removeClass("lightBanner");
                $("#lBanner").addClass("darkBanner");
            }
        });

        $("#lBanner").velocity({
            opacity: "1"
        }, {
            duration: 500
        });
    } else {
        $("#lBanner").velocity({
            opacity: "0"
        }, {
            duration: 500,
            complete: function(elements) {
                $("#lBanner").removeClass("darkBanner");
                $("#lBanner").addClass("lightBanner");
            }
        });

        $("#lBanner").velocity({
            opacity: "1"
        }, {
            duration: 500
        });
    }
};

function myMove() {
    var horizontal = 1800;
    var vertical = 960;
    var elem = document.getElementById("character");
    elem.style.left = horizontal + "px";
    elem.style.right = vertical + "px";
    var id = setInterval(frame, 5);

    function frame() {
        if (horizontal == 0) {
            elem.style.visibility = 'hidden';
            clearInterval(id);
        } else {
            horizontal--;
            vertical = vertical - 0.5;
            elem.style.top = vertical + 'px';
            elem.style.left = horizontal + 'px';
        }
    }
};