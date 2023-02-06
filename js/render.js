'use strict';

function render_result(result_index) {
    let al_rslts = document.querySelector('#all_results');

    let bdv = document.createElement('div');
    bdv.classList.add('result_card');
    bdv.setAttribute('id', 'b');
    al_rslts.appendChild(bdv);

    bdv.onclick = function () {
        // Opens Description page of the job
        localStorage.setItem('selected_index', result_index.toString());
        window.open('/description.html', '_blank');
    };

    // create apply button and add to card
    let cdv = document.createElement('div');
    cdv.classList.add('apply');
    cdv.setAttribute('id', 'c');
    bdv.appendChild(cdv);

    let aply = document.createElement('input');
    aply.setAttribute('type', 'button');
    aply.setAttribute('value', 'VIN this JOB');
    aply.classList.add('job_apply');
    // aply.onclick = function () {
    //     alert("Coming soon..!");
    // };
    cdv.appendChild(aply);

    // Create Job title element
    let ddv = document.createElement('div');
    ddv.classList.add('job_title');
    ddv.setAttribute('id', 'd');
    ddv.innerHTML = actual_data[result_index]['JobTitle'];
    bdv.appendChild(ddv);
    cdv.parentNode.insertBefore(ddv, cdv.nextSibling);

    // Create company element
    let edv = document.createElement('div');
    edv.classList.add('company');
    edv.setAttribute('id', 'e');
    edv.innerHTML = actual_data[result_index]['Company'];
    bdv.appendChild(edv);
    ddv.parentNode.insertBefore(edv, ddv.nextSibling);

    // Create table
    let fdv = document.createElement('div');
    fdv.setAttribute('id', 'f');
    bdv.appendChild(fdv);
    edv.parentNode.insertBefore(fdv, edv.nextSibling);

    let jbdtls = document.createElement('table');
    jbdtls.classList.add('job_details');
    jbdtls.setAttribute('id', 'g');
    fdv.appendChild(jbdtls);

    let tbl_r = document.createElement('TR');
    tbl_r.setAttribute('id', 'h');
    jbdtls.appendChild(tbl_r);

    let tbl_d1 = document.createElement('td');
    tbl_d1.setAttribute('id', 'i');
    tbl_d1.innerHTML =
        "<i class='fa fa-map-marker' aria-hidden='true'></i> " +
        actual_data[result_index]['Location'];
    tbl_r.appendChild(tbl_d1);

    let tbl_d2 = document.createElement('td');
    tbl_d2.setAttribute('id', 'i');
    tbl_d2.innerHTML =
        "<i class='fa fa-black-tie' aria-hidden='true'></i> " +
        actual_data[result_index]['Job Experience Required'];
    tbl_r.appendChild(tbl_d2);

    let tbl_d3 = document.createElement('td');
    tbl_d3.setAttribute('id', 'i');
    tbl_d3.innerHTML =
        "<i class='fa fa-inr' aria-hidden='true'></i> " +
        actual_data[result_index]['Job Salary'];
    tbl_r.appendChild(tbl_d3);

    // create job description element
    let jdv = document.createElement('div');
    jdv.setAttribute('id', 'j');
    bdv.appendChild(jdv);
    fdv.parentNode.insertBefore(jdv, fdv.nextSibling);

    let jdp = document.createElement('p');
    jdp.classList.add('job_description');
    jdp.innerHTML = actual_data[result_index]['Responsibilities'].replaceAll(
        '/',
        '. '
    );
    jdv.appendChild(jdp);

    // create share button and job post time
    let kdv = document.createElement('div');
    kdv.setAttribute('id', 'k');
    bdv.appendChild(kdv);
    jdv.parentNode.insertBefore(kdv, jdv.nextSibling);

    let shr_btn = document.createElement('button');
    shr_btn.classList.add('job_share');
    shr_btn.setAttribute('type', 'button');
    shr_btn.innerHTML = "<i class='fa fa-share-alt' aria-hidden='true'></i>";
    kdv.appendChild(shr_btn);

    let vdv = document.createElement('div');
    vdv.classList.add('v_line');
    kdv.appendChild(vdv);

    let date_from = new Date(actual_data[result_index]['Crawl Timestamp']);
    let date_to = new Date();
    function dayDiff(date_from, date_to) {
        return Math.round(
            (date_to.getTime() - date_from.getTime()) / (1000 * 3600 * 24)
        );
    }
    let time_diff = dayDiff(date_from, date_to).toString();

    let pst_tm = document.createElement('p');
    pst_tm.classList.add('posted_on');
    pst_tm.innerHTML = 'Posted: ' + time_diff + ' days ago';
    kdv.appendChild(pst_tm);

    // Create skills set
    let ldv = document.createElement('div');
    ldv.classList.add('job_skills');
    ldv.setAttribute('id', 'l');
    ldv.innerHTML = 'Skills: ';
    bdv.appendChild(ldv);
    kdv.parentNode.insertBefore(ldv, kdv.nextSibling);

    // rendering skills
    function render_skills(skl) {
        let skl_btn = document.createElement('button');
        skl_btn.classList.add('skill');
        skl_btn.setAttribute('type', 'button');
        skl_btn.innerHTML = skl;
        ldv.appendChild(skl_btn);
    }

    let skls_arr = actual_data[result_index]['Key Skills'];
    skls_arr = skls_arr.split('|');
    skls_arr.forEach(render_skills);
}
