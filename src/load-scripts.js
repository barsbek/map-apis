scriptsToLoad = [ env.CURRENT_EXAMPLE,
  ("https://maps.googleapis.com/maps/api/js?key=" + env.API_KEY + "&callback=initMap&libraries=drawing"),
]

window.addEventListener('DOMContentLoaded', () => {
  scriptsToLoad.forEach(src => {
    var scriptTag = document.createElement('script');
    scriptTag.src = src;
    document.body.appendChild(scriptTag);
  });
});
