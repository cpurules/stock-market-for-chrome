if(window.location.href.indexOf("type=portfolio") != -1) {
    function compareSortableElement(a, b) {
        return (a.value - b.value);
    }

    var portfolioTableBody = document.getElementsByName("_ref_ck")[0].nextElementSibling.children[0];
    var tableRows = portfolioTableBody.children;

    var elementsToSort = new Array();

    // first 2 rows are headings; last row is totals
    for(var i = 2; i < tableRows.length - 1; i++) {
        var portfolioRow = tableRows[i];

        if(portfolioRow.hasAttribute("bgcolor")) {
            var portfolioCells = portfolioRow.querySelectorAll("td");
            var currentPrice = portfolioCells[3].innerHTML;
            
            var sortableElement = {
                "value": parseInt(currentPrice),
                "dataRow": portfolioRow,
                "hiddenRow": tableRows[i+1]
            };

            elementsToSort.push(sortableElement);
        }
    }

    // We sort them in ascending order because we're going to put them at the top of the table in this order
    // So the lowest value will get inserted to the top first, and then pushed down by all the other rows

    elementsToSort.sort(compareSortableElement);
    for(var i = 0; i < elementsToSort.length; i++) {
        var thisEl = elementsToSort[i];
        if(i % 2 != elementsToSort.length % 2) {
            thisEl.dataRow.setAttribute("bgcolor", "#EEEEEF");
        }
        else {
            thisEl.dataRow.setAttribute("bgcolor", "#FFFFFF");
        }
        tableRows[2].parentNode.insertBefore(thisEl.hiddenRow, tableRows[2]);
        tableRows[2].parentNode.insertBefore(thisEl.dataRow, tableRows[2]);
    }
}
else if(window.location.href.indexOf("type=list") != -1) {
    var stocksTable = document.getElementById("main").querySelector("div#content").querySelector("table").querySelector("td[class=content]").querySelector("table");
    var stockRows = stocksTable.querySelectorAll("tr");

    // The first row is a header, we can skip
    for(var i = 1; i < stockRows.length; i++) {
        var stockRow = stockRows[i];
        var stockCells = stockRow.querySelectorAll("td");
        var stockPrice = parseInt(stockCells[5].textContent);

        if(stockPrice != 15) {
            stockRow.setAttribute("style", "display:none");
        }
    }
}