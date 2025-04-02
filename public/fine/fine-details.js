const port = 3376;

// Pagination variables
let currentPage = 1;
let itemsPerPage = 5; // default items per page
let listOfData = [];
let filteredData = [];
let totalFine = 0;

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

        await getFineData();
    } catch (err) {
        console.log(err);
    }
});

async function getFineData() {
    try {
        const response = await axios.get(`http://localhost:${port}/manage-students/get-fine-data`);
        listOfData = response.data.fineInfo;
        totalFine = response.data.totalFine;

        // alert(response.data.message);

        filteredData = [...listOfData];

        await renderFineTable();
    } catch (err) {
        console.log('Error on fetching data : ', err);
    }
}


// Function to render the books in the table
async function renderFineTable() {

    const dataTableBody = document.getElementById('fine-table-body');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToDisplay = filteredData.slice(startIndex, endIndex);

    dataTableBody.innerHTML = ''; // Clear the table before adding rows

    dataToDisplay.forEach((data, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.rollCode}</td>
            <td>${data.name}</td>
            <td>${data.fine}</td>
            <td>${data.returnedDate}</td>
        `;
        dataTableBody.appendChild(row);
    });

    // Update pagination info
    document.getElementById('page-info').innerText = `Page ${currentPage}`;

    // Update totalFine info
    document.getElementById('fine-collect').innerText = `₹${totalFine}`;


    // Disable prev/next buttons based on current page
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage * itemsPerPage >= listOfData.length;
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

// Function to change the page
function changePage(direction) {
    currentPage += direction;
    renderFineTable();
}

// Function to handle items per page change
document.getElementById('items-per-page').addEventListener('change', function () {
    itemsPerPage = parseInt(this.value);
    renderFineTable();
});

// Initial render
renderFineTable();

// Logout functionality
function logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page
    window.location.href = '../login/login.html';
}