/**               Login To School Site           **/
/**   =========================================  **/

/**   Published by Subigya Nepal on 09/08/2014    **/
/**          For Deerwalkers Batch 2017.          **/

/** V1.0 **/

function loginToSchoolSite(){
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Login');
  var url = "http://school.dwit.edu.np/login/index.php";
  var payload = {
    "username":ss.getRange('A2').getValue(),
    "password":ss.getRange('B2').getValue()
  }; 
  var opt = {
    "payload":payload,
    "method":"post",
    "followRedirects" : false
  };
  var response = UrlFetchApp.fetch(encodeURI(url),opt);
  if ( response.getResponseCode() == 200 ) {
    var result = "Couldn't login. Please make sure your username/password is correct.";
  } 
  else if ( response.getResponseCode() == 303 ) {
     var result = "Logged in successfully";
     var cookie = response.getAllHeaders()['Set-Cookie'];     
     var header = {
       'Cookie':cookie[1]
     };
     var opt2 = {
       "headers":header
     };
    var data = UrlFetchApp.fetch("http://school.dwit.edu.np/course/view.php?id=8",opt2);
    var verification = data.getContentText();
    if (verification.indexOf("lab") > -1) {
       var result = result + " and verified the login as well. Cheers!";
     }
     else { var result = result + ". But, verification failed. Contact the author.";
   }
  }
  if (ss.getRange('D2').getValue() == 'Y' || ss.getRange('D2').getValue=='y'){
    MailApp.sendEmail(ss.getRange('C2').getValue(), "SchoolSite Login: " + (result.indexOf("correct")>-1? "Failed" : "Success"), result);
  }
}

/** Twitter: @SkNepal **/