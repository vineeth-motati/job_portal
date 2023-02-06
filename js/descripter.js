function describe_it(selected_index) {
    // console.log(selected_index)

    var dscrptn_wrapper = document.getElementById('dscrptn_wrapper');
    // dscrptn_wrapper.innerHTML += '<div id="b" class="company_logo">';
    // dscrptn_wrapper.innerHTML +=
    //     "<img src=" +
    //     '"' +
    //     actual_data[selected_index]["Company Logo"] +
    //     '" ' +
    //     "onerror=\"document.getElementById('b').style.display='none'" +
    //     '" ' +
    //     "alt=" +
    //     '" ' +
    //     actual_data[selected_index]["Company"] +
    //     " logo" +
    //     '" ' +
    //     "/>    </div>";

    var bdv = document.createElement('div');
    bdv.classList.add('company_logo');
    bdv.setAttribute('id', 'b');
    dscrptn_wrapper.appendChild(bdv);

    var logo = document.createElement('img');
    var logo_url = actual_data[selected_index]['Company Logo'];
    logo.setAttribute('src', logo_url);
    logo.setAttribute(
        'onerror',
        "document.getElementById('b').style.display='none'"
    );
    logo.setAttribute('alt', actual_data[selected_index]['Company']);
    bdv.appendChild(logo);

    var cdv = document.createElement('div');
    cdv.classList.add('apply');
    cdv.setAttribute('id', 'c');
    dscrptn_wrapper.appendChild(cdv);

    var aply = document.createElement('input');
    aply.setAttribute('type', 'button');
    aply.setAttribute('value', 'VIN this JOB');
    aply.classList.add('job_apply');
    // aply.onclick = function () {
    //     console.log('applied')
    //     alert("Coming soon..!");
    // };
    cdv.appendChild(aply);

    // Create Job title element
    var ddv = document.createElement('div');
    ddv.classList.add('job_title');
    ddv.setAttribute('id', 'd');
    ddv.innerHTML = actual_data[selected_index]['JobTitle'];
    bdv.appendChild(ddv);
    cdv.parentNode.insertBefore(ddv, cdv.nextSibling);

    // Create company element
    var edv = document.createElement('div');
    edv.classList.add('company');
    edv.setAttribute('id', 'e');
    edv.innerHTML = actual_data[selected_index]['Company'];
    bdv.appendChild(edv);
    ddv.parentNode.insertBefore(edv, ddv.nextSibling);

    // Create table
    var fdv = document.createElement('div');
    fdv.setAttribute('id', 'f');
    bdv.appendChild(fdv);
    edv.parentNode.insertBefore(fdv, edv.nextSibling);

    var tbl1 = document.createElement('table');
    tbl1.classList.add('job_details');
    tbl1.setAttribute('id', 'g');
    fdv.appendChild(tbl1);

    var tbl_r = document.createElement('TR');
    tbl_r.setAttribute('id', 'h');
    tbl1.appendChild(tbl_r);

    var tbl_d1 = document.createElement('td');
    tbl_d1.setAttribute('id', 'i');
    tbl_d1.innerHTML =
        "<i class='fa fa-map-marker' aria-hidden='true'></i> " +
        actual_data[selected_index]['Location'];
    tbl_r.appendChild(tbl_d1);

    var tbl_d2 = document.createElement('td');
    tbl_d2.setAttribute('id', 'i');
    tbl_d2.innerHTML =
        "<i class='fa fa-black-tie' aria-hidden='true'></i> " +
        actual_data[selected_index]['Job Experience Required'];
    tbl_r.appendChild(tbl_d2);

    var tbl_d3 = document.createElement('td');
    tbl_d3.setAttribute('id', 'i');
    tbl_d3.innerHTML =
        "<i class='fa fa-inr' aria-hidden='true'></i> " +
        actual_data[selected_index]['Job Salary'];
    tbl_r.appendChild(tbl_d3);

    var jdv = document.createElement('div');
    jdv.setAttribute('id', 'j');
    fdv.parentNode.insertBefore(jdv, fdv.nextSibling);

    var date_from = new Date(actual_data[selected_index]['Crawl Timestamp']);
    var date_to = new Date();
    function dayDiff(date_from, date_to) {
        return Math.round(
            (date_to.getTime() - date_from.getTime()) / (1000 * 3600 * 24)
        );
    }
    time_diff = dayDiff(date_from, date_to).toString();

    var pst_tm = document.createElement('p');
    pst_tm.classList.add('posted_on');
    pst_tm.innerHTML = 'Posted: ' + time_diff + ' days ago';
    jdv.appendChild(pst_tm);

    var vdv = document.createElement('div');
    vdv.classList.add('v_line');
    jdv.appendChild(vdv);

    var jid = document.createElement('div');
    jid.classList.add('job_id');
    jid.innerHTML = 'Job ID: ' + actual_data[selected_index]['Job ID'];
    jdv.appendChild(jid);

    var jdp = document.createElement('p');
    jdp.innerHTML = 'Permanent Job';
    jdv.appendChild(jdp);
    jdv.innerHTML += '<br />';

    var kdv = document.createElement('div');
    kdv.setAttribute('id', 'k');
    jdv.parentNode.insertBefore(kdv, jdv.nextSibling);

    var lbl1 = document.createElement('label');
    lbl1.setAttribute('for', 'job_description');
    lbl1.innerHTML = 'Job Description';
    kdv.appendChild(lbl1);

    var ul = document.createElement('ul');
    ul.classList.add('job_description');
    kdv.appendChild(ul);

    var jd_points = actual_data[selected_index]['Responsibilities']
        .replace(/\n+$/, '')
        .split(/\r?\n/);
    let count2 = 0;
    for (point of jd_points) {
        count2++;
        ul.innerHTML += '<li>' + point + '</li>';
        if (count2 > 9) {
            break;
        }
    }

    dscrptn_wrapper.innerHTML += '<hr/>';

    var ldv = document.createElement('div');
    ldv.setAttribute('id', 'l');
    // kdv.parentNode.insertBefore(ldv, kdv.nextSibling);
    dscrptn_wrapper.appendChild(ldv);

    var lbl2 = document.createElement('label');
    lbl2.setAttribute('for', 'job_details');
    lbl2.innerHTML = 'Job Details';
    ldv.appendChild(lbl2);

    var tbl2 = document.createElement('table');
    ldv.appendChild(tbl2);

    var cl_grp = document.createElement('colgroup');
    tbl2.appendChild(cl_grp);

    cl_grp.innerHTML =
        '<col style="width: 22%;" />' + '<col style="width: 90%" />';

    var tr1 = document.createElement('tr');
    tbl2.appendChild(tr1);

    var td1 = document.createElement('td');
    td1.classList.add('sub_heading');
    td1.innerHTML = 'Industry : ';
    tr1.appendChild(td1);

    var td2 = document.createElement('td');
    td2.innerHTML = actual_data[selected_index]['Industry'];
    tr1.appendChild(td2);

    var tr2 = document.createElement('tr');
    tbl2.appendChild(tr2);

    var td1 = document.createElement('td');
    td1.classList.add('sub_heading');
    td1.innerHTML = 'Functional Area : ';
    tr2.appendChild(td1);

    var td2 = document.createElement('td');
    td2.innerHTML = actual_data[selected_index]['Functional Area'];
    tr2.appendChild(td2);

    var tr3 = document.createElement('tr');
    tbl2.appendChild(tr3);

    var td1 = document.createElement('td');
    td1.classList.add('sub_heading');
    td1.innerHTML = 'Role Category : ';
    tr3.appendChild(td1);

    var td2 = document.createElement('td');
    td2.innerHTML = actual_data[selected_index]['Role Category'];
    tr3.appendChild(td2);

    var tr4 = document.createElement('tr');
    tbl2.appendChild(tr4);

    var td1 = document.createElement('td');
    td1.classList.add('sub_heading');
    td1.innerHTML = 'Role : ';
    tr4.appendChild(td1);

    var td2 = document.createElement('td');
    td2.innerHTML = actual_data[selected_index]['Role'];
    tr4.appendChild(td2);

    var count = 0;
    function render_skills(skl) {
        if (count < 9) {
            let skl_btn = document.createElement('button');
            skl_btn.classList.add('skill');
            skl_btn.setAttribute('type', 'button');
            skl_btn.innerHTML = skl;
            td2.appendChild(skl_btn);
            // console.log(skl);
            count++;
        }
    }

    var tr5 = document.createElement('tr');
    tbl2.appendChild(tr5);

    var td1 = document.createElement('td');
    td1.classList.add('sub_heading');
    td1.innerHTML = 'Skills : ';
    tr5.appendChild(td1);

    var td2 = document.createElement('td');

    var skls_arr = actual_data[selected_index]['Key Skills'];
    skls_arr = skls_arr.split('|');
    skls_arr.forEach(render_skills);

    // td2.innerHTML = actual_data[selected_index]['Role']
    tr5.appendChild(td2);
}

var selected_index = localStorage.getItem('selected_index');
selected_index = parseInt(selected_index);
var data = localStorage.getItem('data');
var actual_data = JSON.parse(data);

describe_it(selected_index);

var aply = document.getElementsByClassName('job_apply');
aply[0].onclick = function () {
    // console.log("applied");
    alert('Coming soon..!');
};

document.getElementById('modify_it').onclick = function () {
    localStorage.setItem('modify_index', selected_index.toString());
    console.log('Modify');
};

document.getElementById('delete_it').onclick = function () {
    localStorage.setItem(
        'delete_id',
        actual_data[selected_index]['Job ID'].toString()
    );
    console.log('Delete');
};
