$(document).ready(function () {
  fetchCommets();
});

const fetchCommets = async () => {
  var array = [];

  await axios
    .get("http://localhost:3000/comments/")
    .then((response) => {
      console.log(response.data);
      array = response.data;
      //   sessionStorage.setItem("comments", JSON.stringify(array));
    })
    .catch((error) => {
      alert(error);
    });

  $("#insert_comments").html(insert_comments(array));
};

function insert_comments(array) {
  var output = "";

  for (const i in array) {
    output +=
      "<div id='comment_row' class='row'><img src='images/user.png' /><div><h5>" +
      array[i].username +
      "</h5><date>" +
      array[i].date +
      "</date><p>" +
      array[i].comment +
      "</p></div></div>";
  }
  return output;
}
