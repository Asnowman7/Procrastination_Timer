===============Procrastination Timer===============
Version: 0.6
---------
SYNOPSIS
---------
This is a small chrome extension made to record the amount of time a user spends 
on the websites they commonly use to procrastinate. 

------------
INSTALLATION
------------
I plan to publish this extension to the chrome web store once it has reached a serviceable
state of use, but for right now you can git pull the project into a specific directory and
install it by traveling to the "Extensions" tab of Chrome's settings, clicking the "Load
unpacked extension" button and selecting the specific directory.

-------
DESIGN 
-------
This project contains:
	background.js		 icon.png
	popup.js		 popup.html
	manifest.json		 README.md

Background.js primarily handles all functions pretaining to manipulation of blackList,
an array of strings of website URLs that's constantly looped through while the extension
is running unless the loop is manually broken (explanation in discussion of popup.js). 
Both an append and removal function, blackListSite() and removeBlackListSite() have been
created to more easily manipulate blackList. Google's example extension code's getCurrentTabUrl()
is used to acquire the current tab's url as a string and a ValidURL() function to properly provide
error messages during function failed cases where a user does not pass a valid url to 
blackListSite(), for example.

Popup.js contains the functions and variables pretaining to the stop watch and manipulation
of various alarm times, as well as run(), which executes the extensions purpose. A stopWatch
object, containing seconds, minutes, and hours attributes, keeps track of how much time has
spent procrastinating. These attributes are calculated from the variable timeElapsed, which
is incremented in myTimer(). The alarm times are stored in an alarms array of arrays, which 
can manipulated via addAlarm() and removeAlarm(). myTimer() increments timeElapsed and checks
whether stopWatch has reached an alarm, and will print an alert message if so, stating the length
of time procrastinated away. Finally run() checks whether the current tab's url is a "blackListed"
site or a delineation of one, and will set myTimer() to be called after every second has passed
via setInterval() if such is the case or will stop the calls via clearInterval() in a while loop.
This while loop can only be broken if the boolean variable y is false, which can be done by 
executing stopWatchSwitch(), that either changes y from true to false, or changes y from false
to true and calls run() again, functioning as a switch as the name suggests.

Popup.html simply provides the UI for the chrome extension popup, complete with the title of this
extension, the stop Watch, and buttons to add/remove alarms as well as procrastination sites.

-------
AUTHOR
-------
Coded by Alexander Snow :3

--------
LICENSE
--------
Copyright (c) 2013, Google Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    Neither the name of Google Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 

----------------
ACKNOWLEDGEMENTS
----------------
Thank you to Google for GetCurrentTabURL() and devshed user, Kravvitz for his/her
ValidURL() function.