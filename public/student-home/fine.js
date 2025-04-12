const port = 3376;

let totalFine = 0;

document.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault();
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            window.location.href = '../login/login.html';
        }

        const decodeToken = await parseJwt(token);

        const isAdmin = decodeToken.isAdmin;
        const username = decodeToken.userName;

        if(isAdmin) {
            window.location.href = '../home/home.html';
        }

        document.getElementById('user-id').innerText = `${username}`;
        await getFineData();

    } catch (err) {
        console.log(err);
    }
});

async function getFineData() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:${port}/manage-students/get-student-fine-data`, { headers: { 'Authorization': token } });
        totalFine = response.data;

        await renderFine();

    } catch (err) {
        console.log('Error on fetching data : ', err);
    }
}

async function renderFine() {
    document.getElementById('total-fine').innerText = `₹${totalFine}/-`;
}

async function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

renderFine();

// Logout functionality
function logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page
    window.lo
cation.href = '../login/login.html';
}