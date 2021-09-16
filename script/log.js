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

      // TODO : CHANGE THE USER ID FROM STATIC TO DYNAMIC
      $("#myTable").DataTable({
        data: array
          .map((data) => {
            if (data.user_id == 1) return data.log_arr;
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
