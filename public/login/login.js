
const port = 3376;

let users = [];

document.addEventListener("DOMContentLoaded", function () {
    const formTitle = document.getElementById("form-title");
    const nameGroup = document.getElementById("name-group");
    const rollCodeGrp = document.getElementById("id-code-group");
    const submitBtn = document.getElementById("submit-btn");
    const toggleText = document.getElementById("toggle-text");
    const toggleLink = document.getElementById("toggle-link");
    const loginForm = document.getElementById("login-form");

    let isSignup = false;

    toggleLink.addEventListener("click", function (e) {
        e.preventDefault();
        isSignup = !isSignup;

        if (isSignup) {
            formTitle.textContent = "Sign Up";
            nameGroup.style.display = "block";
            rollCodeGrp.style.display = "block";
            submitBtn.textContent = "Sign Up";
            toggleText.innerText = "Already have an account?"
            toggleLink.innerHTML = "<strong>Login</strong>";
        } else {
            formTitle.textContent = "Login";
            nameGroup.style.display = "none";
            rollCodeGrp.style.display = "none";
            submitBtn.textContent = "Login";
            toggleText.innerText = "Don't have an account? "
            toggleLink.innerHTML = "<strong>Sign up</strong>";
        }
    });

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if(isSignup) {
            const username = document.getElementById('name').value;
            const regId = document.getElementById('id-code').value;

            try{
                const response = await axios.post(`http://localhost:${port}/user/signup`,{username, regId, email, password});
                users.push(response.data);
        
                document.getElementById('name').value = "";
                document.getElementById('id-code').value = "";
                document.getElementById('email').value = "";
                document.getElementById('password').value = "";

                
                // Switch to login page after successful signup
                isSignup = false;
                formTitle.textContent = "Login";
                nameGroup.style.display = "none";
                rollCodeGrp.style.display = "block";
                submitBtn.textContent = "Login";
                toggleText.innerText = "Don't have an account?";
                toggleLink.innerHTML = "<strong>Sign up</strong>";

            } catch (error) {
                alert(error.response.data.message || "Signup failed!");
                console.error("Signup Error:", error);
            }
        } else {
            // Login Logic
            try {
                const response = await axios.post(`http://localhost:${port}/user/login`, { email, password });
                
                document.getElementById('email').value = "";
                document.getElementById('password').value = "";

                alert(response.data.message);
                localStorage.setItem("token", response.data.token);
                window.location.href = "../home/home.html";

            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        document.getElementById('password').value = "";
                        alert(error.response.data.message);
                    } else if (error.response.status === 404) {
                        document.getElementById('email').value = "";
                        document.getElementById('password').value = "";
                        alert(error.response.data.message);
                    } else {
                        alert("Error : the provided data is incorrect!!!")
                    }
                } else {
                    console.log('Error adding user:', error);
                }
            }
        }  
    })
});