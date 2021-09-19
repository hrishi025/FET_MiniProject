$("#logout").click(function () {
  window.location.replace("login.html");
});

const fetchImages = async () => {
  var array = [];

  await axios
    .get("http://localhost:3000/images/")
    .then((response) => {
      array = response.data;
      sessionStorage.setItem("all_images", JSON.stringify(array));
    })
    .catch((error) => {
      alert(error);
    });

  const arr1 = array.filter(
    (obj) => obj.category == sessionStorage.getItem("category")
  );

  $("#cat").html(sessionStorage.getItem("category"));
  $(".dream").html(insert_in_dream(arr1));
};

function insert_in_dream(array) {
  var output = "";

  for (const i in array) {
    output +=
      "<div class='image'><img class='image_img' src='" +
      array[i].path +
      "' /><div class='image_overlay' style='float: left'>  <h1 class='image_title'>" +
      array[i].title +
      "</h1>  <p class='image_description'>" +
      array[i].description +
      "</p>  <br />  <button onclick='view(" +
      array[i].id +
      ")' style='color:white; border: 2px solid white; border-radius:50px' data-bs-toggle='modal' data-bs-target='#exampleModal'>view</button></div></div>";
  }
  return output;
}

$(document).ready(fetchImages);

function view(image_id) {
  sessionStorage.setItem("image_id", image_id);
  window.location.href = "view.html";
}
