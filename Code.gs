/**
 * 學習歷程自述學習單：收件程式（Google Apps Script）
 * 用法：在 Google 試算表中「擴充功能 > Apps Script」，貼上這段程式並部署成「網頁應用程式」。
 * 學生每次繳交會寫進「繳交」工作表；同一位學生（班級＋座號＋姓名相同）再次繳交時，會更新原本那一列。
 */
var SHEET_NAME = "繳交";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    var secs = d.sections || [];
    var head = ["繳交時間", "班級", "座號", "姓名", "想申請的校系", "完成度(%)"]
      .concat(secs.map(function (s) { return s[0]; }))
      .concat(["原始資料"]);
    if (sh.getLastRow() === 0) {
      sh.appendRow(head);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, head.length).setFontWeight("bold");
    }
    var row = [new Date(d.submittedAt || Date.now()), String(d.cls || ""), String(d.seat || ""), String(d.name || ""), String(d.dept || ""), Number(d.progress) || 0]
      .concat(secs.map(function (s) { return String(s[1] || ""); }))
      .concat([JSON.stringify(d.fields || {})]);
    // 找同一位學生的舊資料
    var target = 0;
    var n = sh.getLastRow();
    if (n > 1) {
      var keys = sh.getRange(2, 2, n - 1, 3).getValues();
      for (var i = 0; i < keys.length; i++) {
        if (String(keys[i][0]) === row[1] && String(keys[i][1]) === row[2] && String(keys[i][2]) === row[3]) { target = i + 2; break; }
      }
    }
    // 班級、座號以文字儲存，避免 301 變成數字格式或座號前面的 0 消失
    if (target) {
      sh.getRange(target, 2, 1, 2).setNumberFormat("@");
      sh.getRange(target, 1, 1, row.length).setValues([row]);
    } else {
      sh.appendRow(row);
      sh.getRange(sh.getLastRow(), 2, 1, 2).setNumberFormat("@").setValues([[row[1], row[2]]]);
    }
    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error: " + err);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("學習單收件程式運作中。");
}
