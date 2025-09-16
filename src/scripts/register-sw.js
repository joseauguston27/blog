// Register service worker and handle installation prompt
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
        
        // Listen for the 'beforeinstallprompt' event
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
          // Prevent the default browser install prompt
          e.preventDefault();
          
          // Stash the event so it can be triggered later
          deferredPrompt = e;
          
          // Show the install button (you can customize this part)
          const installButton = document.getElementById('install-button');
          if (installButton) {
            installButton.style.display = 'block';
            
            installButton.addEventListener('click', () => {
              // Show the install prompt
              deferredPrompt.prompt();
              
              // Wait for the user to respond to the prompt
              deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                  console.log('User accepted the install prompt');
                } else {
                  console.log('User dismissed the install prompt');
                }
                // Reset the deferred prompt variable
                deferredPrompt = null;
              });
              
              // Hide the install button
              installButton.style.display = 'none';
            });
          }
        });
      })
      .catch(err => {
        console.error('ServiceWorker registration failed: ', err);
      });
  });
}
