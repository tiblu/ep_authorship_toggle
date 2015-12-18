'use strict';

/**
 * postToolbarInit hook
 *
 * Registers the apAuthorshipToggle command to the toolbar.
 *
 * @param {string} hook_name "postToolbarInit"
 * @param {object} args {ace: .., toolbar: ..}
 *
 * @see {@link http://etherpad.org/doc/v1.5.7/#index_posttoolbarinit}
 * @see {@link http://etherpad.org/doc/v1.5.7/#index_editbar}
 */
exports.postToolbarInit = function (hook_name, args) {
    var editbar = args.toolbar; // toolbar is actually editbar - http://etherpad.org/doc/v1.5.7/#index_editbar

    var inner = $('iframe[name=ace_outer]').contents().find('iframe[name=ace_inner]').contents();
    var docBody = inner.find('#innerdocbody');

    editbar.registerCommand('epAuthorshipToggle', function () {
        docBody.toggleClass('authorColors');
    });
};