/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

    /*
       ======== A Handy Little QUnit Reference ========
       http://docs.jquery.com/QUnit

       Test methods:
       expect(numAssertions)
       stop(increment)
       start(decrement)
       Test assertions:
       ok(value, [message])
       equal(actual, expected, [message])
       notEqual(actual, expected, [message])
       deepEqual(actual, expected, [message])
       notDeepEqual(actual, expected, [message])
       strictEqual(actual, expected, [message])
       notStrictEqual(actual, expected, [message])
       raises(block, [expected], [message])
       */

    module('jQuery#momboBox', {
        setup: function() {
                   this.elems = $('#qunit-fixture').children();
        }
    });

    test('is chainable', 1, function() {
        // Not a bad test to run on collection methods.
        strictEqual(this.elems.momboBox(), this.elems, 'should be chaninable');
    });

    test('is momboBox', 1, function() {
        ok(this.elems.momboBox().get(0).momboBox, 'should be thoroughly momboBox');
    });

    module('simple array', {
        setup: function () {
            this.$elem = $('#qunit-fixture input').momboBox({ 
                data: ['Blue','Green','Orange','Fusia']
            });
        }
    });

    test('populates data from constructor', 1, function () {
        equal(this.$elem.get(0).momboBox.data.length, 4);
    });



    //module('jQuery.momboBox');

    //test('is momboBox', 1, function() {
    //strictEqual($.momboBox(), 'momboBox', 'should be thoroughly momboBox');
    //});

    //module(':momboBox selector', {
    //setup: function() {
    //this.elems = $('#qunit-fixture').children();
    //}
    //});

    //test('is momboBox', 1, function() {
    //// Use deepEqual & .get() when comparing jQuery objects.
    //deepEqual(this.elems.filter(':momboBox').get(), this.elems.last().get(), 'knows momboBox when it sees it');
    //});

}(jQuery));
