$(function () {
  $.get("../components/navbar.html", function (data) {
    $("#navbar").append(data);
  });

  $.get("../components/footer.html", function (data) {
    $("#footer").append(data);
  });

  $.get("../components/links.html", function (data) {
    $("head").append(data);
  });
});
