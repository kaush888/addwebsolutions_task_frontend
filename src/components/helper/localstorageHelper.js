// convert object to string and store in localStorage
function saveToLocalStorage(userData) {
    try {
        var user = { 
            "loggedIn": true, 
            "userData": userData,
            "token" : userData.token 
        }
        localStorage.setItem('blogUser', JSON.stringify(user));
    } catch (e) {
        console.warn(e);
    }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
    try {
        const user = localStorage.getItem("blogUser");
        if (user === null) return undefined;
        return JSON.parse(user);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

export {
    saveToLocalStorage,
    loadFromLocalStorage,
}