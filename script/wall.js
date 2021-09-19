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

  var arr = array
    .map((item) => item.category)
    .filter((value, index, self) => self.indexOf(value) === index);

  $(".dream").html(insert_in_dream(arr));
};

function insert_in_dream(array) {
  var output = "";

  for (const i in array) {
    output +=
      "<div class='image'><img class='image_img' src='https://source.unsplash.com/350x400/?" +
      array[i] +
      "' /><div class='image_overlay' style='float: left'>  <h1 class='image_title'>" +
      array[i] +
      "</h1> <br />  <button onclick='view(\"" +
      array[i] +
      "\")' style='color:white; border: 2px solid white; border-radius:50px' data-bs-toggle='modal' data-bs-target='#exampleModal'>view</button></div></div>";
  }
  return output;
}

$(document).ready(fetchImages);

function view(category) {
  sessionStorage.setItem("category", category);
  window.location.href = "photos.html";
}
