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

  app.controller("EdhCtrl", function($scope, $http) {
    return $http.get("/edh/json").success(function(data) {
      var row, _i, _len, _ref, _results;
      $scope.edh = data['主頁'];
      _ref = $scope.edh;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        if (row['攻擊']) {
          _results.push(row['攻防'] = "" + row['攻擊'] + "/" + row['攻擊']);
        } else {
          _results.push(row['攻防'] = '');
        }
      }
      return _results;
    });
  });

}).call(this);
