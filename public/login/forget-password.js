const forgetPasswordForm = document.getElementById("reset-form");

let login = [];

const port = 3376;

forgetPasswordForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
  
    try{
        await axios.post(`http://localhost:${port}/password/forgotpassword`,{email})
        .then(response => {
            if(response.status === 200) {
                alert('mail sent successfull');
                window.location.href = '../login/login.html';
            } else {
                throw new Error ('Something went wrong!!!')
            }
        })
        .catch(err => {
            alert('something is inappropriate');
            throw new Error(err);
        });
        console.log(response);
        document.getElementById('email').value = "";

        alert(response.data.message);
        
    }
    catch(error){
        console.log('Error adding user: ',error);
    }
});

