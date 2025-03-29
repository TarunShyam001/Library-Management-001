// Sample data for books
const libraryRecords = [
    { rollCode: 'STU001', name: 'Amit Kumar', bookCode: 'B001', bookTitle: 'The Great Gatsby', issueDate: '2024-03-10', returnDate: '2024-03-15', fine: 0 },
    { rollCode: 'STU002', name: 'Priya Sharma', bookCode: 'B002', bookTitle: '1984', issueDate: '2024-03-11', returnDate: '2024-03-18', fine: 30 },
    { rollCode: 'STU003', name: 'Ravi Verma', bookCode: 'B003', bookTitle: 'To Kill a Mockingbird', issueDate: '2024-03-12', returnDate: '2024-03-17', fine: 0 },
    { rollCode: 'STU004', name: 'Sneha Roy', bookCode: 'B004', bookTitle: 'The Catcher in the Rye', issueDate: '2024-03-13', returnDate: '2024-03-20', fine: 50 },
    { rollCode: 'STU005', name: 'Manoj Tiwari', bookCode: 'B005', bookTitle: 'Moby-Dick', issueDate: '2024-03-14', returnDate: '2024-03-19', fine: 0 },
    { rollCode: 'STU006', name: 'Kavita Das', bookCode: 'B006', bookTitle: 'War and Peace', issueDate: '2024-03-15', returnDate: '2024-03-22', fine: 70 },
    { rollCode: 'STU007', name: 'Ankit Singh', bookCode: 'B007', bookTitle: 'Pride and Prejudice', issueDate: '2024-03-16', returnDate: '2024-03-21', fine: 0 },
    { rollCode: 'STU008', name: 'Divya Nair', bookCode: 'B008', bookTitle: 'The Odyssey', issueDate: '2024-03-17', returnDate: '2024-03-24', fine: 90 },
    { rollCode: 'STU009', name: 'Rahul Gupta', bookCode: 'B009', bookTitle: 'The Divine Comedy', issueDate: '2024-03-18', returnDate: '2024-03-23', fine: 0 },
    { rollCode: 'STU010', name: 'Meera Iyer', bookCode: 'B010', bookTitle: 'Ulysses', issueDate: '2024-03-19', returnDate: '2024-03-26', fine: 110 },
    { rollCode: 'STU011', name: 'Nitin Joshi', bookCode: 'B011', bookTitle: 'Don Quixote', issueDate: '2024-03-20', returnDate: '2024-03-25', fine: 0 },
    { rollCode: 'STU012', name: 'Sanya Kapoor', bookCode: 'B012', bookTitle: 'The Brothers Karamazov', issueDate: '2024-03-21', returnDate: '2024-03-28', fine: 130 },
    { rollCode: 'STU013', name: 'Arjun Patel', bookCode: 'B013', bookTitle: 'Brave New World', issueDate: '2024-03-22', returnDate: '2024-03-27', fine: 0 },
    { rollCode: 'STU014', name: 'Neha Sharma', bookCode: 'B014', bookTitle: 'Crime and Punishment', issueDate: '2024-03-23', returnDate: '2024-03-30', fine: 150 },
    { rollCode: 'STU015', name: 'Vikram Yadav', bookCode: 'B015', bookTitle: 'Frankenstein', issueDate: '2024-03-24', returnDate: '2024-03-29', fine: 0 },
    { rollCode: 'STU016', name: 'Pooja Mishra', bookCode: 'B016', bookTitle: 'Anna Karenina', issueDate: '2024-03-25', returnDate: '2024-04-01', fine: 170 }
];

// Pagination variables
let currentPage = 1;
let itemsPerPage = 5; // default items per page
let filterlibraryRecords = [...libraryRecords]; // Keep track of the filtered books

// Function to render the books in the table
function renderTable() {
    const recordsTableBody = document.getElementById('record-table-body');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const recordsToDisplay = filterlibraryRecords.slice(startIndex, endIndex);

    recordsTableBody.innerHTML = ''; // Clear the table before adding rows

    recordsToDisplay.forEach(libraryRecords => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${libraryRecords.rollCode}</td>
            <td>${libraryRecords.name}</td>
            <td>${libraryRecords.bookCode}</td>
            <td>${libraryRecords.bookTitle}</td>
            <td>${libraryRecords.issueDate}</td>
            <td>${libraryRecords.returnDate}</td>
            <td>${libraryRecords.fine}</td>
            <td><button onclick="returnBook('${libraryRecords.rollCode}')" id="return-button"> Return </button></td>
        `;
        recordsTableBody.appendChild(row);
    });

    // Update pagination info
    document.getElementById('page-info').innerText = `Page ${currentPage}`;

    // Disable prev/next buttons based on current page
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage * itemsPerPage >= filterlibraryRecords.length;
}

// Function to change the page
function changePage(direction) {
    currentPage += direction;
    renderTable();
}

// Function to filter books based on search input
function filterRecords() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    
    filterlibraryRecords = libraryRecords.filter(records => {
        return (
            records.rollCode.toLowerCase().includes(searchInput) ||
            records.name.toLowerCase().includes(searchInput)
        );
    });

    // Reset to first page after filtering
    currentPage = 1;

    // Render the table with the filtered data
    renderTable();
}

function returnBook(rollCode) {
    alert(`Returning book for Student ID: ${rollCode}`);
    filterlibraryRecords = filterlibraryRecords.filter(records => records.rollCode !== rollCode);
    libraryRecords = libraryRecords.filter(records => records.rollCode !== rollCode);
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
