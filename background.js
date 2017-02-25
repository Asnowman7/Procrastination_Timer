// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Procrastination Timer background.js file
// Coded by Alex Snow :3
// Handles website URL acquisition, verification, and blackList management.
/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function ValidURL(str) {
    // Code copied from function ValidURL(str) obtained from http://forums.devshed.com/javascript-development-115/regexp-match-url-pattern-493764.html
    // Here is the original code:
    var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
      '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
      '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
      '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
      '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
      '(\#[-a-z\d_]*)?$','i'); // fragment locater
    if(!pattern.test(str)) {
        alert("Please enter a valid URL.");
        return false;
    } else {
        return true;
    }
}


/**
 * @param {string} newURL - string of website URL to be blackListed
 */
function blackListSite(newURL) {
    // Appends a new procrastination site to the blackList only if input string
    // is a valid URL.
    if (ValidURL(newURL)) {
        blackList.push(newURL);
    } else {
        alert("Please try again.")
    }
}

/**
 * @param {string} newURL - string of website URL to be removed from blackList
 */
function removeBlackListSite(TheURL) {
    // Removes a procrastination site from the blackList
    // Alerts error message if input URL string not in blackList
    var index = blackList.indexOf(TheURL);
    if (index > -1) {
        blackList.splice(index, 1);
    } else {
        alert("Failed to find blackListed site. Please try again.")
    }
}

// blackList - Array of strings of procrastination site URLs
var blackList = ["https://www.youtube.com/", "https://twitter.com/", "https://www.netflix.com/",
                 "https://www.twitch.tv/", "https://www.facebook.com/", "https://www.instagram.com/"]

