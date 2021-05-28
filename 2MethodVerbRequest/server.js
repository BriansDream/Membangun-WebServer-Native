// Method atau Verb Request
// Web Server yg sudah dibuat sebelumnya sudah berhasil merespons dan menampilkan data dalam dokument HTML
// Namun Web Server yg dibuat belum mengenali sepenuhnya permintaan yg diberikan oleh client

// Maksudnya meskipun client meminta dgn path/method yg berbeda, server akan mrespon dgn data yg sama
// Server kita saat ini tidak perduli permintaan datang seperti apa, dia akan mengembalikan data yang sama 


const http = require('http');

const requestListener = (request,response) => {
    //  Dsini kita letakkan logika untuk menangani dan response permintaaan client
    
    response.setHeader('Content-type','text/html');
    response.statusCode = 200;
    response.end(`<h1> Hai HTTP Server!</h1>`);



    // parameter request merupakan instance dari http.clientRequest yg memiliki banyak property didalamnya
    // 1. Untuk mendapatkan nilai method dari request yg di lakukan client, gunakan property request.method
    const {method,hostName} = request;


    // Request merupakan objek yang menyimpan informasi terkait permintaan yg di kirim oleh client
    // Property method bernilai tipe method dalam bentukstring
    if(method === 'GET') {
        console.log("Client Meminta Data");
    }

    if(method === 'POST') {
        console.log("Client menambahkan / mengurangi data");
    }

    // dst.... l

   
}


const port = 80;
const hostName = 'localhost';
const server = http.createServer(requestListener);
// Listen() digunakan untuk membuat agar HTTP server selalu menanggapi permintaan dari user
server.listen(port,hostName,()=> {
    console.log(`Server berjalan pada http://${hostName}:${port}`);
})


