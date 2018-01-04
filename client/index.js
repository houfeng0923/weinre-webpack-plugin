var scriptElements = document.getElementsByTagName("script");

var scriptUrl;
if(typeof __resourceQuery === "string" && __resourceQuery) {
    scriptUrl = __resourceQuery.substr(1);
}

if(scriptUrl && scriptElements.length) {
    var script = document.createElement('script');
    script.src = scriptUrl;
    scriptElements[0].parentNode.insertBefore(script, scriptElements[0]);
}

