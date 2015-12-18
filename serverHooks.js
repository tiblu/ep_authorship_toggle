/**
 * padInitToolbar hook
 *
 * Add a button to the toolbar
 *
 * @see {@link http://etherpad.org/doc/v1.5.7/#index_padinittoolbar}
 */
exports.padInitToolbar = function (hook_name, args) {
    var toolbar = args.toolbar;

    var button = toolbar.button({
        command: 'epAuthorshipToggle',
        localizationId: "epAuthorshipToggle.toolbar.toggle.title",
        class: "buttonicon buttonicon-clearauthorship epAuthorshipToggle"
    });

    toolbar.registerButton('epAuthorshipToggle', button);
};