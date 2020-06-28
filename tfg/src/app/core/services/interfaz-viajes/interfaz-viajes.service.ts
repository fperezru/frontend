import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone} from '@angular/core';
import { FirstPersonControls } from 'node_modules/first-person-controls/src/first-person-controls.js'
import { ViajeService } from '../viaje/viaje.service';
import { TokenService } from '../tokenService/token-service.service';
import { DialogoService } from '../dialogo/dialogo.service';
import * as POSTPROCESSING from 'postprocessing';
import { Viaje } from '../../clases/clases';
import { TrackballControls } from './TrackballControls';
import { country_data } from './country_data';
import { Tessalator3D } from './tessalator3d';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";




@Injectable({
  providedIn: 'root'
})
export class InterfazViajesService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private frameId: number = null;
  private controls;
  private tierra: THREE.Object3D;
  private mar;
  private geometry;
  private textureloader;
  private material: THREE.MeshLambertMaterial;

  constructor(private ngZone: NgZone, private viajeService: ViajeService, public tokenService: TokenService, private dialogoService: DialogoService) { }

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio( window.devicePixelRatio );

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 4500);
    this.camera.position.z = 100;

    this.scene.add(new THREE.AmbientLight(0x555555));

    var directionalLight1 = new THREE.DirectionalLight(0xaaaaaa, 0.5);
    directionalLight1.position.set(-1, 1, 1).normalize();
    this.scene.add(directionalLight1);

    var directionalLight2 = new THREE.DirectionalLight(0xaaaaaa, 0.5);
    directionalLight2.position.set(-1, 1, -1).normalize();
    this.scene.add(directionalLight2);

    var directionalLight3 = new THREE.DirectionalLight(0xaaaaaa, 0.5);
    directionalLight3.position.set(1, 1, -1).normalize();
    this.scene.add(directionalLight3);

    var directionalLight4 = new THREE.DirectionalLight(0xaaaaaa, 0.5);
    directionalLight4.position.set(1, 1, 1).normalize();
    this.scene.add(directionalLight4);

    var segments = 64;
    var radius = 0.995;
    var base_globe = 0;
    //var mar = null, tierra;

    this.tierra = new THREE.Object3D();
    this.tierra.scale.set(20, 20, 20);
    this.scene.add(this.tierra);

    const manager = new THREE.LoadingManager();
    this.textureloader = new THREE.TextureLoader(manager);
    this.mar = this.textureloader.load("../assets/sea.jpg");
    this.mar.wrapS = THREE.RepeatWrapping;
    this.mar.wrapT = THREE.RepeatWrapping;
    this.mar.repeat.set(16, 8);

    const geometry_sphere = new THREE.SphereGeometry(radius, segments, segments);
    this.material = new THREE.MeshLambertMaterial({
      transparent: true,
      depthTest: true,
      depthWrite: false,
      opacity: 0.95,
      map: this.mar,
      color: 0x6699ff
    });

    this.tierra.add(new THREE.Mesh(geometry_sphere, this.material));

    for (var name in country_data) {
      this.geometry = new Tessalator3D(country_data[name], 0);

      var continents = ["EU", "AN", "AS", "OC", "SA", "AF", "NA"];
      var color = new THREE.Color(0xff0000);
      color.setHSL(continents.indexOf(country_data[name].data.cont) * (1 / 7), Math.random() * 0.25 + 0.65, Math.random() / 2 + 0.25);
      var mesh = country_data[name].mesh = new THREE.Mesh(this.geometry, new THREE.MeshLambertMaterial({
          color: color
      }));
      mesh.name = "land";
      mesh.userData.country = name;
      this.tierra.add(mesh);
    }

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 2.0;
    this.controls.zoomSpeed = 1.0;
    this.controls.noZoom = false;
    this.controls.noPan = true;
    this.controls.staticMoving = false;
    this.controls.minDistance = 23.0;
    this.controls.maxDistance = 70.0;
    this.controls.dynamicDampingFactor = 0.1;
  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    window.addEventListener('resize', () => {
      this.resize();

    });
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
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.renderer.render( this.scene, this.camera );
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

}
