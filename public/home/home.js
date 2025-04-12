
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
        if(!isAdmin) {
            window.location.href = '../student-home/home.html';
        }
        document.getElementById('user-id').innerText = `${username}`;

        document.getElementById('username').innerText = `${username}`;

    } catch (err) {
        console.log(err);
    }
});


// parse the json-web-tokens
async function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Logout functionality
function logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page
    window.location.href = '../login/login.html';
}
