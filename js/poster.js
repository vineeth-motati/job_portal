//  load data from local storage
var data_frm_ls = localStorage.getItem('data');
actual_data = JSON.parse(data_frm_ls);

// Automatically set Job ID as last element id
document.getElementById('job_id').value =
    actual_data[actual_data.length - 1]['Job ID'] + 1;

// Converts salary entered into indian format
const sal_min = document.getElementById('sal_min');
sal_min.addEventListener('keyup', (e) => {
    let miny = sal_min.value;
    miny = miny.replaceAll(',', '');
    let val = new Intl.NumberFormat('en-IN').format(miny);
    console.log(val);
    document.getElementById('sal_min').value = val;
});

const sal_max = document.getElementById('sal_max');
sal_max.addEventListener('keyup', (e) => {
    let maxy = sal_max.value;
    maxy = maxy.replaceAll(',', '');
    let val = new Intl.NumberFormat('en-IN').format(maxy);
    console.log(val);
    document.getElementById('sal_max').value = val;
});

// min-max salary validation
sal_max.addEventListener('blur', function () {
    let miny = sal_min.value;
    let maxy = sal_max.value;

    if (miny == '' && maxy == '') {
        alert('Please enter the Salary Range');
    } else if (miny > maxy) {
        alert(
            'Value present in maximum salary should be greater then or equal to minimum salary.'
        );
    }
});

const exp_min = document.getElementById('exp_min');
const exp_max = document.getElementById('exp_max');
// min-max evperience validation
exp_max.addEventListener('blur', function () {
    let miny = exp_min.value;
    let maxy = exp_max.value;

    if (miny == '' && maxy == '') {
        alert('Please enter the Experience Range');
    } else if (miny > maxy) {
        alert(
            'Value present in maximum experence should be greater then or equal to minimum experience.'
        );
    }
});

// Make location multiple selector
document.getElementById('location').addEventListener('click', function () {
    this.multiple = true;
    this.style = 'animation: none;';
});

// Select with a click
const optns = document.querySelectorAll('.opt');
optns.forEach(function (option) {
    option.addEventListener('mousedown', function (e) {
        e.preventDefault();
        this.selected = !this.selected;
    });
});

// Downloads updated JSON
function download(url, filename) {
    var a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    // a.click()
    document.body.removeChild(a);
}

var modify_index = localStorage.getItem('modify_index');
var modified = false;

// Adds values into fields for modification
function set_jobPost(modify_index) {
    document.getElementById('job_id').value =
        actual_data[modify_index]['Job ID'];

    document.getElementById('job_title').value =
        actual_data[modify_index]['JobTitle'];

    document.getElementById('company').value =
        actual_data[modify_index]['Company'];

    document.getElementById('company_logo').value =
        actual_data[modify_index]['Company Logo'];

    var salary = actual_data[modify_index]['Job Salary'].split(' - ');

    document.getElementById('sal_min').value = salary[0];
    document.getElementById('sal_max').value = salary[1].split(' ')[0];

    var experience = actual_data[modify_index]['Job Experience Required'].split(
        ' - '
    );

    document.getElementById('exp_min').value = experience[0];
    document.getElementById('exp_max').value = experience[1].split(' ')[0];

    let ss = actual_data[modify_index]['Key Skills'];
    document.getElementById('ss').value = ss.replaceAll('|', ',');

    var locations = actual_data[modify_index]['Location'].split(',');
    document.getElementById('location').multiple = true;

    locations.forEach((location) => {
        optns.forEach(function (option) {
            if (location == option.value) {
                option.selected = true;
            }
        });
    });

    // document.getElementById("location").value =
    //     actual_data[modify_index]["Location"];

    document.getElementById('jd').value =
        actual_data[modify_index]['Responsibilities'];

    document.getElementById('rl_ctgry').value =
        actual_data[modify_index]['Role Category'];

    document.getElementById('fnctn').value =
        actual_data[modify_index]['Functional Area'];

    document.getElementById('indstry').value =
        actual_data[modify_index]['Industry'];

    document.getElementById('role').value = actual_data[modify_index]['Role'];

    document.getElementById('submit_btn').value = 'Modify';
    document.title = 'Modify this Job';
    modified = true;

    localStorage.setItem('modify_index', '');
}

if (modify_index !== '') {
    modify_index = parseInt(modify_index);
    console.log(modify_index);
    set_jobPost(modify_index);
}

function get_jobPost(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const jobPost = Object.fromEntries(data.entries());

    jobPost['Job ID'] = parseInt(document.getElementById('job_id').value);
    jobPost['Crawl Timestamp'] = new Date().toString();

    let checked = document.querySelectorAll('#location :checked');
    let checked_value = [...checked].map((option) => option.value);
    checked_value.splice(0, 1);
    jobPost['Location'] = checked_value.join(',').replace(/\n|\r/g, '');

    jobPost['Job Salary'] = jobPost.sal_min + ' - ' + jobPost.sal_max + ' PA.';
    delete jobPost.sal_min;
    delete jobPost.sal_max;

    jobPost['Job Experience Required'] =
        jobPost.exp_min + ' - ' + jobPost.exp_max + ' Years';
    delete jobPost.exp_min;
    delete jobPost.exp_max;

    jobPost['Responsibilities'] = document.getElementById('jd').value;

    jobPost['Key Skills'] = jobPost['Key Skills'].replaceAll(',', '|');

    console.log(jobPost);

    // Replace or append the data based on modified
    if (modified) {
        actual_data[modify_index] = jobPost;
    } else {
        actual_data.push(jobPost);
    }
    localStorage.setItem('data', JSON.stringify(actual_data));
    console.log(actual_data);

    if (confirm('Post was Successful. \nWant to go and search for it?')) {
        window.location = 'index.html';
    } else {
        window.location.reload();
    }

    // Creates blob url for dounloading updated json
    const blob = new Blob([JSON.stringify(actual_data, null, 2)], {
        type: 'application/json',
    });
    const blobUrl = URL.createObjectURL(blob);

    // Actual download
    download(blobUrl, 'updated_data.json');
}

// Form submission trigger
const form = document.querySelector('#form_wrapper');
form.addEventListener('submit', get_jobPost);
