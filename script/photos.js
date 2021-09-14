// const { default: axios } = require("axios");

$("#logout").click(function () {
  //   window.location.href = "index.html";
  window.location.replace("login.html");
});

const fetchImages = async () => {
  var array = [];

  await axios
    .get("http://localhost:3000/images/")
    .then((response) => {
      console.log(response.data);
      array = response.data;
      sessionStorage.setItem("all_images", JSON.stringify(array));
    })
    .catch((error) => {
      alert(error);
    });

  console.log(sessionStorage.getItem("category"));

  const arr1 = array.filter(
    (obj) => obj.category == sessionStorage.getItem("category")
  );

  $("#cat").html(sessionStorage.getItem("category"));
  $("#dream-1").html(insert_in_dream(arr1.filter(dream1)));
  $("#dream-2").html(insert_in_dream(arr1.filter(dream2)));
  $("#dream-3").html(insert_in_dream(arr1.filter(dream3)));
};
function dream1(i) {
  return i.image_id % 3 == 1;
}
function dream2(i) {
  return i.image_id % 3 == 2;
}
function dream3(i) {
  return i.image_id % 3 == 0;
}
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
      array[i].image_id +
      ")' style='color:white; border: 2px solid white; border-radius:50px' data-bs-toggle='modal' data-bs-target='#exampleModal'>view</button></div></div>";
    // console.log(output);
  }
  return output;
}

$(document).ready(fetchImages);

function view(image_id) {
  sessionStorage.setItem("image_id", image_id);
  window.location.href = "view.html";
}
