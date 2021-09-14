$(document).ready(function () {
  console.log(sessionStorage.getItem("image_id"));
  const array = JSON.parse(sessionStorage.getItem("all_images"));
  var obj = array.find((i) => i.image_id == sessionStorage.getItem("image_id"));
  $("#view").attr("src", obj.path);
  $("#download").attr("href", obj.path);

  console.log(obj.path);
});
