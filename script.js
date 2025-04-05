const API_KEY = 'AIzaSyCXX32YeN6U3fURzBMaYc607dThQVgQO8o'; // Replace with your Google API key
        const CX = 'b342f1a9d4ebe433d'; // Replace with your Custom Search Engine ID

        async function performSearch() {
            const query = document.getElementById('search-input').value;
            if (!query) {
                alert('Please enter a search term.');
                return;
            }

            const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                displayResults(data.items);
            } catch (error) {
                console.error('Error fetching search results:', error);
                alert('Failed to fetch search results. Please try again.');
            }
        }

        function displayResults(items) {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';

            if (!items || items.length === 0) {
                resultsContainer.innerHTML = '<li>No results found.</li>';
                return;
            }

            items.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('result-item');
                li.addEventListener('click', () => {
                    window.open(item.link, '_blank');
                }
                );
            
                li.innerHTML = `
                    <a href="${item.link}" target="_blank" class='title'>${item.title}</a>
                    <p>${item.snippet}</p>
                `;
                resultsContainer.appendChild(li);
            });
        }