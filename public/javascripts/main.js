(function() {
  var app;

  app = angular.module('myApp', ["ngRoute"]);

  app.directive("mtglink", function() {
    return {
      link: function(scope, element, attrs) {
        element.bind("mouseenter", function() {
          var dot, fileName, fileNameLength, firstSlash, pathname, picUrl, secondSlash, setLang, setLangLength, setName, setNameLength, thirdSlash;
          pathname = element[0].pathname;
          firstSlash = pathname.indexOf('/');
          secondSlash = pathname.indexOf('/', firstSlash + 1);
          thirdSlash = pathname.indexOf('/', secondSlash + 1);
          setNameLength = secondSlash - firstSlash - 1;
          setLangLength = thirdSlash - secondSlash - 1;
          setName = pathname.substr(firstSlash + 1, setNameLength);
          setLang = pathname.substr(secondSlash + 1, setLangLength);
          dot = pathname.indexOf('.');
          fileNameLength = dot - thirdSlash - 1;
          fileName = pathname.substr(thirdSlash + 1, fileNameLength);
          picUrl = "http://magiccards.info/scans/" + setLang + "/" + setName + "/" + fileName + ".jpg";
          scope.img = angular.element('<img style="position: fixed; top: 100px; right: 100px">');
          scope.img[0].src = picUrl;
          return element.after(scope.img);
        });
        return element.bind("mouseleave", function() {
          return scope.img.remove();
        });
      }
    };
  });

  app.controller("RepairCtrl", function($scope, $q, $timeout) {
    var defer;
    defer = $q.defer();
    defer.promise.then(function(weapon) {
      return "bow";
    }).then(function(weapon) {
      return "gun";
    }).then(function(weapon) {});
    return defer.resolve("sword");
  });

}).call(this);
