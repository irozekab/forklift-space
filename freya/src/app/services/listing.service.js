angular.module('app').service('ListingService', ListingService);
/** @ngInject */
function ListingService($http, toaster) {
    const vm = this;
    vm.browseListings = browseListings;
    vm.readListing = readListing;
    vm.editListing = editListing;
    vm.addListing = addListing;
    vm.deleteListing = deleteListing;
    vm.publishListing = publishListing;
    vm.unpublishListing = unpublishListing;
    vm.soldListing = soldListing;
    vm.unsoldListing = unsoldListing;
    vm.filterOptions = require('../utils/listingFilterOptions');
    vm.fields = require('../utils/listingFields');

    function browseListings(params) {
        return $http({
            method: 'GET',
            url: '/api/listings',
            params,
        }).then((response) => {
            return response.data;
        }, (response) => {
            toaster.pop('error', response.status + ': ' + response.statusText, 'Please refresh the page or try again later.');
            throw response;
        });
    }

    function readListing(id) {
        return $http({
            method: 'GET',
            url: '/api/listings/' + id,
        }).then((response) => {
            return response.data;
        }, (response) => {
            toaster.pop('error', response.status + ': ' + response.statusText, 'Please refresh the page or try again later.');
            throw response;
        });
    }

    function editListing(id, listing) {
        listing.isDeleted = false;
        return $http({
            method: 'PATCH',
            url: '/api/listings/' + id,
            data: listing,
        }).then((response) => {
            toaster.pop('success', '', 'Listing has been updated.');
            return response.data;
        }, (response) => {
            toaster.pop('error', response.status + ': ' + response.statusText, 'Please refresh the page or try again later.');
            throw response;
        });
    }

    function addListing(listing) {
        return $http({
            method: 'POST',
            url: '/api/listings',
            data: listing,
        }).then((response) => {
            toaster.pop('success', '', 'Listing has been created.');
            return response.data;
        }, (response) => {
            toaster.pop('error', response.status + ': ' + response.statusText, 'Please refresh the page or try again later.');
            throw response;
        });
    }

    function deleteListing(id) {
        return $http({
            method: 'DELETE',
            url: '/api/listings/' + id,
        }).then((response) => {
            toaster.pop('success', '', 'Listing has been deleted.');
            return response.data;
        }, (response) => {
            toaster.pop('error', response.status + ': ' + response.statusText, 'Please refresh the page or try again later.');
            throw response;
        });
    }

    function publishListing(id, listing) {
        listing = listing ? listing : {};
        listing.isPublished = true;
        return editListing(id, listing);
    }

    function unpublishListing(id, listing) {
        listing = listing ? listing : {};
        listing.isPublished = false;
        return editListing(id, listing);
    }

    function soldListing(id, listing) {
        listing = listing ? listing : {};
        listing.isSold = true;
        return editListing(id, listing);
    }

    function unsoldListing(id, listing) {
        listing = listing ? listing : {};
        listing.isSold = false;
        return editListing(id, listing);
    }
}