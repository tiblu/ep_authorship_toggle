'use strict';

exports.postAceInit = function (event, args, callback) {
    var button = $('#epAuthorshipToggle');
    var inner = $('iframe[name=ace_outer]').contents().find('iframe[name=ace_inner]').contents();
    var docBody = inner.find('#innerdocbody');
    button.on('click', function () {
        docBody.toggleClass('authorColors');
    });
};