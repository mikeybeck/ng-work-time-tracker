angular.module('workTimeTrackerApp').controller('SettingsCtrl', ['$scope', 'activities', function ($scope, activities) {
  $scope.activities = activities.getAll();

  $scope.availableCssClasses = ['default', 'primary', 'info', 'success', 'warning', 'danger'];

  $scope.removeActiviry = function (activity) {
      if (confirm('Are you sure you want to delete this activity?')) {
          // Delete it!
          $scope.currentActivity = ''; //Not sure if this is the best way to do this but something must be done to prevent resurrection of the activity
          activities.remove(activity);
      } else {
          // Do nothing!
      }
  };

  $scope.addNew = function() {
    activities.addNew('', 'default');
  };
}]);
