$(document).ready(function () {
  fetchLogs();
});

const fetchLogs = async () => {
  var array = [];

  await axios
    .get("http://localhost:3000/logs")
    .then((response) => {
      console.log(response.data);
      array = response.data;

      $("#myTable").DataTable({
        data: array
          .map((data) => {
            if (
              data.user_id ==
              JSON.parse(sessionStorage.getItem("user_login_info"))[0].id
            )
              return data.log_arr;
          })
          .filter((data) => data != null),
        columns: [
          { title: "Image Name" },
          { title: "Type" },
          { title: "Comment" },
          { title: "Date" },
        ],
      });
    })
    .catch((error) => {
      alert(error);
    });
};
