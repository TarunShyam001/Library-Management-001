let totalBooks = 0;
let totalIssuedBooks = 0;
let totalFine = 0;

const port = 3376;

document.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault();
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            window.location.href = '../login/login.html';
        }

        const decodeToken = parseJwt(token);
        const isAdmin = decodeToken.isAdmin;
        if(!isAdmin) {
            window.location.href = '../login/login.html';
        }

        await getDashboard();
    } catch (err) {
        console.log(err);
    }
});


async function getDashboard() {
    try {
        const response = await axios.get(`http://localhost:${port}/manage-students/dashboard`);

        totalBooks = response.data.totalBooksData;
        totalIssuedBooks = response.data.totalIssuedData;
        totalFine = response.data.totalFine;

        renderInfo();
    } catch (err) {
        console.log('Error on fetching data : ', err);
    }
}


// Function to render the books in the table
function renderInfo() {

    document.getElementById('total-books').innerText = `${totalBooks}`;
    
    document.getElementById('books-issued').innerText = `${totalIssuedBooks}`;

    document.getElementById('books-remaining').innerText = `${totalBooks-totalIssuedBooks}`;

    document.getElementById('total-fine').innerText = `₹${totalFine}`;
    
}

// parse the json-web-tokens
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

renderInfo();
// Logout functionality
function logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page
    window.location.href = '../login/login.html';
}
