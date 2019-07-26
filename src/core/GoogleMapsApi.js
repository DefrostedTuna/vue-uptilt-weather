// This is a boolean that determines if the `window.google` object has been created.
let initialized = !!window.google

// When the resolver is called, it will extract the resolve and reject methods
// into the resolvePromise and rejectPromise variables. This allows the resolve
// method to be called during the `googleMapsCallback` method once the API is ready,
// or the reject method if there was an error.
let resolvePromise;
let rejectPromise; 
let resolver = new Promise((resolve, reject) => {
  resolvePromise = resolve;
  rejectPromise = reject;
});

export default function initApi(API_KEY) {
  // If Google Maps has already been initialized,
  // we want to return the current instance.
  if (initialized) {
    return resolver;
  }
  initialized = true; // Set to true so that we do not duplicate the script tag.

  // This will set up the callback to pass the Google Maps API object via the resolver.
  window.googleMapsCallback = () => resolvePromise(window.google);

  // Create the script tag used to pull the Google Maps API.
  let script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=googleMapsCallback`;
  // Reject the promise if there was an error initializing the Google Maps API object.
  script.onerror = rejectPromise;
  document.querySelector('head').appendChild(script);

  // Calling the resolver will wait for the Google Maps API 
  // to either resolve with the object, or reject due to an error.
  return resolver;
}