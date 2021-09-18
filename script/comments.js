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
    })
    .catch((error) => {
      alert(error);
    });

  $("#insert_comments").html(
    display_comments(
      array.filter(function (item) {
        return item.image_id == sessionStorage.getItem("image_id");
      })
    )
  );
};

function display_comments(array) {
  var output = "";

  for (var i in array) {
    output +=
      "<div id='comment_row' class='row'><img src='https://source.unsplash.com/1600x900/?profilephoto,person," +
      array[i].username +
      "' /><div><h5>" +
      array[i].username +
      "</h5><date>" +
      array[i].date +
      "</date><p>" +
      array[i].comment +
      "</p></div></div>";
  }
  return output;
}
