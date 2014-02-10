app = angular.module 'myApp', ["ngRoute"]

#parse magiccards.info links to image
app.directive "mtglink", ->

    link: (scope, element, attrs)->
        element.bind "mouseenter", ->
            pathname = element[0].pathname
            firstSlash = pathname.indexOf('/')
            secondSlash = pathname.indexOf('/', firstSlash + 1)
            thirdSlash = pathname.indexOf('/', secondSlash + 1)
            setNameLength = secondSlash - firstSlash - 1 #(22)/ 23, 24, 25 /(26)
            setLangLength = thirdSlash - secondSlash - 1
            setName = pathname.substr(firstSlash + 1, setNameLength)
            setLang = pathname.substr(secondSlash + 1, setLangLength)
            dot = pathname.indexOf('.')
            fileNameLength = dot - thirdSlash - 1
            fileName = pathname.substr(thirdSlash + 1, fileNameLength)
            picUrl = "http://magiccards.info/scans/#{setLang}/#{setName}/#{fileName}.jpg"
            scope.img = angular.element('<img style="position: fixed; top: 100px; right: 100px">')
            scope.img[0].src = picUrl
            element.after(scope.img)
        element.bind "mouseleave", ->
            scope.img.remove()

app.controller "EdhCtrl", ($scope, $http)->

    $http.get("/edh/json")
    .success (data)->
        $scope.edh = data['主頁']
