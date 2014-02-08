/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.testzone = {};
        this.lat = 0;
        this.long = 0;
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        app.testzone = document.getElementById("testzone");
        app.btnWhereAmI = document.getElementById('whereami');
        app.btnWhereAmI.addEventListener("click", app.getPlace, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.testzone = document.getElementById("testzone");
        navigator.geolocation.getCurrentPosition(app.onGeoSuccess, app.onGeoError);
        navigator.camera.getPicture(app.onCamSuccess, app.onCamFail, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

    },
    onCamSuccess: function(imageData) {
        console.log(imageData);
    },
    onCamFail: function(message) {
        console.log(message);
    },
    onGeoSuccess: function (position) {
        alert('GeoSuccess');
        app.testzone.innerHTML = "Lattitude: " + position.coords.latitude + '<br />' +
        'Longitude: ' + position.coords.longitude + '<br />';
        app.lat = position.coords.latitude;
        app.long = position.coords.longitude;
    },
    onGeoError: function(error) {
        alert('There is an error: ' + error.message);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    },
    getPlace: function() {
        $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng='+app.lat+','+app.long+'&sensor=true', function(data) {
            var addy = data.results[0].formatted_address;
            app.testzone.innerHTML = addy;
        });
    }

};
