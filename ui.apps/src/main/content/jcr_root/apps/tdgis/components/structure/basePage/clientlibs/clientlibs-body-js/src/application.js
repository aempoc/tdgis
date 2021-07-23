/*!tdca-pub 2019-12-23 16:19:34 v20.2.1*/
angular.module('tdctRedesign', ['tdct', 'ngCookies', 'ngAria']).config(['$ariaProvider', function($ariaProvider) {
    $ariaProvider.config({
        ariaHidden: false
    });
}]);
angular.module('tdctRedesign')
    .controller('exposedFilterToolController', exposedFilterToolController)
    .controller('ExposedFilterToolV2Controller', ExposedFilterToolV2Controller)
    .controller('filterToolController', filterToolController)
    .controller('NotificationMessageController', NotificationMessageController)
    .controller('ProductCatalogueController', ProductCatalogueController)
    .controller('tdctRedesignController', tdctRedesignController);
exposedFilterToolController.$inject = ['$http', 'factoryFilterTool', 'filtertoolLoad', '$window', '$rootScope', '$location', 'apiFactory', 'filterToolLoadCatagory'];
function exposedFilterToolController($http, factoryFilterTool, filtertoolLoad, $window, $rootScope, $location, apiFactory, filterToolLoadCatagory) {
    "use strict";
    /*jshint validthis: true */
    var vm = this;
    vm.currentSelection = {};
    vm.getJsonFrom = $window.conTextPathVal + '/system/assets/taxonomy/filter-tool.json';
    vm.filterToolType = '';
    vm.filterToolJson = {};
    vm.catagories = [];
    vm.selectedData = {};
    vm.filterToolCategory = filterToolCategory;
    vm.filterToolLogic = filterToolLogic;
    vm.updateModel = updateModel;
    vm.resetModel = resetModel;
    vm.setCatalogueNumber = setCatalogueNumber;
    vm.productId = "";
    vm.checkBoxListData = []
    filterToolLogic();
    function filterToolCategory(filterToolType, catagories) {
        if (catagories != undefined || catagories != null)
            vm.filterToolType = filterToolType;
        vm.catagories = catagories;
    }
    function filterToolLogic() {
        return apiFactory.getHttp(vm.getJsonFrom).then(function successCallback(response) {
            vm.filterToolJson = response.data.category.keywords;
            for (var a = 0; a < vm.filterToolJson.length; a++) {
                if (vm.filterToolJson[a].key == vm.filterToolType) {
                    for (var x = 0; x < vm.filterToolJson[a].keywords.length; x++) {
                        var currentKey = vm.catagories[vm.filterToolJson[a].keywords[x].key];
                        if (undefined != currentKey) {
                            currentKey.keywords = vm.filterToolJson[a].keywords[x].keywords;
                            if (currentKey.type == 'checkbox')
                                for (var y = 0; y < currentKey.keywords.length; y++) {
                                    var currCheckBox = {}
                                    currCheckBox = {
                                        key: currentKey.keywords[y].key,
                                        disable: true
                                    }
                                    vm.checkBoxListData.push(currCheckBox)
                                }
                        }
                    }
                    angular.forEach(vm.catagories, function(value, key) {
                        if (vm.catagories[key].defaultValue != '')
                            vm.currentSelection[key] = vm.catagories[key].defaultValue;
                        else
                            vm.currentSelection[key] = new Array()
                    });
                }
            }
            vm.selectedData = Object.keys(vm.currentSelection).map(function(k) {
                return vm.currentSelection[k]
            });
            factoryFilterTool.setFilterData(vm.selectedData);
            filterToolLoadCatagory.setCatagoryData(vm.checkBoxListData)
            $rootScope.$emit(
                "updateProductCatalogue",
                vm.productId
            );
        }, function errorCallback(response) {
            vm.error = response.error;
        });
    }
    function setCatalogueNumber(id) {
        vm.productId = id;
    }
    function updateModel() {
        vm.selectedData = Object.keys(vm.currentSelection).map(
            function(k) {
                return vm.currentSelection[k];
            }
        );
        factoryFilterTool.setFilterData(vm.selectedData);
        $rootScope.$emit("updateProductCatalogue", vm.productId);
    }
    function resetModel(category) {
        if (category != '' || category != undefined) {
            vm.currentSelection[category] = []
        }
        vm.updateModel()
    }
}
ExposedFilterToolV2Controller.$inject = ['$http', '$window', '$rootScope', '$scope', '$timeout', 'exposedFilterToolV2Factory', 'productCatalogueFactory', 'ExposedFilterToolV2Service', 'ProductCatalogueService'];
function ExposedFilterToolV2Controller($http, $window, $rootScope, $scope, $timeout, exposedFilterToolV2Factory, productCatalogueFactory, ExposedFilterToolV2Service, ProductCatalogueService) {
    vmef = this;
    vmef.cardType = [];
    vmef.cardBenefits = [];
    vmef.filterToolJsonUrl = $window.conTextPathVal + '/system/assets/taxonomy/filter-tool.json';
    vmef.cardTypeIcons = [];
    vmef.cardBenefitsIcons = [];
    vmef.cardTypeButtonType = '';
    vmef.cardBenefitsButtonType = '';
    vmef.catalogueId = 1;
    vmef.grid = '';
    vmef.classificationMap = {};
    var TD_PRODUCT_GRID = angular.element(document).find('.td_rq_product_grid');
    var TD_PROD_SERV_ILLS_GRID = angular.element(document).find('.td-product-service-illustration-grid');
    vmef.initFilterToolData = function(type, properties) {
        vmef.cardTypeIcons = properties.cardType.icons;
        vmef.cardBenefitsIcons = properties.cardBenefits.icons;
        vmef.cardTypeButtonType = properties.cardType.type;
        vmef.cardBenefitsButtonType = properties.cardBenefits.type;
        vmef.grid = ((angular.equals(properties.grid, '') || typeof(properties.grid) === 'undefined') ? vmef.grid : properties.grid);
        vmef.catalogueId = ((angular.equals(properties.catalogueId, '') || typeof(properties.catalogueId) === 'undefined') ? vmef.catalogueId : properties.catalogueId);
        vmef.filterBtnGroup1 = (typeof(properties.cardType.defaultValue) === 'undefined') ? '' : properties.cardType.defaultValue;
        vmef.filterBtnGroup2 = (typeof(properties.cardBenefits.defaultValue) === 'undefined') ? '' : properties.cardBenefits.defaultValue;
        $http.get(vmef.filterToolJsonUrl).then(function successCallback(response) {
            var filterToolJson = response.data.category.keywords;
            for (var i = 0; i < filterToolJson.length; i++) {
                if (filterToolJson[i].key == type) {
                    var cardType = filterToolJson[i].keywords[0];
                    var cardBenefits = filterToolJson[i].keywords[1];
                    vmef.cardType = (typeof(cardType) !== 'undefined') ? filterToolJson[i].keywords[0].keywords : [];
                    vmef.cardBenefits = (typeof(cardBenefits) !== 'undefined') ? filterToolJson[i].keywords[1].keywords : [];
                    exposedFilterToolV2Factory.setFilterData('cardType', vmef.filterBtnGroup1);
                    exposedFilterToolV2Factory.setFilterData('cardBenefits', vmef.filterBtnGroup2);
                    exposedFilterToolV2Factory.setFilterData('catalogueId', vmef.catalogueId);
                    var classification = productCatalogueFactory.getClassification(vmef.catalogueId);
                    ProductCatalogueService.productMappingsfromClassification(classification);
                    if (!angular.equals(vmef.cardBenefits, [])) {
                        ExposedFilterToolV2Service.mapProductClassification(classification);
                        vmef.classificationMap = exposedFilterToolV2Factory.getClassificationMap();
                    }
                    $scope.$emit('UpdateFilterToolSummary', {
                        totalCount: Object.keys(classification).length,
                        grid: vmef.grid
                    });
                    break;
                }
            }
        });
    }
    vmef.updateCardType = function(cardType) {
        hideCatalogueGrids();
        exposedFilterToolV2Factory.setFilterData('cardType', cardType);
        exposedFilterToolV2Factory.setFilterData('cardBenefits', '');
        vmef.filterBtnGroup2 = '';
        $scope.$emit('UpdateFilterToolSummary', {
            totalCount: -1,
            grid: vmef.grid
        });
    }
    vmef.updateCardBenefits = function(cardBenefits) {
        hideCatalogueGrids();
        exposedFilterToolV2Factory.setFilterData('cardBenefits', cardBenefits);
        $scope.$emit('UpdateFilterToolSummary', {
            totalCount: -1,
            grid: vmef.grid
        });
    }
    var hideCatalogueGrids = function() {
        if (TD_PRODUCT_GRID.length && angular.equals(vmef.grid, '.td_rq_product_grid')) {
            TD_PRODUCT_GRID.css('opacity', 0);
        }
        if (TD_PROD_SERV_ILLS_GRID.length && angular.equals(vmef.grid, '.td-product-service-illustration-grid')) {
            TD_PROD_SERV_ILLS_GRID.css('opacity', 0);
        }
    }
    vmef.isDisabled = function(cardBenefits) {
        if (vmef.classificationMap[vmef.filterBtnGroup1].indexOf(cardBenefits) == -1)
            return true;
        return false;
    }
}
filterToolController.$inject = ['$http', 'factoryFilterTool', 'filtertoolLoad', '$window', '$rootScope', '$location', 'apiFactory'];
function filterToolController($http, factoryFilterTool, filtertoolLoad, $window, $rootScope, $location, apiFactory, $timeout) {
    "use strict";
    /*jshint validthis: true */
    var vm = this;
    vm.dynamicDropdownJson = {};
    vm.getJsonFrom = $window.conTextPathVal + '/system/assets/taxonomy/filter-tool.json';
    vm.interActiveValues = $location.search();
    vm.filterToolType = '';
    vm.filterToolDropDownJson = {};
    vm.catagories = {};
    vm.allDropDownData = {};
    vm.filterToolCategory = filterToolCategory;
    vm.filterToolLogic = filterToolLogic;
    vm.changeDropDownData = changeDropDownData;
    vm.setCatalogueNumber = setCatalogueNumber;
    vm.productId = "";
    filterToolLogic();
    function filterToolCategory(filterToolType) {
        vm.filterToolType = filterToolType;
    }
    function filterToolLogic() {
        return apiFactory.getHttp(vm.getJsonFrom).then(function successCallback(response) {
            vm.filterToolDropDownJson = response.data;
            for (var a = 0; a < vm.filterToolDropDownJson.category.keywords.length; a++) {
                if (vm.filterToolDropDownJson.category.keywords[a].key == vm.filterToolType) {
                    vm.catagories = vm.filterToolDropDownJson.category.keywords[a].keywords;
                    angular.forEach(vm.catagories, function(value, key) {
                        if (vm.interActiveValues != '' || vm.interActiveValues != undefined) {
                            if (vm.interActiveValues['ftparm' + (key + 1)] == '' || vm.interActiveValues['ftparm' + (key + 1)] == undefined) {
                                vm.dynamicDropdownJson[vm.catagories[key].key] = vm.catagories[key].keywords[0].key;
                            } else {
                                if (vm.interActiveValues['ftparm' + (key + 1)] > vm.catagories[key].keywords.length) {
                                    vm.dynamicDropdownJson[vm.catagories[key].key] = vm.catagories[key].keywords[0].key;
                                } else {
                                    vm.dynamicDropdownJson[vm.catagories[key].key] = vm.catagories[key].keywords[vm.interActiveValues['ftparm' + (key + 1)]].key;
                                }
                            }
                        } else {
                            vm.dynamicDropdownJson[vm.catagories[key].key] = vm.catagories[key].keywords[0].key;
                        }
                    });
                }
            }
            vm.allDropDownData = Object.keys(vm.dynamicDropdownJson).map(function(k) {
                return vm.dynamicDropdownJson[k]
            });
            factoryFilterTool.setFilterData(vm.allDropDownData);
            $rootScope.$emit("sendDataParentCtrl", vm.productId);
        }, function errorCallback(response) {
            vm.error = response.error;
        });
    }
    function setCatalogueNumber(id) {
        vm.productId = id;
    }
    function changeDropDownData() {
        vm.allDropDownData = Object.keys(vm.dynamicDropdownJson).map(function(k) {
            return vm.dynamicDropdownJson[k]
        });
        factoryFilterTool.setFilterData(vm.allDropDownData);
        $rootScope.$emit("sendDataParentCtrl", vm.productId);
    }
    /**
     * Dynamic secondary filter populate filter tool
     *
     */
    vm.selectedProvince = '';
    vm.populateNextDropdown = populateNextDropdown;
    vm.setDefaultValueNextDropdown = setDefaultValueNextDropdown;
    function populateNextDropdown(key) {
        var provinceKey = vm.dynamicDropdownJson[key];
        var tempJSON = {};
        tempJSON[key] = vm.dynamicDropdownJson[key];
        vm.dynamicDropdownJson = tempJSON;
        setDefaultValueNextDropdown();
        if (provinceKey != 'default.ProvinceList') {
            $rootScope.$emit("changeFilterToolStatus", {});
            var url = $window.conTextPathVal + '/system/assets/json/account_manager/acc_manager_' + provinceKey + '.json';
            return apiFactory.getHttp(url).then(function successCallback(response) {
                var data = (!(response.data.products == '' || typeof(response.data.products) === "undefined")) ? response.data.products : {};
                $rootScope.$emit("sendClassificationParentCtrl", data);
                $timeout(changeDropDownData, 5);
            }, function errorCallback() {
                $rootScope.$emit("sendClassificationParentCtrl", {});
            });
        } else {
            $rootScope.$emit("sendClassificationParentCtrl", 'default');
        }
    }
    function setDefaultValueNextDropdown() {
        var prev_dd_key = Object.keys(vm.dynamicDropdownJson).map(function(k) {
            return vm.dynamicDropdownJson[k]
        });
        angular.forEach(vm.catagories, function(value, key) {
            angular.forEach(value.keywords, function(v, k) {
                if (prev_dd_key == v.key) {
                    vm.selectedProvince = v.keywords;
                    if (typeof v.keywords[0] !== 'undefined') {
                        vm.dynamicDropdownJson['dropdown2'] = v.keywords[0].key;
                    }
                }
            });
        });
    }
}
NotificationMessageController.$inject = ['$http', '$scope'];
function NotificationMessageController($http, $scope) {
    nmvm = this;
    nmvm.smsTextList = {};
    nmvm.setNotificationMsgText = function(msg, id) {
        nmvm.smsTextList[id] = msg;
    }
    nmvm.sendSMS = function(id) {
        var smsText = encodeURI(nmvm.smsTextList[id]);
        var SECTION_ID = angular.element(document).find("#" + id);
        var INPUT_BOX = SECTION_ID.find('input');
        var phoneNumber = INPUT_BOX.val();
        $scope.$emit('UpdateNotificationMsgViewData', {
            phone: phoneNumber
        });
        var SEND_SMS_BUTTON = SECTION_ID.find('button');
        var LEGAL_HEADING = SECTION_ID.find('.legal-heading');
        var MSG_WAIT = SECTION_ID.find('.msg_wait');
        var MSG_RESULT_ERROR = SECTION_ID.find('.msg_result_error');
        var MSG_RESULT_SUCCESS = SECTION_ID.find('.msg_result_success');
        var MSG_WAIT_ALL = angular.element(document).find('.msg_wait');
        var MSG_RESULT_ERROR_ALL = angular.element(document).find('.msg_result_error');
        var MSG_RESULT_SUCCESS_ALL = angular.element(document).find('.msg_result_success');
        var LEGAL_HEADING_ALL = angular.element(document).find('.legal-heading');
        MSG_WAIT_ALL.hide();
        MSG_RESULT_ERROR_ALL.hide();
        MSG_RESULT_SUCCESS_ALL.hide();
        LEGAL_HEADING_ALL.show();
        if (phoneNumber != "" && phoneNumber != null) {
            phoneNumber = phoneNumber.replace(/[( )-]/g, '');
            var data = '{"phone":"' + phoneNumber + '", "msg":"' + smsText + '"}';
            var url = conTextPathVal + '/common/sendSMS/';
            SEND_SMS_BUTTON.addClass('disabled');
            LEGAL_HEADING.hide();
            MSG_WAIT.show().attr('aria-hidden', 'false').focus();
            $http.post(url, data).then(function successCallback(response) {
                var data = response.data;
                SEND_SMS_BUTTON.removeClass('disabled');
                MSG_WAIT.hide().attr('aria-hidden', 'true');
                if (data === 'true') {
                    INPUT_BOX.val('');
                    MSG_RESULT_ERROR.hide().attr('aria-hidden', 'true');
                    MSG_RESULT_SUCCESS.show().attr('aria-hidden', 'false').focus();
                } else {
                    MSG_RESULT_SUCCESS.hide().attr('aria-hidden', 'true');
                    MSG_RESULT_ERROR.show().attr('aria-hidden', 'false').focus();
                }
            });
        }
    }
}
ProductCatalogueController.$inject = ['$rootScope', 'exposedFilterToolV2Factory', 'productCatalogueFactory'];
function ProductCatalogueController($rootScope, exposedFilterToolV2Factory, productCatalogueFactory) {
    vmpc = this;
    vmpc.isSelected = function(index, catId) {
        var isHidden = true;
        var filterData = exposedFilterToolV2Factory.getFilterData();
        var cardType = (typeof(filterData.cardType) === 'undefined') ? '' : filterData.cardType;
        var cardBenefits = (typeof(filterData.cardBenefits) === 'undefined') ? '' : filterData.cardBenefits;
        var catalogueId = ((angular.equals(filterData.catalogueId, '') || typeof(filterData.catalogueId) === 'undefined') ? '1' : filterData.catalogueId);
        if (!angular.equals(cardType, '') && angular.equals(catalogueId, catId)) {
            classification = productCatalogueFactory.getProductMappings();
            return (classification[index].cardType.indexOf(cardType) != -1 && classification[index].cardBenefits.indexOf(cardBenefits) != -1) ? false : true;
        } else {
            isHidden = false;
        }
        return isHidden;
    }
}
tdctRedesignController.$inject = ['$scope', '$rootScope', '$http', '$cookies', '$timeout', '$compile', '$window', '$location', 'factoryFilterTool', 'filtertoolLoad', 'apiFactory', 'filterToolLoadCatagory', 'ProductCatalogueService', 'exposedFilterToolV2Factory'];
function tdctRedesignController($scope, $rootScope, $http, $cookies, $timeout, $compile, $window, $location, factoryFilterTool, filtertoolLoad, apiFactory, filterToolLoadCatagory, ProductCatalogueService, exposedFilterToolV2Factory) {
    var vm = this;
    /* Functions */
    vm.init = init;
    vm.cardClassification = cardClassification;
    vm.cardSelected = cardSelected;
    vm.appendCookie = appendCookie;
    vm.checkRecent = checkRecent;
    vm.removeSelectedProduct = removeSelectedProduct;
    vm.setCard = setCard;
    vm.closeButton = closeButton;
    vm.getRates = getRates;
    /* constants */
    vm.lang = "en";
    vm.classifications = {
        'classifications': []
    };
    vm.productId = "";
    vm.classification = {};
    vm.selectionCriteria = '';
    vm.catalogueLength = '';
    vm.userInit = null;
    vm.getSelectedData = {};
    vm.cardJson = {};
    vm.catalogueLength = 0;
    vm.error = '';
    vm.compareCookies = '';
    vm.selectedCardIds = [];
    vm.selectedCardList = [];
    vm.matchedProducts = [];
    vm.isThreeCardsAvailable = false;
    vm.login = false;
    vm.logout = false;
    vm.mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    vm.provinceData = {};
    vm.provincePlaceholder = "";
    vm.province = "";
    vm.provinceList = [];
    vm.provinceListRight = [];
    vm.provinceListLeft = [];
    vm.radioProvinceMid = 0;
    vm.anonymousUserInCa = false;
    vm.identifiedUserChangeLoc = false;
    vm.identifiedUserOutCa = false;
    vm.authUserNoChangeLoc = false;
    vm.authUserChangeLoc = false;
    vm.authUserOutCa = false;
    var currentURL = window.location.href;
    currentURL = (currentURL.charAt(currentURL.length - 1) == '/') ? currentURL.slice(0, -1) : currentURL;
    vm.isDisabled = false;
    $('#compareTableHeadDefault3').addClass("td-hide-cell");
    $('.compareTableTdDefault3').addClass("td-hide-cell");
    $('#compareTableToggleDefault3').addClass("td-hide-cell");
    $('#compareTableToggleDefaultMobile3').addClass("td-hide-cell");
    vm.filterResultShow = false;
    vm.filterResultWait = false;
    vm.filterNoResult = false;
    vm.filterDefaultState = true;
    vm.isReslRatesDataAvail = false;
    vm.isGicRatesDataAvail = false;
    vm.reslrates = {};
    vm.gicrates = {};
    vm.isEmptyErrorMsg = '';
    vm.timer;
    vm.isCardRemoved = false;
    vm.initCompareTable = true;
    vm.exposedFilterToolSummary = {
        catalogueItemsLength: 0,
        selectedItemsLength: 0
    };
    init();

    /**
     * Update Summary Exposed Filter Tool
     */
    var TD_PRODUCT_GRID = angular.element(document).find('.td_rq_product_grid');
    var TD_CATALOGUE_CARD = angular.element(document).find('.td-catalogue-card');
    var TD_PROD_SERV_ILLS_GRID = angular.element(document).find('.td-product-service-illustration-grid');
    $scope.$on('UpdateFilterToolSummary', function(event, data) {
        var grid = data.grid;
        var totalCount = data.totalCount;
        if (totalCount != -1) {
            vm.exposedFilterToolSummary.catalogueItemsLength = totalCount;
        }
        $timeout(function() {
            if (TD_PRODUCT_GRID.length && angular.equals(grid, '.td_rq_product_grid')) {
                var hiddenCount = angular.element(document).find('.td-catalogue-card.ng-hide').length;
                vm.exposedFilterToolSummary.selectedItemsLength = vm.exposedFilterToolSummary.catalogueItemsLength - hiddenCount;
                TD_CATALOGUE_CARD.tdCatalogueCard({
                    're_render': true
                });
                TD_PRODUCT_GRID.tdProductGrid();
            }
            if (TD_PROD_SERV_ILLS_GRID.length && angular.equals(grid, '.td-product-service-illustration-grid')) {
                var hiddenCount = angular.element(document).find('.td-product-service.ng-hide').length;
                vm.exposedFilterToolSummary.selectedItemsLength = vm.exposedFilterToolSummary.catalogueItemsLength - hiddenCount;
                TD_PROD_SERV_ILLS_GRID.tdProductServiceIllustrationGrid({
                    're_render': true
                });
            }
            TD_PRODUCT_GRID.find(".td-row").animate({
                opacity: 1
            });
            TD_PROD_SERV_ILLS_GRID.find('.td-row').animate({
                opacity: 1
            });
        }, 100);
    });
    /**
     * Compare Modal
     */
    vm.modalContent = [];
    vm.cardList = [];
    var STICKY_DRAWER = angular.element(document).find('.td_rq_compare-sticky-drawer');
    var COMPARE_MODAL = angular.element(document).find('.td_rq_large-modal-overlay').find('.td_rq_compare_modal');
    var COMPARE_MODAL_TD_SPINNER = '';
    var PRODUCT_METADATA = '';
    var prod_type = '';
    var lang = '';
    var prod_ids_cookie_name = '';
    vm.compareCardSelected = {};
    var COMPARE_TABLE = angular.element(document).find('.td_rq_compare-table');
    vm.isModalButtonDisabled = false;
    var isMobile = (/android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    vm.initProdCookie = '';
    vm.getModalContent = function(url) {
        url = conTextPathVal + url;
        $http.get(url).then(function successCallback(response) {
            vm.modalContent = response.data.cardList;
            angular.forEach(vm.modalContent, function(data, key) {
                var el = angular.element("<div class='rte'>" + data.CardDesc[0].Fragments[0].Html + "</div>");
                var cm_desc_el = el.find(".compare-modal-only");
                var cm_desc_data = (cm_desc_el.length) ? cm_desc_el.html() : el.find('p:first-child').html();
                data.CardDesc[0].Fragments[0].Html = "<p class='compare-modal-only'>" + cm_desc_data + "</p>";
                data['Product_Special'] = (typeof(data.SpecialOffer) === 'undefined') ? false : true;
                vm.cardList.push(data);
                $timeout(function() {
                    initComapareModal();
                }, 100);
            });
        });
        $(".td_rq_compare_modal").tdCompareModal();
    }
    vm.rateData = '';
    vm.getPocRates = function(url) {
		$http.get(url).then(function successCallback(response) {
            vm.rateData = response.data.items;
        });
    }
    var initComapareModal = function() {
        COMPARE_MODAL_TD_SPINNER = COMPARE_MODAL.find('.td-spinner');
        PRODUCT_METADATA = COMPARE_MODAL.find('.td_rq_compare-card').metadata();
        prod_type = PRODUCT_METADATA.card.prod_type;
        lang = PRODUCT_METADATA.lang;
        prod_ids_cookie_name = 'prod_ids_' + prod_type + '_' + lang;
    }
    var sortCompareModal = function() {
        COMPARE_MODAL_TD_SPINNER.show();
        var prod_ids_cookie_value = decodeURIComponent($cookies.get(prod_ids_cookie_name));
        vm.initProdCookie = decodeURIComponent($cookies.get(prod_ids_cookie_name));
        var prod_ids = prod_ids_cookie_value.split(',');
        var prod_id_prefix = lang + '_' + prod_type + '_';
        var suggestion_json = COMPARE_MODAL.metadata().suggest_prod;
        var suggestion_mapping = (!angular.equals(suggestion_json, {})) ? (isMobile) ? suggestion_json.mobile : suggestion_json.desktop : {};
        var suggested_prod_ids = suggestion_mapping[prod_ids[0].replace(prod_id_prefix, '')];
        if (prod_ids.length < 2) {
            vm.isModalButtonDisabled = true;
            if (prod_ids.length == 1) {
                angular.forEach(suggested_prod_ids, function(data, index) {
                    if (!(isMobile && index > 0))
                        prod_ids.push(prod_id_prefix + data);
                })
            }
        } else {
            vm.isModalButtonDisabled = false;
        }
        vm.cardList = [];
        angular.forEach(vm.modalContent, function(data, index) {
            var cardId = prod_id_prefix + data.CardId;
            var cardIdIndex = prod_ids.indexOf(cardId);
            if (!angular.equals(cardIdIndex, -1)) {
                vm.cardList[cardIdIndex] = data;
            }
        });
        angular.forEach(vm.modalContent, function(data, index) {
            var cardId = lang + '_' + prod_type + '_' + data.CardId;
            if (angular.equals(prod_ids.indexOf(cardId), -1)) {
                vm.cardList.push(data);
            }
        });
        $timeout(function(data) {
            $(".td_rq_compare_modal").tdCompareModal();
            $(".td-compare-card").tdCompareCard();
            g.initLinks();
            if (typeof(data) !== 'undefined') {
                $timeout(function(suggest_prods) {
                    $(".td-compare-card").tdCompareCard({
                        'suggest_prods': {
                            status: true,
                            prod_ids: suggested_prod_ids
                        }
                    });
                    COMPARE_MODAL_TD_SPINNER.hide();
                }, 100, true, data);
            } else {
                COMPARE_MODAL_TD_SPINNER.hide();
            }
        }, 100, true, suggested_prod_ids);
    }
    vm.compareProducts = function(url) {
        if (COMPARE_TABLE.length) {
            refreshCompareTable();
            var COMAPRE_METADATA = COMPARE_TABLE.metadata();
            var MODAL_ID = '#' + COMAPRE_METADATA.compare_modal.id;
            $(MODAL_ID).tdModal({
                'show': false
            });
        } else {
            var prod_ids_cookie_value = decodeURIComponent($cookies.get(prod_ids_cookie_name));
            $window.location.href = url + '?prod_ids=' + encodeURIComponent(prod_ids_cookie_value);
        }
    }
    STICKY_DRAWER.on('click', '.anchor_emptyslot,.emptyslot', function() {
        $scope.$evalAsync(function() {
            if (STICKY_DRAWER.metadata().compare_modal.enabled)
                sortCompareModal();
        });
    });
    COMPARE_MODAL.on('click', function() {
        $scope.$evalAsync(function() {
            var prod_ids_cookie_value = decodeURIComponent($cookies.get(prod_ids_cookie_name));
            var prod_ids = prod_ids_cookie_value.split(',');
            COMPARE_MODAL_TD_SPINNER.show();
            if (prod_ids.length < 2) {
                var prod_id_prefix = lang + '_' + prod_type + '_';
                var suggestion_json = COMPARE_MODAL.metadata().suggest_prod;
                var suggestion_mapping = (!angular.equals(suggestion_json, {})) ? (isMobile) ? suggestion_json.mobile : suggestion_json.desktop : {};
                var suggested_prod_ids = suggestion_mapping[prod_ids[0].replace(prod_id_prefix, '')];
                if (typeof(suggested_prod_ids) !== 'undefined') {
                    $(".td-compare-card").tdCompareCard({
                        'suggest_prods': {
                            status: true,
                            prod_ids: suggested_prod_ids
                        }
                    });
                }
                vm.isModalButtonDisabled = true;
            } else {
                vm.isModalButtonDisabled = false;
            }
            COMPARE_MODAL_TD_SPINNER.hide();
        });
    });
    vm.compareTableEmptySlotAction = function(url, id) {
        if (angular.element(document).find(id).find('.emptyslot').length) {
            if (vm.isCardRemoved && vm.initCompareTable) {
                vm.isCardRemoved = false;
            } else {
                var COMAPRE_METADATA = COMPARE_TABLE.metadata();
                var MODAL_ID = '#' + COMAPRE_METADATA.compare_modal.id;
                if (!COMAPRE_METADATA.compare_modal.enabled) {
                    location.href = url;
                } else {
                    $(MODAL_ID).find('div').removeClass('card-suggested');
                    $(MODAL_ID).tdModal({
                        'show': true,
                        'scroll_height': '85%'
                    })
                    sortCompareModal();
                }
            }
        }
    }
    vm.closeCompareModal = function() {
        if (COMPARE_TABLE.length) {
            refreshCompareTable();
        }
    }
    var refreshCompareTable = function() {
        var prod_ids_cookie_value = decodeURIComponent($cookies.get(prod_ids_cookie_name));
        if (!angular.equals(prod_ids_cookie_value, vm.initProdCookie)) {
            vm.initCompareTable = false;
            for (var i = 0; i < 3; i++) {
                $compile($('#compareTableHeadDefault' + i).html($("#compareTableHeadDefault3").html()))($scope);
                $compile($('.compareTableTdDefault' + i).html($(".compareTableTdDefault3").html()))($scope);
                $compile($('#compareTableToggleDefault' + i).html($("#compareTableToggleDefault3").html()))($scope);
                $compile($('#compareTableToggleDefaultMobile' + i).html($("#compareTableToggleDefaultMobile3").html()))($scope);
            }
            vm.cardSelected(vm.compareCardSelected.selectedCompareCardId, vm.compareCardSelected.keyType, vm.compareCardSelected.featureLength);
        }
    }
    /**
     * Get RESL/GIC Rates
     */
    function getRates(data) {
        var url = conTextPathVal + '/getRates/';
        vm.isEmptyErrorMsg = data.errorText;
        if ((angular.equals(data.ratesType, 'resl') && !vm.isReslRatesDataAvail) || (angular.equals(data.ratesType, 'gic') && !vm.isGicRatesDataAvail)) {
            $http.post(url, data).then(function successCallback(response) {
                if (!angular.equals(response.data, '')) {
                    if (angular.equals(data.ratesType, 'resl')) {
                        vm.reslrates = response.data;
                    } else if (angular.equals(data.ratesType, 'gic')) {
                        vm.gicrates = response.data;
                    }
                } else {
                    vm.error = data.errorText;
                }
            }, function errorCallback(response) {
                vm.error = data.errorText;
            });
            if (angular.equals(data.ratesType, 'resl')) {
                vm.isReslRatesDataAvail = true;
            } else if (angular.equals(data.ratesType, 'gic')) {
                vm.isGicRatesDataAvail = true;
            }
        }
    }
    function init() {
        //Set language Constant
        if (window.conTextPathVal != undefined || window.conTextPathVal != "") {
            vm.lang = window.conTextPathVal.split('/')[2];
        }
        //Login
        var xhttp = new XMLHttpRequest($cookies);
        var isCookie = $cookies.get("infositeCookie");
        var tempInfositeUrl = infositeUrl + "?x=" + $.now();
        if (isCookie == null) {
            if (window.env.toLowerCase() != "stg") { //Required to avoid calling in staging website
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        vm.login = true;
                        vm.logout = false;
                        $scope.$digest();
                        if (this.status == 200) {
                            var tempResponse = this.responseText.trim();
                            var cookieArr = [];
                            cookieArr = JSON.parse(tempResponse);
                            angular.forEach(cookieArr, function(value, key) {
                                if (key == "infositeCookie" || key == "omSessionID") {
                                    document.cookie = key + "=" + value + ";domain=.td.com;path=/;";
                                }
                            });
                            if ($cookies.get('infositeCookie') != null) {
                                vm.login = false;
                                vm.logout = true;
                                $scope.$digest();
                                OmniOnloadTrigger();
                            }
                        }
                    }
                };
                xhttp
                    .open(
                        "GET",
                        tempInfositeUrl,
                        true);
                xhttp.withCredentials = true;
                xhttp.send();
            } else {
                vm.login = true;
                vm.logout = false;
            }
        } else {
            vm.login = false;
            vm.logout = true;
            OmniOnloadTrigger();
        }
    }
    /**
     * Region selector
     *
     */
    checkProvince();
    function checkProvince() {
        if ($('.td_rq_region-selector').length) {
            vm.provinceList = province_list.category.keywords;
            var provinceCookie = $cookies.get('ca_user_loc');
            var eapplyCookie = $cookies.get('eapply_user_loc');
            var user_info = JSON.parse($cookies.get('user_info'));
            var savedRegionData = [];
            if (provinceCookie == null && eapplyCookie != null) {
                provinceCookie = eapplyCookie;
            }
            if (provinceCookie != null) {
                var userType = user_info.type;
                var savedRegionData = JSON.parse("{\"" + provinceCookie.split("|").join("\",\"").split("=").join("\":\"") + "\"}");
                vm.province = savedRegionData.province.toUpperCase();
                for (var i = 0; i < vm.provinceList.length; i++) {
                    if (vm.provinceList[i].key == vm.province) {
                        vm.provincePlaceholder = vm.provinceList[i].description;
                        break;
                    }
                }
                if (typeof $(".td_rq_region-selector").tdRegionSelector !== "undefined")
                    $(".td_rq_region-selector").tdRegionSelector({
                        province: vm.province
                    });
                switch (userType) {
                    case "PROVINCE_CHANGE_IN_CA":
                        vm.identifiedUserChangeLoc = true;
                        break;
                    case "IDENTIFIED_OUT_CA":
                        vm.identifiedUserOutCa = true;
                        break;
                    case "AUTH_NO_PROVINCE_CHANGE":
                        vm.authUserNoChangeLoc = true;
                        break;
                    case "AUTH_PROVINCE_CHANGE":
                        vm.authUserChangeLoc = true;
                        break;
                    case "AUTH_OUT_CA":
                        vm.authUserOutCa = true;
                        break;
                    default:
                        vm.anonymousUserInCa = true;
                }
            } else {
                var delay = (window.innerWidth < 768) ? 1500 : 500;
                setTimeout(function() {
                    $('#anonymousUserOutCA').tdModal({
                        'show': true
                    });
                    $("#anonymousUserOutCA .close-button").addClass('hide');
                }, delay);
            }
        }
    }
    function closeButton() {
        var city = 'na';
        var country = 'ca';
        var province = '';
        var provinceCookie = $cookies.get('ca_user_loc');
        var user_info = JSON.parse($cookies.get('user_info'));
        if (provinceCookie != null) {
            var savedRegionData = JSON.parse("{\"" + provinceCookie.split("|").join("\",\"").split("=").join("\":\"") + "\"}");
            city = savedRegionData.city;
            country = savedRegionData.country;
            province = savedRegionData.province;
        }
        if (province != vm.province.toLowerCase()) {
            user_info.manual = 'true';
            user_info.type = 'NO_PROVINCE_CHANGE_IN_CA';
            document.cookie = "user_info=" + JSON.stringify(user_info) + ";path=/;domain=.td.com";
            var d = new Date();
            d.setTime(d.getTime() + (7 * 365 * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            var cookieData = "province=" + vm.province.toLowerCase() + "|city=" + city + "|country=" + country;
            document.cookie = "ca_user_loc=" + cookieData + ";path=" + conTextPathVal + ";expires=" + d.toUTCString() + ";domain=.td.com";
            document.cookie = "eapply_user_loc=" + cookieData + ";path=/;expires=" + d.toUTCString() + ";domain=.td.com";
            if ($('#anonymousUserOutCA').length) {
                var source_url = getQueryParameterByName('source', currentURL).replace('/quebec', '');
                currentURL = (vm.province.toLowerCase() == 'qc') ? source_url + '/quebec' : source_url;
                window.location.replace(currentURL);
            }
            vm.identifiedUserChangeLoc = false;
            vm.identifiedUserOutCa = false;
            vm.authUserNoChangeLoc = false;
            vm.authUserChangeLoc = false;
            vm.authUserOutCa = false;
            vm.anonymousUserInCa = true;
            $('.td-indicator-recently-viewed').removeClass('show');
            $cookies.put('RecentItems', '', {
                'path': conTextPathVal,
                'expires': 'Thu, 01 Jan 1970 00:00:00 UTC'
            });
            removeCompareProductCookie();
            if (currentURL.indexOf('/quebec') == -1 && (vm.province.toLowerCase() == 'qc' || vm.province.toLowerCase() == 'pq')) {
                if (currentURL.indexOf('?') != -1) {
                    var currentURLComponent = currentURL.split('?');
                    currentURLComponent[0] = ((currentURLComponent[0].charAt(currentURLComponent[0].length - 1) == '/') ? currentURLComponent[0] + "quebec" : currentURLComponent[0] + '/quebec');
                    currentURL = currentURLComponent.join('?');
                } else {
                    currentURL = (currentURL.charAt(currentURL.length - 1) == '/') ? currentURL + "quebec" : currentURL + "/quebec";
                }
                window.location.replace(currentURL);
            } else if (currentURL.indexOf('/quebec') != -1 && vm.province.toLowerCase() != 'qc' && vm.province.toLowerCase() != 'pq') {
                window.location.replace(currentURL.replace('/quebec', ''));
            } else if ($('.td_rq_compare-sticky-drawer').length) {
                if ($('.anchor_emptyslot').length < 3)
                    window.location.reload();
            }
        }
    }
    function getQueryParameterByName(name, url) {
        if (!url)
            url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    function removeCompareProductCookie() {
        var decodedCookie = unescape(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            if ((ca[i].indexOf("_ba=") != -1) || (ca[i].indexOf("prod_ids_") != -1) || (ca[i].indexOf("_id=") != -1) || (ca[i].indexOf("_cc=") != -1) || (ca[i].indexOf("_name=") != -1) || (ca[i].indexOf("_img=") != -1) || (ca[i].indexOf("_type=") != -1) || (ca[i].indexOf("_offer=") != -1) || (ca[i].indexOf("_url=") != -1)) {
                var cdata = ca[i].split('=');
                $cookies.put(cdata[0].trim(), '', {
                    'path': conTextPathVal,
                    'expires': 'Thu, 01 Jan 1970 00:00:00 UTC'
                });
            }
        }
    }
    /**
     * Recently viewed indicator
     *
     */
    function setCard(cardId, cardType) {
        if (maxRecentlyViewed > 0) {
            var cookieValue = appendCookie(cardId, cardType);
            if (cookieValue != null) {
                var d = new Date();
                d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = "RecentItems=" + cookieValue + ";path=" + conTextPathVal + ";expires=" + expires;
            }
        }
    }
    function appendCookie(cardId, cardType) {
        var cookieValue = $cookies.get('RecentItems');
        if (cookieValue != null) {
            var items = getCardTypeElements(cookieValue, cardType);
            if (items != null) {
                var cardArr = getItemArrayList(items);
                if (!isCardExist(cardArr, cardId)) {
                    var updatedItems = '';
                    if (cardArr.length < maxRecentlyViewed + 1) {
                        for (var i = 0; i < cardArr.length; i++) {
                            updatedItems = updatedItems + cardArr[i] + '|';
                        }
                        updatedItems = updatedItems + cardId + '|';
                    } else if (cardArr.length == maxRecentlyViewed + 1) {
                        for (var i = 1; i < cardArr.length - 1; i++)
                            cardArr[i] = cardArr[i + 1];
                        cardArr[cardArr.length - 1] = cardId;
                        for (var i = 0; i < cardArr.length; i++) {
                            updatedItems = updatedItems + cardArr[i] + '|';
                        }
                    }
                    cookieValue = cookieValue.replace(items, updatedItems);
                }
            } else {
                cookieValue = cookieValue + cardType + '|' + cardId + '|||';
            }
        } else {
            cookieValue = cardType + '|' + cardId + '|||';
        }
        return cookieValue;
    }
    function checkRecent(elementId, cardId, cardType) {
        var cookieValue = $cookies.get('RecentItems');
        if (cookieValue != null) {
            var items = getCardTypeElements(cookieValue, cardType);
            if (items != null) {
                var cardArr = getItemArrayList(items);
                if (isCardExist(cardArr, cardId)) {
                    $("#" + elementId).find(".td-indicator-recently-viewed").addClass("show");
                    $(".td-catalogue-card").tdCatalogueCard({
                        're_render': true
                    });
                }
            }
        }
        if (!($('.td-filter-tool').length || $('.td-filter-tool-v2').length)) {
            if ($(".td_rq_product_grid").length) {
                $(".td_rq_product_grid .td-row").animate({
                    opacity: 1
                });
            }
            if ($(".td-product-service-illustration-grid").length) {
                $(".td-product-service-illustration-grid .td-row").animate({
                    opacity: 1
                });
            }
        }
    }
    function getCardTypeElements(cookieValue, cardType) {
        if (cookieValue.indexOf(cardType) != -1) {
            var startIndex = cookieValue.indexOf(cardType);
            var endIndex = cookieValue.indexOf('|||', startIndex);
            var items = cookieValue.substring(startIndex, endIndex) + '|';
            return items;
        }
        return null;
    }
    function getItemArrayList(items) {
        var cardArr = [];
        while (items != '') {
            cardArr.push(items.substring(0, items.indexOf('|')));
            items = items.replace(items.substring(0, items.indexOf('|') + 1), '');
        }
        return cardArr;
    }
    function isCardExist(cardArr, cardId) {
        for (var i = 0; i < cardArr.length; i++) {
            if (cardArr[i] == cardId)
                return true;
        }
        return false;
    }
    /**
     * #47 Notification Message
     */
    $scope.$on('UpdateNotificationMsgViewData', function(event, data) {
        vm.success_phone_text = data.phone;
    });
    /**
     * Filtertool
     */
    /**
     * Account Manager
     *
     */
    vm.products = [];
    function cardClassification(classification, id) {
        vm.classification = classification;
        vm.classifications.classifications.push({
            "id": id,
            "classification": classification
        });
        ProductCatalogueService.productClassifications(vm.classifications);
    }
    $rootScope.$on("changeFilterToolStatus", function(event, data) {
        vm.timer = $timeout(function() {
            vm.filterResultShow = false;
            vm.filterResultWait = true;
            vm.filterNoResult = false;
            vm.filterDefaultState = false;
        }, 700);
    });
    $rootScope.$on("sendClassificationParentCtrl", function(event, data) {
        var TD_PRODUCT_SERVICE = angular.element(document).find('.td-product-service');
        if (data != 'default') {
            vm.products = data;
            vm.classification = {};
            var classification = {};
            vm.catalogueLength = 0;
            vm.indexList = [];
            $timeout.cancel(vm.timer);
            if (!angular.equals(data, {})) {
                vm.filterResultShow = false;
                vm.filterResultWait = (vm.products.length < 100) ? false : true;
                vm.filterNoResult = false;
                vm.filterDefaultState = (vm.products.length < 100) ? true : false;
                for (var i = 0; i < vm.products.length; i++) {
                    var classify = vm.products[i].MetadataFields.classify.EmbeddedValues;
                    classification[i] = {};
                    for (var j = 0; j < classify.length; j++) {
                        classification[i][j] = {};
                        var cardClassification = classify[j].classification.KeywordValues;
                        for (var k = 0; k < cardClassification.length; k++) {
                            classification[i][j][k] = cardClassification[k].Key;
                        }
                    }
                }
                vm.classification = JSON.stringify(classification);
                vm.catalogueLength = Object.keys(classification).length;
            } else {
                TD_PRODUCT_SERVICE.addClass('hide');
                vm.filterResultShow = false;
                vm.filterResultWait = false;
                vm.filterDefaultState = false;
                vm.filterNoResult = true;
            }
        } else {
            TD_PRODUCT_SERVICE.addClass('hide');
            vm.filterResultShow = false;
            vm.filterResultWait = false;
            vm.filterDefaultState = true;
            vm.filterNoResult = false;
        }
    });
    $rootScope.$on("sendDataParentCtrl", function(event, id) {
        if ($(".td_rq_product_grid").length) {
            $(".td_rq_product_grid .td-row").css('opacity', 0);
        }
        if ($(".td-product-service-illustration-grid").length) {
            $(".td-product-service-illustration-grid .td-row").css('opacity', 0);
        }
        vm.getSelectedData = factoryFilterTool.getFilterData();
        vm.keyCombination = '';
        vm.indexList = [];
        vm.productId = (id == "") ? "1" : id;
        if (vm.classifications.classifications.length > 1) {
            for (var i = 0; i < vm.classifications.classifications.length; i++) {
                if (vm.classifications.classifications[i].id == vm.productId) {
                    vm.classification = vm.classifications.classifications[i].classification;
                    break;
                }
            }
        }
        if (angular.equals(vm.classification, {})) {
            vm.classification = JSON.stringify(vm.classification);
        }
        var obj = eval('(' + vm.classification + ')');
        var parsedString = JSON.stringify(obj);
        vm.cardJson = JSON.parse(parsedString);
        vm.catalogueLength = Object.keys(vm.cardJson).length;
        vm.selectedDataLength = vm.getSelectedData.length;
        for (var j = 0; j < vm.getSelectedData.length; j++) {
            if (j == 0) {
                vm.keyCombination = vm.keyCombination + vm.getSelectedData[j];
            } else if (j > 0 && j <= vm.getSelectedData.length - 1) {
                vm.keyCombination = vm.keyCombination + '-' + vm.getSelectedData[j];
            }
        }
        for (var i = 0; i < vm.catalogueLength; i++) {
            for (var k = 0; k < Object.keys(vm.cardJson[i]).length; k++) {
                for (var l = 0; l < Object.keys(vm.cardJson[i][k]).length; l++) {
                    if (l == 0) {
                        vm.selectionCriteria = vm.selectionCriteria + vm.cardJson[i][k][l];
                    } else if (l > 0 && l <= Object.keys(vm.cardJson[i][k]).length - 1) {
                        vm.selectionCriteria = vm.selectionCriteria + '-' + vm.cardJson[i][k][l];
                    }
                }
                if (vm.keyCombination == vm.selectionCriteria) {
                    vm.indexList.push(i);
                    vm.selectionCriteria = '';
                    break;
                }
                vm.selectionCriteria = '';
            }
        }
        var itemCount = 0;
        for (var r = 0; r < vm.catalogueLength; r++) {
            if (vm.indexList.indexOf(r) < 0) {
                ($("#catalogue" + vm.productId.toString() + "_product" + r)).addClass("hide");
            } else {
                ($("#catalogue" + vm.productId.toString() + "_product" + r)).removeClass("hide");
                itemCount++;
            }
        }
        if (itemCount > 0) {
            if ($(".td_rq_product_grid").length) {
                $(".td-catalogue-card").tdCatalogueCard({
                    're_render': true
                });
                $(".td_rq_product_grid").tdProductGrid();
                $(".td_rq_product_grid .td-row").animate({
                    opacity: 1
                });
            }
            if ($(".td-product-service-illustration-grid").length) {
                $(".td-product-service-illustration-grid").tdProductServiceIllustrationGrid({
                    're_render': true
                });
                vm.filterResultShow = true;
                vm.filterResultWait = false;
                vm.filterDefaultState = false;
                vm.filterNoResult = false;
                $(".td-product-service-illustration-grid .td-row").animate({
                    opacity: 1
                });
            }
        }
    });
    $rootScope.$on("updateProductCatalogue", function(event, id) {
        if ($(".td_rq_product_grid").length) {
            $(".td_rq_product_grid .td-row").css('opacity', 0);
        }
        if ($(".td-product-service-illustration-grid").length) {
            $(".td-product-service-illustration-grid .td-row").css('opacity', 0);
        }
        vm.getSelectedData = factoryFilterTool.getFilterData();
        vm.checkBoxListData = filterToolLoadCatagory.getCatagoryData();
        vm.indexList = [];
        vm.selectedKeys = '';
        vm.productId = (id == "") ? "1" : id;
        if (vm.classifications.classifications.length > 1) {
            for (var i = 0; i < vm.classifications.classifications.length; i++) {
                if (vm.classifications.classifications[i].id == vm.productId) {
                    vm.classification = vm.classifications.classifications[i].classification;
                    break;
                }
            }
        }
        var obj = eval('(' + vm.classification + ')');
        var parsedString = JSON.stringify(obj);
        vm.cardJson = JSON.parse(parsedString);
        vm.catalogueLength = Object.keys(vm.cardJson).length;
        for (var j = 0; j < vm.getSelectedData.length; j++) {
            if (vm.getSelectedData[j] != undefined && typeof vm.getSelectedData[j] == "object" && vm.getSelectedData.length > 0) {
                var combinedKeys = vm.getSelectedData[j].filter(function(a) {
                    return (a !== '' && a != null)
                }).join('-');
                (vm.selectedKeys.length && combinedKeys.length) ?
                vm.selectedKeys = vm.selectedKeys + '-' + combinedKeys:
                    vm.selectedKeys = vm.selectedKeys + combinedKeys
            } else if (vm.getSelectedData[j] != undefined && vm.getSelectedData[j] != '') {
                vm.selectedKeys = vm.selectedKeys + vm.getSelectedData[j]
            }
        }
        var prodCatalogueMeta = new Array(vm.catalogueLength)
        for (var i = 0; i < vm.catalogueLength; i++) {
            prodCatalogueMeta[i] = new Array()
            for (var k = 0; k < Object.keys(vm.cardJson[i]).length; k++) {
                prodCatalogueMeta[i].push(Object.keys(vm.cardJson[i][k]).map(function(e) {
                    return vm.cardJson[i][k][e]
                }).join('-'))
            }
            if (prodCatalogueMeta[i].indexOf(vm.selectedKeys) >= 0)
                vm.indexList.push(i)
        }
        //Check if the checkbox value is present in the array
        var filteredProdCatMeta = prodCatalogueMeta.join(',').split(',').filter(function(v, i, a) {
            return a.indexOf(v) === i
        });
        for (j = 0; j < vm.checkBoxListData.length; j++) {
            var keyCombination = ''
            var currentCheckBox = {}
            currentCheckBox = vm.checkBoxListData[j]
            if (vm.selectedKeys.length) {
                if (vm.selectedKeys.indexOf(currentCheckBox.key) >= 0) {
                    keyCombination = vm.selectedKeys
                    vm.checkBoxListData[j] = currentCheckBox
                } else {
                    currentCheckBox.disable = true;
                    keyCombination = vm.selectedKeys + '-' + currentCheckBox.key
                }
            } else
                keyCombination = currentCheckBox.key
            var keyPermutation = createPermutations(keyCombination.split('-'), keyCombination.split('-').length);
            var isKeyFound = keyPermutation.filter(function(value) {
                return filteredProdCatMeta.indexOf(value) > -1
            }).join(',').length
            if (isKeyFound) {
                currentCheckBox.disable = false;
                vm.checkBoxListData[j] = currentCheckBox
            }
        }
        if (vm.getSelectedData.length > 0) {
            var isSelectionEmpty = false
            for (var i = 0; i < vm.getSelectedData.length; i++) {
                if (vm.getSelectedData[i] != undefined || vm.getSelectedData[i] != null) {
                    for (var j = 0; j < vm.getSelectedData[i].length; j++)
                        if (vm.getSelectedData[i][j] !== undefined && vm.getSelectedData[i][j] !== null && vm.getSelectedData[i][j] != '') {
                            isSelectionEmpty = true;
                        }
                }
            }
            if (!isSelectionEmpty) {
                for (var r = 0; r < vm.catalogueLength; r++)
                    vm.indexList.push(r);
            }
        }
        var itemCount = 0;
        for (var r = 0; r < vm.catalogueLength; r++) {
            if (vm.indexList.indexOf(r) < 0) {
                ($("#catalogue" + vm.productId.toString() + "_product" + r)).addClass("hide");
            } else {
                ($("#catalogue" + vm.productId.toString() + "_product" + r)).removeClass("hide");
                itemCount++;
            }
        }
        if (itemCount > 0) {
            if ($(".td_rq_product_grid").length) {
                $(".td-catalogue-card").tdCatalogueCard({
                    're_render': true
                });
                $(".td_rq_product_grid").tdProductGrid();
                $(".td_rq_product_grid .td-row").animate({
                    opacity: 1
                });
            }
            if ($(".td-product-service-illustration-grid").length) {
                $(".td-product-service-illustration-grid").tdProductServiceIllustrationGrid({
                    're_render': true
                });
                vm.filterResultShow = true;
                vm.filterResultWait = false;
                vm.filterDefaultState = false;
                vm.filterNoResult = false;
                $(".td-product-service-illustration-grid .td-row").animate({
                    opacity: 1
                });
            }
        }
        function createPermutations(array, k) {
            var combinations = [];
            var indices = [];
            var finalArray = [];
            function run(level, start) {
                for (var i = 0; i < array.length; i++) {
                    if (!indices[i]) {
                        indices[i] = true;
                        combinations[level] = array[i];
                        if (level < k - 1) {
                            run(level + 1, i + 1);
                        } else {
                            finalArray.push(combinations.join("-"))
                        }
                        indices[i] = false;
                    }
                }
            }
            run(0, 0);
            return finalArray;
        }
    });
    function cardSelected(selectedCompareCardId, keyType, featureLength) {
        vm.compareCardSelected = {
            "selectedCompareCardId": selectedCompareCardId,
            "keyType": keyType,
            "featureLength": featureLength
        };
        if (keyType == 'creditCard') {
            if (vm.lang == 'en') {
                vm.compareCookies = $cookies.get('prod_ids_cc_en');
                vm.selectedCardIds = vm.compareCookies.split("%2C");
            } else {
                vm.compareCookies = $cookies.get('prod_ids_cc_fr');
                vm.selectedCardIds = vm.compareCookies.split("%2C");
            }
        } else if (keyType == 'accounts') {
            if (vm.lang == 'en') {
                vm.compareCookies = $cookies.get('prod_ids_ba_en');
                vm.selectedCardIds = vm.compareCookies.split("%2C");
            } else {
                vm.compareCookies = $cookies.get('prod_ids_ba_fr');
                vm.selectedCardIds = vm.compareCookies.split("%2C");
            }
        }
        vm.totalCrad = selectedCompareCardId.split(",");
        for (var i = 0; i < vm.totalCrad.length; i++) {
            for (var j = 0; j < vm.selectedCardIds.length; j++) {
                vm.selectedCardIds[j] = vm.selectedCardIds[j].replace('en_cc_', '').replace('fr_cc_', '').replace('en_ba_', '').replace('fr_ba_', '');
                if (vm.totalCrad[i] == vm.selectedCardIds[j]) {
                    vm.selectedCardList.push(i);
                }
            }
        }
        for (var i = 0; i < vm.selectedCardIds.length; i++) {
            for (var j = 0; j < vm.totalCrad.length; j++) {
                if (vm.selectedCardIds[i] == vm.totalCrad[j]) {
                    vm.matchedProducts.push(j);
                    $compile($('#compareTableHeadDefault' + i).html($('#compareTableHead' + j).html()))($scope);
                    for (var k = 0; k < featureLength; k++) {
                        $compile($('#compareTableBodyDefault' + k + i).html($('#compareTableTd' + k + j).html()))($scope);
                    }
                    $compile($('#compareTableToggleDefault' + i).html($("#stickyDrawer" + j).html()))($scope);
                    $compile($('#compareTableToggleDefaultMobile' + i).html($('#stickyDrawerMobile' + j).html()))($scope);
                }
            }
        }
        for (var border = 0; border < vm.selectedCardList.length; border++) {
            if (border == 2) {
                $("#compareTableHead" + vm.selectedCardList[border]).addClass("td-col-last-spacing");
            }
        }
        $(".td_rq_compare-table").compareTable('init');
        $(".td_rq_compare-table-sticky").compareTableSticky('init');
        $timeout(function() {
            $(window).trigger('resize');
        }, 300);
    }
    function removeSelectedProduct(id, cardId, productType) {
        vm.isCardRemoved = true;
        var cardType = "cc"; //Setting default as credit card product type
        if (productType == 'accounts') {
            cardType = "ba";
        }
        //Remove and reassign id's to cookie prod_ids_cardtype_lang (prod_id's_cc_en)
        var prodIdCookieName = 'prod_ids_' + cardType + '_' + vm.lang;
        var prodIdSplittedCookie = $cookies.get(prodIdCookieName).split("%2C");
        for (var i = 0; i < prodIdSplittedCookie.length; i++) {
            if (prodIdSplittedCookie[i] == vm.lang + "_" + cardType + "_" + cardId) {
                prodIdSplittedCookie.splice(prodIdSplittedCookie.indexOf(prodIdSplittedCookie[i]), 1);
            }
        }
        $cookies.put(prodIdCookieName, prodIdSplittedCookie.join('%2C'), {
            path: window.conTextPathVal
        });
        //Remove individual card cookie
        angular.forEach($cookies.getAll(), function(value, key) {
            if (key.indexOf(vm.lang + "_" + cardType + "_" + cardId) == 0) {
                $cookies.remove(key, {
                    path: window.conTextPathVal
                });
            }
        });
        //Delete the card from the UI
        $compile($('#compareTableHeadDefault' + vm.selectedCardIds.indexOf(cardId)).html($("#compareTableHeadDefault3").html()))($scope);
        //$compile($('.compare-row' + id).html(''))($scope);
        $compile($('.compareTableTdDefault' + vm.selectedCardIds.indexOf(cardId)).html($(".compareTableTdDefault3").html()))($scope);
        $compile($('#compareTableToggleDefault' + vm.selectedCardIds.indexOf(cardId)).html($("#compareTableToggleDefault3").html()))($scope);
        $compile($('#compareTableToggleDefaultMobile' + vm.selectedCardIds.indexOf(cardId)).html($("#compareTableToggleDefaultMobile3").html()))($scope);
        var val = vm.selectedCardIds.indexOf(cardId);
        vm.selectedCardIds[val] = "empty";
        $(window).trigger('resize');
    }
}
angular.module('tdctRedesign').factory('exposedFilterToolV2Factory', exposedFilterToolV2Factory);
function exposedFilterToolV2Factory() {
    var filterData = {
        cardType: '',
        cardBenefits: '',
        catalogueId: ''
    };
    var classificationMap = {};
    return {
        setFilterData: function(key, data) {
            filterData[key] = data;
        },
        getFilterData: function() {
            return filterData;
        },
        setClassificationMap: function(data) {
            classificationMap = data;
        },
        getClassificationMap: function() {
            return classificationMap;
        }
    }
}
angular.module('tdctRedesign').factory('productCatalogueFactory', productCatalogueFactory);
function productCatalogueFactory() {
    var classifications = {};
    var productMappings = {};
    return {
        setClassification: function(classifications) {
            this.classifications = classifications;
        },
        getClassification: function(catalogueID) {
            var classification = {};
            for (var i = 0; i < this.classifications.classifications.length; i++) {
                if (this.classifications.classifications[i].id == catalogueID) {
                    classification = this.classifications.classifications[i].classification;
                    break;
                }
            }
            return classification;
        },
        setProductMappings: function(productMappings) {
            this.productMappings = productMappings;
        },
        getProductMappings: function() {
            return this.productMappings;
        }
    }
}
angular.module('tdctRedesign').factory('factoryFilterTool', factoryFilterTool)
    .factory('filtertoolLoad', filtertoolLoad)
    .factory('apiFactory', apiFactory)
    .factory('filterToolLoadCatagory', filterToolLoadCatagory);
apiFactory.$inject = ['$http', '$window'];
function factoryFilterTool() {
    var value = [];
    var filterData = {
        setFilterData: setFilterData,
        getFilterData: getFilterData,
        value: value
    };
    return filterData;
    function setFilterData(getXMLData) {
        filterData.value = getXMLData;
    };
    function getFilterData() {
        return filterData.value;
    };
}
function apiFactory($http, $window) {
    var httpData = {
        getHttp: getHttp
    };
    return httpData;
    function getHttp(url) {
        return $http.get(url);
    };
}
function filtertoolLoad() {
    var filterToolLoadData = {
        setFilterToolLoadData: setFilterToolLoadData,
        getFilterToolLoadData: getFilterToolLoadData
    };
    return filterToolLoadData;
    function setFilterToolLoadData(getXMLData) {
        filterToolLoadData.value = getXMLData;
    };
    function getFilterToolLoadData() {
        return filterToolLoadData.value;
    };
}
function filterToolLoadCatagory() {
    var value = [];
    var filterToolCatagoryData = {
        getCatagoryData: getCatagoryData,
        setCatagoryData: setCatagoryData,
        value: value
    };
    return filterToolCatagoryData;
    function setCatagoryData(catagoryData) {
        filterToolCatagoryData.value = catagoryData;
    };
    function getCatagoryData() {
        return filterToolCatagoryData.value
    };
}
var tdctapp = angular.module('tdctRedesign');
tdctapp.filter('rateFilter', function() {
    return function(number, lang) {
        if (isNaN(parseInt(number))) {
            return number;
        } else {
            number = parseFloat(number).toFixed(2);
            return (lang != 'fr') ? number + '%' : (number + ' %').replace('.', ',');
        }
    }
});
/**
 * JSON Format:
 * {
 *    'key':['var1','var2','var3'],
 *    'value':[
 *                ['val11','val12','val13'],
 *                ['val21','val22','val23'],
 *                ['val31','val32','val33'],
 *            ]
 * }
 */
tdctapp.filter('jsonFilter', function() {
    return function(data, attr, value) {
        var filteredData = {};
        if (!angular.equals(data, {})) {
            var attrIndex = data.key.indexOf(attr);
            var dataArr = data.value;
            var itemArr = [];
            angular.forEach(dataArr, function(item) {
                if (item[attrIndex] === value) {
                    itemArr.push(item);
                }
            });
            filteredData['key'] = data.key;
            filteredData['value'] = itemArr;
        }
        return filteredData;
    }
});
tdctapp.filter('jsonValueByAttr', function() {
    return function(data, attr) {
        var value = '';
        if (!angular.equals(data, {})) {
            var attrIndex = data.key.indexOf(attr);
            var dataArr = data.value;
            if (dataArr.length > 0) {
                value = dataArr.pop()[attrIndex];
            }
        }
        return value;
    }
});
tdctapp.filter('isEmpty', function() {
    return function(data, msg) {
        if (angular.equals(data, '')) {
            return msg;
        }
        return data;
    }
});
angular.module('tdctRedesign').service('ExposedFilterToolV2Service', ExposedFilterToolV2Service);
ExposedFilterToolV2Service.$inject = ['exposedFilterToolV2Factory']
function ExposedFilterToolV2Service(exposedFilterToolV2Factory) {
    this.mapProductClassification = function(classification) {
        var classificationMap = {};
        angular.forEach(classification, function(data) {
            angular.forEach(data, function(subData) {
                if (!classificationMap.hasOwnProperty(subData[0])) {
                    classificationMap[subData[0]] = [];
                }
                if (classificationMap[subData[0]].indexOf(subData[1]) == -1)
                    classificationMap[subData[0]].push(subData[1]);
            });
        })
        exposedFilterToolV2Factory.setClassificationMap(classificationMap);
    }
}
angular.module('tdctRedesign').service('ProductCatalogueService', ProductCatalogueService);
ProductCatalogueService.$inject = ['productCatalogueFactory']
function ProductCatalogueService(productCatalogueFactory) {
    this.productClassifications = function(classifications) {
        if (classifications.classifications.length > 0) {
            for (var i = 0; i < classifications.classifications.length; i++) {
                var classification = classifications.classifications[i].classification;
                if (angular.equals(classification, {})) {
                    classification = JSON.stringify(classification);
                }
                if (typeof(classification) === 'string') {
                    classifications.classifications[i].classification = eval('(' + classification + ')');
                }
            }
        }
        productCatalogueFactory.setClassification(classifications);
    }
    this.productMappingsfromClassification = function(classification) {
        var productMappings = {};
        angular.forEach(classification, function(dataLvl1, key) {
            if (!productMappings.hasOwnProperty(key)) {
                productMappings[key] = {
                    cardType: [''],
                    cardBenefits: ['']
                };
            }
            angular.forEach(dataLvl1, function(dataLvl1Lvl2) {
                if (productMappings[key].cardType.indexOf(dataLvl1Lvl2[0]) == -1) {
                    productMappings[key].cardType.push(dataLvl1Lvl2[0]);
                }
                if (productMappings[key].cardBenefits.indexOf(dataLvl1Lvl2[1]) == -1) {
                    productMappings[key].cardBenefits.push(dataLvl1Lvl2[1]);
                }
            })
        })
        productCatalogueFactory.setProductMappings(productMappings);
    }
}