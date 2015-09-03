# Simple node intercom.io library

[![Build Status](https://travis-ci.org/silktide/simple-node-intercom-io.svg)](https://travis-ci.org/silktide/simple-node-intercom-io)
[![Code Climate](https://codeclimate.com/github/silktide/simple-node-intercom-io/badges/gpa.svg)](https://codeclimate.com/github/silktide/simple-node-intercom-io)
[![Test Coverage](https://codeclimate.com/github/silktide/simple-node-intercom-io/badges/coverage.svg)](https://codeclimate.com/github/silktide/simple-node-intercom-io/coverage)

A simple wrapper for intercom.io client library written in ES6.

* Loads Intercom.io tracking JavaScript library.

## Usage example

First, install the library.

    npm install simple-node-intercom-io --save
   
To use:
    
    import intercom from 'simple-node-intercom-io';
    
    // Set key & setup must be called first.
    function setupAnalytics() {
        intercom.setKey(config.ANALYTICS.INTERCOM.KEY);
        intercom.setup();
    }
    
    // On login, boot intercom
    function loginToMyApp() {
        // name, email, created timestamp, meta
        intercom.boot('Bob', 'email@xyz.com', 00000000, {
            customUserProperty: 'value'
        });
    }
    
    // This function should be called whenever the page changes in your app so that intercom messages are displayed
    function appStateChange() {
        intercom.update();
    }
    
    // The same function can also be called to update the user's data if they change it
    function appStateChange() {
        intercom.update({
            email: 'newemail@xyz.com',
            customUserProperty: 'another value'
        });
    }
    
    // This function should be called to track an event
    function doSomethingInMyApp() {
        intercom.trackEvent('Event name/key', {
            customEventProperty: 'value'
        });
    }