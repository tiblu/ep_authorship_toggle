var eejs = require('ep_etherpad-lite/node/eejs/');

exports.eejsBlock_editbarMenuRight = function (hook_name, args, cb) {
    args.content = args.content + eejs.require("ep_authorship_toggle/templates/editbarButtons.ejs");
    return cb();
};