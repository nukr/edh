(function() {
  var Hipchatter, XLSX, edh, hipchat_conf, hipchatter, index, sendRepair, sendTextRepair, signin, workbookToJson, xlsx;

  XLSX = require("xlsx");

  xlsx = XLSX.readFile("public/misc/EDH.xlsx");

  workbookToJson = function(workbook) {
    var result;
    result = {};
    workbook.SheetNames.forEach(function(sheetName) {
      var roa;
      roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      if (roa.length > 0) {
        return result[sheetName] = roa;
      }
    });
    return result;
  };

  hipchat_conf = require("../config/hipchat");

  Hipchatter = require("hipchatter");

  hipchatter = new Hipchatter(hipchat_conf.config.token.personal);

  index = function(req, res) {
    return res.render('index', {
      title: 'Express'
    });
  };

  signin = function(req, res) {
    return res.render('signin', {
      title: 'Signin'
    });
  };

  edh = function(req, res) {
    var edhJson;
    edhJson = workbookToJson(xlsx);
    return res.render('edh', {
      title: 'EDH',
      edh: edhJson
    });
  };

  sendRepair = function(req, res) {
    return hipchatter.notify("Evolution", {
      message: "        >>>維修單（測試）<<<<br />        客戶：劉文凱<br />        電話：3345678<br />        地址：<a href='https://www.google.com.tw/maps/preview/place/973%E8%8A%B1%E8%93%AE%E7%B8%A3%E5%90%89%E5%AE%89%E9%84%89%E5%BB%BA%E5%9C%8B%E8%B7%AF%E4%BA%8C%E6%AE%B5155%E8%99%9F/@23.991751,121.578032,17z/data=!3m1!4b1!4m2!3m1!1s0x34689f08c14b2093:0xe0a86afbe99f9904'>花蓮縣吉安鄉建國路二段155號</a><br />        委派：@JayWang <br />        送單：@LoWei <br />        ",
      color: "green",
      token: hipchat_conf.config.token.room_sys
    }, function(err, err_response) {
      if (err === null) {
        return console.log("success");
      }
    });
  };

  sendTextRepair = function(req, res) {
    return hipchatter.notify("Evolution", {
      message: "@LoWei",
      color: "green",
      message_format: "text",
      token: hipchat_conf.config.token.room_sys
    }, function(err, err_response) {
      if (err === null) {
        return console.log("success");
      }
    });
  };

  exports.index = index;

  exports.signin = signin;

  exports.sendRepair = sendRepair;

  exports.sendTextRepair = sendTextRepair;

  exports.edh = edh;

}).call(this);
