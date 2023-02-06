// import { actual_data } from "./js/script.js";
var data = localStorage.getItem('data');
var actual_data = JSON.parse(data);

var index;
var delete_btn;

function delete_it(index) {
    actual_data.splice(index, 1);
    console.log(actual_data);
    localStorage.setItem('data', JSON.stringify(actual_data));
    window.location.reload();
    document.getElementById('all_results') = null;
}

function fetch_by_id(id_to_delete) {
    // console.log(actual_data);

    var result_found = false;
    id_to_delete = parseInt(id_to_delete);
    if (Number.isInteger(id_to_delete)) {
        for (index = 0; index < actual_data.length; index++) {
            if (actual_data[index]['Job ID'] === id_to_delete) {
                console.log(actual_data[index]);
                result_found = true;
                // clear all results (if any)
                all_results = document.getElementById('all_results');
                all_results.innerHTML = null;

                // Render resullt by id
                render_result(index);

                // Create Delete Button
                delete_btn = document.getElementsByClassName('job_apply');
                delete_btn[0].setAttribute('value', 'Delete this JOB');
                break;
            }
        }
    }
    if (result_found === false) {
        alert('ID you entered is invalid or already delted');
        window.location.reload();
    }

    console.log(id_to_delete);
}

function handle_deletion() {
    var id_to_delete = document.getElementById('deletebar').value;
    fetch_by_id(id_to_delete);

    delete_btn[0].addEventListener('click', function () {
        if (confirm('Are you sure want to delete this Job?')) {
            // window.location = "index.html";
            delete_it(index);
        }
    });
}

document.getElementById('deletebar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handle_deletion();
    }
});

var delete_id = localStorage.getItem('delete_id');
if (delete_id != '') {
    document.getElementById('deletebar').value = delete_id;

    handle_deletion();

    localStorage.setItem('delete_id', '');
}

console.log(delete_id);
