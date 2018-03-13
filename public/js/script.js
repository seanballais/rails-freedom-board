$(document).ready(function() {
    $('h5.time-posted').each(function() {
        $(this).text(getDate(parseInt($(this).text())));
    });

    $('div#floating-message-textbox-trigger').click(function() {
        $(this).fadeOut(150, function() {
            $('div#floating-message-textbox').slideDown(100);
        });
    });

    $('div#floating-message-textbox > h3 > span#close-button').click(function() {
        $('div#floating-message-textbox').slideUp(150, function() {
            $('div#floating-message-textbox-trigger').fadeIn(150);
        });
    });

    $('article div#article-contents div#message-writer form#form-bait').focusin(function() {
        $(this).fadeOut(150, function() {
            $(this).next('form').slideDown(150);
            $('article div#article-contents div#message-writer form#form-writer div div textarea').focus();
        });
    });

    $('article div#article-contents div#message-writer form#form-writer').focusout(function() {
        var message = $('article div#article-contents div#message-writer form#form-writer div div textarea').val();
        var author = $('article div#article-contents div#message-writer form#form-writer div div input').val();

        if (message == '' && author == '') {
            $(this).slideUp(150, function() {
                $(this).prev('form').fadeIn(150);
            });
        }
    });
});

function getDate(timestamp) {
    // Code from https://blog.serverdensity.com/automatic-timezone-conversion-in-javascript/
    // Multiply by 1000 because JS works in milliseconds instead of the UNIX seconds
    var tzOffset = new Date().getTimezoneOffset() * -1; // It gives out a negative integer if
                                                        // we're ahead, and a positive integer
                                                        // if we're behind. To correct this,
                                                        // we negate the value. Note that the
                                                        // value given is in minutes.
    var tzOffsetSeconds = tzOffset * 60;
    var localTimestamp = timestamp + tzOffsetSeconds;


    var date = new Date(localTimestamp * 1000);

    var year = date.getUTCFullYear();
    var month = date.getUTCMonth(); // getMonth() is zero-indexed, so we'll increment to get the correct month number
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();

    var monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];

    day = (day < 10) ? '0' + day : day;

    var meridiem = 'AM';
    if (hours >= 12) {
        meridiem = 'PM'
    }

    hours = (hours < 10) ? '0' + hours : (hours > 12) ? hours % 12: hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;

    return monthNames[month] + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes + ' ' + meridiem;
}