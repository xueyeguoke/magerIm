var http = require("http");  
http.createServer(function(request, response) {
    debugger;
    var a1=1;
    var a2=2;
    var a3=3;
    var a4=4;
    var a5=5;
    var a6=6;
    var a7=7;
    response.writeHead(200, {"Content-Type": "text/plain"});    
    response.write("Hello World");    
    response.end();  
}).listen(89);  
console.log("nodejs start listen 89 port!");  