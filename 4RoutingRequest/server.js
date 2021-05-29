// Routing Request 
// Ketika menangani request, hal yang perlu di cek selain method adalah URL atau Alamat yang di tuju dari request tersebut


const http = require('http');



const requestListener = (request,response) => {

    response.setHeader('Content-type','text/html');
    response.setCode = 200;

    const{method,url} = request;


    // if(method === 'GET') {
    //     console.log("Client Meminta data")
       
        if(url === '/') {
            if(method === 'GET') {
            response.end(`<h1> Ini adalah HomePage </h1>`);
        } else {
            response.end(`<h1> Halaman tidak dapat diakses dengan ${method} Request`);
        }
    } else if(url === '/about') {
        if(method === 'GET') {
            response.end(`<h1> Ini adalah About </h1>`);
        } else if (method === 'POST') {
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            })
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {nama} = JSON.parse(body);
                response.end(`<h1> Halo ${nama} Ini adalah Halaman About </h1>`);
            });
        } else {
            response.end(`Halaman tidak dapat diakses dengan ${method}`);
        }
    } else {
        response.end(`<h1>Halaman tidak ditemukan !</h1>`);
    }


}
     

const port = 5000;
const hostName = 'localhost';

const server = http.createServer(requestListener);
server.listen(port,hostName,5,()=> {
    console.log(`Server sedang berjalan http://${hostName}:${port}`);
});