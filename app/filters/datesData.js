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
              //console.log(input[i].S);
              var startTime = new Date(input[i].S);
              var startDay = startTime.getDate();
              var startMonth = startTime.getMonth();
              var startYear = startTime.getFullYear();
              var startHour = startTime.getHours();
              var startMin = startTime.getMinutes();

              if (startMonth < 10) {
                  startMonth = "0" + startMonth;
              }

              var startAMPM = "AM";
              if (startHour > 12) {
                  startHour = startHour - 12;
                  startAMPM = "PM";
              }
              if (startHour < 10) {
                  startHour = "0" + startHour;
              }
              if (startMin < 10) {
                  startMin = "0" + startMin;
              }

              var endTime = new Date(input[i].E);
              var endDay = endTime.getDate();
              var endMonth = endTime.getMonth();
              var endYear = endTime.getFullYear();
              var endHour = endTime.getHours();
              var endMin = endTime.getMinutes();

              if (endMonth < 10) {
                  endMonth = "0" + endMonth;
              }

              var endAMPM = "AM";
              if (endHour > 12) {
                  endHour = endHour - 12;
                  endAMPM = "PM";
              }
              if (endHour < 10) {
                  endHour = "0" + endHour;
              }
              if (endMin < 10) {
                  endMin = "0" + endMin;
              }

              var durationMS = (endTime - startTime);
              var digitalDuration = convertMSToDigital(durationMS);

              //output e.g: 13/10/2015 02:35PM - 03:15PM (0:40) 
              output = output + '<br>'+ startDay + '/' + startMonth + '/' + startYear + ' ' + startHour + ':' + startMin + startAMPM + ' - ' + endHour + ':' + endMin + endAMPM + ' (' + digitalDuration.clock + ')';
          }   
          return $sce.trustAsHtml(output);
      };

      // CONVERT MILLISECONDS TO DIGITAL CLOCK FORMAT
      function convertMSToDigital(ms) {
          hours = Math.floor(ms / 3600000), // 1 Hour = 36000 Milliseconds
          minutes = Math.floor((ms % 3600000) / 60000), // 1 Minutes = 60000 Milliseconds
          seconds = Math.floor(((ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds
          if (hours < 10) {
              hours = "0" + hours;
          }
          if (minutes < 10) {
              minutes = "0" + minutes;
          }
          return {
              hours: hours,
              minutes: minutes,
              seconds: seconds,
              clock: hours + ":" + minutes
          };
      }

  });

angular.module('workTimeTrackerApp')
    .filter('trust', ['$sce', function ($sce) {
        return function (value, type) {
        return $sce.trustAs(type || 'html', value);
    }
}]);