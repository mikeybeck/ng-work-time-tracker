(function(){
  'use strict';

  angular
    .module('workTimeTracker.components.main', [
      'workTimeTracker.services.activities'
    ])
    .controller('MainCtrl', MainCtrl)
    .config(mainRouteConfig);

  mainRouteConfig.$inject = ['$routeProvider'];
  function mainRouteConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/components/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      });
  }

  MainCtrl.$inject = ['activitiesService'];
  function MainCtrl(activitiesService) {
    var vm = this;

    vm.activities = null;

    //vm.activities = localStorage.getItem('activities');
    vm.setActive = activitiesService.setActive;
    vm.isActive = isActive;
    vm.hasActive = hasActive;
    vm.getDurationOfActiveActivity = getDurationOfActiveActivity;

    

    activate();

    //////////

    function activate () {
      vm.activities = activitiesService.getAll();
    }

    function isActive (activity) {
      return activitiesService.getActive() === activity;
    }

    function hasActive () {
      return !!activitiesService.getActive();
    }

    function getDurationOfActiveActivity() {
      
        var duration = activitiesService.getActive().getDuration();

        localStorage && localStorage.setItem('duration', duration);
        localStorage && localStorage.setItem(activitiesService.getActive().name, duration); // Update localStorage with duration of current activity
        
        return duration
    }
  }
}());
