
angular.module('workTimeTrackerApp').factory('Calculate', function () {
    return {
        //Calculate duration from sum of end times - start times.
        //times parameter is array of objects with start (S) & end (E) times
        duration: function (times) {
            var startTotal = new Date(0).getTime();
            var endTotal = new Date(0).getTime();
            for (var i = 0; i < times.length; i++) {
                startTotal += new Date(times[i].S).getTime();
                endTotal += new Date(times[i].E).getTime();
            }
            return endTotal - startTotal;
        }
    }
    //return;
});
