function disconnectUser() {
    // Clear stored credentials
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    alert('You have been disconnected.');
} 