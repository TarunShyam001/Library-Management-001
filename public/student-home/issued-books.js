const port = 3376;

// Pagination variables
let listOfData = [];

document.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault();
    try {
        const token = localStorage.getItem('token');
        // console.log(token);
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
        await getBooksData();

    } catch (err) {
        console.log(err);
    }
});

async function getBooksData() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:${port}/manage-students/get-books-data`, { headers: { 'Authorization': token } });
        listOfData = Array.isArray(response.data) ? response.data : [response.data];

        await renderBooksIssued();

    } catch (err) {
        console.log('Error on fetching data : ', err);
    }
}

// Function to render the books in the table
async function renderBooksIssued() {

    const dataTableBody = document.getElementById('issued-table-body');
    const dataToDisplay = listOfData;


    dataTableBody.innerHTML = ''; // Clear the table before adding rows

    if (listOfData.length > 0) {
        document.getElementById('issued-books-table').style.display = 'table';
        document.getElementById('issued-books').innerText = ` Issued Books Data : `;
        dataToDisplay.forEach((data, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.bookCode}</td>
                <td>${data.bookTitle}</td>
                <td>${data.returnTime}</td>
                <td>${data.fine}</td>
            `;
            dataTableBody.appendChild(row);
        });
    } else {
        document.getElementById('issued-books-table').style.display = 'none';
        document.getElementById('issued-books').innerText = `No Books are issued currently !`;
    }

}

async function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

renderBooksIssued();

// Logout functionality
function logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page
    window.lo
cation.href = '../login/login.html';
}