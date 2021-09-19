const { Session } = require("inspector");

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
  var body = {
    user_id: JSON.parse(sessionStorage.getItem("user_login_info"))[0].id,
    title: $("#photo_title").val(),
    description: $("#photo_desc").val(),
    path: $("#view-img-uploaded").attr("src"),
    category: $("#photo_category option:selected").text(),
    hash_tag: $("#photo_hashtag").val(),
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
        .catch((error) => {
          alert("while inserting log: " + error);
        });

      window.location.href = "./categories.html";
    })
    .catch((error) => {
      alert(error);
    });
});
