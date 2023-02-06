'use strict';

// JSON Data variable
var actual_data;
// Search Term
var search_term;
// Tokenized search query
var tokens;
// Desired location
var desired_loc;
// Sort Order
var sort_by;

// reset useful local storage variables
localStorage.setItem('modify_index', '');
localStorage.setItem('delete_id', '');

function toggle_darkmode(btn) {
    document.querySelector('#searchbar').classList.toggle('dm_searchbar');

    document
        .querySelector('#search_button')
        .classList.toggle('dm_search_button');

    document
        .querySelector('#location_value')
        .classList.toggle('dm_location_value');

    document.querySelector('#sort_value').classList.toggle('dm_sort_value');

    document
        .querySelector('#results_found')
        .classList.toggle('dm_results_found');

    document
        .querySelector('#darkmode_toggle')
        .classList.toggle('dm_darkmode_toggle');

    if (btn.innerHTML.indexOf('moon') !== -1) {
        btn.innerHTML =
            'Toggle Dark Mode ' +
            '<i class="fa fa-sun-o" aria-hidden="true"></i>';
    } else {
        btn.innerHTML =
            'Toggle Dark Mode ' +
            '<i class="fa fa-moon-o" aria-hidden="true"></i>';
    }

    document
        .querySelectorAll('.posted_on')
        .forEach((x) => x.classList.toggle('dm_posted_on'));
    document
        .querySelectorAll('.job_skills')
        .forEach((x) => x.classList.toggle('dm_job_skills'));

    document
        .querySelectorAll('.result_card')
        .forEach((x) => x.classList.toggle('dm_result_card'));
    document
        .querySelectorAll('.job_description')
        .forEach((x) => x.classList.toggle('dm_job_description'));
}

// Converts search query into tokens
function tokenize_search(search_term) {
    var tokens = search_term
        .toLowerCase()
        .split(' ')
        .filter(function (token) {
            return token.trim() !== '';
        });
    return tokens;
}

function handle_all_functions() {
    // clear all results (if any)
    const all_results = document.getElementById('all_results');
    all_results.innerHTML = null;

    // contents in searchbar
    search_term = document.getElementById('searchbar').value;
    tokens = tokenize_search(search_term);

    // contents in location filter
    desired_loc = document.getElementById('location_value').value;

    // contents on sort filter
    sort_by = document.getElementById('sort_value').value;

    // get set of indices if search results
    var result_query = filter_data(tokens, desired_loc, sort_by, actual_data);

    // Ensures input is not empty
    if (search_term === '' && desired_loc === '') {
        alert("Ridiculous, input something. \nIt's not that hard!!");
    }
    // Ensures Result is not empty
    else if (result_query.size == 0) {
        // Prints number of results found
        document.getElementById('results_found').innerHTML =
            'Results found: ' + result_query.size;

        alert('No results found!!');
    }
    // Everything is fine (hopefully), Deploy results
    else {
        // Prints number of results found
        document.getElementById('results_found').innerHTML =
            'Results found: ' + result_query.size;

        // Deploy results
        result_query.forEach(render_result);

        // details bar appear once results are deployed
        document
            .getElementById('details_bar')
            .classList.add('details_bar_appear');
    }
}
// Set data into local storage and load into varable
const reset = async function () {
    let load_data = await fetch('/data.json');
    let data = await load_data.json();
    localStorage.setItem('data', JSON.stringify(data));

    let data_frm_ls = localStorage.getItem('data');
    actual_data = JSON.parse(data_frm_ls);
};

// Load data into script
(function load_data() {
    if (localStorage.getItem('data') === null) reset();
    // load localstorage data into variable
    else {
        let data_frm_ls = localStorage.getItem('data');
        actual_data = JSON.parse(data_frm_ls);
    }
})();

// Get results when enter key is presssed in search bar
document.querySelector('#searchbar').addEventListener('keypress', function (e) {
    // search button only when text is entered
    document
        .querySelector('#search_button')
        .classList.add('search_button_appear');
    if (e.key === 'Enter') {
        handle_all_functions();
    }
    // Get resulsts when search button is pressed
    document
        .querySelector('#search_button')
        .addEventListener('click', handle_all_functions);
});

// Event listener for keeping search bar at top
document.querySelector('#searchbar').addEventListener('focus', function () {
    document.querySelector('#searchbar').classList.add('searchbar_at_top');

    // Filter bar is dsplayed once search bar is focused
    document.getElementById('filter_bar').classList.add('filter_bar_appear');
});
