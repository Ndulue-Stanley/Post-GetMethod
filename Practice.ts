
import http, { IncomingMessage, ServerResponse } from "http";
import event from "events";
const port: number = 7587;

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
  
];

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "Application/Json");
    const { method, url } = req;
    let status: number = 404;

    let response: iMessage = {
      message: "failed",
      success: false,
      data: null,
    };
    const container: any = [];
    req
      .on("data", (chunk: any) => {
        container.push(chunk);
      })
      .on("end", () => {
        if (url === "/" && method === "GET") {
          status = 200;
          response.message = "Success";
          response.success = true;
          response.data = set08;
          res.write(JSON.stringify({ response, status }));
          res.end();
        }

      
        if (url === "/" && method === "POST") {
          status = 201;
          const body = JSON.parse(container);
          set08.push(body);
          response.message = "SUCCESSFULLY appended";
          response.success = true;
          response.data = set08;
          res.write(JSON.stringify({ response, status }));

          res.end();
        }
      });
  }
);

server.listen(port, () => {
  console.log("Server is up and running");
});