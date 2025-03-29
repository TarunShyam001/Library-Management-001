// Sample data for books
const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: '1925', stack: 'A1', availability: 'Available' },
    { id: 2, title: '1984', author: 'George Orwell', year: '1949', stack: 'B2', availability: 'Checked Out' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: '1960', stack: 'C3', availability: 'Available' },
    { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: '1951', stack: 'D4', availability: 'Available' },
    { id: 5, title: 'Moby-Dick', author: 'Herman Melville', year: '1851', stack: 'E5', availability: 'Checked Out' },
    { id: 6, title: 'War and Peace', author: 'Leo Tolstoy', year: '1869', stack: 'F6', availability: 'Available' },
    { id: 7, title: 'Pride and Prejudice', author: 'Jane Austen', year: '1813', stack: 'G7', availability: 'Checked Out' },
    { id: 8, title: 'The Odyssey', author: 'Homer', year: '8th century BC', stack: 'H8', availability: 'Available' },
    { id: 9, title: 'The Divine Comedy', author: 'Dante Alighieri', year: '1320', stack: 'I9', availability: 'Available' },
    { id: 10, title: 'Ulysses', author: 'James Joyce', year: '1922', stack: 'J10', availability: 'Checked Out' },
    { id: 11, title: 'Don Quixote', author: 'Miguel de Cervantes', year: '1605', stack: 'K11', availability: 'Available' },
    { id: 12, title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', year: '1880', stack: 'L12', availability: 'Available' },
    { id: 13, title: 'Brave New World', author: 'Aldous Huxley', year: '1932', stack: 'M13', availability: 'Checked Out' },
    { id: 14, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', year: '1866', stack: 'N14', availability: 'Available' },
    { id: 15, title: 'Frankenstein', author: 'Mary Shelley', year: '1818', stack: 'O15', availability: 'Checked Out' },
    { id: 16, title: 'Anna Karenina', author: 'Leo Tolstoy', year: '1878', stack: 'P16', availability: 'Available' },
];

// Pagination variables
let currentPage = 1;
let itemsPerPage = 5; // default items per page
let filteredBooks = [...books]; // Keep track of the filtered books

// Function to render the books in the table
function renderTable() {
    const bookTableBody = document.getElementById('book-table-body');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

    bookTableBody.innerHTML = ''; // Clear the table before adding rows

    booksToDisplay.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>${book.stack}</td>
            <td>${book.availability}</td>
        `;
        bookTableBody.appendChild(row);
    });

    // Update pagination info
    document.getElementById('page-info').innerText = `Page ${currentPage}`;

    // Disable prev/next buttons based on current page
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage * itemsPerPage >= filteredBooks.length;
}

// Function to change the page
function changePage(direction) {
    currentPage += direction;
    renderTable();
}

// Function to filter books based on search input
function filterBooks() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    
    filteredBooks = books.filter(book => {
        return (
            book.id.toString().includes(searchInput) ||
            book.title.toLowerCase().includes(searchInput) ||
            book.stack.toLowerCase().includes(searchInput)
        );
    });

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
