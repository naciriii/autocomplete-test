const API_URL = 'https://restcountries.eu/rest/v2/all';

/**
 * 
 * @param {*} input HTML element Input
 * @param {*} data Data Returned from the backend
 */
function autocomplete(input, data) {

    input.addEventListener("input", function (e) {

        // Clear Previous Search Data
        clearList();

        listContainer = document.getElementById('autocomplete-list')
        if (!this.value.trim().length) {
            return false;
        }

        try {

            /**
             * Check if there's at least one match
             */
            let found = false;
            for (i in data) {


                if (data[i].name.substr(0, this.value.length).toLowerCase() == this.value.toLowerCase()) {
                    found = true;
                    /**
                     * Handle item and add it to the list
                     */
                    item = document.createElement("DIV");
                    // Add some styles to the prefixed written letters 
                    item.innerHTML += '<span class="mark">' + data[i].name.substr(0, this.value.length) + '</span>' + data[i].name.substr(this.value.length, (data[i].name.length - this.value.length))
                    item.addEventListener("click", function (e) {
                        input.value = e.target.innerText
                        clearList()
                    });
                    /**
                     * Add Item to the list and show the list up
                     */
                    listContainer.appendChild(item);
                } else {
                    if (i == (data.length - 1) && !found) {
                        throw new Error('No Match')
                    }
                }
            }

        } catch (err) {
            /**
             * Show Warning Message that no data is matching the search
             */
            item = document.createElement("DIV");
            item.innerHTML += '<span> No match Available </span>'
            listContainer.appendChild(item);
        }

        listContainer.style.display = 'block';

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



