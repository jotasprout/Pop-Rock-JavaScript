if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(function(registration){
            console.log("Page controlled by SW w scope: ", registration.scope);
        }).catch(function(err){
            console.log("SW reg totally failed: ", err);
        });
};