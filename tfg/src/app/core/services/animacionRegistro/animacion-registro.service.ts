import * as THREE from 'three';
import { TextureEffect } from 'postprocessing'
import { Injectable, ElementRef, OnDestroy, NgZone, HostListener } from '@angular/core';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { THREEx } from 'threex.domevents/threex.domevents';
import { Interaction } from 'three.interaction';
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Color, TextureLoader } from 'three';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass'
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import * as POSTPROCESSING from 'postprocessing';
@Injectable({
  providedIn: 'root'
})
export class AnimacionRegistroService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private cloudParticles = [];
  private composer;
  private materialCloud;
  private textureloader;
  private frameId: number = null;

  constructor(private ngZone: NgZone) { }

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;


    // create the scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 1;
    this.camera.rotation.x = 1.16;
    this.camera.rotation.y = -0.12;
    this.camera.rotation.z = 0.27;
    this.scene.add(this.camera);

    let ambient = new THREE.AmbientLight(0x555555);
    this.scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xff8c19);
    directionalLight.position.set(0, 0, 1);
    this.scene.add(directionalLight);

    let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
    orangeLight.position.set(200, 300, 100);
    this.scene.add(orangeLight);

    let redLight = new THREE.PointLight(0x00FFFF, 50, 450, 1.7);
    redLight.position.set(100, 300, 100);
    this.scene.add(redLight);

    let blueLight = new THREE.PointLight(0x00FFFF, 50, 450, 1.7);
    blueLight.position.set(300, 300, 200);
    this.scene.add(blueLight);


    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene.fog = new THREE.FogExp2(0x03544E, 0.001);
    this.renderer.setClearColor(this.scene.fog.color);
    this.composer = new POSTPROCESSING.EffectComposer(this.renderer);

    this.materialCloud = new THREE.MeshLambertMaterial({transparent: true});
    const geometry = new THREE.PlaneBufferGeometry(500, 500);
    const manager = new THREE.LoadingManager();
    this.textureloader = new THREE.TextureLoader(manager);
    this.materialCloud.map = this.textureloader.load("../assets/nube.png");
    manager.onLoad = () => {
      
      for (let p = 0; p < 50; p++) {
        var cloud = new THREE.Mesh(geometry, this.materialCloud);
        cloud.position.set(Math.random()* 1000 -400, Math.random() * 500 -100, -300);
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 2 * Math.PI;
        (<any>cloud.material).opacity = 0.55;
        this.cloudParticles.push(cloud);
        this.scene.add(cloud);
      }

    };

    const manager2 = new THREE.LoadingManager();
    const textureloader2 = new TextureLoader(manager2);

    const textureEffect = new POSTPROCESSING.TextureEffect({
      blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
      texture: textureloader2.load("../assets/stars.jpg")
    });
    textureEffect.blendMode.opacity.value = 0.2;

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
      textureEffect
    );
    effectPass.renderToScreen = true;

    this.composer.addPass(new POSTPROCESSING.RenderPass(this.scene, this.camera));
    this.composer.addPass(effectPass);
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
    this.cloudParticles.forEach(p => {
      p.rotation.z -=0.001;
    });
    this.composer.render(0.1);
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }
}
