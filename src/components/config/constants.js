const ENV = 'local'
// const ENV = 'development'
// const ENV = 'live'

var API_BASEURL = "";
var BASENAME = "";

if(ENV === 'local'){
    
    BASENAME = "/";
    
    API_BASEURL = "http://localhost:3001";
    
}else if(ENV === 'development'){

    BASENAME = "/";
    API_BASEURL = "http://localhost:3001";
    
}else if(ENV === 'live'){

    BASENAME = "/";
    API_BASEURL = "http://localhost:3001";

}

export {
    BASENAME,
    API_BASEURL
}