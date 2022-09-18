var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer((req, res)=>{
  /* Al verificar si la url es igual a /api, si lo es, devolverá la matriz de los beatles en formato
  json. */
  if(req.url === '/api') {  
    res.writeHead(200, {'Content-Type': 'application/json'})
    return res.end(JSON.stringify(beatles))
  }

  if(req.url.substring(0, 5) === '/api/') {
    const beatle = req.url.split('/').pop()
    const found = beatles.find(el => encodeURI(el.name.toLowerCase() === beatle.toLowerCase()))
    if(found) {
      res.writeHead(200, {'Content-Type': 'application/json'})
      return res.end(JSON.stringify(found))
    } 
    else {
      res.writeHead(404, {'Content-Type': 'text/plain'})
      return res.end(`${beatle} not found`)
    }
  }

  if(req.url === '/') {
    fs.readFile('./index.html', (err, data) => {
      if(err) {
        res.writeHead(404, {'Content-Type': 'text-plain'})
        return res.end('Nada para mostrar')
      } else {
        res.writeHead(200, {'Content-Type': 'text-html'})
        return res.end(data)
      }
    })
  }

  if(req.url.length > 1) {
    const beatle = req.url.split('/').pop()
    const found = beatles.find(el => encodeURI(el.name).toLowerCase() === beatle.toLowerCase())
    if(found) {
      fs.readFile('./beatle.html', 'utf-8', (err, data) => {
        if(err) {
          res.writeHead(404, {'Content-Type': 'text-plain'})
          return res.end('Nada para encontrar')
        } else {
          data = data.replace('{name}', found.name)
          data = data.replace('{birthday}', found.birthdate)
          data = data.replace('{profilePic}', found.profilePic)
          res.writeHead(200, {'Content-Type': 'text-html'})
          return res.end(data)
        }
      })
    }
  }

}).listen(3001, () => console.log('puerto corriendo ok'));

