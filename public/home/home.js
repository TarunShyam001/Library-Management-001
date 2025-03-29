
// Logout functionality
function logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page
    window.location.href = '../login/login.html';
}

// Fine Collected
function fineCollected() {
    document.getElementById('right-section').innerHTML = `<h2>Fine Collected</h2><p>Here you can track fines collected from students.</p>`;
    setActiveLink(document.querySelector('[href="#"]'));
}
