angular.module('workTimeTrackerApp').controller('DataCtrl', ['$scope', 'activities', function ($scope, activities) {
  $scope.activities = activities.getAll();
  $scope.today = new Date();
}]);
