const studentForm = document.querySelector(".issue-info-form");
const port = 3376;

// Pagination variables
let currentPage = 1;
let itemsPerPage = 5; // default items per page
let listOfStudents = [];
let filteredStudents = []; // Keep track of the filtered books

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

        await getData();
    } catch (err) {
        console.log(err);
    }
});


async function getData() {
    try {
        const response = await axios.get(`http://localhost:${port}/manage-students/get-data`);
        listOfStudents = response.data;

        console.log("API Response:", response.data);

        filteredStudents = [...listOfStudents];
        if(filteredStudents.length === 0) {
            return;
        }

        await renderTable();
    } catch (err) {
        console.log('Error on fetching data : ', err);
    }
}


studentForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const studentDetails = {
        rollCode: document.getElementById('stud-roll-code').value,
        name: document.getElementById('stud-name').value,
        bookCode:document.getElementById('book-code').value, 
        bookTitle: document.getElementById('book-name').value
    };
    console.log(studentDetails);
  
    try {
        const response = await axios.post(`http://localhost:${port}/manage-students/add-data`, studentDetails);

        alert(response.data.message); // Check the structure of the returned data

        await getData();

        document.getElementById('book-code').value = "";
        document.getElementById('book-name').value = "";
        document.getElementById('stud-roll-code').value = "";
        document.getElementById('stud-name').value = "";
        
    } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 404 )) {
            alert(err.response.data.message); // Show alert when book already issued
            
            document.getElementById('book-code').value = "";
            document.getElementById('book-name').value = "";
        
        } else {
            console.log(err);
        }
    }
});

// Function to render the books in the table
async function renderTable() {
    const dataTableBody = document.getElementById('record-table-body');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToDisplay = filteredStudents.slice(startIndex, endIndex);

    dataTableBody.innerHTML = ''; // Clear the table before adding rows

    dataToDisplay.forEach((data, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.rollCode}</td>
            <td>${data.name}</td>
            <td>${data.bookCode}</td>
            <td>${data.bookTitle}</td>
            <td>${data.currentTime}</td>
            <td>${data.returnTime}</td>
            <td>${data.fine}</td>
            <td><button onclick="returnBook(${index})" id="return-button"> Return </button></td>
        `;
        dataTableBody.appendChild(row);
    });

    // Update pagination info
    document.getElementById('page-info').innerText = `Page ${currentPage}`;

    // Disable prev/next buttons based on current page
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage * itemsPerPage >= filteredStudents.length;
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
    renderTable();
}

// Function to filter books based on search input
function filterData() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    
    if (searchInput === "") {
        filteredStudents = [...listOfStudents]; // Restore original list when search input is empty
    } else {
        filteredStudents = listOfStudents.filter(data => {
            return (
                data.rollCode.toString().includes(searchInput) ||
                data.name.toLowerCase().includes(searchInput)
            );
        });
    }

    // Reset to first page after filtering
    currentPage = 1;

    // Render the table with the filtered data
    renderTable();
}


// Function to handle items per page change
document.getElementById('items-per-page').addEventListener('change', function () {
    itemsPerPage = parseInt(this.value);
    renderTable();
});

// to return the book in the database
async function returnBook(index) {
    const data = listOfStudents[index];

    try {
        const response = await axios.post(`http://localhost:${port}/manage-students/delete-data/${data.id}`);
        alert(response.data.message);

        await getData();

    } catch (error) {
        console.error('Error in returning books:', error);
    }
}

// Initial render
renderTable();

// Logout functionality
function logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page
    window.location.href = '../login/login.html';
}