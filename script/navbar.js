var btn = document.getElementById("navBtn");
var Nav = document.getElementById("navigation");

btn.addEventListener("click", function (e) {
  switch (Nav.classList[1]) {
    case "active":
      e.target.classList.add("deactive");
      e.target.classList.remove("active");
      Nav.classList.add("deactive");
      Nav.classList.remove("active");
      break;
    case "deactive":
      e.target.classList.add("active");
      e.target.classList.remove("deactive");
      Nav.classList.add("active");
      Nav.classList.remove("deactive");
      break;
    default:
      e.target.classList.add("deactive");
      Nav.classList.add("deactive");
      Nav.classList.remove("active");
      break;
  }
});

$(document).ready(function () {
  if (sessionStorage.getItem("user_login_info") !== null) {
    var name = JSON.parse(sessionStorage.getItem("user_login_info"))[0].name;
    $("#user_name_nav").html(name.charAt(0).toUpperCase() + name.slice(1));
    $(".login").hide();
  } else {
    $("#user_name_nav").html("Guest");
    $("ul.nav_menu > li:eq(2)").hide();
    $("ul.nav_menu > li:eq(3)").hide();
    $("ul.nav_menu > li:eq(4)").hide();
    $("#like_a").html("");
    $("#download").html("");
    $("#comment_input").html(
      "<div style='text-align:center'>Login to post Comment</div>"
    );
    $(".logout").hide();
  }
});

$("#logout").click(function () {
  sessionStorage.clear();
  window.location.href = "home.html";
});
