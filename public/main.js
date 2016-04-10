angular.module('foodie', []);  

function mainController($scope, $location, $http) {  

	var url = $location.$$absUrl.split("/");

	$scope.recipe_id = url[3];
	$scope.show_recipe = false;	

    $http.get('/api/recipe/' + $scope.recipe_id)
        .success(function(data) {
            $scope.recipe = data;
            //console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

        
       	if($scope.recipe)$scope.show_recipe = true;

        console.log('SHOW RECIPE: ' + $scope.show_recipe);
}
