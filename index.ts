import Server from "./class/server";
import router from "./routes/routes";
import bodyparser from "body-parser";
import cors from "cors";

const server = Server.instance;

//BodyParser
server.app.use( bodyparser.urlencoded({ extended: true }) );
server.app.use( bodyparser.json() );

//CORS
//server.app.use( cors({ origin: true, credentials: true}))

server.app.use('/',router);

server.start(()=>{
  console.log(`Sever's running at the port ${ server.port }`);
})
