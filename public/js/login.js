$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const textInput = $("input#text-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      text: textInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.text || !userData.password) {
      return;
    }

    // If we have a room name and password we run the loginUser function and clear the form
    loginUser(userData.text, userData.password);
    textInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(text, password) {
    $.post("/api/login", {
      text: text,
      password: password,
    })
      .then(() => {
        window.location.replace("/main");
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
