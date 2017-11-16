/**
 * 
 */

	/*SiteList siteList = (SiteList) request.getAttribute("SiteList");
	State state = (State) request.getAttribute("State");*/

function drawMap(){
	var d = document.getElementById('siteAddress1').value
	console.log(d)
	var array = d.split('|');
	console.log(array[20])
	var i;
	
	
	var dataArray = [['siteName']];
	
	for (i=0;i<array.length;i++) {
		console.log("Javascript"+array[i])
		dataArray.push([array[i]])
	}
	
	console.log(dataArray)
	
	
	var data = google.visualization.arrayToDataTable(dataArray);
	
	var state = document.getElementById('stateValue').value;
	var newState = "US-"+state;
	//alert(newState)
	var options = {
			region: newState,
			 backgroundColor: '#eee',
			    datalessRegionColor: '#ffc801',
			    width: 1000,
			    height: 800,
			    zoon:12,
			    displayMode: 'markers',
			    resolution: 'provinces',
			    legend: 'none',
			    enableRegionInteractivity: 'true',
	};
	
	 var container = document.getElementById('mapcontainer');
	  var chart = new google.visualization.GeoChart(container);
	 
	  
	   //alert(inputState1);
	
	  
	  //alert(state);
	 /* var markers = locations.chart(function(location, i) {
		    return new google.maps.Marker({
		      position: location,
		      label: labels[i % labels.length]
		    });
	
	  
	  });*/
	  chart.draw(data, options);
}


google.charts.load('current', {
	  packages:['geochart'],
	  callback: drawMap
	});