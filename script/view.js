const url = "http://localhost:3000/";

$(document).ready(function () {
  if (sessionStorage.getItem("user_login_info") !== null) {
    fetch_liked_images();
  } else {
    fetchImages([]);
  }
});

const fetch_liked_images = async () => {
  await axios
    .get(url + "logs")
    .then((response) => {
      const array = response.data;

      // filter the array and parse object array of liked image and log id
      const filtered_array = array
        .map((o) => {
          if (
            o.log_arr[1] == "like" &&
            o.user_id ==
              JSON.parse(sessionStorage.getItem("user_login_info"))[0].id
          ) {
            return { image: o.log_arr[0], log_id: o.id };
          }
        })
        .filter((data) => data != undefined);

      fetchImages(filtered_array);
    })
    .catch((error) => {
      alert(error);
    });
};

const fetchImages = async (liked_images_array) => {
  await axios
    .get(url + "images")
    .then((response) => {
      const array = response.data;

      var data = array.filter(function (obj) {
        return obj.id == sessionStorage.getItem("image_id");
      });

      sessionStorage.setItem("view", JSON.stringify(data[0]));

      $("#view").attr("src", data[0].path);
      $("#download").attr("href", data[0].path);
      $("#view-likes-1").html(data[0].likes);
      $("#view-likes-2").html(data[0].likes);

      $("#like").show();
      $("#unlike").hide();

      liked_images_array.some((e) => {
        if (e.image === data[0].title) {
          $("#like_a").hide();
          $("#unlike").show();
          $("#unlike").attr("onclick", "unlike(" + e.log_id + ")");
        }
      });
    })
    .catch((error) => {
      alert(error);
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

// like a photo
$("#like").click(function () {
  var obj = JSON.parse(sessionStorage.getItem("view"));
  like(obj);
});

const like = async (obj) => {
  axios
    .put(
      url + "images/" + obj.id,
      {
        id: obj.id,
        title: obj.title,
        description: obj.description,
        path: obj.path,
        category: obj.category,
        likes: parseInt(obj.likes) + 1,
      },
      { "Content-Type": "application/json" }
    )
    .then((response) => {
      var view_obj = JSON.parse(sessionStorage.getItem("view"));

      var log_obj = {
        user_id: JSON.parse(sessionStorage.getItem("user_login_info"))[0].id,
        log_arr: [view_obj.title, "like", "-", today],
      };

      // on success inserting log
      axios
        .post(url + "logs", log_obj, { "Content-Type": "application/json" })
        .catch((error) => {
          alert("while inserting log: " + error);
        });
    })
    .catch((error) => {
      alert(error);
    });
};

function unlike(log_id) {
  var obj = JSON.parse(sessionStorage.getItem("view"));

  const img_obj = {
    title: obj.title,
    description: obj.description,
    path: obj.path,
    category: obj.category,
    likes: parseInt(obj.likes) - 1,
  };

  axios
    .put(url + "images/" + obj.id, img_obj, {
      "Content-Type": "application/json",
    })
    .then((response) => {
      // on success deleting log
      axios
        .delete(url + "logs/" + log_id, {
          "Content-Type": "application/json",
        })
        .catch((error) => {
          alert("while inserting log: " + error);
        });
    })
    .catch((error) => {
      alert(error);
    });
}

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
      username: JSON.parse(sessionStorage.getItem("user_login_info"))[0].name,
      comment: comment,
      date: today,
    };

    var log_obj = {
      user_id: JSON.parse(sessionStorage.getItem("user_login_info"))[0].id,
      log_arr: [view_obj.title, "comment", comment, today],
    };

    // first post the comment and if comment gets posted successfully then only the log will be inserted
    axios
      .post(url + "comments", comment_obj, {
        "Content-Type": "application/json",
      })
      .then((response) => {
        // on success inserting log
        axios
          .post(url + "logs", log_obj, { "Content-Type": "application/json" })
          .catch((error) => {
            alert("while inserting log: " + error);
          });
      })
      .catch((error) => {
        alert("while inserting comment: " + error);
      });
  }
});
