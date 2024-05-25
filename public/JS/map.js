
	
    // let mapToken=mapToken;
    // console.log(mapToken);
	mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });

    // console.log(coordinates);
    const marker = new mapboxgl.Marker()
        .setLngLat(coordinates) //Listing.geometry.coordinates
        .addTo(map);
