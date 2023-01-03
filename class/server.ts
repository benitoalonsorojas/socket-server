import express from 'express';
import { SEVER_PORT } from '../global/environment';

export default class Server{
  public app: express.Application;
  public port: number;

  constructor(){
    this.app = express();
    this.port = SEVER_PORT;
  }

  start( callback: Function ){
    this.app.listen( this.port, callback );
  }
}