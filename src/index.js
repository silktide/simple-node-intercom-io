let loaded = false;
let key = null;
let injectedDoc = null;
let context = getGlobalContext();
let intercom = null;

/**
 * Set the Intercom API key
 *
 * @param newquay
 */
export function setKey(newquay) {
  key = newquay;
}

/**
 * Set the document, only used for passing
 * in a mock for testing.
 *
 * @param newDocument
 */
export function setDocument(newDocument) {
  injectedDoc = newDocument;
}

export function setIntercomFunction(intercomfn) {
  intercom = intercomfn;
}

/**
 * Get the document.  Allows us to inject a mock document
 * for testing outside a browser env.
 *
 * @returns {*|HTMLDocument}
 */
function getDocument() {
  return injectedDoc || document;
}

/**
 * Intercom library requires an intercom function
 * on the window.  This function allows us to test this
 * module outside of a browser environment.
 *
 * @returns {*}
 */
function getGlobalContext() {
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  return {};
}

/**
 * Load Intercom scripts from their site.
 *
 * @param source
 */
function loadExternalScript(source) {
  setTimeout(function () {
    const documentObj = getDocument();
    const firstScript = documentObj.getElementsByTagName('script')[0];
    let element = documentObj.createElement('script');
    element.type = 'text/javascript';
    element.async = true;
    element.src = source;
    firstScript.parentNode.insertBefore(element, firstScript);
  }, 1);
}

/**
 * Load intercom library as async file
 */
export function setup() {

  if (loaded) {
    return;
  }

  if (!key) {
    console.error('No key set for intercom, use setKey method to define it.');
    return;
  }

  intercom = context.Intercom;
  if (typeof intercom === 'function') {
    intercom('reattach_activator');
    //intercom('update', intercomSettings);
  } else {
    var i = function () {
      i.c(arguments)
    };
    i.q = [];
    i.c = function (args) {
      i.q.push(args)
    };
    context.Intercom = i;
    function l() {
      loadExternalScript('https://widget.intercom.io/widget/'+key);
    }

    if (context.attachEvent) {
      context.attachEvent('onload', l);
    } else {
      context.addEventListener('load', l, false);
    }
  }

  loaded = true;
}

/**
 * On page change, fire event to intercom
 */
export function changePage() {
  intercom('update');
}

/**
 * On login, fire event to Intercom
 */
export function logIn(name, email, created_at) {
  intercom('boot', {
    app_id: key,
    name: name,
    email: email,
    created_at: created_at
  });
}


export default {
  setup, logIn, setKey, changePage
};
