const nullthrows = (v) => {
  if (v == null) throw new Error("it's a null");
    return v;
}
    
function injectionCode(src) {
  const script = document.createElement('script');
  // This is why it works!
  script.src = src;
  script.onload = function() {
    console.log("injected " + src);
    this.remove();
  };
    
  // This script runs before the <head> element is created,
  // so we add the script to <html> instead.
  nullthrows(document.head || document.documentElement).appendChild(script);
}
    
function injectionJSON(obj, idName) {
  const json = document.createElement('object');
    json.setAttribute('id', idName);
    fetch(obj).then(function(res) {
      return res.text();
    }).then(function(txt) {
      json.innerHTML = txt;
      json.onload = function() {
        this.remove();
      };
      nullthrows(document.head || document.documentElement).appendChild(json);
    });
}

new Promise((resolve) => {
  injectionCode(chrome.runtime.getURL('/contents/ixa-skill_table.js'));
  return resolve();
}).then(() => {
  injectionCode(chrome.runtime.getURL('/contents/ixa-moko.user.js'));
  injectionCode(chrome.runtime.getURL('/contents/ixa-training.user.js'));
  injectionCode(chrome.runtime.getURL('/userscript/defense_formation_info.js'));
});