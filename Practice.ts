import http, {ServerResponse, IncomingMessage} from 'http'
import fs from 'fs'
import event from 'events'

const port: number = 7464

interface iData {
    id: number,
    name: string,
    phone: number,
    stack: string
}

interface iMessage {
    mesage: string;
    success: boolean
    data: null | {}  | {}[]

}

const set07 : iData[] = [
    {
        id : 7,
        name: 'Greater',
        phone: 84498886373,
        stack: 'Full-Stack'
    }
] 

const Server = http.createServer((req: IncomingMessage, res:ServerResponse<IncomingMessage> )=>{
    res.setHeader("Content-Type", 'Apllication/Json');
    const {method, url } = req
    let status: number = 404;

    let response : iMessage = {
        mesage: 'failed',
        success: false,
        data: null
    }

    const Container: any = []

    req.on ('data', (chink: any)=>{
        Container.push(chink)
    })

    req.on('end', ()=>{
        if(url  === '/'&& method === 'GET'){
            status = 200
            response.mesage = 'Success';
            response.success = true;
            response.data = set07;
            res.write(JSON.stringify((response)));
            res.end()
        }

        if (url === '/' && method === 'POST'){
            status = 201
            const body = JSON.parse(Container)
            set07.push(body)
            response.mesage = 'Success';
            response.success = true;
            response.data = set07;
            res.write(JSON.stringify((response)));
            res.end()
        }
    })

})


Server.listen (port, ()=>{
    console.log(`Server is up and running on port: ${port}`);
    
})