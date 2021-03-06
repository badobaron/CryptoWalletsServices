﻿'use strict';

angular.module('crypto.controllers')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			$stateProvider
				.state('crypto.navigation.getCertificates', {
					url: '/getCertificates',
					templateUrl: 'app/components/get-certificates/get-certificates.html',
					controller: 'GetCertificatesController'
				});
		}
	])
	.controller('GetCertificatesController', [
		'$scope', '$state', 'toastr', 'C1Service',
		function ($scope, $state, toastr, C1Service) {
			$scope.parameters = {
				msisdn: '79584066545'
			};
			$scope.transaction = {};
			$scope.transactionId = null;
			$scope.doTest = doTest;
			$scope.getTransactionInfo = getTransactionInfo;

			////////////////////////////////

			function doTest() {
				$scope.transactionId = null;
				C1Service.getCertificates($scope.parameters).$promise
					.then(function (data) {
						$scope.transactionId = data.transactionGuid;
						getTransactionInfo();
					})
					.catch(function (error) {
						toastr.error(error && error.data && error.data.message, 'Ошибка');
					});
			}

			function getTransactionInfo() {
				C1Service.getTransactionInfo({transactionId: $scope.transactionId}).$promise
					.then(function (data) {
						$scope.transaction = data;
					})
					.catch(function (error) {
						toastr.error(error && error.data && error.data.message, 'Ошибка');
					});
			};
		}
	]);