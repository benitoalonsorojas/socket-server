import { Router, Request, Response } from "express";
import Server from "../class/server";

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




export default router;