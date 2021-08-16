


const doGetBlob = (photo) =>   {
    var url = "http://kreel.synology.me/mat-api/public" + photo;
    console.log(url)
    // Call fetch(url) with default options.
    // It returns a Promise object:
    var aPromise = fetch(url);

    // Work with Promise object:
    aPromise
        .then(function(response) {
            console.log("OK! Server returns a response object:");
            console.log(response);

            if(!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            // Get Blob Promise from response object:
            var myBlob_promise = response.blob();
            return myBlob_promise;
        })

        .catch(function(error)  {
            console.log("Noooooo! Something error:");
            console.log(error);
        });

}

export {doGetBlob}
