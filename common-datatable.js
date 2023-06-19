// $(document).ready (function () {
// (function ($) {

var csrf_token = document.getElementById('token_info').value;
var totalData = document.getElementById('bootstrap_data_table_total_data').value;
var commonUrl = document.getElementById('bootstrap_data_table_url').value;
var entriesPerPage = 10; // Number of entries to display per page

var totalPages = Math.ceil(totalData / entriesPerPage);
var currentPage = 1; // Replace with the current page number

var paginationList = document.getElementById('bootstrap-data-table12_paginate12');


// var previousButton = createPaginationButton('Previous');
// previousButton.classList.add('previous');
// previousButton.classList.add('disabled');
// paginationList.appendChild(previousButton);


var ellipsisShown = false;
for (var i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
        var pageNumberButton = createPaginationButton(i);
        pageNumberButton.classList.add('active');
        paginationList.appendChild(pageNumberButton);
        continue;
    }

    if (i <= 3 || i >= totalPages - 2 || Math.abs(i - currentPage) <= 1) {
        var pageNumberButton = createPaginationButton(i);
        paginationList.appendChild(pageNumberButton);
        ellipsisShown = false;
    } else if (!ellipsisShown) {
        var ellipsisButton = createPaginationButton('...');
        ellipsisButton.classList.add('disabled');
        paginationList.appendChild(ellipsisButton);
        ellipsisShown = true;
    }
}

// // Create Next button
// var nextButton = createPaginationButton('Next');
// nextButton.classList.add('next');
// nextButton.classList.add('disabled');
// paginationList.appendChild(nextButton);


var paginationButtons = paginationList.getElementsByClassName('page-link');
for (var j = 0; j < paginationButtons.length; j++) {

    paginationButtons[j].addEventListener('click', handlePaginationClick);
}

function handlePaginationClick(event) {

    event.preventDefault();


    var pageNumber = parseInt(event.target.textContent);

    getDefaultData('10', pageNumber);

}


function createPaginationButton(label) {
    var listItem = document.createElement('li');
    listItem.classList.add('paginate_button');
    listItem.classList.add('page-item');

    var link = document.createElement('a');
    link.href = '#';
    link.setAttribute('aria-controls', 'bootstrap-data-table12');
    link.setAttribute('data-dt-idx', '0');
    link.setAttribute('tabindex', '0');
    link.classList.add('page-link');
    link.textContent = label;

    listItem.appendChild(link);

    return listItem;
}



// })(jQuery);
function handleSearchvalue(searchKey = '', url, method) {
    let searchValue = {
        "key": "",
        "value": ""
    }

    if (searchKey != '' && searchKey.length >= 3) {
        searchValue.key = "search",
            searchValue.value = searchKey;
        getDefaultData(10, '', searchValue, url, method)
    }
    else {
        getDefaultData(10, '', '', url, method)
    }

}


function getDefaultData(filter = 10, page = '', searchKey = '', url, method = 'POST') {
    let limit = filter === '-1' ? totalData : filter;
    page = page == 1 ? 0 : page;
    commonUrl = url != undefined && url!= "" ? url : commonUrl;
    $.ajax({
        type: method,
        url: commonUrl,
        data: {
            limit: limit,
            page: page,
            searchKey: searchKey,
            _token: csrf_token,

        },
        dataType: "html",
        success: function (result) {

            var newShowingValue = 'Showing 1 to ' + (Number(limit)) + ' of ' + totalData + ' entries';
            $('#bootstrap-data-table12_info').text(newShowingValue);
            $("#employee-datatable").html(result);
        }





    })
}