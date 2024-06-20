
	
    // let mapToken=mapToken;
    // console.log(mapToken);
	mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 2 // starting zoom
    });

    // console.log(coordinates);
    const marker = new mapboxgl.Marker({color: 'red'})
        .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
        .setPopup(new mapboxgl.Popup({offset:25})
        .setHTML(`<h4>${listing.title}</h4><p>Exact location provided after booking</p>`))
        .addTo(map);
