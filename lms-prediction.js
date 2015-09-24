/**
* SelfEngine
*
* prediction analystics
* @class selfprediction
*
* @package    selfengine  open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var selfprediction = function() {
	
	this.predictiondataout = {};
	
};

/**
*  Set the context
* @method mappingContext		
*
*/	
selfprediction.prototype.mappingContext = function(livecontextdata) {

		
};



/**
*  Request data from Mapping Protocol
* @method predictionout		
*
*/	
selfprediction.prototype.mappingContext = function(livecontextdata) {

		
};


/**
*  Mapper Prection Computation
* @method MapperCompute		
*
*/	
selfprediction.prototype.MapperCompute = function() {

	var datainx = [];
	var datainy = [];

		// for now form x array and y array to feed sums below
	livepredictiondata.forEach(function(xypairs) {

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
	var tenyeartimeframe = [1,2,3,4,5,6,7,8,9,10];
	var yearinmilliseconds = 31536000000;

	var regx = [];

	tenyeartimeframe.forEach(function(yearno) {

		regx.push(startdateprediction + (yearno * yearinmilliseconds));
		
	});

	var regy = '';
	var regxy = [];

	regx.forEach(function(rx) {
		
		regy = ((beta*rx) + crossy);
		regxy.push([rx, regy]);
		
	});

	// regression line co ordinates
	this.mppmChart2d(regxy, elementpart, totalelements, attentionfixin);
	
};

/**
*  Submit MPPM prediction path data to Protocol ie resolution node
* @method mppmSubmit		
*
*/	
selfprediction.prototype.mppmSubmit = function() {
	
	// make Mapping Protocol Submission call
	//this.MAPPINGPROTOCOL(this.predictiondataout);

};	


/**
*  Charting helper function 2d chart linear colleration chart
* @method mppmChart2d		
*
*/	
selfprediction.prototype.mppmChart2d = function() {


};