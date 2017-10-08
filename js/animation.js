var page = "Home";
var isAnimating = false;
var light = true;
var dark = false;
var active_color = "purple";
var inactive_color = "purple lighten-3";
var timer;
$(document).ready(function() {
    timer = setInterval(function() {
        $('#cat').fadeToggle('fast');
    }, 5000);
    $("#switch").click(function() {
        if (light) {
            if (page == "Home") {
                document.getElementById('pageHome').contentWindow.changeBannerTo("dark");
            }

            $("#handLine").velocity({ fill: "#333333", stroke: "#FFFFFF" }, { duration: 1000 });

            $("#overlay").velocity({ opacity: "1" }, {
                duration: 500,
                complete: function(elements) {
                    $("body").attr("class", "dark");
                }
            });

            $("#overlay").velocity({ opacity: "0" }, { duration: 500 });
            light = false;
            dark = true;

            $("#switch").removeClass("black");
            $("#switch").addClass("white");
            $("#switch").css("color", "black");
            changeTheme();
        } else {
            if (page == "Home") {
                document.getElementById('pageHome').contentWindow.changeBannerTo("light");
            }

            $("#handLine").velocity({ fill: "#FFFFFF", stroke: "#000000" }, { duration: 1000 });

            $("#overlay").velocity({ opacity: "1" }, {
                duration: 500,
                complete: function(elements) {
                    $("body").attr("class", "light");
                }
            });

            $("#overlay").velocity({ opacity: "0" }, { duration: 500 });
            light = true;
            dark = false;

            $("#switch").removeClass("white");
            $("#switch").addClass("black");
            $("#switch").css("color", "white");
            changeTheme();
        }
    });

});

function switchPage(targetPage) {

    if (isAnimating == true) {
        return;
    }

    if (page != targetPage) {

        isAnimating = true;

        if (light) {

        }
        $("#switch" + page).removeClass(active_color);
        $("#switch" + page).addClass(inactive_color);

        $("#switch" + targetPage).removeClass(inactive_color);
        $("#switch" + targetPage).addClass(active_color);

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
            duration: 500
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
            duration: 500
        });

        $("#lBanner").velocity({
            opacity: "1"
        }, {
            duration: 500
        });
    }
};

function changeTheme() {
    if (timer) {
        clearInterval(timer);
        timer = undefined;
    } else {
        timer = setInterval(function() {
            $('#cat').fadeToggle('fast');
        }, 5000);
    }
    var current_active = active_color;
    active_color = active_color == 'purple' ? 'deep-purple' : 'purple';
    var current_inactive = inactive_color;
    inactive_color = inactive_color == 'purple lighten-3' ? 'deep-purple lighten-3' : 'purple lighten-3';

    $('.' + current_active).addClass(active_color);
    $('.' + current_active).removeClass(current_active);
    $('.' + current_inactive).addClass(inactive_color);
    $('.' + current_inactive).removeClass(current_inactive);

    $("body").removeClass(light ? 'dark' : 'light');
    $("body").addClass(light ? 'light' : 'dark');
    $("iframe").contents().find("body").removeClass(light ? 'dark' : 'light');
    $("iframe").contents().find("body").addClass(light ? 'light' : 'dark');
    var orig = $("iframe").contents().find(".swingimg").attr("src");
    if (light) {
        var newpath = orig.replace('dark', 'light');
        $("iframe").contents().find(".swingimg").attr("src", newpath);
    } else {
        var newpath = orig.replace('light', 'dark');
        $("iframe").contents().find(".swingimg").attr("src", newpath);
    }
};