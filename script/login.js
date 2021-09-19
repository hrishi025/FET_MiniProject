$(document).ready(function () {
  if (sessionStorage.getItem("user_login_info") !== null) {
    window.location.href = "search.html";
  }

  $("#submit").click(function () {
    event.preventDefault();
    let emailId = $("#username").val();
    let pass = $("#password").val();
    let url = new URL("http://localhost:3000/user");
    url.searchParams.append("username", emailId);
    url.searchParams.append("password", pass);
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      processData: false,
      contentType: "application/json",
      success: function (response) {
        if (response.length != 0) {
          sessionStorage.setItem("user_login_info", JSON.stringify(response));
          window.location.href = "search.html";
        } else {
          $("#form-status-1").html("Invalid Credentials");
        }
      },
      error: function (err) {},
    });
  });

  $("#add").click(function () {
    event.preventDefault();
    let name = document.querySelector("#name").value;
    let uemail = document.querySelector("#userEmail").value;
    let uname = document.querySelector("#userName").value;
    let password = document.querySelector("#userPass").value;
    var object = {
      name: name,
      email: uemail,
      username: uname,
      password: password,
    };
    var uName = document.querySelector("#name").value;
    var namePattern = /^[A-Za-z]+$/;
    var nameMatch = namePattern.test(uName);
    var emailphone = document.querySelector("#userEmail").value;
    var mailPattern = /^(^[A-Za-z0-9]+@+[A-Za-z]+.+([A-Za-z])$)$/;
    var emailMatch = mailPattern.test(emailphone);
    var userpass = document.querySelector("#userPass").value;
    var passPattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var passMatch = passPattern.test(userpass);
    if (nameMatch === true) {
      var user_name = uName;
      $("#name-error").hide();
    } else {
      $("#name-error").show();
      $("#name-error").html("Use only text in name");
    }
    if (emailMatch === true) {
      var email = emailphone;
      $("#email-error").hide();
    } else {
      $("#email-error").show();
      $("#email-error").html("Invalid email");
    }
    if (passMatch === true) {
      $("#password-error").hide();
      var pass = userpass;
    } else {
      $("#password-error").show();
      $("#password-error").html(
        "Password must contain: 1 letter caps, 1 letter small, 1 number, 1 special character"
      );
    }
    event.preventDefault();
    if (
      nameMatch !== false &&
      passMatch !== false &&
      emailMatch !== false &&
      name.length !== 0 &&
      uemail.length !== 0 &&
      uname.length !== 0 &&
      password.length !== 0
    ) {
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/user",
        data: JSON.stringify(object),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
          $("#form-status").html("Resistration Success..!! Login to continue.");
        },
        error: function (error) {
          $("#form-status").html("Network Error : Something went wrong.");
        },
      });
    } else {
      $("#form-status").html("Something went wrong.");
    }
  });
});
