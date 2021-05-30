// Response Body
// Header response menampung informasi terkait respon yang diberikan oleh server
// Informasi dapat berupa status respon, mimetypes, tanggal atau informasi lain
// Walaupun bisa memberikan informasi apapun, namun tidak semua informasi cocok disimpan di header.
// Informasi pada header hanya sebagai meta data atau informasi yg menjelaskan tentang sebuah data lain (data utama).

// Selain Header, HTTP Response juga membawa body
// didalam body inilah data content seharusnya disimpan
// Objek response pada parameter response adalah instance dari http.serverResponse dimana ia merupakan writeablestream
// Cara writeablestreamlah yang digunakan untuk menulis data pada body response

// Method end pada writeable stream dapat digunakan untuk menulis data terakhir sebelum proses penulisan diakhiri



// 1 Membuat web server menggunakan core module http
const http = require('http');


// 3 Custom Callback function createServer
const requestListener = (request,response) => {
    // Request digunakan untuk mendapatkan data yang di request oleh CLient
    // Response digunakan untuk menanggapi request yang dilakukan oleh client

    // 4 Menangani method/http verb yang direquest oleh client
    // Objek request merupakan instance dari http.clientRequest, terdapat property didalam objek request yang bisa digunakan untuk mendapat informasi request yang dilakukan oleh client
    const {method,url} = request;
 
    // 6. Menangani URL / Routing Request
    // Menentukan respon server berdasarkan path atau URL yang diminta oleh Client
    if(url === '/') {
    // Nilai dari property method adalah http verb/method itu sendiri tetapi dalam bentuk String
    if(method === "GET") {
        // 7. Menangani response Status Code, kode pada response status berisikan informasi apakah sebuah request berhasil atau gagal dilakukan
        response.statusCode = 200;
        response.setHeader('Content-type','application/json');
        response.setHeader('X-Powered-by','NODE JS');
        // Akhir, karena response.end() menerima string (buffer) maka perlu mengubah objek Javascript menjadi JSON String
        response.end(JSON.stringify({message: `Halaman ${url} ditemukan`})); 
    } else {
        response.statusCode = 400;
        response.setHeader('Content-type','application/json');
        response.end(`{'message':'Halaman ${url} tidak dapat diakses menggunakan ${method} ini'}`)
    }

    } else if(url === '/about') { 
            if(method === 'GET') {
                    response.statusCode = 200;
                    response.setHeader('Content-type','application/json');
                    response.end(`{'message': 'Ini Halaman About menggunakan method ${method}'}`);
            } else if(method === "POST") {
                    // 5 Menangani Body Request, ketika client menambahkan/mengubah data menggunakan method POST/PUT
                    // http.clientRequest merupakan turunan dari Readable Stream (membaca berkas bagian per bagian)
                    // So, untuk menangani body request kita dapat menggunakan teknik stream dengan memanfaatkan eventEmitter
                    // Untuk melakukan event ketika client melakukan body request
                    // var body, digunakan sebagai BUFFER (menyimpan data sementara sampai data tersebut di konsumsi (teknik stream))
                    let body = [];
                    // untuk mendapatkan data menggunakan event data dan end
                    request.on('data', (chunk) => {
                        body.push(chunk);
                    })
                        // event end dibangkitkan ketika proses stream data sudah selesai
                    request.on('end', () => {
                        // Ubah data pada Buffer body kedalam bentuk String agar dapat di konsumsi
                        body = Buffer.concat(body).toString();
                        // data masih dalam bentuk JSON agar dapat digunakan sebagai objek, kita parsing datanya menggunakan JSON.parse()
                        const {name} = JSON.parse(body);
                        response.statusCode = 200;
                        response.setHeader('Content-type','application/json');
                           // Akhir, karena response.end() menerima string (buffer) maka perlu mengubah objek Javascript menjadi JSON String
                        response.end(JSON.stringify({message: `${name} Ini Halaman About menggunakan method ${method}`}));
                    })

            } else {
                response.statusCode = 400;
                response.setHeader('Content-type','application/json');
                   // Akhir, karena response.end() menerima string (buffer) maka perlu mengubah objek Javascript menjadi JSON String
                response.end(JSON.stringify({message: `Tidak dapat diakses menggunakan method ${method}`}));
            }

    } else {
        response.statusCode = 404;
        response.setHeader('Content-type','application/json');
        response.end(`{'message': 'Halaman yang anda cari tidak ada ${url}'}`);
    }

}

const port = 5000;
const hostName = 'localhost';

// 2 Method createServer digunakan untuk membuat HTTP Server yg merupakan instance dari http.server
const server = http.createServer(requestListener);
// Setiap instance dari http.server memiliki method listen()
// digunakan agar server selalu menanggapi request yang dilakukan client
server.listen(port,hostName, () => {
    // Listening listener, callback function yg dijalankan ketika server sedang berjalan
    console.log(`Server berjalan di http://${hostName}:${port}`);
});