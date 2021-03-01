let state = false;


//send state when content ask
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == "getState")
        sendResponse({enabled: state});
});

//switch on / off
browser.browserAction.onClicked.addListener((tab) => {

  state = !state;
 
  function sendMessageToTabs(tabs) {
    
    for (let tab of tabs)
    {
      browser.tabs.sendMessage(
        tab.id,
        {enabled: state}
      );
    }
  
  }

  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendMessageToTabs);


  browser.browserAction.setIcon({path: state ? './icons/on.png' : './icons/off.png'});
  browser.browserAction.setTitle({title: state ? 'enabled' : 'disabled'});

});
