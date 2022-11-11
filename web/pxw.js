if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {
        scope: './'
    })
        .then(function (registration) {
            console.log('Service Worker Registered');
        });
    navigator.serviceWorker.ready.then(function (registration) {
        console.log('Service Worker Ready');
    });
}

/*
var deferredPrompt;
window.addEventListener('beforeinstallprompt', function (e) {
    console.log('beforeinstallprompt Event fired');
    //e.preventDefault();
    deferredPrompt = e;
    return false;
});


btnAddToHomeScreen.addEventListener('click', function () {
    if (deferredPrompt !== undefined) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (choiceResult) {
            console.log(choiceResult.outcome);
            if (choiceResult.outcome == 'dismissed') {
                console.log('User cancelled home screen install');
            } else {
                console.log('User added to home screen');
            }
            deferredPrompt = null;
        });
    }
});
*/