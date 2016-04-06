((document) => {
  'use strict';

  function lazyLoadPolymerAndElements() {
    // Use native shadow dom if supported by browser-sync-binding
    window.Polymer = window.Polymer || { dom: 'shadow' };

    window.addEventListener('WebComponentsReady', () => {
      console.log('WebComponents are ready');
    });

    const onImportLoaded = () => {
      const loaderElement = document.getElementById('loader');
        // const transitionEndEvent = transitionEndEventName();
      const transitionEndEvent = ('WebkitTransition' in document.getElementById('loader').style)
        ? 'webkitTransitionEnd' : 'transitionend';
      loaderElement.addEventListener(transitionEndEvent, loaderElement.remove(), false);

      document.body.classList.remove('loading');
      document.body.classList.add('upgraded');
      console.log('Elements are upgraded!');
        // App is visible and ready to receive some data!
    };

    const bundle = document.querySelector('#bundle');

    if (bundle.import && (bundle.import.readyState === 'complete'
      || bundle.import.readyState === 'interactive')) {
      onImportLoaded();
    } else {
      bundle.addEventListener('load', onImportLoaded);
    }
  }

  const webComponentsSupported = ('registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template'));

  if (!webComponentsSupported) {
    const script = document.createElement('script');
    script.onload = lazyLoadPolymerAndElements;
    script.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
    document.head.appendChild(script);
  } else {
    lazyLoadPolymerAndElements();
  }
})(document);
