// Command to run android device
// export PATH=/home/jolin1337/bin:/usr/local/bin:/usr/bin:/bin:/usr/bin/X11:/usr/X11R6/bin:/usr/games:/usr/lib/mit/bin:/home/jolin1337/android-sdks:/home/jolin1337/android-sdks/tools/:/home/jolin1337/android-sdks/platform-tools/
// phonegap run android

var currentDate = new Date();

var DateTmpProt = Date.prototype;
var DateTmp = Date;

var Date = function (a1,a2,a3,a4,a5,a6, a7) {
    var date = new DateTmp();
    if(arguments.length == 1)
        return new DateTmp(a1);
    if(arguments.length == 2)
        return new DateTmp(a1, a2);
    if(arguments.length == 3)
        return new DateTmp(a1, a2, a3);
    if(arguments.length == 4)
        return new DateTmp(a1, a2, a3, a4);
    if(arguments.length == 5)
        return new DateTmp(a1, a2, a3, a4, a5);
    if(arguments.length == 6)
        return new DateTmp(a1, a2, a3, a4, a5, a6);
    if(arguments.length == 7)
        return new DateTmp(a1, a2, a3, a4, a5, a6, a7);
    date.setTime(currentDate.getTime());
    return date;
    // if(arguments.length > 0)
    //     DateTmp.call(this, a1,a2,a3,a4,a5,a6);
    // else {
    //     DateTmp.call(this, currentDate.getTime());
    // }
}
// Date.prototype = {
//     __proto__: DateTmp.prototype
// }
// Date.prototype.constructor = Date;
// Date.prototype.valueOf = function () {
//     return this.getTime();
// };


var Page = function (id, title, color, base, undefined) {
    var scope = this;
    this.base_base = "https://fto.st/wordpress/?rest_route=/fto/v1/pages";
    this.base = this.base_base;
    this.title = "";
    this.id = "";
    this.color = "transparent";
    if(id !== undefined)
        this.id = id;
    if(title !== undefined)
        this.title = title;
    if(color !== undefined)
        this.color = color;
    if(base !== undefined)
        this.base = base;
    this.url = function () {
        return scope.base + scope.id;
    }
    this.isStatic = function () {
        return this.base == "";
    }
};
Page.prototype.constructor = Page;
var pages = new (function () {
    var cid = "#data_feeds";
    function getStylish (info, content) {
        return '<div class="feed-item" style="background: ' + info.color + ';"><h2>' + info.title + '</h2>' +  content + '</div>';
    }
    function objectExists (obj, array) {
        for(var i in array) {
            if(array[i] === obj) return true;
        }
        return false;
    }
    function reqursiveIterateFiles(info, request, undefined) {
        if(info instanceof Array) {
            return reqursiveIterateFiles(info.top(), request, undefined);
        }
        // console.log(info.title);
        if(info == undefined && pages_tmp.length > 0) {
            pages_tmp.pop();
            loadDataUrl(pages_tmp.top(), reqursiveIterateFiles);
        }
        if(info == undefined || !objectExists(info, pages_tmp)) return;
        if(info.isStatic())
            $(cid).html($(cid).html() + getStylish(info, $(info.id).html()));
        else {
            var count = $(cid).find('div').length;
            (new Function(
                "cid",
                "getStylish", 
                $(request.responseText).filter('script').text().replace(
                    /document\.write\((.*)\)/, 
                    "$(cid).html($(cid).html() + getStylish(new Page('" + info.id + "', '" + info.title + "', '" + info.color + "', '" + info.base + "'), $1))")
            ))(cid, getStylish);
            var html = $(request.responseText).not('script');
                // console.log($(cid).find('div').length, count);
            if(html.length > 0) {
                // console.log($(request.responseText).not('script'));
                var el = $(cid).find('.feed-item:last');
                el.append(html);
                // if($(cid).find('div').length > count) {
                //     $(cid).find('div:last').append(
                //         getStylish(info, html.html())
                //     );
                // }
                // else {
                //     $(cid).html($(cid).html() + getStylish(info, request.responseText));
                    
                //     // var reqHtml = $(request.responseText);
                //     // for (var i = Things.length - 1; i >= 0; i--) {
                //     //     Things[i]
                //     // };
                //     //$(cid).append(getStylish(info, $(request.responseText).html()));
                // }
            }
        }

        if(pages_tmp.length > 0) {
            if(info instanceof Array)
                pages_tmp[pages_tmp.length-1].pop();
            else
                pages_tmp.pop();
            loadDataUrl(pages_tmp.top(), reqursiveIterateFiles);
        }
    }
    function loadDataUrl(info, callback, undefined) {
        if(info == undefined) return;
        if(info.isStatic()) {
            setTimeout(function() {
                callback(info);
            }, 0);
            return;
        }
        $.ajax(info.url(), {
            method: 'GET',
            xhrFields: { withCredentials: info.base === info.base_base },
            crossDomain: true,
            success: (data) => {
                callback(info, { responseText: data});
                //setTimeout($(request.responseText).text(), 100);
                //$(cid).html("New Data: " + eval($("<script type='text/javascript'>var hej='eee';alert(hej);</script>")).text());
            },
            error: () => {
                $(cid).html($(cid).html() + '<div>Error loading of url: ' + info.url() + '</div>');
                callback();
            }
        });
        /*
        var request = new XMLHttpRequest();
        request.open("GET", info.url(), true);
        request.onreadystatechange = function() {
            if(request.readyState == 4) {
                if(request.status == 200 || request.status == 0) {
                    callback(info, request);
                    //setTimeout($(request.responseText).text(), 100);
                    //$(cid).html("New Data: " + eval($("<script type='text/javascript'>var hej='eee';alert(hej);</script>")).text());
                }
                else {
                    $(cid).html($(cid).html() + '<div>Error loading of url: ' + info.url() + '</div>');
                    callback();
                }
            }
        }

        request.send();
        */
    }

    var yellow = "#fcf8e3";
    var pink = "#ffeeee";
    var trans = "transparent";
    
    var p = [
        new Page("&file=dagens_frans", "Dagens Franciskus", trans),
        new Page("&file=pray_day", "Kollektbönen", trans),
        new Page("#faderbon", "", trans, ""),                   // Fader bön förslag till bön dagligen
        new Page("&file=dagens_pray", "Vi ber för", trans),
        new Page("#static_bon", "", trans, ""),
        new Page("&file=dagens_sats", "", trans),                     // Random text från bibeln pink
        new Page("#bibelord", "", trans, ""),                       // Dagens bibelord
        new Page("#static_rule", "", trans, "")                 // Att leva med ordens regler
    ];
    var p2 = [
        new Page("#settings", "", trans, "")
    ];
    var p3 = [
        new Page("index.php", "", trans, "https://godesity.se/johannes/fto/about-company-fto/"),
        new Page("#about_page", "", trans, "")
    ];
    var pages_tmp;
    

    this.update = function (id) {
        if(id == 'deviceready' || id.indexOf('refrech') === 0) {
            $(cid).html("");
            pages_tmp = new Array();
            var img = '<img src="img/logo.png"/>';
            if(id === "refrech-home" || id == 'deviceready') {
                $('.jumbotron h1').html(img + ' Att leva med ordensregeln <img src="img/francis.gif"/> <img src="img/clare.gif"/>');
                $('.current-date').html("" + dateFormat(Date(), "dd-m-yyyy"));
                $('.jumbotron h4').show();
                for (var i=0; i<p.length;i++) {
                    pages_tmp.push(p[i]);
                };
            }
            else if(id === "refrech-pray") {

                // If Mac//
                // var twitterCheck = function(){
                //     // ?? Check if it is available on the apple ios marcet
                //     appAvailability.check('twitter://', function(availability) {
                //         // availability is either true or false
                //         if(availability) { window.open('twitter://user?screen_name=xerxesnoble', '_system', 'location=no');}
                //         else{window.open('https://itunes.apple.com/ca/app/twitter/id333903271?mt=8', '_system', 'location=no'); };
                //     });
                // };

                // //If Android

                // var ua = navigator.userAgent.toLowerCase();
                // var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

                // if(isAndroid) {

                //     tidegardenCheck = function(){    

                //         appAvailability.check('se.fjellandermedia.tidegarden', function(availability) {
                //             // availability is either true or false
                //             if(availability) {window.open('tidegarden://user?screen_name=xerxesnoble', '_system', 'location=no');}
                //             else{window.open('https://play.google.com/store/apps/details?id=se.fjellandermedia.tidegarden', '_system', 'location=no');};
                //         });
                //     };
                // };

                $('.jumbotron h4').hide();
                $('.jumbotron h1').html(img + ' TSSF Community Obedience');
                // $('.current-date').html("" + dateFormat(Date(), "dd-m-yyyy"));
                // $('.current-date').html(dateFormat(Date(), "dd-m-yyyy"));
                for (var i=0; i<p2.length;i++) {
                    pages_tmp.push(p2[i]);
                };
            }
            else if(id === "refrech-about") {
                $('.jumbotron h4').hide();
                $('.jumbotron h1').html(img + ' Om appen');
                for (var i=0; i<p3.length;i++) {
                    pages_tmp.push(p3[i]);
                };
            }
            loadDataUrl(pages_tmp.top(), reqursiveIterateFiles);
        }
    }
})();

var app = {
    // Application Constructor
    initialize: function() {
        this.receivedEvent("deviceready");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
        $('.back-date').click(function () {
            app.receivedEvent('date-back');
        });
        $('.forward-date').click(function () {
            app.receivedEvent('date-forward');
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    onDeviceRefrech: function(id) {
        app.receivedEvent('refrech-' + id);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
        
        if(id == 'date-back') {
            currentDate = Date(currentDate.getTime() - 1000*60*60*24);
            pages.update('refrech-home');
        }
        else if(id == 'date-forward') {
            currentDate = Date(currentDate.getTime() + 1000*60*60*24);
            pages.update('refrech-home');
        }
        if(id == 'deviceready' || id.indexOf('refrech') === 0) 
            pages.update(id);

    }
};

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }
        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d:    d,
                dd:   pad(d),
                ddd:  dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m:    m + 1,
                mm:   pad(m + 1),
                mmm:  dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy:   String(y).slice(2),
                yyyy: y,
                h:    H % 12 || 12,
                hh:   pad(H % 12 || 12),
                H:    H,
                HH:   pad(H),
                M:    M,
                MM:   pad(M),
                s:    s,
                ss:   pad(s),
                l:    pad(L, 3),
                L:    pad(L > 99 ? Math.round(L / 10) : L),
                t:    H < 12 ? "a"  : "p",
                tt:   H < 12 ? "am" : "pm",
                T:    H < 12 ? "A"  : "P",
                TT:   H < 12 ? "AM" : "PM",
                Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default":      "ddd mmm dd yyyy HH:MM:ss",
    shortDate:      "m/d/yy",
    mediumDate:     "mmm d, yyyy",
    longDate:       "mmmm d, yyyy",
    fullDate:       "dddd, mmmm d, yyyy",
    shortTime:      "h:MM TT",
    mediumTime:     "h:MM:ss TT",
    longTime:       "h:MM:ss TT Z",
    isoDate:        "yyyy-mm-dd",
    isoTime:        "HH:MM:ss",
    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

Array.prototype.top = function () {
    return this[this.length-1];
}