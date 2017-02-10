$(document).ready(function() {
    var  searchHistory = {};
    searchHistory.cookies = [];
    searchHistory.options = {
        maxShowNum: 20,
        expires: 7,
        input: '.history-input',
        cookieName: 'searchHistory',
        selected: function () { },
        beforeSend: function () { return true; },
        sendWhenSelect: true,
        actionByCall:false
    };
    searchHistory._addCookie = function(newCookie){
        debugger
        searchHistory._init();
        var index = searchHistory.cookies.indexOf(newCookie);
        var len = searchHistory.cookies.length;
        if (index == -1)
            len = searchHistory.cookies.unshift(newCookie);
        else {
            var temp = searchHistory.cookies[index];
            for (var i = index; i > 0; i--)
                searchHistory.cookies[i] = searchHistory.cookies[i - 1];
            searchHistory.cookies[0] = temp;
        }
        var tempCookie = (len > searchHistory.options.maxShowNum)?searchHistory.cookies.slice(0, searchHistory.options.maxShowNum):searchHistory.cookies;
        $.each(tempCookie, function (index, value) {
            tempCookie[index] = escape(value);
        });
        $.cookie(searchHistory.options.cookieName, tempCookie.join('&'), { expires: searchHistory.options.expires, path: '/' });
    };
    searchHistory._clear = function(){
        $.cookie(searchHistory.options.cookieName, null);
        searchHistory.cookies = [];
        $('.xdsoft_autocomplete_dropdown div').remove();
    };
    searchHistory._init = function(){
        var strCookie = $.cookie(searchHistory.options.cookieName);
        searchHistory.cookies = []
        if (strCookie && strCookie != 'null')
            $.each(strCookie.split('&'), function (index, value) {
                searchHistory.cookies.push(unescape(value));
            });
    };

    var getCookies = function(){
        searchHistory._init();
        return searchHistory.cookies;
    };
    searchHistory.easyAutocompleteInit = function(){
        $("#searchInput").autocomplete({
            source:[
                function( q,add ){
                    var s = getCookies();
                    add(s);
                }
            ],
            openOnFocus:true,
            delay:500,
            dropdownStyle:{width:'272px'},
            itemStyle:{width:'232px',height:'30px','line-height':'30px'},
            visibleLimit:6,
            limit:20,
            appendMethod:'replace'
        }).on('selected.xdsoft',function(e,datum){
            $('form[name="searchForm"] .ninput-group button').click();
        });
    };
    searchHistory.easyAutocompleteInit();
    window.searchHistory = searchHistory;
});