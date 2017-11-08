/**
 * 
 */




      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
        	['State', 'Stats', 'Population'],
        	['US-AL', 'Town1',13000],
        	['US-MA', 'Town2', 1000]
        	
        ]);

       
        
        var options = {width: 2000, height: 700,colorAxis: {colors: ['blue', 'light green']}, region: "US", resolution: "provinces"};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'), {
        	zoom: 8
        });

        chart.draw(data, options);
        
      
        }
      
      
      function drawMarkersMap() {
          
    	  
    	  var data = google.visualization.arrayToDataTable([
            ['City',   'Population', 'Area'],
            ['US-AL', 'Town1',13000],
        	['US-MA', 'Town2', 1000],
        	['US-AK', 'Town2',13000],
        	['US-AZ', 'Town3',13000],
        	['US-AR', 'Town4',13000],
        	['US-CA', 'Town5',13000],
        	['US-CO', 'Town6',13000],
        	['US-CT', 'Town7',13000],
        	['US-DE', 'Town8',13000],
        	['US-DC', 'Town9',13000],
        	['US-FL', 'Town10',13000],
        	['US-GA', 'Town11',13000],
        	['US-HI', 'Town12',13000],
        	['US-ID', 'Town13',13000],
        	['US-IL','Town14' ,13000],
        	['US-IN', 'Town15',13000],
        	['US-IA','Town16' ,13000],
        	['US-KS', 'Town17',13000],
        	['US-KY', 'Town18',13000],
        	['US-LA', 'Town19',13000],
        	['US-ME', 'Town20',13000],
        	['US-MT', 'Town21',13000],
        	['US-NE', 'Town22',13000],
        	['US-NV', 'Town23',13000],
        	['US-NH', 'Town24',13000],
        	['US-NJ', 'Town25',13000],
        	['US-NM', 'Town26',13000],
        	['US-NY', 'Town27',13000],
        	['US-NC', 'Town28',13000],
        	['US-ND', 'Town29',13000],
        	['US-OH', 'Town30',13000],
        	['US-OK', 'Town31',13000],
        	['US-OR', 'Town32',13000],
        	['US-MD', 'Town33',13000],
        	['US-MI', 'Town34',13000],
        	['US-MN', 'Town35',13000],
        	['US-MS', 'Town36',13000],
        	['US-MO', 'Town37',13000],
        	['US-PA', 'Town38',13000],
        	['US-RI', 'Town39',13000],
        	['US-SC', 'Town40',13000],
        	['US-SD', 'Town41',13000],
        	['US-TN', 'Town42',13000],
        	['Texas', 'Town43',13000],
        	['US-UT', 'Town44',13000],
        	['US-VT', 'Town45',13000],
        	['US-VA', 'Town46',13000],
        	['US-WA', 'Town47',13000],
        	['US-WV', 'Town48',13000],
        	['US-WI', 'Town49',13000],
        	['US-WY', 'Town50','']
          ]);

          var options = {width: 2000, height: 900,datalessRegionColor: 'ADD8E6', legend: 'none',colorAxis: {colors: ['#DAA520', '#DAA520']},region: 'US',resolution: "provinces"
          };

          var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
          chart.draw(data, options);
          
          google.visualization.events.addListener(chart, 'select', function() {
    	      var selection = chart.getSelection();

    	      // if same city is clicked twice in a row
    	      // it is "unselected", and selection = []
    	      if(typeof selection[0] !== "undefined") {
    	        var value = data.getValue(selection[0].row, 0);
    	        alert('City is: ' + value);
//    	        $location.path( '/ResponsiveMap' );
    	      }
    	  });
          
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
        };
        
        
  



function initMap() {
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
}