angular.module('sos.controllers', [])

      .run(function($rootScope) {
          $rootScope.sportAvailable = [{sport : "Tennis", id : "1"},{ sport : "Football", id : "2"},{ sport : "VTT", id : "3"},{ sport : "PingPong", id : "4"},{ sport : "Golf", id : "5"}];
          $rootScope.niveauAvailable = [{niveau : "Débutant", id : "1"},{ niveau : "Intermédiaire", id : "2"}, { niveau : "Expert", id : "3"}];
      })

      .controller('menuCtrl', function($scope){

      })

      .controller('loginCtrl', function($scope, $ionicModal, $http, $ionicLoading) {
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
        $scope.doLogin = function(email_data, password_data) {

            $ionicLoading.show({
              template: 'Connexion...'
            });

            if (typeof email_data != 'undefined' && typeof password_data != 'undefined') {

              var data_log = {"email" : email_data, "password" : password_data};

              console.log(data_log);

              $http({
                  method : 'post',
                  // url : "http://10.10.2.45/ppe-m2l-fm/signup.php",
                  url : "http://localhost:8888/rest/login",
                  // url : "http://bmagne.hostoi.com/annonceAjout.php",
                  data : data_log,
                  headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
                  dataType : 'json'
              }).success(function (data) {

                console.log(data);

                window.location.href = '#/app/profil';

                // alert('Bonjour ' + user.user_first_name + ' ' + user.user_last_name +'. Vous Allez être redirigé vers votre profil');
                $ionicLoading.hide();
            
              }).error(function (data, status) {

                console.log(data);
                console.log(status);
                alert('erreur : ' + data + status);
                $ionicLoading.hide();

              });

            }else{

              $ionicLoading.hide();
              alert('Merci de bien remplir les champs');

            }
        };

      })

      .controller('listeAnnonceCtrl', function($scope, $http, $ionicLoading) {

            $ionicLoading.show({
              template: 'Mise à jour...'
            });

            $http({
              method : 'GET',
              // url : "http://10.10.2.45/ppe-m2l-fm/signup.php",
              url : "http://bmagne.hostoi.com/annonces",
              // url : "http://localhost:8888/rest/annonces",
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


                $http({
                  method : 'GET',
                  // url : "http://10.10.2.45/ppe-m2l-fm/signup.php",
                  url : "http://bmagne.hostoi.com/annonces",
                   // url : "http://localhost:8888/rest/annonces",
                  headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
                  dataType : 'json'
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
    
      .controller('annonceDetailCtrl', function($scope, $http, $stateParams, $ionicLoading){

              $ionicLoading.show({
                template: 'Mise à jour...'
              });

              var data_r = {id : $stateParams.id};

              $http({
                method : 'POST',
                // url : "http://10.10.2.45/ppe-m2l-fm/signup.php",
                // url : "http://bmagne.hostoi.com/annonceDetail.php",
                  url : "http://bmagne.hostoi.com/annonces",
                data : data_r,
                headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
                dataType : 'json'
              }).success(function (data) {

                $scope.annonceDetail = data;
                $ionicLoading.hide();

              }).error(function (data, status) {

                  alert('erreur : ' + data);
                  $ionicLoading.hide();

              });

      })

      .controller('ajoutAnnonceCtrl', function($scope, $http) {

          $scope.addAnnonce = function(titre_data, description_data, sport_data, niveau_data, date_data){

            var data_q = { 
              titre : titre_data,
              description : description_data, 
              sport : sport_data['id'],
              niveau : niveau_data['id'],
              date : date_data
            };

            $http({ 
                method : 'post',
               // url : "http://10.10.2.45/ppe-m2l-fm/signup.php",
               url : "http://bmagne.hostoi.com/annonceAjout.php",
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
