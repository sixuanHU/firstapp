//1. registrer le sw
function registerServiceWorker() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
    // enregistrement du fichier 'service-worker.js' présent à la racine de l'application
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
      swRegistration = reg;
      subscribeUsertoPush();
    }).catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  }
}


//4.navigaeur s'inscrit au Push Servere
function subscribeUsertoPush(){
  const applicationServerPublicKey='BJ4UrV-dNtMEd4RTRRcvSgrqBNcy5V-1Uq7Ozi-drQJ5AyBt7b-RUoW6tiMAlZq7Qhs8YYjMeuM67jxKDJ_aTIE';
  // privateKey : x5c69f_uPi-XcFgzlNNP5isEl1d9gF_aJxTFFawIouA
  const applicationServerKey=urlB64ToUint8Array(applicationServerPublicKey);
  const option ={
    userVisibleOnly:true,  // in case devs do nasty things without informing the user
    applicationServerKey:applicationServerKey
  }
    swRegistration.pushManager.subscribe(option)
    .then(function(pushSubscription){
    console.log('Receiveddd PushSubscription:',JSON.stringify(pushSubscription)); // all the required information needed to send a push messages to that user
    console.log('tu marche ?');
//call the function of step 5

    sendSubscriptionToBackEnd(pushSubscription);
    console.log("tu marche ?");
    return pushSubscription;
  }).catch(function(err){
    console.log('Failed to subscribe the user:',err);
  })
}


//5.send our subscription to a backend
//aka:sauvegarde de l'inscription dans le serveur applicatif
function sendSubscriptionToBackEnd(pushSubscription) {

  return fetch('/register-to-notification/', {
    method: 'post',
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pushSubscription)
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Bad status code from server.');
    }
    console.log("yayyyy");
    return response.json();

  })
  .then(function(responseData) {
    if (!(responseData.data && responseData.data.success)) {
      throw new Error('Bad response from server again.');
    }
  });
}

//function support
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
