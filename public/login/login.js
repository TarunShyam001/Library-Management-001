document.addEventListener("DOMContentLoaded", function () {
    const formTitle = document.getElementById("form-title");
    const nameGroup = document.getElementById("name-group");
    const rollCodeGrp = document.getElementById("roll-code-group");
    const submitBtn = document.getElementById("submit-btn");
    const toggleText = document.getElementById("toggle-text");
    const toggleLink = document.getElementById("toggle-link");
    let isSignup = false;

    toggleLink.addEventListener("click", function (e) {
        e.preventDefault();
        isSignup = !isSignup;

        if (isSignup) {
            formTitle.textContent = "Sign Up";
            nameGroup.style.display = "block";
            rollCodeGrp.style.display = "block";
            submitBtn.textContent = "Sign Up";
            submitBtn.onclick = SignUp;  // Corrected: Assign function reference
            toggleText.innerText = "Already have an account?"
            toggleLink.innerHTML = "<strong>Login</strong>";
        } else {
            formTitle.textContent = "Login";
            nameGroup.style.display = "none";
            rollCodeGrp.style.display = "none";
            submitBtn.textContent = "Login";
            submitBtn.onclick = Login;  // Corrected: Assign function reference
            toggleText.innerText = "Don't have an account? "
            toggleLink.innerHTML = "<strong>Sign up</strong>";
        }
    });

    function SignUp() {
        alert("Sign Up functionality goes here.");
        // Add your signup logic here
    }

    function Login() {
        alert("Login functionality goes here.");
        // Add your login logic here
    }
});
