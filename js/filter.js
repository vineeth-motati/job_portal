// Global vairable
var result_query = new Set();

function compare_and_add(index, data_value, key) {
    if (data_value.toLowerCase().indexOf(key) !== -1) {
        result_query.add(index);
    }
}

// Actual Filteration
function filter_it(tokens) {
    // Loop over all jobs
    for (var i = 0; i < actual_data.length; i++) {
        // Loop over each word in search query
        tokens.forEach((key) => {
            key.toLowerCase();

            compare_and_add(i, actual_data[i]['JobTitle'], key);
            compare_and_add(i, actual_data[i]['Company'], key);
            compare_and_add(i, actual_data[i]['Job Salary'], key);
            compare_and_add(i, actual_data[i]['Location'], key);
        });
    }
}

// Desired location filter is set
function filter_it_with_loc(desired_loc, tokens) {
    for (var i = 0; i < actual_data.length; i++) {
        if (
            actual_data[i]['Location']
                .toLowerCase()
                .indexOf(desired_loc.toLowerCase()) !== -1
        ) {
            // Handles if location is set and search bar empty
            if (tokens.length === 0) {
                result_query.add(i);
            }
            // Loop over each word in search query
            tokens.forEach((key) => {
                key.toLowerCase();

                compare_and_add(i, actual_data[i]['JobTitle'], key);
                compare_and_add(i, actual_data[i]['Company'], key);
                compare_and_add(i, actual_data[i]['Job Salary'], key);
            });
        }
    }
}

// Primary function
function filter_data(tokens, desired_loc, sort_by, actual_data) {
    // Reset the result query
    result_query = new Set();

    // Desired location filter is not set
    if (desired_loc.toLowerCase() === '') {
        filter_it(tokens);
    } else {
        filter_it_with_loc(desired_loc, tokens);
    }

    // sort the data
    if (sort_by !== '') {
        result_query = sorter(result_query, sort_by, actual_data);
    }

    return result_query;
}
