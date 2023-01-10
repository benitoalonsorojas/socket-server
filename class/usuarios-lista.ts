import { Usuario } from "./usuario";

export class UsuariosLista {
  private lista:Usuario[] = [];

  constructor() {}

  public agregar(usuario: Usuario) {

    this.lista.push( usuario );
    console.log( `Se ha agrefgado un cliente` );
    console.log(this.lista);
    
    return usuario;
  }

  /**
   * actualizarNombre
   */
  public updateName( id: string, name: string ) {

    for (const usuario of this.lista) {
      if ( usuario.id === id) {
        usuario.name = name;
        break;
      }
    }

    console.log(`========== Actualizando usuario ==========`);
  }

  public getList() {
    return this.lista;
  }

  public getUsuario( id: string){
    return this.lista.find( usuario => usuario.id === id );
  }

  public getUsuariosInRoom( room: string ){
    return this.lista.filter( usuario => usuario.room === room );
  }
  
  /**
   * borrarUsuario
   */
  public borrarUsuario( id: string) {
    const tempUsuario = this.getUsuario(id);

    this.lista = this.lista.filter( usuario => usuario.id !== id);

    return tempUsuario;
  }
}