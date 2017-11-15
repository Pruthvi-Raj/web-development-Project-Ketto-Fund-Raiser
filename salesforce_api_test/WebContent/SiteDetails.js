/**
 * 
 */

	/*SiteList siteList = (SiteList) request.getAttribute("SiteList");
	State state = (State) request.getAttribute("State");*/

function drawMap(){
	
	var data = google.visualization.arrayToDataTable([
		['Sites', 'Locations'],
		['Centeringhealthcare', '89 southstreet'],
		
	]);
	
	
	
	var options = {
			region: 'US-MA',
			 backgroundColor: '#eee',
			    datalessRegionColor: '#ffc801',
			    width: 1000,
			    height: 800,
			    zoon:12,
			    displayMode: 'markers',
			    resolution: 'provinces',
			    enableRegionInteractivity: 'true',
	};
	
	 var container = document.getElementById('mapcontainer');
	  var chart = new google.visualization.GeoChart(container);
	 
	  
	   //alert(inputState1);
	
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