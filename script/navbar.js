var btn = document.getElementById("navBtn");
var Nav = document.getElementById("navigation");

btn.addEventListener("click", function (e) {
  debugger;
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
