const url = "http://localhost:3000/";

$(document).ready(function () {
  // console.log(sessionStorage.getItem("image_id"));
  fetchImages();
});

const fetchImages = async () => {
  await axios
    .get(url + "images")
    .then((response) => {
      console.log(response.data);
      const array = response.data;

      var data = array.filter(function (obj) {
        return obj.id == sessionStorage.getItem("image_id");
      });

      sessionStorage.setItem("view", JSON.stringify(data[0]));

      $("#view").attr("src", data[0].path);
      $("#download").attr("href", data[0].path);
      $("#view-likes").html(data[0].likes);
    })
    .catch((error) => {
      alert(error);
    });
};

// like a photo
$("#like").click(function () {
  var obj = JSON.parse(sessionStorage.getItem("view"));
  like(obj);
});

const like = async (obj) => {
  fetch(url + "images/" + obj.id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: obj.id,
      title: obj.title,
      description: obj.description,
      path: obj.path,
      category: obj.category,
      likes: parseInt(obj.likes) + 1,
    }),
  })
    .then((response) => {
      response.json();
      window.location.href = "view.html";
    })
    .then((data) => {
      console.log(data);
    });
};

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

// comment a photo
$("#add-comment").click(function () {
  var comment = $("#comment-box").val();
  if (comment.length < 4) {
    alert("comment must be upto 4 characters long");
  } else {
    var view_obj = JSON.parse(sessionStorage.getItem("view"));

    // create objects of comment as well as log
    var comment_obj = {
      image_id: view_obj.id,
      username: JSON.parse(sessionStorage.getItem("user_login_info")).name,
      comment: comment,
      date: today,
    };

    var log_obj = {
      user_id: JSON.parse(sessionStorage.getItem("user_login_info")).id,
      log_arr: [view_obj.title, "comment", comment, today],
    };

    // first post the comment and if comment gets posted successfully then only the log will be inserted
    axios
      .post(url + "comments", comment_obj, {
        "Content-Type": "application/json",
      })
      .then((response) => {
        console.log(response.data);

        // on success inserting log
        axios
          .post(url + "logs", log_obj, { "Content-Type": "application/json" })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            alert("while inserting log: " + error);
          });
      })
      .catch((error) => {
        alert("while inserting comment: " + error);
      });
  }
});
