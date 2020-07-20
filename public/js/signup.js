$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const textInput = $("input#text-input");
  const passwordInput = $("input#password-input");

  // <<<<<<< HEAD
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      text: textInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.text || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.text, userData.password);
    textInput.val("");
    passwordInput.val("");
  });

  // <<<<<<< HEAD
  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(text, password) {
    $.post("/api/signup", {
      text: text,
      password: password,
    })
      .then(() => {
        window.location.replace("/main");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
