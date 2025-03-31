document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.querySelector('.search-box');

    function showPopup(query) {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.textContent = `You searched for: ${query}`;
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.remove();
        }, 3000);
    }

    function sendQueryToBackend(query) {
        fetch("http://127.0.0.1:5000/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query })
        })
        .then(response => response.json())
        .then(data => console.log("Server response:", data))
        .catch(error => console.error("Error:", error));
    }

    searchBox.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && searchBox.value.trim() !== '') {
            const query = searchBox.value.trim();
            showPopup(query);
            sendQueryToBackend(query);
        }
    });

});
