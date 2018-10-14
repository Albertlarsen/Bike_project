var bikemap;

function initMap() {
    var trondheim = {lat: 63.4305149, lng: 10.3950528};
    bikemap = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        minZoom: 11,
        maxZoom: 17,
        center: trondheim,
        mapTypeControl: false,
        overviewMapControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
            {"featureType": "poi", "stylers": [{"visibility": "off"}]},
            {"featureType": "transit", "stylers": [{"visibility": "off"}]},
            {"featureType": "administrative", "stylers": [{"visibility": "off"}]}
        ],
        mapview: null
    });
    JSCalls.loadBikesJS();
    JSCalls.loadDocks();
    /*addBike(1001, 100, 10, 3, "Make", "Type", 0, 63.452919, 10.448461);
    setTimeout(function() {
        sendUpdate(1001, 74, 11, 4, 0, 63.411881, 10.438679);
    }, 10000);*/
}

var bikes = [];

function addBike(id, charge, distance, trips, make, type, docked, lat, long) {
    var imageURL = "data:image/svg+xml, %3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20viewBox%3D%220%200%20653%20635%22%20style%3D%22enable-background%3Anew%200%200%20653%20635%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%09.st0%7Bfill%3A%231F1A17%3B%7D%0A%09.st1%7Bfill%3Anone%3B%7D%0A%09.st2%7Bfont-family%3A%27MyriadPro-Regular%27%3B%7D%0A%09.st3%7Bfont-size%3A315px%3B%7D%0A%3C%2Fstyle%3E%0A%3Cpath%20class%3D%22st0%22%20d%3D%22M427.4%2C512l85.4-13.9l-53.8-69.9C431%2C452.5%2C427.6%2C481.7%2C427.4%2C512z%20M403.9%2C517.1c-0.1-3-0.6-7.9-0.6-11.3%0A%09c0-34.6%2C11.2-68.2%2C41.6-96.2l-31.6-37.9l-49%2C149.4L403.9%2C517.1z%20M215.9%2C368.4c0.7%2C0.7%2C118.1%2C132.8%2C118.1%2C132.8l-1.3-16h-6l-0.7-8.7%0A%09h23.3l0.7%2C9.3h-5.3l2%2C14.7L393%2C359.9l-174.4%2C0.2L215.9%2C368.4z%20M138.6%2C503.6c0%2C7.7-5.5%2C13.7-12.8%2C13.7c-7.3%2C0-13.3-6-13.3-13.3%0A%09c0-7.1%2C5.6-13%2C13-13.3c30.5-24.5%2C40.1-40.7%2C50-72c-14.6-8.6-32.8-13.8-50.5-13.8c-55.6%2C0-101%2C45.4-101%2C101s45.4%2C101%2C101%2C101%0A%09s101-45.4%2C101-101c0-28-11.8-55.2-32.6-74.1C180.3%2C467.2%2C162.1%2C485%2C138.6%2C503.6z%20M430.9%2C533.5c11.4%2C42.6%2C52.1%2C73.4%2C97.1%2C73.4%0A%09c55.6%2C0%2C101-45.4%2C101-101s-45.4-101-101-101c-17.8%2C0-38.3%2C4.2-53.3%2C13l54.8%2C72.8c6.7%2C0.1%2C12.5%2C6.1%2C12.5%2C13.3c0%2C7.3-6%2C13.3-13.3%2C13.3%0A%09c-2%2C0-4.2-0.5-6-1.4L430.9%2C533.5z%20M182.8%2C395.2l35.8-98.7l-11.3-19.3l22.7-24.7h48.7l0.7%2C14h-42.7l-8.7%2C9.3l10%2C18l-12.6%2C44.6h174.8%0A%09l2.7-8.2c-14-1.8-38.3-10.5-44.1-15.5c-5.8-5-0.7-9.6%2C5.9-9.9c34.5-1.5%2C85.7-4.4%2C95.5-4.4c9.7%2C0%2C10.7%2C4.9%2C4.2%2C12%0A%09c-6.5%2C7.1-12.2%2C13.5-36.9%2C17.4l-6.7%2C18L462%2C399c19.5-11.8%2C43.1-18%2C66-18c68.7%2C0%2C124.8%2C56%2C124.8%2C124.8s-56%2C124.8-124.8%2C124.8%0A%09c-56.5%2C0-106.2-39-120.9-92.9l-38%2C6.8c-1.6%2C4.5-5.4%2C7.9-9.9%2C10.6l6.8%2C32.1h8.7l0.7%2C8.7l-27.4%2C1.3V588h6.7l-8.3-32.1%0A%09c-12.3-2-18.7-12.5-15.1-23L207.2%2C392.5l-5.6%2C15.1c30.1%2C23.7%2C48.2%2C60.3%2C48.2%2C98.3c0%2C68.7-56%2C124.8-124.8%2C124.8S0.2%2C574.5%2C0.2%2C505.8%0A%09S56.3%2C381%2C125%2C381C145%2C381%2C165.5%2C385.9%2C182.8%2C395.2z%22%2F%3E%0A%3Crect%20x%3D%220.2%22%20class%3D%22st1%22%20width%3D%22652.8%22%20height%3D%22252.4%22%2F%3E%0A%3Ctext%20transform%3D%22matrix(1%200%200%201%203.4375%20223.6475)%22%20class%3D%22st2%20st3%22%3E" + id + "%3C%2Ftext%3E%0A%3C%2Fsvg%3E";
    var marker = new google.maps.Marker(
        {
            position: new google.maps.LatLng(lat, long),
            title: "Bike ID: " + id,
            map: docked ? null : bikemap,
            draggable: false,
            raiseOnDrag: false,
            icon: {
                url: imageURL,
                scaledSize: new google.maps.Size(32, 32),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(16, 16)
            },
            id: id,
            charge: charge,
            distance: distance,
            trips: trips,
            make: make,
            type: type,
            docked: docked,
            open: false,
            closeListener: null,
            infowindow: new google.maps.InfoWindow({
                content: generateInfo({
                    id: id,
                    make: make,
                    trips: trips,
                    distance: distance,
                    type: type,
                    charge: charge
                })
            })
        }
    );

    google.maps.event.addListener(marker, 'click', function () {
        /*if (bikemap.mapview == 'over') {
            var index = bikes.indexOf(marker);
            JSCalls.loadBike(""+index);
        }*/
        if (!marker.open) {
            marker.infowindow.open(bikemap, marker);
            marker.open = true;
            marker.closeListener = new google.maps.event.addListener(bikemap, 'click', function () {
                marker.infowindow.close();
                marker.open = false;
            });
        }
        else {
            marker.infowindow.close();
            marker.open = false;
            marker.closeListener.remove();
        }
    });

    if (bikemap.mapview == 'over' && docked) {
        marker.setMap(null);
    }

    marker.open = false;
    bikes[id] = marker;
}

function sendUpdate(id, charge, distance, trips, docked, lat, long, anim) {
    bikes[id].charge = charge;
    bikes[id].distance = distance;
    bikes[id].trips = trips;
    bikes[id].infowindow.setContent(generateInfo(bikes[id]));
    var newPos = {lat: lat, lng: long};
    if (anim) {
        animate(bikes[id], newPos, 200, 30);
    } else {
        bikes[id].setPosition(new google.maps.LatLng(lat, long));
        if (bikemap.mapview == 'bike') bikemap.setCenter(newPos);
    }
    if (docked && bikemap.mapview !== 'bike') {
        hideBike(id);
    } else if (!docked && bikemap.mapview == 'over' && bikes[id].getMap() == null) {
        showBike(id);
    }
}

function animate(marker, newPos, steps, wait) {
    var currentLat = marker.position.lat();
    var currentLng = marker.position.lng();
    var diffLat = (newPos.lat - currentLat);
    var diffLng = (newPos.lng - currentLng);
    var stepsTaken = 0;
    var loop = setInterval(function () {
        stepsTaken++;
        var newLat = currentLat + (diffLat * stepsTaken) / steps;
        var newLng = currentLng + (diffLng * stepsTaken) / steps;
        marker.setPosition({lat: newLat, lng: newLng});
        //if (bikemap.mapview == 'bike') bikemap.panTo({lat: currentLat, lng: currentLng});
        if (stepsTaken === steps) {
            if (bikemap.mapview == 'bike') bikemap.panTo({lat: newLat, lng: newLng});
            clearInterval(loop);
        }
    }, wait);
    /*var moving = true;
    while(moving) {
        setTimeout(function() {
            currentLat += moveLat;
            currentLng += moveLng;
            marker.setPosition({lat: currentLat, lng: currentLng});
        }, wait);
        stepsTaken++;
        if (stepsTaken === steps) {
            moving = false;
        }
    }*/
    /*for (var i = 0; i < steps; i++) {
        currentLat += moveLat;
        currentLng += moveLng;
        marker.setPosition({lat: currentLat, lng: currentLng});
    }*/
    //marker.setPosition(newPos);
}

function defineMap(map) {
    bikemap.mapview = map;
}

var lastBike = -1;

function showSingleBike(id) {
    if (lastBike !== id) {
        if (lastBike > -1 ) bikes[lastBike].setMap(null);
        bikes[id].setMap(bikemap);
        bikemap.panTo(bikes[id].position);
    }
    lastBike = id;
}

function hideAllBikes() {
    bikes.forEach(function (bike) {
        bike.setMap(null);
    });
}

function showAllBikes() {
    bikes.forEach(function (bike) {
        bike.setMap(bikemap);
    });
}

function showBike(id) {
    bikes[id].setMap(bikemap);
    bikes[id].docked = 0;
}

function hideBike(id) {
    bikes[id].setMap(null);
    bikes[id].docked = 1;
}

function updatePosition(bikeid, docked, lat, long) {
    bikes[bikeid].setPosition(new google.maps.LatLng(lat, long));
    bikes[bikeid].docked = docked;
}

var docks = [];
var dockURL = {
    single: "data:image/svg+xml, %3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20viewBox%3D%220%200%2047.5%2037.5%22%20style%3D%22enable-background%3Anew%200%200%2047.5%2037.5%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%09.st0%7Bfill%3Anone%3B%7D%0A%09.st1%7Bfont-family%3A%27MyriadPro-Regular%27%3B%7D%0A%09.st2%7Bfont-size%3A28px%3B%7D%0A%3C%2Fstyle%3E%0A%3Cg%3E%0A%09%3Cg%3E%0A%09%09%3Cpath%20d%3D%22M1.9%2C13.9C9.6%2C10.1%2C17.3%2C6.2%2C25%2C2.4c-0.4%2C0-0.8%2C0-1.3%2C0c7.3%2C3.8%2C14.6%2C7.7%2C21.9%2C11.5c1.4%2C0.8%2C2.7-1.4%2C1.3-2.2%0A%09%09%09C40.3%2C8.2%2C33.7%2C4.7%2C27%2C1.2c-0.7-0.4-1.7-1.1-2.5-1.2S22.7%2C0.7%2C22%2C1c-3.9%2C1.9-7.7%2C3.9-11.6%2C5.8c-3.3%2C1.6-6.5%2C3.3-9.8%2C4.9%0A%09%09%09C-0.8%2C12.4%2C0.5%2C14.6%2C1.9%2C13.9L1.9%2C13.9z%22%2F%3E%0A%09%3C%2Fg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%09%3Cline%20class%3D%22st0%22%20x1%3D%222.4%22%20y1%3D%2236.4%22%20x2%3D%2245.4%22%20y2%3D%2236.4%22%2F%3E%0A%09%3Cg%3E%0A%09%09%3Cpath%20d%3D%22M2.4%2C37.5c12.5%2C0%2C25.1%2C0%2C37.6%2C0c1.8%2C0%2C3.6%2C0%2C5.4%2C0c1.6%2C0%2C1.6-2.5%2C0-2.5c-12.5%2C0-25.1%2C0-37.6%2C0c-1.8%2C0-3.6%2C0-5.4%2C0%0A%09%09%09C0.8%2C35%2C0.8%2C37.5%2C2.4%2C37.5L2.4%2C37.5z%22%2F%3E%0A%09%3C%2Fg%3E%0A%3C%2Fg%3E%0A%3Crect%20x%3D%2216.4%22%20y%3D%2211.9%22%20class%3D%22st0%22%20width%3D%2214.6%22%20height%3D%2225.6%22%2F%3E%0A%3Ctext%20transform%3D%22matrix(1%200%200%201%2016.4336%2031.7705)%22%20class%3D%22st1%20st2%22%3ENUMBERHERE%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    double: "data:image/svg+xml, %3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20viewBox%3D%220%200%2047.5%2037.5%22%20style%3D%22enable-background%3Anew%200%200%2047.5%2037.5%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%09.st0%7Bfill%3Anone%3B%7D%0A%09.st1%7Bfont-family%3A%27MyriadPro-Regular%27%3B%7D%0A%09.st2%7Bfont-size%3A28px%3B%7D%0A%3C%2Fstyle%3E%0A%3Cg%3E%0A%09%3Cg%3E%0A%09%09%3Cpath%20d%3D%22M1.9%2C13.9C9.6%2C10.1%2C17.3%2C6.2%2C25%2C2.4c-0.4%2C0-0.8%2C0-1.3%2C0c7.3%2C3.8%2C14.6%2C7.7%2C21.9%2C11.5c1.4%2C0.8%2C2.7-1.4%2C1.3-2.2%0A%09%09%09C40.3%2C8.2%2C33.7%2C4.7%2C27%2C1.2c-0.7-0.4-1.7-1.1-2.5-1.2S22.7%2C0.7%2C22%2C1c-3.9%2C1.9-7.7%2C3.9-11.6%2C5.8c-3.3%2C1.6-6.5%2C3.3-9.8%2C4.9%0A%09%09%09C-0.8%2C12.4%2C0.5%2C14.6%2C1.9%2C13.9L1.9%2C13.9z%22%2F%3E%0A%09%3C%2Fg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%09%3Cline%20class%3D%22st0%22%20x1%3D%222.4%22%20y1%3D%2236.4%22%20x2%3D%2245.4%22%20y2%3D%2236.4%22%2F%3E%0A%09%3Cg%3E%0A%09%09%3Cpath%20d%3D%22M2.4%2C37.5c12.5%2C0%2C25.1%2C0%2C37.6%2C0c1.8%2C0%2C3.6%2C0%2C5.4%2C0c1.6%2C0%2C1.6-2.5%2C0-2.5c-12.5%2C0-25.1%2C0-37.6%2C0c-1.8%2C0-3.6%2C0-5.4%2C0%0A%09%09%09C0.8%2C35%2C0.8%2C37.5%2C2.4%2C37.5L2.4%2C37.5z%22%2F%3E%0A%09%3C%2Fg%3E%0A%3C%2Fg%3E%0A%3Crect%20x%3D%229.5%22%20y%3D%2211.9%22%20class%3D%22st0%22%20width%3D%2229.1%22%20height%3D%2225.6%22%2F%3E%0A%3Ctext%20transform%3D%22matrix(1%200%200%201%209.4946%2031.7705)%22%20class%3D%22st1%20st2%22%3ENUMBERHERE%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    triple: "data:image/svg+xml, %3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20viewBox%3D%220%200%2047.5%2037.5%22%20style%3D%22enable-background%3Anew%200%200%2047.5%2037.5%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%09.st0%7Bfill%3Anone%3B%7D%0A%09.st1%7Bfont-family%3A%27MyriadPro-Regular%27%3B%7D%0A%09.st2%7Bfont-size%3A28px%3B%7D%0A%3C%2Fstyle%3E%0A%3Cg%3E%0A%09%3Cg%3E%0A%09%09%3Cpath%20d%3D%22M1.9%2C13.9C9.6%2C10.1%2C17.3%2C6.2%2C25%2C2.4c-0.4%2C0-0.8%2C0-1.3%2C0c7.3%2C3.8%2C14.6%2C7.7%2C21.9%2C11.5c1.4%2C0.8%2C2.7-1.4%2C1.3-2.2%0A%09%09%09C40.3%2C8.2%2C33.7%2C4.7%2C27%2C1.2c-0.7-0.4-1.7-1.1-2.5-1.2S22.7%2C0.7%2C22%2C1c-3.9%2C1.9-7.7%2C3.9-11.6%2C5.8c-3.3%2C1.6-6.5%2C3.3-9.8%2C4.9%0A%09%09%09C-0.8%2C12.4%2C0.5%2C14.6%2C1.9%2C13.9L1.9%2C13.9z%22%2F%3E%0A%09%3C%2Fg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%09%3Cline%20class%3D%22st0%22%20x1%3D%222.4%22%20y1%3D%2236.4%22%20x2%3D%2245.4%22%20y2%3D%2236.4%22%2F%3E%0A%09%3Cg%3E%0A%09%09%3Cpath%20d%3D%22M2.4%2C37.5c12.5%2C0%2C25.1%2C0%2C37.6%2C0c1.8%2C0%2C3.6%2C0%2C5.4%2C0c1.6%2C0%2C1.6-2.5%2C0-2.5c-12.5%2C0-25.1%2C0-37.6%2C0c-1.8%2C0-3.6%2C0-5.4%2C0%0A%09%09%09C0.8%2C35%2C0.8%2C37.5%2C2.4%2C37.5L2.4%2C37.5z%22%2F%3E%0A%09%3C%2Fg%3E%0A%3C%2Fg%3E%0A%3Crect%20x%3D%221.6%22%20y%3D%2211.9%22%20class%3D%22st0%22%20width%3D%2244.4%22%20height%3D%2228.7%22%2F%3E%0A%3Ctext%20transform%3D%22matrix(1%200%200%201%201.5507%2031.7705)%22%20class%3D%22st1%20st2%22%3ENUMBERHERE%3C%2Ftext%3E%0A%3C%2Fsvg%3E"
}

function addDockingStation(name, num, lat, long) {
    var imageURL = num > 9 ? num > 99 ? dockURL.triple : dockURL.double : dockURL.single;
    var marker = new google.maps.Marker(
        {
            position: new google.maps.LatLng(lat, long),
            icon: {
                url: imageURL.replace("NUMBERHERE", num),
                scaledSize: new google.maps.Size(32, 32),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(16, 16)
            },
            title: name,
            map: bikemap,
            open: false,
            closeListener: null
        }
    );

    var infowindow = new google.maps.InfoWindow({
        content: "<div id='dockinfo'>" +
        "<p>" + name + "</p><br>" +
        "<a onclick='JSCalls.loadDock(\"" + name + "\")'>Show docking station >></a>" +
        "</div>"
    });

    google.maps.event.addListener(marker, 'click', function () {
        var name = marker.title;
        if (bikemap.mapview !== 'over') {
            JSCalls.loadDock("" + name);
            return;
        }

        if (!marker.open) {
            infowindow.open(bikemap, marker);
            marker.open = true;
            marker.closeListener = new google.maps.event.addListener(bikemap, 'click', function () {
                infowindow.close();
                marker.open = false;
            });
        }
        else {
            infowindow.close();
            marker.open = false;
            marker.closeListener.remove();
        }
    });

    docks[name] = marker;
}

function updateDockingStation(name, num) {
    var newImageURL = num > 9 ? num > 99 ? dockURL.triple : dockURL.double : dockURL.single;
    docks[name].setIcon({
        url: newImageURL.replace("NUMBERHERE", num),
        scaledSize: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 16)
    });
}

function moveDockingStation(name, lat, long) {
    docks[name].setPosition(new google.maps.LatLng(lat, long));
}

function deleteDockingStation(name) {
    docks[name].setMap(null);
    docks[name] = null;
}

function centerDock(name) {
    bikemap.panTo(docks[name].position);
}

function generateInfo(marker) {
    var res = "<h3>Bike ID: " + marker.id + "</h3>" +
        "<table><tr><td>Make:</td><td align='right'>" + marker.make + "</td></tr>" +
        "<tr><td>Type:</td><td align='right'>" + marker.type + "</td></tr>" +
        "<tr><td>Distance:</td><td align='right'>" + marker.distance.toFixed(1) + " km</td></tr>" +
        "<tr><td>Total trips:</td><td align='right'>" + marker.trips + "</td></tr></table>" +
        createBattery(marker.charge) +
        "<br><a onclick='JSCalls.loadBike(\"" + marker.id + "\")'>Show bicycle >></a>" +
        "</div>";
    return res;
}

function createBattery(percentage) {
    var color;
    if (percentage <= 15) {
        color = "#FB0200";
    }
    else if (percentage <= 30) {
        color = "#F8FB00";
    }
    else {
        color = "#00F700";
    }

    var html = "<br><div align='center' style='margin:0 auto;' id=\"outerbattery\" background='linear-gradient(#F0F0F0, #FDFDFD, #F0F0F0)'>" +
        "<div id=\"innerbattery\" style=\"height:100%;width:" + percentage + "%;background-color:" + color + "\"></div>" +
        "<p style=\"position:relative;top:-24px;\">" + percentage + "%</p>" +
        "</div>";

    return html;
}
