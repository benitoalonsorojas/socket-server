import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';

export const usersConnect = new UsuariosLista();

export const desconectar = (client: Socket, io:socketIO.Server) => {

  client.on('disconnect',()=>{
    console.log(`Cliente desconectado`);
    console.log(`Cliente borrado ${usersConnect.borrarUsuario(client.id)?.id}`);
    console.log(`lista tiene ${usersConnect.getList().length}`);
    
    io.emit('usuarios-activos',usersConnect.getList());
  })
}

export const mensaje = (cliente: Socket, io: socketIO.Server) => {

  cliente.on('mensaje',(payload)=>{
    console.log(payload);
    
    io.emit('mensaje-nuevo', payload )

  })
}

export const configUser = (client: Socket, io: socketIO.Server) => {

  client.on('configurar-usuario',(payload: { name: string }, callback: Function )=>{
    console.log(payload); 
    usersConnect.updateName(client.id, payload.name);
    io.emit('usuarios-activos',usersConnect.getList());
    callback({
      ok: true,
      mensaje: `Usuario ${ payload.name }, configurado`
    })
    console.log(`Nombre actualizado`);
    console.log(usersConnect.getList());
    
  })
}

export const getUsers = (client: Socket, io: socketIO.Server) => {

  client.on('obtener-usuarios', () => {
    
    io.in(client.id).emit('usuarios-activos',usersConnect.getList());     
    
  })
}

export const connectClient = ( client: Socket ) => {
  const user = new Usuario( client.id );
  usersConnect.agregar( user );
    
}


