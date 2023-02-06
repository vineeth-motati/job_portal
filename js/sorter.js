function sorter(result_query, sort_by, actual_data) {
    var data_subset = [];
    // subset of data
    for (i of result_query) {
        data_subset.push(actual_data[i]);
    }
    sorted_result_query = [];
    if (sort_by === 'date') {
        // sort data subset by date
        data_subset.sort(function (a, b) {
            return (
                new Date(b['Crawl Timestamp']) - new Date(a['Crawl Timestamp'])
            );
        });
        // get indixes of sorted data subset
        for (item of data_subset) {
            sorted_result_query.push(item['Job ID'] - 1);
        }
    } else if (sort_by === 'sal') {
        // sort data subset by highest salary
        data_subset.sort(function (a, b) {
            var sal1 = parseInt(
                a['Job Salary']
                    .split(' - ')[1]
                    .split(' ')[0]
                    .replaceAll(',', '')
            );
            var sal2 = parseInt(
                b['Job Salary']
                    .split(' - ')[1]
                    .split(' ')[0]
                    .replaceAll(',', '')
            );
            return sal2 - sal1;
        });
        // get indixes of sorted data subset

        for (item of data_subset) {
            sorted_result_query.push(item['Job ID'] - 1);
        }
    }

    var sorted_result_query = new Set(sorted_result_query);
    return sorted_result_query;
}
