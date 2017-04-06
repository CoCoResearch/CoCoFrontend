'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view-uploadImage when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view-uploadImage");
  });


  describe('view-uploadImage', function() {

    beforeEach(function() {
      browser.get('index.html#!/view-uploadImage');
    });


    it('should render view-uploadImage when user navigates to /view-uploadImage', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view-home', function() {

    beforeEach(function() {
      browser.get('index.html#!/view-home');
    });


    it('should render view-home when user navigates to /view-home', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
