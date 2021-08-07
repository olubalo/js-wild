// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.
navigator.geolocation.getCurrentPosition(
    function(coordinates) { console.log(coordinates) },
    function() {
        "error" 
})  

navigator.geolocation.watchPosition(function(coordinates){
    console.log(coordinates)
}, function(){
    "error"
})

let photoContainerDiv = document.getElementById("#photoContainer")

let options = {
    enableHighAccuracy: true,
    maximumAge: 0
}

const fallbackLocation = { latitude: 48.8575, longitude: 2.2982 } //Paris

let photosArray = []
let currentPhotoI = 0

function assembleImageSourceURL(photoObj) {
    return `https://farm${photoObj.farm}.staticflickr.com/` +
    `${photoObj.server}/` +
    `${photoObj.id}_${photoObj.secret}.jpg`;
};

function showPhotos(data) {
    console.log(data)
    photosArray = data.photos.photo

    console.log(assembleImageSourceURL(photosArray[0]))
    }    
 
function processResponse(response) {
    let responsePromise = response.json()
    responsePromise.then(showPhotos)
}

function requestPhotos(location) {
    console.log("Requesting photos near " + location.latitude + ", " + location.longitude)

    let apiUrl = 'https://shrouded-mountain-15003.herokuapp.com/https://api.flickr.com/services/rest/?api_key=0e75b261658603ff1255d22329724698' + 
    '&format=json&nojsoncallback=1&method=flickr.photos.search' + 
    '&safe_search=1&per_page=5' +
    '&lat=32.8050084&lon=-96.4784377&text=cats'

    let fetchPromise = fetch(apiUrl)
    fetchPromise.then(processResponse)
}

function useCurrentLocation(pos) {
    console.log("Using actual location")
    console.log(pos)
    requestPhotos(pos.coords)
}

function useFallbackLocation () {
    console.log('Using fallback location')
    requestPhotos(fallbacklocation)
}

navigator.geolocation.getCurrentPosition(useCurrentLocation, useFallbackLocation, options)
