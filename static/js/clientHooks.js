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

    var $window = $(window);
    var $inner = $('iframe[name=ace_outer]').contents().find('iframe[name=ace_inner]').contents();
    var $docBody = $inner.find('#innerdocbody');
    var $editorcontainer = $('#editorcontainer');
    var $editbar = $('#editbar');

    var $epAuthorshipToggleAuthorList = $('#epAuthorshipToggleAuthorList');
    var $epAuthorList = $epAuthorshipToggleAuthorList.find('#authorsList');

    var resizeHandler = function() {
        $epAuthorshipToggleAuthorList.css('top', $editbar.outerHeight() + 'px');
        $editorcontainer.css('top', $epAuthorshipToggleAuthorList.offset().top + $epAuthorshipToggleAuthorList.outerHeight());
    };

    editbar.registerCommand('epAuthorshipToggle', function () {
        var isVisibleAuthor = $epAuthorshipToggleAuthorList.is(':visible');

        $docBody.toggleClass('authorColors');

        if (isVisibleAuthor) { // Is visible so it's gonna be hidden
            $window.off('resize', resizeHandler);

            $epAuthorshipToggleAuthorList.toggle();
        } else {
            $window.on('resize', resizeHandler);

            // Clear previous authors and build a new author list
            $epAuthorList.empty();

            // TODO: Contains only authors that had edited the Pad before the Pad was opened. Will not update on the fly if new authors are added.
            var authors = clientVars.collab_client_vars.historicalAuthorData;
            for (var authorId in authors) {
                if (authors.hasOwnProperty(authorId)) {
                    var author = authors[authorId];
                    var elem = $('<span class="author"/>')
                        .css('background-color', clientVars.colorPalette[author.colorId])
                        .text(author.name);
                    $epAuthorList.append(elem);
                    $epAuthorList.append('<span>, </span>');
                }
            }
            // Remove last comma
            $epAuthorList.find('span').last().remove();

            if (Object.keys(authors).length) {
                $epAuthorshipToggleAuthorList.toggle(); // Show before to get height
                resizeHandler();
            }
        }
    });
};