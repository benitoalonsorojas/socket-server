import { Router, Request, Response } from "express";
import Server from "../class/server";
import { usersConnect } from '../socket/socket';

const router = Router();

router.get('/mensajes', ( req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'All´s Ok!!'
  })
})

router.post('/mensajes', ( req: Request, res: Response) => {

  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const payload = {
    de,
    cuerpo
  }

  const server = Server.instance;
  server.io.emit( 'mensaje-nuevo',payload);

  console.log(req.body);
  

  res.json({
    ok: true,
    mensaje: 'All´s Ok!!',
    cuerpo,
    de

  })
})

router.post('/mensajes/:id', ( req: Request, res: Response) => {

  const cuerpo = req.body.cuerpo;
  const de     = req.body.de;
  const id     = req.params.id;

  const payload = {
    de,
    cuerpo
  }

  const server = Server.instance;
  server.io.in( id ).emit( 'mensaje-privado',payload)

  console.log(req.body);
  

  res.json({
    ok: true,
    mensaje: 'All´s Ok!!',
    cuerpo,
    de,
    id

  })
})

router.get('/usuarios', ( req: Request, res: Response) => {

  const server = Server.instance;

  server.io.fetchSockets()
    .then( ( _clients: any[] ) => {
      if( _clients.length >0 ) {
        
        let clients: string[] = [];
        
        _clients.forEach((ele:any)=>{
          clients.push(ele.id);
        })

        return res.json({
          ok:true,
          clients
        }) 

      } else {
        return res.json({
          ok: false,
          clients: []
        })
      }

    }) 
})

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', ( req: Request, res: Response) => {
  
  res.json({
    ok: true,
    clients: usersConnect.getList()
  }); 
  
})




export default router;