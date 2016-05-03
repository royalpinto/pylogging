var logging = require('../lib/main.js');

exports.loggerTree = function(test) {
    var l4 = logging.getLogger('a.b.c.d');

    // Parent should be a placeholder.
    // Placeholder instances will have _children attributes.
    test.ok(l4._parent._children);

    var l3 = logging.getLogger('a.b.c');

    // Placeholder should get replaced with actual logger.
    test.strictEqual(l3, l4._parent, "Error");

    // Now parent shouldn't be a Placeholder
    test.strictEqual(l4._parent._children, undefined);

    test.done();
};
