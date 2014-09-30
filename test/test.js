/**
 * Created by jarodyv on 9/29/14.
 */
var iBot = require('../index.js');

var ibot = new iBot('AX55HiLnoR8k', '03G5KxQ1AuxYtahcTHtk');

ibot.listen('12346786', 'hello', function (err, msg) {
    if (err) return console.error(err);
    console.log('ibot say: %s', msg);
});