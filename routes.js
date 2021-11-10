const fs = require('fs');

const requestHandler = (req,res) => {
    if(req.url == "/"){
        res.write('<html><head><title></title></head><body><form action="/create-user" method="POST"><label>Enter your user</label><input type="text" name="message"><button type="submit">submit</button></form></body></html>')
        return res.end();
    }
    else if(req.url == "/user"){
        fs.readFile("listuser.txt","utf8",(err,data) => {
            
            if(data === "") {res.write('<html><head><title></title></head><body><h1>No user Found</h1><a href="/">adduser</a></body></html>')}
            else{
                const listuser = data.split("/n");
                listuser.pop()
                res.write('<html><head><title></title></head><body><h1>User Lists</h1></br>')
                res.write("<ul>")
                listuser.forEach((user,index) => {
                res.write(`<li>${user}</li>`)
                    
                })
                res.write('</ul></br><form method="POST" action="/deleteFile" ><button type="submit">clear file data</button></form></br><a href="/">addAnotherUser</a></body>')
                res.write('</html>')
            }
        })
       
    }
    else if(req.url == "/create-user" && req.method == "POST"){
        const data = [];
        req.on('data', chunk => data.push(chunk));
        return req.on('end', () => {
            const parserBody = Buffer.concat(data).toString();
            fs.appendFile("listuser.txt",parserBody.split("=")[1]+'/n',err=>{
            res.statusCode = 320;
            res.setHeader('Location',"/");
            res.writeHead('301',{'Location':"/user"})
            return res.end();
            })

        })
    }
    else if(req.url == "/deleteFile" && req.method == "POST"){
        fs.truncate("listuser.txt",0,err => {
            res.writeHead('301',{'Location':"/user"})
            return res.end();
        })

    }

}

exports.handleRequest = requestHandler;