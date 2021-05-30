const http = require('http');
// Custom Callback Function
const requestListener = (request,response) => {
       // Response, digunkan untuk menanggapi request dari client
       response.setHeader('Content-type','text/html');
  
   
    // Objek Request merupakan instance dari http.clientRequest
    // Didalam objek request terdapat property yang dapat
    // Digunakan untuk mendapatkan informasi request yg dilakukan oleh client
    const {method,url} = request;
    if(url === '/') {
        if(method === 'GET') {
            response.statusCode = 200;
            response.end(`<h1> Homepage Brians Dream </h1>`);      
        } else {
            response.statusCode= 400;
            response.end(`Halaman tidak dapat diakses dengan ${method} request`);
        }
    
    } else if(url === '/about') {
        if(method === 'GET') {
            response.statusCode = 200;
            response.end(`<h1> Halo ini adalah halaman about </h1>`);
        } else if(method === 'POST') {
            // array digunakan sebagai Buffer (memory penyimpanan sementara) yang digunakan oleh teknik stream sampai data tersebut bisa di konsumsi
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            });
            request.on('end', () => {
                        body = Buffer.concat(body).toString();
                        const {name} = JSON.parse(body);
                        response.statusCode = 200;
                        response.end(`<h1> Hai ${name} Ini adalah Halaman About`)
            });
        } else {
            response.statusCode = 400;
            response.end(`<h1> halaman tidak dapat diakses dengan ${method} request`);
        }
    } else {
        response.statusCode = 404;
        response.end(`<h1> Halaman tidak ditemukan </h1>`);
    }


    // if(method === 'POST') {
    //     // http.clientRequest merupakan turunan dari Readable Stream
    //     // Untuk mendapatkan data body yang di request client kita menggunakan teknik stream dan memanfaatkan eventEmitter
    //     // Event 'data' dan 'end'lah yang digunakan untuk mendapatkan data body
    //     let body = [];
    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });

    //     request.on('end',()=> {
    //             body = Buffer.concat(body).toString();
    //             const {name} = JSON.parse(body);
    //             response.end(`Hai ${name} Kamu menambahkan data dengan Method ${method}`);
    //     });
    // }




 
}

const port = 5000;
const hostName = 'localhost';

const server = http.createServer(requestListener);
server.listen(port,hostName, () => {
    console.log(`Server berjalan di http://${hostName}:${port}`);
})