angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.checkedList = [];

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};
		
		
		// CREATE CHECKED BOX LIST ==================================================================
		// add a todo to the 'checked' list if it is seleceted.
		
		
		$scope.addToCheckedList = function(todo) {
			if(!todo.selected) {
				$scope.checkedList.push(todo._id);
				console.log($scope.checkedList);
			}
			else {
				$scope.checkedList.splice(todo._id, 1);
				console.log($scope.checkedList);
			}
		}
		
		
		// DELETE ALL ==================================================================
		// delete all todos in the 'checked' list
		
		$scope.deleteAll = function() {
			$scope.loading = true;
			
			console.log("im in delete all");
			
			if(!($scope.checkedList.length === 0)) {
				angular.forEach($scope.checkedList, function(id){
					$scope.deleteTodo(id);
				});
			
				$scope.checkedList = [];
			}
			else {
				console.log("nothing to delete");
				$scope.loading = false;
			}
			
		}
			
		

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;
			console.log("im in the single delete");
			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					console.log("im in success");
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
		
		
	}]);