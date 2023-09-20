import http, {ServerResponse, IncomingMessage} from 'http'


const port: number = 5294;

interface iData {
    id: number;
    name: string;
    phone: number;
    stack: string;
  }
  
  interface iMessage {
    message: string;
    success: boolean;
  data: null | {} | {}[];
  }  

  const set08: iData[] = [
    {
      id: 1,
      name: "joan",
      phone: 8023474637,
      stack: "Full-Stack",
    },
    {
      id: 2,
      name: "Habib",
      phone: 8023474637,
      stack: "Full-Stack",
    },
    {
      id: 3,
      name: "Daniel",
      phone: 8023474637,
      stack: "Full-Stack",
    },
    {
      id: 4,
      name: "SEAN",
      phone: 8023474637,
      stack: "Full-Stack",
    },
    {
      id: 5,
      name: "joan",
      phone: 8023474637,
      stack: "Full-Stack",
    },
  ];

const Server = http.createServer((req:IncomingMessage, res: ServerResponse<IncomingMessage>)=>{
    res.setHeader('Content-type', 'Application/Json');
    const {method, url} = req
    let status: number = 404;

    let response: iMessage = {
        message: 'Failure',
        success: false,
        data: null
    }

    const container: any = []

    req.on('data', (chunk: any)=>{
        container.push(chunk)
    });
    req.on('end', ()=>{
        if(url === '/' && method === 'GET'){
            status = 200
            response.message = 'Done';
            response.success = true;
            response.data = set08;
            res.write(JSON.stringify({response, status}))
            res.end()

            if( url === '/' && method === "POST"){
                status = 201
                const body = JSON.parse(container);
                set08.push(body);
                response.message = "SUCCESSFULLY added";
                response.success = true;
                response.data = set08;
                res.write(JSON.stringify({ response, status }));
      
                res.end();

            }
            
            Server.listen(port, () => {
    console.log("Server is up and running");
  });
        }
    })
})