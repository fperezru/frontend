import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone} from '@angular/core';
import { FirstPersonControls } from 'node_modules/first-person-controls/src/first-person-controls.js'
import { PersonaService } from '../persona/persona.service';
import { TokenService } from '../tokenService/token-service.service';
import { DialogoService } from '../dialogo/dialogo.service';
import * as POSTPROCESSING from 'postprocessing';
import { Persona } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class InterfazPersonasService {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private frameId: number = null;
  private controls;
  private clock: THREE.Clock;
  private sphere: THREE.Mesh;
  private sphereAdd: THREE.Mesh;
  private raycaster = new THREE.Raycaster();
  private pickPosition: any = {x: 0, y: 0};
  private pickedObject: any;
  private time : number;
  private personas: Array<Persona> = [];
  private use: boolean;
  private composer;
  private star;
  private stars;
  private starGeo;
  private materialGlow: THREE.ShaderMaterial;
  private esferas: Array<THREE.Mesh> = [];
  id: number;
  i: number;

  constructor(private ngZone: NgZone, private personaService: PersonaService, public tokenService: TokenService, private dialogoService: DialogoService) { }

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;
    
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

    /*const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
    '/assets/a.png',
    '/assets/b.png',
    '/assets/c.png',
    '/assets/d.png',
    '/assets/e.png',
    '/assets/f.png',
    ]);
    texture.minFilter = THREE.LinearFilter;*/
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x00000f);
    this.scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );

    //const loader = new THREE.TextureLoader();
    //this.scene.background = loader.load("../assets/stars.jpg");  

    this.camera.position.y = 0;
    this.camera.position.x = -150;
    this.camera.position.z = 0;
    
    this.id = this.tokenService.getId();

    this.materialGlow = new THREE.ShaderMaterial({
      uniforms: {
        viewVector: {
          type: "v3",
          value: this.camera.position
        }
      }
      ,
      vertexShader: 
      'uniform vec3 viewVector; varying float intensity; void main() {gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));intensity = pow( dot(normalize(viewVector), actual_normal), 6.0 );}'
      ,
      fragmentShader: 
      'varying float intensity;void main() {vec3 glow = vec3(0, 1, 1) * intensity;gl_FragColor = vec4( glow, 1.0 );}',
      
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
  
    this.personaService.getPersonasPorUser(this.id).subscribe(data => {
      for (let i = 0; i < data.length; i ++) {
        const geometry_sphere = new THREE.SphereGeometry(50, 32, 50 );
        this.sphere = new THREE.Mesh( geometry_sphere, this.materialGlow);
        this.sphere.position.x = 100;
        this.sphere.position.y = 0;
        this.sphere.position.z = 900 * i;
        this.sphere.name = data[i].id.toString();
        //this.scene.add(this.sphere);
        this.personas.push(data[i]);
        this.esferas.push(this.sphere);
        this.scene.add(this.esferas[i]);
      }
    },
      (error: any) => {
        console.log(error)
      }
    );
    
    this.raycaster = new THREE.Raycaster();

    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.composer = new POSTPROCESSING.EffectComposer(this.renderer);
    
    this.controls = new FirstPersonControls( this.camera, this.renderer.domElement );
    this.controls.movementSpeed = 300;
    this.controls.lookSpeed = 0;

    this.use = true;

    const bloomEffect = new POSTPROCESSING.BloomEffect({
      blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
      kernelSize: POSTPROCESSING.KernelSize.SMALL,
      useLuminanceFilter: true,
      luminanceThreshold: 0.3,
      luminanceSmoothing: 0.75
    });
    bloomEffect.blendMode.opacity.value = 1.5;

    var effectPass = new POSTPROCESSING.EffectPass(
      this.camera,
      bloomEffect,
    );
    effectPass.renderToScreen = true;

    this.composer.addPass(new POSTPROCESSING.RenderPass(this.scene, this.camera));
    this.composer.addPass(effectPass);

    this.starGeo = new THREE.Geometry();
      for(let i=0;i<60000;i++) {
        this.star = new THREE.Vector3(
          Math.random() * 600 - 300,
          Math.random() * 18600 - 300,
          Math.random() * 600 - 300
        );
        this.star.velocity = 0;
        this.star.acceleration = 0.02;
        this.starGeo.vertices.push(this.star);
      }

      let sprite = new THREE.TextureLoader().load( '../assets/star.png' );
      let starMaterial = new THREE.PointsMaterial({
        color: 0xffff00,
        size: 0.7,
        map: sprite
      });

      this.stars = new THREE.Points(this.starGeo,starMaterial);
      //this.scene.add(this.stars);

      this.i = 0;

  }

  public animate(): void {
    window.addEventListener('resize', () => {
      this.resize();

    });
    window.addEventListener('click', (event:MouseEvent) => {this.pick();});
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {

        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }
    });
  }

  public render(): void {
    this.time *= 0.001;
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.controls.update(this.clock.getDelta());
    this.renderer.render( this.scene, this.camera );
    //this.composer.render(0.1);
    this.starGeo.vertices.forEach(p => {
      p.velocity += p.acceleration
      p.y -= p.velocity;
      
      if (p.y < -200) {
        p.y = 200;
        p.velocity = 0;
      }
    });
    this.starGeo.verticesNeedUpdate = true;
    this.stars.rotation.y +=0.002;
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );

    this.controls.handleResize();

  }

  public get_rand(): number {

    return Math.random() * (1 - 0) + 0;
    
  }

  public pick() {
    
    this.raycaster.setFromCamera(this.setPickPosition(event), this.camera);
    var intersects = this.raycaster.intersectObjects(this.scene.children);

    if(intersects.length && this.use == true) {
      this.pickedObject = intersects[0].object;
      console.log(this.pickedObject.name);
      if (Math.sqrt((this.camera.position.x - this.pickedObject.position.x) ** 2 + (this.camera.position.y - this.pickedObject.position.y) ** 2 + (this.camera.position.z - this.pickedObject.position.z) ** 2 ) < 120) {
        for (let i = 0; i < this.personas.length; i++) {
          if (parseInt(this.pickedObject.name) == this.personas[i].id && this.use == true) {
            this.controls.dispose();
            console.log(this.pickedObject.position.z);
            this.openMenu(this.personas[i]);
            console.log(this.personas[i]);
            this.controls.lookSpeed = 0;
            this.use = false;
          }
        }
      }
    }
  }

  public addRecuerdo(persona: Persona) {
    this.personaService.getPersonasPorUser(this.id).subscribe(data => {
      persona = data[data.length-1];
      console.log(data[data.length-1]);
      const geometry_sphere = new THREE.SphereGeometry(50, 32, 50 );
      this.sphereAdd = new THREE.Mesh( geometry_sphere, this.materialGlow);
      this.sphereAdd.position.x = 100;
      this.sphereAdd.position.y = 0;
      this.sphereAdd.position.z = 900 * (this.personas.length);
      console.log(this.sphereAdd.position.z);
      this.sphereAdd.name = persona.id.toString();
      this.scene.add(this.sphereAdd);
      this.personas.push(persona);
      this.esferas.push(this.sphereAdd);
      this.camera.position.x = this.sphereAdd.position.x;
      this.camera.position.y = this.sphereAdd.position.y;
      this.camera.position.z = this.sphereAdd.position.z;
      //this.scene.add(this.esferas[this.esferas.length-1]);
      this.i ++;
    },
      (error: any) => {
        console.log(error)
      }
    );
  }

  public deleteRecuerdo(id: Number) {
    for (let i = 0; i < this.esferas.length; i ++) {
      if(this.esferas[i].name == id.toString()) {
        this.personas.splice(i, 1);
        this.scene.remove(this.scene.getObjectByName(this.esferas[i].name));
        this.esferas[i].geometry.dispose();
        this.esferas[i] = null;
        this.esferas.splice(i, 1);
        for (let j = 0; j < this.personas.length; j++) {
          if (this.personas[j].id == id) {
            this.personas.splice(j, 1);
          }
        }
      }
    }
  }

  public getCanvasRelativePosition(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  public setPickPosition(event) {
    const pos = this.getCanvasRelativePosition(event);
    this.pickPosition.x = (pos.x / this.canvas.clientWidth) * 2 -1;
    this.pickPosition.y = (pos.y / this.canvas.clientHeight) * -2 +1;
    return this.pickPosition;
  }

  public clearPosition() {
    this.pickPosition.x = -100000;
    this.pickPosition.y = -100000;
  }

  public openMenu(persona: Persona) {
    this.dialogoService.abrirDialogo('EditarPersonaComponent', persona, {width: '1100px', height: 'auto'}).afterClosed().subscribe(data => {
      this.controls.bindEvents();
      this.use = true;
      this.controls.lookSpeed = 0.1;
    },
    error => console.log(error)
    );
  }

  public back() {
    this.controls.bindEvents();
    this.use = true;
    this.controls.lookSpeed = 0.1;
  }

  public stop() {
    this.controls.dispose();
    this.use = true;
    this.controls.lookSpeed = 0;
  }
}