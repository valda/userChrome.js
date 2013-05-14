// ==UserScript==
// @name           confirmationToStartUpdate.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    Force Confirmation to Start Update
// @include        chrome://browser/content/aboutDialog.xul
// @compatibility  Firefox 17+
// @author         Alice0775
// @version        2013/04/08 05:00 *
// ==/UserScript==
  gAppUpdater.confirm = function() {
    var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                            .getService(Components.interfaces.nsIPromptService);
    // return is now true if OK was clicked, and false if cancel was clicked
    return prompts.confirm(null, "Confirmation for Start Update", "Updater " + gAppUpdater.update.appVersion + " found, Confirmation to start update, Are you sure?");
  };

  var func = gAppUpdater.updateCheckListener.onCheckComplete.toString();
  func = func.replace(
  'gAppUpdater.startDownload();',
  'if (gAppUpdater.confirm()) $& else {gAppUpdater.selectPanel("updateButtonBox"); window.close(); return;};'
  );
  gAppUpdater.updateCheckListener.onCheckComplete = new Function(
         func.match(/\(([^)]*)/)[1],
         func.replace(/[^{]*\{/, '').replace(/}\s*$/, '')
  );
