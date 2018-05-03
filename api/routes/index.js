var express = require('express');
var router = express.Router();
var ctrlCountry = require('../controllers/country.ctrl.js');
var ctrlContract = require('../controllers/contract.ctrl.js');
var ctrlKit = require('../controllers/kit.ctrl.js');
var ctrlLocations = require('../controllers/location.ctrl.js');
var ctrlSoftware = require('../controllers/software.ctrl.js');
var ctrlAsset = require('../controllers/asset.ctrl.js');
var ctrlAssetType = require('../controllers/assetType.ctrl.js');
var ctrlCustomerAsset = require('../controllers/customerAsset.ctrl.js');
var ctrlNode = require('../controllers/node.ctrl.js');

router
    .route('/')
    .get(ctrlLocations.greeting);

//KIT Routes
router
    .route('/kits')
    .get(ctrlKit.getAll)
    .post(ctrlKit.addOne);    

router
    .route('/kits/:kitId')
    .get(ctrlKit.getOne)
    .put(ctrlKit.updateOne)
    .delete(ctrlKit.deleteOne);


//NODE Routes
router
    .route('/nodes')
    .get(ctrlNode.getAll)
    .post(ctrlNode.addOne);    

router
    .route('/nodes/:nodeId')
    .get(ctrlNode.getOne)
    .put(ctrlNode.updateOne)
    .delete(ctrlNode.deleteOne);

//COUNTRY Routes
router
    .route('/countries')
    .get(ctrlCountry.getAll)
    .post(ctrlCountry.addOne);    

router
    .route('/countries/:countryId')
    .get(ctrlCountry.getOne)
    .put(ctrlCountry.updateOne)
    .delete(ctrlCountry.deleteOne);

//CONTRACT Routes
router
    .route('/contracts')
    .get(ctrlContract.getAll)
    .post(ctrlContract.addOne);    

router
    .route('/contracts/:contractId')
    .get(ctrlContract.getOne)
    .put(ctrlContract.updateOne)
    .delete(ctrlContract.deleteOne);

//LOCATION Routes
router
    .route('/locations')
    .get(ctrlLocations.getAll)
    .post(ctrlLocations.addOne);    

router
    .route('/locations/:locationId')
    .get(ctrlLocations.getOne)
    .put(ctrlLocations.updateOne)
    .delete(ctrlLocations.deleteOne);

//SOFTWARE Routes
router
    .route('/software')
    .get(ctrlSoftware.getAll)
    .post(ctrlSoftware.addOne);    

router
    .route('/software/:softwareId')
    .get(ctrlSoftware.getOne)
    .put(ctrlSoftware.updateOne)
    .delete(ctrlSoftware.deleteOne);

//ASSET Routes
router
    .route('/assets')
    .get(ctrlAsset.getAll)
    .post(ctrlAsset.addOne);    

router
    .route('/assets/:assetId')
    .get(ctrlAsset.getOne)
    .put(ctrlAsset.updateOne)
    .delete(ctrlAsset.deleteOne);

//ASSET TYPE Routes
router
    .route('/assetTypes')
    .get(ctrlAssetType.getAll)
    .post(ctrlAssetType.addOne);    

router
    .route('/assetTypes/:assetTypeId')
    .get(ctrlAssetType.getOne)
    .put(ctrlAssetType.updateOne)
    .delete(ctrlAssetType.deleteOne);


//CUSTOMER ASSET Routes
router
    .route('/customerAssets')
    .get(ctrlCustomerAsset.getAll)
    .post(ctrlCustomerAsset.addOne);

router
    .route('/customerAssets/:customerAssetId')
    .get(ctrlCustomerAsset.getOne)
    .put(ctrlCustomerAsset.updateOne)
    .delete(ctrlCustomerAsset.deleteOne);

module.exports = router;