import fetchIntercept from 'fetch-intercept';

export const interceptor = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        console.log(url, config)
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        console.log(error)
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the reponse object
        console.log(response)
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        console.log(error)
        return Promise.reject(error);
    }
});

// Unregister your interceptor
//unregister();