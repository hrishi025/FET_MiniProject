$(document).ready(function () {
  if (sessionStorage.getItem("user_login_info") !== null) {
    window.location.href = "search.html";
  }

  $("#submit").click(function () {
    event.preventDefault();
    const emailId = $("#username").val();
    const pass = $("#password").val();
    const url = new URL("http://localhost:3000/user");

    url.searchParams.append("username", emailId);
    url.searchParams.append("password", pass);

    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      processData: false,
      contentType: "application/json",
      success: function (response) {
        if (response.length !== 0) {
          sessionStorage.setItem("user_login_info", JSON.stringify(response));
          window.location.href = "search.html";
        } else {
          $("#form-status-1").html("Invalid Credentials");
        }
      },
    });
  });

  $("#add").click(function () {
    event.preventDefault();

    var object = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#userEmail").value,
      username: document.querySelector("#userName").value,
      password: document.querySelector("#userPass").value,
    };

    // check name validation
    var name = document.querySelector("#name").value;
    var namePattern = /^[A-Za-z]+$/;
    var nameMatch = namePattern.test(name);

    if (nameMatch === true) {
      $("#name-error").hide();
    } else {
      $("#name-error").show();
      $("#name-error").html("Use only text in name");
    }

    // check email validation
    var email = document.querySelector("#userEmail").value;
    var mailPattern = /^(^[A-Za-z0-9]+@+[A-Za-z]+.+([A-Za-z])$)$/;
    var emailMatch = mailPattern.test(email);

    if (emailMatch === true) {
      $("#email-error").hide();
    } else {
      $("#email-error").show();
      $("#email-error").html("Invalid email");
    }

    // check password validation
    var userpass = document.querySelector("#userPass").value;
    var passPattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var passMatch = passPattern.test(userpass);

    if (passMatch === true) {
      $("#password-error").hide();
    } else {
      $("#password-error").show();
      $("#password-error").html(
        "Password must contain: 1 letter caps, 1 letter small, 1 number, 1 special character"
      );
    }

    // event.preventDefault();

    if (
      nameMatch !== false &&
      passMatch !== false &&
      emailMatch !== false &&
      name.length !== 0 &&
      email.length !== 0 &&
      userpass.length !== 0
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
