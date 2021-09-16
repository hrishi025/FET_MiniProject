function getImage(event) {
  var file = document.getElementById("file").files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    console.log(e.target.result);
    $("#view-img-uploaded").attr("src", e.target.result);
    $("#hide-after-show-image").hide();
  };
  reader.readAsDataURL(file);
}

$("#upload-photo").click(function () {
  console.log("uploaded");

  var body = {
    title: $("#photo_title").val(),
    description: $("#photo_desc").val(),
    path: $("#view-img-uploaded").attr("src"),
    category: $("#photo_category option:selected").text(),
    hash_tag: $("#photo_hashtag").val(),
    likes: 0,
  };

  console.log(body);

  axios
    .post("http://localhost:3000/images/", body, {
      "Content-Type": "application/json",
    })
    .then((response) => {
      console.log("success");
    })
    .catch((error) => {
      alert(error);
    });
});
