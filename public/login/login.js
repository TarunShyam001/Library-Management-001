
const port = 3376;
const submitBtn = document.getElementById("submit-btn");
const loginForm = document.getElementById("login-form");

let users = [];

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try{
        const response = await axios.post(`http://localhost:${port}/user/login`,{email, password});
        alert(response.data.message);
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";

        localStorage.setItem("token", response.data.token);
        if(response.data.isAdmin){
            window.location.href = "../home/home.html";
        } else {
            window.location.href = "../student-home/home.html";
        }
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
});