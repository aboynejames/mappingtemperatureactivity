/**
* SelfEngine
*
* Least mean square  regression analysis
* @class selfprediction
*
* @package    selfengine  open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var LMScompute = function(dataIN, ppIN) {

	this.dataIN = dataIN;
	this.ppIN = ppIN;
	this.predictiondataout = [];

};

/**
*  Set the context
* @method mappingContext
*
*/
LMScompute.prototype.mappingContext = function() {


};

/**
*  Perform LMS Computation
* @method startCPU
*
*/
LMScompute.prototype.startCPU = function(dataIN, ppIN) {

	localdata = dataIN;
	var datainx = [];
	var datainy = [];

		// for now form x array and y array to feed sums below
	localdata.forEach(function(xypairs) {

		datainx.push(xypairs[0]);
		datainy.push(xypairs[1]);
	});

	var totalsumx = datainx.reduce(function(previousValue, currentValue, index, array){
	  return previousValue + currentValue;
	});

	var xlength = datainx.length;

	//sum y and average
	var totalsumy = datainy.reduce(function(previousValue, currentValue, index, array){
	  return previousValue + currentValue;
	});

	var ylength = datainy.length;


	// calcualate the means
	var meanx = totalsumx/xlength;
	var meany = totalsumy/ylength;

	// calculate variance for x
	//each x value minus the mean squared divided by number of datapionts

	var variancex = '';
	var sdeviationx = [];
	var sdeviationsquaredarr = [];
	datainx.forEach(function(xnum) {

		var sdeviationsquared = Math.pow((xnum - meanx),2);
		sdeviationsquaredarr.push(sdeviationsquared);
		sdeviationx.push(xnum - meanx);

	});

	var totalsumxdev = sdeviationsquaredarr.reduce(function(previousValue, currentValue, index, array){
		return previousValue + currentValue;
	});

	variancex = totalsumxdev/(xlength-1);
	// standard devication is square root of variance
	var sdx = Math.sqrt(variancex);

	// calculate variance for y
	var variancey = '';
	var sdeviationy = [];
	var sdeviationsquaredarry = [];
	datainy.forEach(function(ynum) {

		var sdeviationsquaredy = Math.pow((ynum - meany),2);
		sdeviationsquaredarry.push(sdeviationsquaredy);
		sdeviationy.push(ynum - meany);

	});

	var totalsumydev = sdeviationsquaredarry.reduce(function(previousValue, currentValue, index, array){
		return previousValue + currentValue;
	});

	variancey = totalsumydev/(ylength-1);

	// standard devication is square root of variance
	var sdy = Math.sqrt(variancey);

	// calculate persons R
	var  personsr = '';

	// sum of the differences
	var sumofdifferences = '';
	var devbetweenxv = [];

	// loop two arrays and perform sum
	var result = 0;
	for (var i=0; i < sdeviationx.length; i++) {
	  result += (sdeviationx[i] * sdeviationy[i]);
	}

	var sumdiffsquarex =  Math.sqrt(totalsumxdev);
	var sumdiffsquarey = Math.sqrt(totalsumydev);

	personsr = result/(sumdiffsquarex*sumdiffsquarey);

	// build forulate for straight line linear regress chart

	// beta co efficient
	var beta = '';

	beta = (personsr * sdy)/sdx;
	// where does it cross the y axis ie x = 0;
	var crossy = '';

	crossy = meany - (beta * meanx);
	// produce the regression line x y pairs
	var dregdata = [];

	// take todays date and add 10 years
	var startdateprediction = new Date().valueOf();
	var timeframePrediction = ppIN;
	var yearinmilliseconds = 31536000000;

	var regx = [];

	timeframePrediction.forEach(function(yearno) {

		regx.push(startdateprediction + (yearno * yearinmilliseconds));

	});

	var regy = '';
	var regxy = [];

	regx.forEach(function(rx) {

		regy = ((beta*rx) + crossy);
		regxy.push([rx, regy]);

	});

	return regxy;

	//this.predictiondataout = regxy;
	//this.predictionout();
	//this.DmPPSubmit();
};

/**
*  Return the prediction path
* @method predictionout
*
*/
LMScompute.prototype.predictionout = function() {
	// given prection model LMS  produce a prediciton path


	this.DmPPSubmit();

};

/**
*  Submit Dmpath prediction path data to Protocol ie resolution node
* @method DmPPSubmit
*
*/
LMScompute.prototype.DmPPSubmit = function() {

	// make Mapping Protocol Submission call
	return this.predictiondataout;

};


module.exports = LMScompute;
