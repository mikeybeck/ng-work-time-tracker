angular.module('workTimeTrackerApp').controller('SettingsCtrl', ['$scope', 'activities', function ($scope, activities) {
  $scope.activities = activities.getAll();

  $scope.availableCssClasses = ['default', 'primary', 'info', 'success', 'warning', 'danger'];

  $scope.removeActiviry = function(activity) {
    activities.remove(activity);
  };

  $scope.addNew = function () {
      //localStorage.setItem(name, 0);
      //var activity = [];
      //names[0] = prompt("New member name?");
      //localStorage[name] = JSON.stringify(activity);

    activities.addNew('', 'default');
  };
}]);
