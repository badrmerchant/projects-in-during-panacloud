
'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
   alert("ggggggggggg");
describe('Html5 Showcase App Badar ', function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

          //  /main                     fragment
    it('should automatically redirect to /main when location hash/fragment is empty', function() {
        expect(browser().location().url()).toBe("/");
    });



});