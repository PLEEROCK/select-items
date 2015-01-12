'use strict';

/**
 *
 * @author Umed Khudoiberdiev
 */
angular.module('selectTagsInput').factory('SelectedTokensValidator', function() {

    /**
     * @class SelectedTokensValidator
     */
    return function() {

        /**
         * Validation options.
         *
         * @type {{ nameField: string, minLength: number, maxLength: number, maxItems: number }}
         */
        var options;

        /**
         * Sets the options required to perform validation.
         *
         * @param {object} validationOptions
         */
        this.set = function(validationOptions) {
            options = validationOptions;
        };

        /**
         * Determines if value is not unique and cannot be added to
         * the model array.
         *
         * @param {Array.<object>} tokens
         * @param {object} item
         * @returns {boolean}
         */
        this.isUnique = function(tokens, item) {
            var found  = false;
            angular.forEach(tokens, function(token) {
                var tokenName = token[options.nameField];
                if (tokenName && tokenName.toLowerCase() === item[options.nameField].toLowerCase())
                    found = true;
            });

            return found === false;
        };

        /**
         * Checks if item value is not empty.
         *
         * @param {boolean} item
         * @returns {boolean}
         */
        this.isNotEmpty = function(item) {
            return item[options.nameField].length > 0;
        };

        /**
         * Checks if item value is not too short.
         *
         * @param {boolean} item
         * @returns {boolean}
         */
        this.isNotShort = function(item) {
            return angular.isUndefined(options.minLength) || item[options.nameField].length >= options.minLength;
        };

        /**
         * Checks if item value is not too long.
         *
         * @param {boolean} item
         * @returns {boolean}
         */
        this.isNotLong = function(item) {
            return angular.isUndefined(options.maxLength) || item[options.nameField].length <= options.maxLength;
        };

        /**
         * Checks if user didn't reach a maximal number of items in the input.
         *
         * @param {number} numberOfTokens
         * @returns {boolean}
         */
        this.isNotMaxAllowed = function(numberOfTokens) {
            return angular.isUndefined(options.maxItems) || numberOfTokens < options.maxItems;
        };

        /**
         * Determines if value can be added to the model array or not.
         *
         * @param {Array.<object>} tokens
         * @param {object} item
         * @returns {boolean}
         */
        this.canItemBeAdded = function(tokens, item) {
            return  this.isNotEmpty(item) &&
                    this.isUnique(tokens, item) &&
                    this.isNotShort(item) &&
                    this.isNotLong(item) &&
                    this.isNotMaxAllowed(tokens.length);
        };

    };
});