/**
 * 
 */      
      function drawMarkersMap() {
          
    	  
    	  var d = document.getElementById('stateDetails').value
    	  
    	  console.log(d);
    	  var array = d.split('|');
    	  console.log(array)
    	  var dataArray = [['stateName','ModelName','Totalsites']];
    	  console.log("Data array step "+dataArray)
    	  
    	  console.log(array[1])
    	  
    	  for (i=0;i<array.length-1 ;i++) {
    			console.log("Javascript"+array[i])
    			var array1 = array[i].split(',');
    			console.log(array1)
    			//console.log("Coloumns array "+ array1);
    			var subArray = []
    			/*for(j=0;j<3 ;j++){
    				//console.log("This is each column "+array1[j]);
    				//dataArray.push([array[i]])
    				//array[i].push([array1[j]])
    				//console.log("This is the sub array "+array[i]);
    				subArray.push([array1[j]]);
    				console.log("This is while adding coloumns " + subArray)
    				dataArray[i][j] = subArray
    				//console.log([subArray])
    			}*/
    		dataArray.push(array1)
    			
    			//console.log("Data array step "+dataArray)
    		}
    	  
    	  //console.log("HERE WE ARE DON'T TURN AWAY NOW, WE ARE THE WARRIORS THAT BUILT THIS TOWN \n"+ dataArray)
    	  console.log(dataArray[1][1])
    	  
    	  var data = google.visualization.arrayToDataTable([[dataArray]]);
    	  
    	  /*var data = google.visualization.arrayToDataTable([
	            ['City',   'CenteringParenting', 'CenteringPregnancy'],
	            ['AL', 3,13000],
	        	['MA', 5, 1000],
	        	['AK', 5,13000],
	        	['AZ', 6,13000],
	        	['AR', 7,13000],
	        	['CA', 5,13000],
            	['CO', 6,13000],
            	['CT', 7,13000],
            	['DE', 8,13000],
            	['DC', 9,13000],
            	['FL', 10,13000],
            	['GA', 11,13000],
            	['HI', 12,13000],
            	['ID', 13,13000],
            	['IL',14 ,13000],
            	['IN', 15,13000],
            	['IA',16 ,13000],
            	['KS', 17,13000],
            	['KY', 18,13000],
            	['LA', 19,13000],
            	['ME', 20,13000],
            	['MT', 21,13000],
            	['NE', 22,13000],
            	['NV', 23,13000],
            	['NH', 24,13000],
            	['NJ', 25,13000],
            	['NM', 26,13000],
            	['NY', 27,13000],
            	['NC', 28,13000],
            	['ND', 29,13000],
            	['OH', 30,13000],
            	['OK', 31,13000],
            	['OR', 32,13000],
            	['MD', 33,13000],
            	['MI', 34,13000],
            	['MN', 35,13000],
            	['MS', 36,13000],
            	['MO', 37,13000],
            	['PA', 38,13000],
            	['RI', 39,13000],
            	['SC', 40,13000],
            	['SD', 41,13000],
            	['TN', 42,13000],
            	['TX', 43,13000],
            	['UT', 44,13000],
            	['VT', 45,13000],
            	['VA', 46,13000],
            	['WA', 47,13000],
            	['WV', 48,13000],
            	['WI', 49,13000],
            	['WY', 50,23784]
          ]);*/

          var options = {
        		  width: 1000, 
        		  height: 700,
        		  datalessRegionColor: '#179ADF', 
        		  legend: 'none',
        		  colorAxis: {
        			  colors: ['#179ADF', '#179ADF']
        		  },
        		  region: 'US',
        		  enableRegionInteractivity: 'true',
        		  //displayMode: 'markers',
        		  resolution: "provinces"
          };

          var container = document.getElementById('regions_div');
          var chart = new google.visualization.GeoChart(container);
          
          
          google.visualization.events.addListener(chart, 'select', myClickHandler);
          
          var lastEvent = null;
          container.addEventListener('click', function (e) {
            lastEvent = e;
          }, false);
          /*container.addEventListener('mouseover', function (e) {
            lastEvent = e;
            // dispatch click event to get hover value
            var event = document.createEvent('SVGEvents');
            event.initEvent('click', true, true);
            e.target.dispatchEvent(event);
          }, false);
*/
          
          
          
          function myClickHandler() {
        	    var selection = chart.getSelection();
        	    var message = '';
        	    if (selection.length > 0) {
        	      if (selection[0].row !== null) {
        	          // click
        	          console.log("/" + data.getValue(selection[0].row, 0));
        	          var value1 = data.getValue(selection[0].row, 0);
          	        //alert('City is: ' + value1);
          	        document.getElementById('myField').value = value1;
          	        document.getElementById("myform").submit();
        	      }
        	    }
        	  }
          
          //Hover event action 
//          google.visualization.events.addListener(chart, 'hover', function() {
//    	      var selection = chart.getSelection();
//
//    	      // if same city is clicked twice in a row
//    	      // it is "unselected", and selection = []
//    	      if(typeof selection[0] !== "undefined") {
//    	        var value = data.getValue(selection[0].row, 0);
//    	        alert('City is: ' + value);
//    	        $location.path( '/ResponsiveMap' );
//    	      }
//    	  });
        
          chart.draw(data, options);
      
      };
        
        
  



/*function initMap() {
  var myLatlng = {lat: 39.8283, lng: -98.5795};
  
  
  var locations = [
      ['A', 33.890542, -91.274856, 4, 'oauth/'],
      ['B', 33.923036, -95.259052, 5,'oauth/'],
      ['C', 34.028249, -82.157507, 3, 'oauth/'],
      ['D', 33.80010128657071, -95.28747820854187, 2, 'oauth/'],
      ['E', 33.950198, -86.259302, 1, 'oauth/']
    ];
  

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Click to zoom'
  });

  var infowindow = new google.maps.InfoWindow();
  
  var i;

  for (i = 0; i < locations.length; i++) { 
	  var place = locations[i];
	  var marker1 = new google.maps.Marker({
		  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		  map: map,
		  url: place[4]
	  });

    google.maps.event.addListener(marker1, 'click', (function(marker, i) {
      return function() {
    	  map.setZoom(8);
    	  map.setCenter(marker.getPosition())
    	  window.location.href = this.url;
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker1, i));
  }
  
  
  
  map.addListener('center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
      map.panTo(myLatLng);
    }, 1500);
  });

  marker1.addListener('click', function() {
    map.setZoom(12);
    
    //map.setCenter(marker.getPosition());
  });
}*/