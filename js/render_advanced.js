class Element {
    constructor(
        tag,
        id = '',
        clss = '',
        type = '',
        value = '',
        innerHTML = ''
    ) {
        this.tag = tag;
        this.id = id;
        this.clss = clss;
        this.type = type;
        this.value = value;
        this.innerHTML = innerHTML;

        let element = document.createElement(tag);
        id !== '' ? element.setAttribute('id', id) : {};
        clss !== '' ? element.classList.add(clss) : {};
        type !== '' ? element.setAttribute('type', type) : {};
        value !== '' ? element.setAttribute('value', value) : {};
        element.innerHTML = innerHTML;

        return element;
    }
}

// function render_it(result_index) {
var al_rslts = document.querySelector('#all_results');

var bdv = new Element((tag = 'div'), (id = 'b'), (clss = 'result_card'));
bdv.onclick = function () {
    // Opens Description page of the job
    localStorage.setItem('selected_index', result_index.toString());
    window.open('/description.html', '_blank');
};
al_rslts.appendChild(bdv);

var cdv = new Element((tag = 'div'), (id = 'c'), (clss = 'apply'));
bdv.appendChild(cdv);

var aply = new Element(
    (tag = 'input'),
    (id = ''),
    (clss = 'job_apply'),
    (type = 'button'),
    (value = 'VIN this JOB'),
    (innerHTML = '')
);
cdv.appendChild(aply);

var ddv = new Element(
    (tag = 'div'),
    (id = 'd'),
    (clss = 'job_title'),
    (type = ''),
    (value = ''),
    (innerHTML = actual_data[10]['JobTitle'])
);
cdv.parentNode.insertBefore(ddv, cdv.nextSibling);

var edv = new Element(
    (tag = 'div'),
    (id = 'e'),
    (clss = 'company'),
    (type = ''),
    (value = ''),
    (innerHTML = actual_data[10]['Company'])
);
ddv.parentNode.insertBefore(edv, ddv.nextSibling);

var fdv = new Element(
    (tag = 'div'),
    (id = 'f'),
    (clss = ''),
    (type = ''),
    (value = ''),
    (innerHTML = '')
);
edv.parentNode.insertBefore(fdv, edv.nextSibling);

var jbdtls = new Element(
    (tag = 'table'),
    (id = 'g'),
    (clss = 'job_details'),
    (type = ''),
    (value = ''),
    (innerHTML = '')
);
fdv.appendChild(jbdtls);

var tbl_r = new Element(
    (tag = 'tr'),
    (id = 'h'),
    (clss = ''),
    (type = ''),
    (value = ''),
    (innerHTML = '')
);
jbdtls.appendChild(tbl_r);

var tbl_d1 = new Element(
    (tag = 'td'),
    (id = 'i'),
    (clss = ''),
    (type = ''),
    (value = ''),
    (innerHTML =
        "<i class='fa fa-map-marker' aria-hidden='true'></i> " +
        actual_data[10]['Location'])
);
tbl_r.appendChild(tbl_d1);

var tbl_d2 = new Element(
    (tag = 'td'),
    (id = 'i'),
    (clss = ''),
    (type = ''),
    (value = ''),
    (innerHTML =
        "<i class='fa fa-black-tie' aria-hidden='true'></i> " +
        actual_data[10]['Job Experience Required'])
);
tbl_r.appendChild(tbl_d2);

var tbl_d3 = new Element(
    (tag = 'td'),
    (id = 'i'),
    (clss = ''),
    (type = ''),
    (value = ''),
    (innerHTML =
        "<i class='fa fa-inr' aria-hidden='true'></i> " +
        actual_data[10]['Job Salary'])
);
tbl_r.appendChild(tbl_d3);

var jdv = new Element(
    (tag = 'div'),
    (id = 'j'),
    (clss = ''),
    (type = ''),
    (value = ''),
    (innerHTML = '')
);
bdv.appendChild(jdv);
fdv.parentNode.insertBefore(jdv, fdv.nextSibling);

var jdp = new Element(
    (tag = 'p'),
    (id = ''),
    (clss = 'job_description'),
    (type = ''),
    (value = ''),
    (innerHTML = actual_data[10]['Responsibilities'].replaceAll('/', '. '))
);
jdv.appendChild(jdp);

var kdv = new Element(
    (tag = 'div'),
    (id = 'k'),
    (clss = ''),
    (type = ''),
    (value = ''),
    (innerHTML = '')
);
bdv.appendChild(kdv);
jdv.parentNode.insertBefore(kdv, jdv.nextSibling);

var shr_btn = new Element(
    (tag = 'button'),
    (id = ''),
    (clss = 'job_share'),
    (type = 'button'),
    (value = ''),
    (innerHTML = "<i class='fa fa-share-alt' aria-hidden='true'></i>")
);
kdv.appendChild(shr_btn);

var vdv = new Element(
    (tag = 'div'),
    (id = ''),
    (clss = 'v_line'),
    (type = ''),
    (value = ''),
    (innerHTML = '')
);
kdv.appendChild(vdv);

var date_from = new Date(actual_data[10]['Crawl Timestamp']);
var date_to = new Date();
function dayDiff(date_from, date_to) {
    return Math.round(
        (date_to.getTime() - date_from.getTime()) / (1000 * 3600 * 24)
    );
}
time_diff = dayDiff(date_from, date_to).toString();

var pst_tm = new Element(
    (tag = 'p'),
    (id = ''),
    (clss = 'posted_on'),
    (type = ''),
    (value = ''),
    (innerHTML = 'Posted: ' + time_diff + ' days ago')
);
kdv.appendChild(pst_tm);

var ldv = new Element(
    (tag = 'div'),
    (id = 'l'),
    (clss = 'job_skills'),
    (type = ''),
    (value = ''),
    (innerHTML = 'Skills: ')
);
kdv.parentNode.insertBefore(ldv, kdv.nextSibling);

function render_skills(skl) {
    var skl_btn = new Element(
        (tag = 'button'),
        (id = ''),
        (clss = 'skill'),
        (type = 'button'),
        (value = ''),
        (innerHTML = skl)
    );
    ldv.appendChild(skl_btn);
}
var skls_arr = actual_data[10]['Key Skills'];
skls_arr = skls_arr.split('|');
skls_arr.forEach(render_skills);
