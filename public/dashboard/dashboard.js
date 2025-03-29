
// Logout functionality
function logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page
    window.location.href = '../login/login.html';
}


// Show Dashboard
function showDashboard() {
    document.getElementById('right-section').innerHTML = `<h2>Dashboard</h2><p>Manage and overview of library activities.</p>`;
    setActiveLink(document.querySelector('[href="../Dashbord/home.html"]'));
}

// Fine Collected
function fineCollected() {
    document.getElementById('right-section').innerHTML = `<h2>Fine Collected</h2><p>Here you can track fines collected from students.</p>`;
    setActiveLink(document.querySelector('[href="#"]'));
}
