// Web Server 
// Sebuah komputer yang dapat menangani dan menanggapi permintaan dari client

// Node. JS menyediakan core modules HTTP untuk membangun Web Server
// HTTP Module memiliki banyak member seperti objek, property, method yang berguna untuk melakukan hal terkait protokol HTTP

// Salah satu member yang penting adalah method http.createServer()
// Method ini berfungsi untuk membuat HTTP Server yang merupakan Instance dari HTTP.Server
// Method ini menerima 1 parameter custom callback yang digunakan sebagai requestListener
// Didalam requestListener inilah logika untuk menangani dan menanggapi sebuah request dituliskan

const http = require('http');

// Parameter Request : objek yang berisikan informasi terkait permintaan yang di kirim client
// Parameter Response: Object yang digunakan untuk menanggapi permintaan
// Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
const requestListener = (request,response) => {

// request
// dalam objek ini bisa melihat alamat yang diminta, data yang di kirim atau HTTP Methode yang digunakan client

// response
// melalui objek ini bisa menentukan data yang diberikan, format dokument yang diberikan, kode status atau informasi respon lainny
response.setHeader('Content-type','text/html');
response.statusCode = 200;
response.end(`<h1> Hello HTTP Server ! </h1>`);
// Kode diatas adalah contoh logika yg bisa ditulis dalam request listener
// requestListener akan menanggapi setiap permintaan dgn dokument HTML, kode status 200 dan menampilkan Konten Halo HTTP Server


}
// Bagaimana caranya agar server selalu sedia menangani permintaan yang masuk?
// Setiap instance dari HTTP.server memiliki method listen()
// Method ini yang membuat http.server selalu standby untuk menangani permintaan yg masuk dari client
// Setiap ada permintaan yg masuk, requestListener akan tereksekusi


const port = 5000;
const hostName = "localhost";

// method Listen() dapat menerima 4 parameter
// 1.Port(Number) : Jalur yg digunakan untuk mengakses HTTP Server
// 2. HostName(string) : Nama Domainm yg digunakan oleh HTTP Server
// 3. backlog(number): Maksimal koneksi yang dapat ditunda (pending) pada HTTP Server
// 4. ListeningListener(function) : Callback yang akan terpanggil ketika http server sedang bekerja(listening)


const server = http.createServer(requestListener);
server.listen(port,hostName,() => {
    console.log(`Server berjalan pada http://${hostName}:${port}`);
});
// console.log(server);