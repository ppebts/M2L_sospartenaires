angular.module('sos.controllers', [])

      .run(function($rootScope) {
          $rootScope.sportAvailable = [{sport : "Tennis", id : "1"},{ sport : "Football", id : "2"},{ sport : "Badminton", id : "3"},{ sport : "Rugby", id : "4"},{ sport : "Handball", id : "5"}];
          $rootScope.niveauAvailable = [{niveau : "Débutant", id : "1"},{ niveau : "Intermédiaire", id : "2"}, { niveau : "Expert", id : "3"}];
      })

      .controller('menuCtrl', function($scope){

      })

      .controller('loginCtrl', function($scope, $ionicModal) {
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

        };
      })

      .controller('listeAnnonceCtrl', function($scope, $http, $ionicLoading) {

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

                alert('erreur : ' + data);
               $ionicLoading.hide();

            });

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

                    alert('erreur : ' + data);

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

                    window.location.href = '#/app/annonces';
                    alert('Annonce ajoutée !');

              }).error(function (data, status) {

                alert('L\'application n\'a pas pu mettre à jour le contenu' + data);

              });
                          
          };

      })

      .controller('inscriptionCtrl', function($scope, $ionicModal, $http) {

                // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/inscription.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeInscription = function() {
          $scope.modal.hide();
        };

        // Open the login modal
        $scope.inscription = function() {
          $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doInscription = function(email, password, nom, prenom, age, ville, sportFav, niveau) {

           var data_q = {
              email : email,
              password : password,
              nom : nom,
              prenom : prenom,
              age : age,
              ville : ville,
              sportFav : sportFav,
              niveau : niveau
            };

            console.log(data_q);

            $http({ 
                method : 'post',
               // url : "http://10.10.2.45/ppe-m2l-fm/signup.php",
               url : "http://bmagne.hostoi.com/inscription.php",
                data : data_q,
                headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
                dataType : 'json'
                // "http://localhost:8888/M2L_sospartenaires/www/js/signup.php",
              }).success(function (data) {

                    window.location.href = '#/app/annonces';
                    alert('Bien inscrit ! Vous pouvez vous connecter.');

              }).error(function (data, status) {

                alert('L\'application n\'a pas pu mettre à jour le contenu : ' + data);

              });

        };

      });
