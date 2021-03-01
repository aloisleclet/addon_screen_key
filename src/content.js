const duration = 2000;


//enabled / disabled

let enabled = false;

//utils
function getState() {

  return browser.runtime.sendMessage({
    type: "getState",
  }).then(function(res) {
      return res.enabled;
  });

};

//new page loaded retrieve state
getState().then(function (res) {
  enabled = res;
});

//listen to browserAction click
browser.runtime.onMessage.addListener(res => {
  enabled = res.enabled;
});

//check state when change tabs
document.addEventListener('visibilitychange', function(e) {
  getState().then(function (res) {
    enabled = res;
  });
});

//inject css

let style = document.createElement('style');

style.innerHTML = `
  #output {
    position:fixed;
    width:100px;
    z-index:999999;
    top:10vh;
    right:64px;
  }
  
  kbd {
    border:1px solid gray;
    font-size:1.2em;
    box-shadow:1px 0 1px 0 #eee, 0 2px 0 2px #ccc, 0 2px 0 3px #444;
    -webkit-border-radius:3px;
    -moz-border-radius:3px;
    border-radius:3px;
    margin:25px;
    padding:1px 5px;

    float:right;
    background-color:white;
    display:table;
    transform:scale(2);

    transition:all ease 0.6s;
  }

`;

document.head.appendChild(style);

//create container
let output = document.createElement('div');

output.id = "output";

document.body.appendChild(output);

//when key press create element
document.addEventListener('keydown', function (e)
{
  if (!enabled)
    return;

  let kbd = document.createElement('kbd');

  kbd.innerHTML = e.key == ' ' ? 'Space': e.key;

  setTimeout(function () {
    kbd.style.opacity = 0;
   
    setTimeout(function () {
      kbd.remove(); 
    }, 600);

  }, duration);

  document.querySelector('#output').appendChild(kbd);

});
