'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view-featureSolutionGraph when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view-featureSolutionGraph");
  });


  describe('view-featureSolutionGraph', function() {

    beforeEach(function() {
      browser.get('index.html#!/view-featureSolutionGraph');
    });


    it('should render view-featureSolutionGraph when user navigates to /view-featureSolutionGraph', function() {
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
