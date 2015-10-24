angular.module('workTimeTrackerApp').factory('activities', ['flipClock', '$rootScope', '$interval', 'Calculate', function(flipClock, $rootScope, $interval, Calculate) {
  var activities = [],
      intervalPromise;

  activities.getSumOfDurations = function() {
    return this.reduce(function(mem, act) {
      return mem + act.duration;
    }, 0);
  };


  var Activity = function(name, color, duration, times) {
    this.name = name;
    this.color = color;
    this.duration = duration || 0;
    this.times = times;
  };

  Activity.prototype.getDurationInPct = function() {
    return (this.duration / activities.getSumOfDurations()) * 100;
  };

  /*
  activities.push(new Activity('Working',     'default',  60*350));
  activities.push(new Activity('Eating',      'primary',  60*40 ));
  activities.push(new Activity('Rest',        'info',     60*50 ));
  activities.push(new Activity('Web surfing', 'success',  60*100));
  activities.push(new Activity('Off-topic',   'warning',  60*45 ));
  activities.push(new Activity('Consulting',  'danger',   60*140));
  activities.push(new Activity('Goofing off', 'success',  60*140));
  */

    // Get activities from LS not already named & push as above
  for (var key in localStorage) {
      var color = JSON.parse(localStorage.getItem(key)).color;
      var lsDuration = parseInt(JSON.parse(localStorage.getItem(key)).duration);  // Simple time persistence using localStorage.  Get time
      var times = JSON.parse(localStorage.getItem(key)).times;
      //times = { "date": "x" };
      if (!times) {
          times = [{ "S": new Date(), "E": new Date() }];
      }
      if (isNaN(lsDuration)) {
          lsDuration = 0;
          localStorage.setItem(key, JSON.stringify({ "name": key, "color": color, "duration": "0", "times": [{ "S": new Date(), "E": new Date() }] }));
      }

      //Calculate total duration of activity from end times - start times
      //(This is more accurate than the current method of calculating duration, which is pretty terrible)
      var totalDurationMS = Calculate.duration(times);

      lsDuration = Math.round(totalDurationMS/1000);

      activities.push(new Activity(key, color, lsDuration, times));
  }
  

  return {
    getAll: function() {
      activities
        .filter(function(activity) { return !activity.name; })
        .forEach(this.remove);

      return activities;
    },

    remove: function(activity) {
      var index = activities.indexOf(activity);
      if (index > -1) {
          activities.splice(index, 1);
      }
      console.log(activity);
      localStorage.removeItem(activity.name);
    },

    addNew: function (name, color) {
        var activity = new Activity(name, color);
        activities.push(activity);
    },

    setActive: function(activity) {
        $rootScope.currentActivity = activity;

        //activity.times[activity.times.length - 1].E = new Date();
        var times = activity.times;
        if (typeof (times) === 'undefined') { //New entry
            times = [];
            times.push({ "S": new Date(), "E": new Date() });
        } else if (typeof (times[times.length - 1]) != 'undefined') { //End time should be entered, need to make new entry in times array
            //console.log(times[times.length - 1].E);
            times.push({ "S": new Date(), "E": new Date() });
        }
        activity.times = times;

      flipClock.restart(0);

      if (intervalPromise) {
        $interval.cancel(intervalPromise);
        intervalPromise = null;
      }

      intervalPromise = $interval(function () {
        activity.duration += 1;
        // Update end time, start time stays the same
        // -Get last item in activity.times array and update end time
        activity.times[activity.times.length - 1].E = new Date(); //Update end time
        
        localStorage.setItem(activity.name, JSON.stringify({
            "name": activity.name,
            "color": activity.color,
            "duration": parseInt(activity.duration, 10),
            "times": activity.times
        }));
      }, 1000);
    }
  };
}]);



/* These are notes - Thinking out loud
//var datex = {x, y};

var userObject = { userId: 24, name: 'Jack Bauer', date: { x : 'y' } };

localStorage.setItem('user', userObject);

//userObject = localStorage.getItem('user');

console.log(userObject);
*/