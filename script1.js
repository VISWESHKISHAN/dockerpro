document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.querySelector('.search-box');
    const searchButton = document.querySelector('.search-btn');

    // Function to display the popup with the search text
    function showPopup(query) {
        const popup = document.createElement('div');
        console.log('query:', query);
        popup.classList.add('popup');
        popup.textContent = `You searched for: ${query}`;
        document.body.appendChild(popup);
        
        // Automatically remove popup after 3 seconds
        setTimeout(() => {
            popup.remove();
        }, 3000);
    }

    // Function to ensure URL includes 'https://'
    function ensureHttps(url) {
        if (!/^https?:\/\//i.test(url)) {
            return 'https://' + url;
        }
        return url;
    }

    // Check if the search box is not empty and handle Enter key press
    searchBox.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && searchBox.value.trim() !== '') {
            const urlWithHttps = ensureHttps(searchBox.value.trim());
            showPopup(urlWithHttps);
        }
    });

});
