import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone} from '@angular/core';
import { FirstPersonControls } from 'node_modules/first-person-controls/src/first-person-controls.js'
import { MascotaService } from './mascota/mascota.service';
import { TokenService } from './tokenService/token-service.service';
import { DialogoService } from './dialogo/dialogo.service';
import { Mascota } from '../clases/clases';
import * as POSTPROCESSING from 'postprocessing';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class InterfazService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private frameId: number = null;
  private controls;
  private clock: THREE.Clock;
  private sphere: THREE.Mesh;
  private raycaster = new THREE.Raycaster();
  private pickPosition: any = {x: 0, y: 0};
  private pickedObject: any;
  private time : number;
  private mascotas: Array<Mascota> = [];
  private use: boolean;
  private composer;
  private star;
  private stars;
  private starGeo;
  private materialGlow: THREE.ShaderMaterial;
  private esferas: Array<THREE.Mesh> = [];
  private movimientoDelante: boolean;
  private movimientoDetras: boolean;
  private openButton: boolean;
  id: number;
  i: number;
  

  constructor(private ngZone: NgZone, private mascotaService: MascotaService, public tokenService: TokenService, private dialogoService: DialogoService, public deviceService: DeviceDetectorService) { }

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
    this.scene.background = new THREE.Color(0x0f0f0f);
    this.scene.fog = new THREE.FogExp2( 0xffffff, 0.2 );

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
      'varying float intensity;void main() {vec3 glow = vec3(0.95, 0.8, 0.45) * intensity;gl_FragColor = vec4( glow, 1.0 );}',
      
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
  
    if (this.tokenService.getIdUsuario() === null || this.tokenService.getIdUsuario() === undefined || this.tokenService.getIdUsuario() === 0) {
      this.mascotaService.getMascotasPorUser(this.id).subscribe(data => {
        for (let i = 0; i < data.length; i ++) {
          const geometry_sphere = new THREE.SphereGeometry(50, 32, 50 );
          this.sphere = new THREE.Mesh( geometry_sphere, this.materialGlow);
          this.sphere.position.x = 600*i;
          this.sphere.position.y = 0;
          this.sphere.position.z = 0;
          this.sphere.name = data[i].id.toString();
          this.scene.add(this.sphere);
          this.mascotas.push(data[i]);
          this.esferas.push(this.sphere);
        }
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
    else {
      this.mascotaService.getMascotasPorUser(this.tokenService.getIdUsuario()).subscribe(data => {
        for (let i = 0; i < data.length; i ++) {
          const geometry_sphere = new THREE.SphereGeometry(50, 32, 50 );
          this.sphere = new THREE.Mesh( geometry_sphere, this.materialGlow);
          this.sphere.position.x = 600*i;
          this.sphere.position.y = 0;
          this.sphere.position.z = 0;
          this.sphere.name = data[i].id.toString();
          this.scene.add(this.sphere);
          this.mascotas.push(data[i]);
          this.esferas.push(this.sphere);
        }
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
      
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

      this.movimientoDelante = false;
      this.movimientoDetras = false;
      this.openButton = false;

  }

  public animate(): void {
    window.addEventListener('resize', () => {
      this.resize();

    });
    if(this.deviceService.isDesktop())
      window.addEventListener('click', (event:MouseEvent) => {this.pick();});

    if(this.deviceService.isTablet() || this.deviceService.isMobile()) {
      window.addEventListener('click', (event:MouseEvent) => {
        if(this.openButton === true) {
          this.pick();
          this.openButton = false;
        }
      });    
    }
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

    if(this.movimientoDelante === true) {
      this.camera.position.x += 2;
    }

    if(this.movimientoDetras === true) {
      this.camera.position.x -= 2;
    }
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
        for (let i = 0; i < this.mascotas.length; i++) {
          if (parseInt(this.pickedObject.name) == this.mascotas[i].id && this.use == true) {
            this.controls.dispose();
            this.openMenu(this.mascotas[i]);
            console.log(this.mascotas[i]);
            this.controls.lookSpeed = 0;
            this.use = false;
          }
        }
      }
    }
  }

  public addRecuerdo(mascota: Mascota) {
    if (this.tokenService.getIdUsuario() === null || this.tokenService.getIdUsuario() === undefined || this.tokenService.getIdUsuario() === 0) {
      this.mascotaService.getMascotasPorUser(this.id).subscribe(data => {
        mascota = data[data.length-1];
        const geometry_sphere = new THREE.SphereGeometry(50, 32, 50 );
        this.sphere = new THREE.Mesh( geometry_sphere, this.materialGlow);
        if(this.esferas.length < 1)
          this.sphere.position.x = 10;
        else
          this.sphere.position.x = this.esferas[this.esferas.length-1].position.x + 600;
        this.sphere.position.y = 0;
        this.sphere.position.z = 0;
        this.sphere.name = mascota.id.toString();
        this.scene.add(this.sphere);
        this.mascotas.push(mascota);
        this.esferas.push(this.sphere);
        this.i ++;
        this.controls.bindEvents();
        this.use = true;
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
    else {
      this.mascotaService.getMascotasPorUser(this.tokenService.getIdUsuario()).subscribe(data => {
        mascota = data[data.length-1];
        const geometry_sphere = new THREE.SphereGeometry(50, 32, 50 );
        this.sphere = new THREE.Mesh( geometry_sphere, this.materialGlow);
        this.sphere.position.x = this.esferas[this.esferas.length-1].position.x + 600;
        this.sphere.position.y = 0;
        this.sphere.position.z = 0;
        this.sphere.name = mascota.id.toString();
        this.scene.add(this.sphere);
        this.mascotas.push(mascota);
        this.esferas.push(this.sphere);
        this.i ++;
        this.controls.bindEvents();
        this.use = true;
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
  }

  public deleteRecuerdo(id: Number) {
    for (let i = 0; i < this.esferas.length; i ++) {
      if(this.esferas[i].name == id.toString()) {
        console.log(id);
        console.log(this.esferas[i].name);
        this.mascotas.splice(i, 1);
        this.scene.remove(this.scene.getObjectByName(this.esferas[i].name));
        this.esferas[i].geometry.dispose();
        this.esferas[i] = null;
        this.esferas.splice(i, 1);
        console.log(this.esferas[i]);
        for (let j = 0; j < this.mascotas.length; j++) {
          if (this.mascotas[j].id == id) {
            this.mascotas.splice(j, 1);
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

  public openMenu(mascota: Mascota) {
    this.dialogoService.abrirDialogo('EditarMascotaComponent', mascota, {width: '1100px', height: 'auto'}).afterClosed().subscribe(data => {
      this.controls.bindEvents();
      this.use = true;
      this.controls.lookSpeed = 0;
    },
    error => console.log(error)
    );
  }

  public back() {
    this.controls.bindEvents();
    this.use = true;
    this.controls.lookSpeed = 0;
  }

  public stop() {
    this.controls.dispose();
    this.use = true;
    this.controls.lookSpeed = 0;
  }

  public delante(event: TouchEvent) {
    this.movimientoDelante = true;
    this.movimientoDetras = false;
  }

  public detras(event: TouchEvent) {
    this.movimientoDetras = true;
    this.movimientoDelante = false;
    
  }

  public openTouch(event: TouchEvent) {
    this.movimientoDelante = false;
    this.movimientoDetras = false;
    this.openButton = true;
    //this.pickTouch();
  }
}

