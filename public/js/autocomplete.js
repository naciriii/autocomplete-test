const API_URL = 'http://localhost:8000/api/fruits';

/**
 * 
 * @param {*} input HTML element Input
 * @param {*} data Data Returned from the backend
 */
function autocomplete(input, data) {

    input.addEventListener("input", function (e) {

        // Clear Old Data
        clearList();

        listContainer = document.getElementById('autocomplete-list')

        for (i in data) {
            if (data[i].substr(0, this.value.length).toLowerCase() == this.value.toLowerCase()) {
                /**
                 * Handle item and add it to the list
                 */
                item = document.createElement("DIV");
                item.innerHTML += data[i]
                item.addEventListener("click", function (e) {
                    input.value = e.target.innerText
                    clearList()
                });
                /**
                 * Add Item to the list and show the list up
                 */
                listContainer.appendChild(item);
                listContainer.style.display = 'block';
            }
        }
    });

    /**
     * Clear the list of items
     */
    function clearList() {
        var x = document.getElementById('autocomplete-list');
        x.innerHTML = ''


    }
    /**
     * Clear list of items on outside click
     */
    document.addEventListener("click", function (e) {
        clearList();
    });
}
/**
 * Load Data from API
 * @returns Promise<Data>
 */
function getDataFromApi() {
    return fetch(API_URL)
}

/**
 * Load Data from backend only once on page ready
*/
document.addEventListener('DOMContentLoaded', () => {
    getDataFromApi().then(res => res.json()).then(data => {
        autocomplete(document.getElementById("search"), data);

    })
})



