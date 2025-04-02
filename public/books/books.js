const bookForm = document.querySelector(".book-info-form");
const port = 3376;

// Pagination variables
let currentPage = 1;
let itemsPerPage = 5; // default items per page
let listOfBooks = [];
let filteredBooks = []; // Keep track of the filtered books

document.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault();
    try {
        const token = localStorage.getItem('token');
        // console.log(token);
        if(!token) {
            window.location.href = '../login/login.html';
        }

        const decodeToken = parseJwt(token);
        // console.log(decodeToken);
        const isAdmin = decodeToken.isAdmin;
        if(!isAdmin) {
            window.location.href = '../login/login.html';
        }

        await getBooks();
    } catch (err) {
        console.log(err);
    }
});


async function getBooks() {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`http://localhost:${port}/books/get-books`);
        listOfBooks = response.data;

        console.log("API Response:", response.data);

        filteredBooks = [...listOfBooks];

        await renderTable();
    } catch (err) {
        console.log('Error on fetching data : ', err);
    }
}


bookForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const bookDetails = {
        bookId:document.getElementById('book-code').value, 
        title: document.getElementById('book-title').value,
        author: document.getElementById('book-author').value,
        year: document.getElementById('pub-year').value,
        stack: document.getElementById('stack').value
    };
  
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:${port}/books/add-books`, bookDetails);

        alert(response.data.message); // Check the structure of the returned data
        // Refresh the expense list
        await getBooks();

        document.getElementById('book-code').value = "";
        document.getElementById('book-title').value = "";
        document.getElementById('book-author').value = "";
        document.getElementById('pub-year').value = "";
        document.getElementById('stack').value = "";
    } catch (err) {
        if (err.response && err.response.status === 401) {
            alert(err.response.data.message); // Show alert when book already exists
            
            document.getElementById('book-code').value = "";
            document.getElementById('book-title').value = "";
            document.getElementById('book-author').value = "";
            document.getElementById('pub-year').value = "";
            document.getElementById('stack').value = "";
        } else {
            console.log(err);
        }
    }
});

// Function to render the books in the table
async function renderTable() {
    const bookTableBody = document.getElementById('book-table-body');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

    bookTableBody.innerHTML = ''; // Clear the table before adding rows

    booksToDisplay.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.bookId}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>${book.stack}</td>
            <td>${book.availability ? "Available" : "Issued"}</td>
        `;
        bookTableBody.appendChild(row);
    });

    // Update pagination info
    document.getElementById('page-info').innerText = `Page ${currentPage}`;

    // Disable prev/next buttons based on current page
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage * itemsPerPage >= filteredBooks.length;
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
function filterBooks() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    
    if (searchInput === "") {
        filteredBooks = [...listOfBooks]; // Restore original list when search input is empty
    } else {
        filteredBooks = listOfBooks.filter(book => {
            return (
                book.bookId.toString().includes(searchInput) ||
                book.title.toLowerCase().includes(searchInput) ||
                book.stack.toLowerCase().includes(searchInput)
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

// Initial render
renderTable();

// Logout functionality
function logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page
    window.location.href = '../login/login.html';
}