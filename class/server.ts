import express from 'express';
import { SEVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from "http";
import * as socket from "../socket/socket";


export default class Server{
  private static _instance: Server;

  public app: express.Application;
  public port: number;

  public io: socketIO.Server;
  private httpServer:http.Server;

  private constructor(){
    this.app = express();
    this.port = SEVER_PORT;

    this.httpServer = new http.Server( this.app );
    this.io=require("socket.io")(this.httpServer, {
      cors: {
          origin: true,
          credentials: true
        },            
    });

    this.escucharSocket();
  }

  public static get instance() : Server {
    return this._instance || ( this._instance = new this() );
  }

  private escucharSocket(){
    console.log(`Escuchando conexiones - sockets`);
    this.io.on('connect', client => {
      console.log(`Cliente conectado`);

      socket.mensaje(client,this.io);
      socket.desconectar(client);
      
    }); 
  }

  start( callback: Function ){
    this.httpServer.listen( this.port, callback() );
  }
}