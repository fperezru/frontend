import { AdminConfigComponent } from 'src/app/pantallas/admin-config/admin-config.component';

export class Persona {
    id?: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    fechaNacimiento: Date;
    fechaDefuncion: Date;
    relacion: string;
    descripcion: string;
}

export class Mascota {
    id?: number;
    nombre: string;
    especie: string;
    descripcion: string;
}

export class Viaje {
    id?: number;
    lugar: string;
    descripcion: string;
}

export class OtrosRecuerdos {
    id?: number;
    tipo: string;
    descripcion: string;
}

export class Diario {
    id?: number;
    titulo: string;
    fecha: Date;
    diario: string;
}

export class Informacion {
    id?: number;
    titulo: string;
    contenido: string;
    usuario: Usuario;
    tipo: Tipo;
}

export class Tipo {
    id?: number;
    tipoNombre: string;
}

export class Rol {
    id?: number;
    rolNombre: string;
}

export class Usuario {
    id?: number;
    nombre: string;
    nombreUsuario: string;
    apellidos: string;
    identificacion: string;
    fechaNacimiento: Date;
    domicilio: string;
    telefono: string;
    email: string;
    roles: Rol[];
    password: string;
    familiar: number;
    permiso: boolean;
}

export class Localizacion {
    id?: number;
    latitud: number;
    longitud: number;
}

export class JwtModel {
    token: string;
    type: string;
    nombreUsuario: string;
    authorities: string[];
}

export class NuevoUsuario {
    nombre: string;
    nombreUsuario: string;
    apellidos: string;
    identificacion: string;
    fechaNacimiento: Date;
    domicilio: string;
    telefono: string;
    email: string;
    roles: string[];
    password: string;
    familiar: number;
    permiso: boolean

    constructor(nombre: string, nombreUsuario: string, apellidos: string, identificacion: string, fechaNacimiento: Date, domicilio: string, telefono: string, email: string, password: string, roles: string[], familiar: number, permiso: boolean) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.apellidos = apellidos;
        this.identificacion = identificacion;
        this.fechaNacimiento = fechaNacimiento;
        this.domicilio = domicilio;
        this.telefono = telefono;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.familiar = familiar;
        this.permiso = permiso;
    }
}

export class LoginUsuario {
    id: number
    nombreUsuario: string;
    password: string;
    constructor(nombreUsuario: string, password: string) {
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }
}