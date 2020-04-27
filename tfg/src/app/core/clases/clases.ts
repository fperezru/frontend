export class Persona {
    id?: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    fechaNacimiento: Date;
    fechaDefuncion: Date;
    relacion: string;
    descripcion: string;
    imagen1: string;
    imagen2: string;
    imagen3: string; 
    imagen4: string;
    video1: string;
    video2: string;
}

export class Mascota {
    id?: number;
    nombre: string;
    especie: string;
    descripcion: string;
    imagen1: string;
    imagen2: string;
    imagen3: string; 
    imagen4: string;
    video1: string;
    video2: string;

}

export class Viaje {
    id?: number;
    lugar: string;
    descripcion: string;
    imagen1: string;
    imagen2: string;
    imagen3: string; 
    imagen4: string;
    video1: string;
    video2: string;
}

export class OtrosRecuerdos {
    id?: number;
    tipo: string;
    descripcion: string;
    imagen1: string;
    imagen2: string;
    imagen3: string; 
    imagen4: string;
    video1: string;
    video2: string;
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
    email: string;
    roles: string[];
    password: string;

    constructor(nombre: string, nombreUsuario: string, email: string, password: string) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
        this.roles = ['user'];
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