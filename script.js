// Get all the DOM elements by their IDs and return an object
  
let selectors=()=>{
    let appSelectors = {
        mapDisplay: '#mapDisplay',
        ipValue: '#ipValue',
        locationValue: '#locationValue',
        timezoneValue: '#timezoneValue',
        ispValue: '#ispValue',
        searchBar: '#searchBar',
        searchBtn: '.searchBtn'
    }

    return{
        appSelectors
    }
}


//Display the Map 

let displayMap=(lat, long)=>{

    var container = L.DomUtil.get('mapid');
        if(container != null){
        container._leaflet_id = null;
    }

    // Start the map with these lat and long with a zoom of size 14
    let map = L.map('mapid').setView([lat, long], 14);

    // Get the tile for the map which is from openstreetmap 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create an icon for the map 
    let myIcon = L.icon({
        iconUrl: "./images/icon-location.svg",
        iconAnchor: [lat, long],    // where the icon will be on the map
    });

    L.marker([lat, long]).addTo(map);   // add to map and show map
}


// Get the ip details from the api 
let getIpDetails=(ip)=>{

    let key = 'at_yD616QsY5LwKtmSTbfr3fiwpFDfDI';     // Api Key 

    fetch(`https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ip}`)
    .then(resp=>resp.json())
    .then(data=>{

        document.querySelector(selectors().appSelectors.ipValue).innerText = data.ip;
        document.querySelector(selectors().appSelectors.locationValue).innerText = `${data.location.city}, ${data.location.country}`;
        document.querySelector(selectors().appSelectors.timezoneValue).innerText = `UTC ${data.location.timezone}`;
        document.querySelector(selectors().appSelectors.ispValue).innerText = data.isp;
        displayMap(data.location.lat, data.location.lng)
    })
}


// Getting the user IP address 
let getUserIpAddress=(()=>{
    fetch("https://api.ipify.org?format=json")
    .then(resp=>resp.json())
    .then(data=>{
        getIpDetails(data.ip)
    })
})()


// Checking if the user has entered an ip 
let eventsHandlers=(()=>{
    let ipInput = document.querySelector(selectors().appSelectors.searchBar)
    let searchBtn = document.querySelector(selectors().appSelectors.searchBtn);

    ipInput.addEventListener('change', ()=>{
        getIpDetails(ipInput.value)
    })

    searchBtn.addEventListener('click', ()=>{
        getIpDetails(ipInput.value)
    })
})()