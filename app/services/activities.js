angular.module('workTimeTrackerApp').factory('activities', ['flipClock', '$rootScope', '$interval', function(flipClock, $rootScope, $interval) {
  var activities = [],
      intervalPromise;

  activities.getSumOfDurations = function() {
    return this.reduce(function(mem, act) {
      return mem + act.duration;
    }, 0);
  };


  var Activity = function(name, color, duration) {
    this.name = name;
    this.color = color;
    this.duration = duration || 0;
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

      if (isNaN(lsDuration)) {
          lsDuration = 0;
          localStorage.setItem(this.name, JSON.stringify({ "name": this.name, "color": this.color, "duration": "0" }));
      }

      activities.push(new Activity(key, color, lsDuration));
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
    },

    addNew: function (name, color) {
        var activity = new Activity(name, color);
        activities.push(activity);
    },

    setActive: function(activity) {
      $rootScope.currentActivity = activity;

      flipClock.restart(0);

      if (intervalPromise) {
        $interval.cancel(intervalPromise);
        intervalPromise = null;
      }

      intervalPromise = $interval(function () {
        activity.duration += 1;
        localStorage.setItem(activity.name, JSON.stringify({ "name": activity.name, "color": activity.color, "duration": parseInt(activity.duration, 10) }));
      }, 1000);
    }
  };
}]);
