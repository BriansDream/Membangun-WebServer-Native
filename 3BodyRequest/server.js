const http = require('http');



// Custom CallbackFunction
const requestListener = (request,response) => {

    // Objek response digunakan untuk menanggapi request yg dikirimkan oleh client
    // Menentukan data yang diberikan,format dokument yang digunakan, kode status dll
    response.setHeader('Content-type','text/html');
    response.statusCode = 200;
    // response.end(`<h1> Hai </h1>`);

    // Objek request digunakan untuk mendapatkan informasi mengenai method, path, format dokument yg di request oleh client
    // terdapat property dari objek request yang dapat digunakan untuk mendapatkan informasi tersebut
    // parameter request merupakan instance dari http.clientRequest yang memiliki banyak property didalamnya
    const {method} = request;
    // Nilai dari property method adalah HTTP Method dalam bentuk String
    if(method === 'GET') {
            console.log("Client meminta data");
    }

    // Data di body didapatkan dengan teknik stream, teknik ini memanfaatkan eventEmitter untuk mengirimkan bagian - bagian datanya
    // http.clientRequest merupakan turunan dari readableStream
    // Event 'Data' dan 'end' yang digunakan untuk mendapatkan data pada body
    if(method === 'POST') {
        // Untuk menampung Buffer pada Stream
        let body = [];
        request.on('data',(chunk) => {
            body.push(chunk);
        });
        // Ketika proses Stream berakhir, maka event 'end' akan terbangkitkan
        // Mengubah variable body yg sebelumnya menampung buffer menjadi data sebenarnya dalam bentuk string
        request.on('end', () => {
            body = Buffer.concat(body).toString();

            // Gunakan JSON.parse() untuk mengubah JSON String, menjadi javascript objek()
            const {name} = JSON.parse(body);

            // Hal ini diperlukan karena data body siap dikonsumsi hanya ketika event end telah di bangkitkan
            // Server tidak akan mengirimkan response bila proses stream belum selesai.
            response.end(`<h1> Hai, ${body}! </h1>`);
        })
    }
}

// Method createServer digunakan untuk membuat http server yg merupakan instance dari http.server
const server = http.createServer(requestListener);

// Setiap instance dari http.server memiliki method listen()
// Listen() berfungsi  agar server selalu menanggapi request dari client
const port = 80;
const hostName = 'localhost'
server.listen(port,hostName, () => {
    console.log(`Server sedang berjalan di http://${hostName}:${port}`);
})

