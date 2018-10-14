var weinreUrl;

// async load weinreUrl
require.ensure([], function(require) {
  insert(require('./getWeinreUrl.js'));
});

function insert(url) {
  var firstScript = document.getElementsByTagName("script")[0];
  var script = document.createElement('script');
  script.async = true;
  script.src = url;
  firstScript.parentNode.insertBefore(script,firstScript);
}
