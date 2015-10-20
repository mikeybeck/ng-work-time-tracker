angular.module('workTimeTrackerApp')
  .filter('datesData', function ($sce) {
      return function (input) {
          // input is (or should be) array of start & end times, 
          // e.g. [{"S":"2015-10-20T04:11:27.446Z","E":"2015-10-20T04:16:31.486Z"},{"S":"2015-10-20T04:18:05.535Z","E":"2015-10-20T04:19:12.545Z"}]
          // If input is not an array in correct format, return input
          if ((Object.prototype.toString.call(input) !== '[object Array]') || (!input[0].S) || (!input[0].E)) { // Very basic checking. Should be good enough for now
              console.error('Data passed to datesData filter not in correct format. Input will be returned unfiltered.')
              return input;
          }
          // Loop through input array, display start & end times of each period (concatenated and returned as a string)
          var output = '';
          for (var i = 0; i < input.length; i++) {
              console.log(input[i].S);
              var startTime = new Date(input[i].S);
              var startDay = startTime.getDate();
              var startMonth = startTime.getMonth();
              var startYear = startTime.getFullYear();
              var startHour = startTime.getHours();
              var startMin = startTime.getMinutes();
              if (startMin < 10) {
                  startMin = "0" + startMin;
              }
              var startAMPM = startHour < 12 ? "AM" : "PM";

              var endTime = new Date(input[i].E);
              var endDay = endTime.getDate();
              var endMonth = endTime.getMonth();
              var endYear = endTime.getFullYear();
              var endHour = endTime.getHours();
              var endMin = endTime.getMinutes();
              if (endMin < 10) {
                  endMin = "0" + endMin;
              }
              var endAMPM = endHour < 12 ? "AM" : "PM";

              output = output + '<br>'+ startDay + '/' + startMonth + '/' + startYear + ' ' + startHour + ':' + startMin + startAMPM + ' - ' + endHour + ':' + endMin + endAMPM;
          }//13/10/2015 02:35PM - 03:15PM (0:40) 
          return $sce.trustAsHtml(output);
      };
  });

angular.module('workTimeTrackerApp')
    .filter('trust', ['$sce', function ($sce) {
        return function (value, type) {
            console.log('sddsdsffds');
        return $sce.trustAs(type || 'html', value);
    }
}]);