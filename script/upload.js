function getImage(event) {
  var file = document.getElementById("file").files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    $("#view-img-uploaded").attr("src", e.target.result);
    $("#hide-after-show-image").hide();
  };
  reader.readAsDataURL(file);
}

// for getting today's date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
today = dd + "/" + mm + "/" + yyyy;

// on clicking upload button
$("#upload-photo").click(function () {
  const user_id = JSON.parse(sessionStorage.getItem("user_login_info"))[0].id;
  const title = $("#photo_title").val();
  const description = $("#photo_desc").val();
  const path = $("#view-img-uploaded").attr("src");
  const category = $("#photo_category option:selected").val();
  const hash_tag = $("#photo_hashtag").val();

  if (title.length == 0) $("#error_photo_title").show();
  else $("#error_photo_title").hide();
  if (description.length == 0) $("#error_photo_desc").show();
  else $("#error_photo_desc").hide();
  if (category === "None") $("#error_photo_category").show();
  else $("#error_photo_category").hide();
  if (hash_tag.length == 0) $("#error_photo_hashtag").show();
  else $("#error_photo_hashtag").hide();
  if (path === undefined) $("#error_file").show();
  else $("#error_file").hide();

  if (
    title.length != 0 &&
    description.length != 0 &&
    path.length != 0 &&
    category.length != 0 &&
    hash_tag.length != 0
  ) {
    var body = {
      user_id: user_id,
      title: title,
      description: description,
      path: path,
      category: category,
      hash_tag: "#" + hash_tag,
      likes: 0,
    };

    var log_obj = {
      user_id: JSON.parse(sessionStorage.getItem("user_login_info"))[0].id,
      log_arr: [$("#photo_title").val(), "upload", "-", today],
    };

    // first post the image and if image gets posted successfully then only the log will be inserted
    axios
      .post("http://localhost:3000/images/", body, {
        "Content-Type": "application/json",
      })
      .then(() => {
        // insert log
        axios
          .post("http://localhost:3000/logs", log_obj, {
            "Content-Type": "application/json",
          })
          .then(() => {
            $("#upload-photo-success-div").show();
            window.location.href = "./categories.html";
          })
          .catch(() => {
            $("#upload-photo-error-div").show();
          });
      })
      .catch(() => {
        $("#upload-photo-error-div").show();
      });
  }
});

// when page gets loaded
$(document).ready(() => {
  $("#upload-photo-error-div").hide();
  $("#upload-photo-success-div").hide();
  $("#error_photo_title").hide();
  $("#error_photo_desc").hide();
  $("#error_file").hide();
  $("#error_photo_category").hide();
  $("#error_photo_hashtag").hide();
});
