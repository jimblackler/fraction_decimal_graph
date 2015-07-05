"use strict";
// http://www.netlobo.com/url_query_string_javascript.html
function gup(name, _default) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(location.href);
  return results == null ? _default : results[1];
}