const visibleCanvas = document.getElementById("visibleCanvas");
const imageEditor = new ImageEditor(visibleCanvas);

const buttons = document.querySelectorAll("[data-effect]");
for (let i = 0; i < buttons.length; i++) {
    //more about the data attribute: https://developer.mozilla.org/en/docs/Web/Guide/HTML/Using_data_attributes
    buttons[i].addEventListener("click", function () { imageEditor.changeEffect(this.dataset.effect) });
}

document.getElementById("fileBrowser").addEventListener("change", function (ev) {
    //1. create the reader
    const reader = new FileReader();
    //2. attach events
    reader.addEventListener('load', function (ev) {
        const dataUrl = ev.target.result;

        const img = document.createElement("img");
        img.addEventListener("load", function () {
            imageEditor.changeImage(img);
        });
        img.src = dataUrl;
    });
    //3. start loading the file
    reader.readAsDataURL(ev.target.files[0]);
});

document.getElementById("btnSave").addEventListener("click", function () {
    imageEditor.saveImage();
})

// ServiceWorker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js')
        .then(function (registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed:', err);
        });
}

// Installation
// https://web.dev/codelab-make-installable/
const divInstall = document.getElementById("installContainer");
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('👍', 'beforeinstallprompt', event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    divInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        // The deferred prompt isn't available.
        return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    divInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
});