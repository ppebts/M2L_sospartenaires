angular.module('sos.controllers', [])

      .run(function($rootScope) {
          $rootScope.sportAvailable = [{sport : "Tennis"},{ sport : "Football"},{ sport : "Badminton"},{ sport : "Rugby"},{ sport : "Handball"}];
          $rootScope.niveauAvailable = [{niveau : "Débutant"},{ niveau : "Intermédiaire"}, { niveau : "Expert"}];
      })

      .controller('menuCtrl', function($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
          $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
          $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
          console.log('Doing login', $scope.loginData);

          // Simulate a login delay. Remove this and replace with your login
          // code if using a login system
          $timeout(function() {
            $scope.closeLogin();
          }, 1000);
        };
      })

      .controller('listeAnnonceCtrl', function($scope, $http, $ionicLoading) {

          $scope.show = function() {
            $ionicLoading.show({
              template: 'Mise à jour...'
            });

            var data_r = {reload : 1};

            $http({
              method : 'post',
              // url : "http://10.10.2.45/ppe-m2l-fm/signup.php",
              url : "http://bmagne.hostoi.com/signup.php",
              data : data_r,
              headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
              dataType : 'json'
              // "http://localhost:8888/M2L_sospartenaires/www/js/signup.php",
            }).success(function (data) {

              $scope.annonceListe = data;
              $ionicLoading.hide();
          
            }).error(function (data, status) {

                alert('erreur' + data);
               $ionicLoading.hide();

            });

          };

          $scope.doRefresh = function(){

              var data_r = {reload : 1};

                $http({
                  method : 'post',
                  // url : "http://10.10.2.45/ppe-m2l-fm/signup.php",
                  url : "http://bmagne.hostoi.com/signup.php",
                  data : data_r,
                  headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
                  dataType : 'json'
                  // "http://localhost:8888/M2L_sospartenaires/www/js/signup.php",
                }).success(function (data) {

                  $scope.annonceListe = data;

                }).error(function (data, status) {

                    alert('erreur' + data);

                }).finally(function(){

                  $scope.$broadcast('scroll.refreshComplete');
                  $scope.$apply();

                });
            }
    })

      .controller('ajoutAnnonceCtrl', function($scope, $http) {

          $scope.addAnnonce = function(sport_data, niveau_data, date_data){

            var data_q = {
              sport : sport_data.sport,
              niveau : niveau_data.niveau,
              date : date_data
            };

            $http({ 
                method : 'post',
               // url : "http://10.10.2.45/ppe-m2l-fm/signup.php",
               url : "http://bmagne.hostoi.com/signup.php",
                data : data_q,
                headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
                dataType : 'json'
                // "http://localhost:8888/M2L_sospartenaires/www/js/signup.php",
              }).success(function (data) {

                    window.location.reload();

              }).error(function (data, status) {

                alert('L\'application n\'a pas pu mettre à jour le contenu' + data);

              });
                          
          };

      })

      .controller('inscriptionCtrl', function($scope, $http) {

          
          

      });
