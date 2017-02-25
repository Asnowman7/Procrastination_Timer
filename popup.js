// Procrastination Timer popup.js file
// Coded by Alex Snow :3
// Handles stopWatch, manipulation of alarms, and main run() function

var timeElapsed = 0;
// time elapsed in seconds

var stopWatch = {
    seconds: timeElapsed % 60,
    minutes: (timeElapsed / 60) % 60,
    hours: ((timeElapsed / 60) / 24)
};


var alarms = [
    // [days, hours, minutes, seconds]
    [0, 0, 30], [0, 1, 0]
    [0, 1, 30], [0, 2, 0]
];

/**
 * @param {object(array)} alarmTime - A list of integers with form,
 *   [days, hours, minutes, seconds]
 */
function removeAlarm(alarmTime) {
    // Searches through alarms array to find and remove input alarm Time.
    // Alerts error message if input alarm time isn't in alarms array.
    var index = alarms.indexOf(alarmTime);
    if (index > -1) {
        blackList.splice(index, 1);
    } else {
        alert("Failed to find alarm time. Please try again.")
    }
}

/**
 * @param {object(array)} alarmTime - A list of integers with form,
 *   [days, hours, minutes, seconds]
 */
function addAlarm(alarmTime) {
    // Appends alarm time into alarms array.
    alarms.push(alarmTime);
}

/**
 * @param {object(stopWatch)} stopWatch - A "clock" object that contains variables to record seconds,
 *   minutes, hours, and days.
 */
function myTimer(stopWatch) {
    // Increments seconds variable by 1
    timeElapsed++;
    var currentTime = [stopWatch.hours, stopWatch.minutes, stopWatch.seconds];
    var index = alarms.indexOf(currentTime);
    // Prints alert message if stopWatch reaches an alarm
    if (index > -1) {
        alert("You have been procrastinating for: " + currentTime[0] + " hour(s), " 
              + currentTime[1]+ " minute(s), and " + currentTime[2] + " second(s) :(");
    }
}

// run() function while loop condition
var y = true;

function stopWatchSwitch() {
    // Allows the user to manually stop the clock and exit run()'s infinite loop
    // if the stopWatch is on, and turn it back on when its off.
    if (y == true) {
        y == false;
    } else {
        y == true;
        run();
    }
}

function run() {
    // Designed to run continuously while browsing the web, starting a stop watch
    // if your current tab is one that has been labeled a "procrastination site",
    // and stops the stop watch if you change your current tab to a non-blackListed one.
    var procrastinating = false;
    while (y == true) {
        // grab the url of the current tab
        var currentURL = chrome.extension.getBackgroundPage().getCurrentTabUrl(function (url) {
            for (i = 0; i < chrome.extension.getBackgroundPage().blackList.length; i++) {
                var temp = currentURL.IndexOf(chrome.extension.getBackgroundPage().blackList[i]);
                if (temp >= 0) {
                    // searching if currentURL is blackListed or not
                    procrastinating = true;
                } else {
                    procrastinating = false;
                }
            }
        })
        if (procrastinating) {
            //if procrastinating, start the clock!
            var x = setInterval(myTimer, 1000);
        } else {
            //if not, stop it.
            clearInterval(x);
        }
    }
}


// executing run
run();