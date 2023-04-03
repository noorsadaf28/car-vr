"use client"; // this is a client component 👈🏽

import Head from 'next/head'
import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, useTexture } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three";
import { MeshBasicMaterial } from 'three';
import tyreclose from './functions';


//interior sphre
function InteriorSphere() {
  const imageMap = useTexture("/images/interior.jpg");
  return (
    <mesh visible position={[0, 0, 0]}>
      <sphereGeometry args={[20, 30, 30]} />
      <meshBasicMaterial
        map={imageMap}
        side={THREE.DoubleSide}
        transparent
        roughness={0.1}
        metalness={0.1}
      />

    </mesh>
  );
}

//background sphere
function Sphere() {
  const colorMap = useTexture("/images/car-reflection.jpg");
  return (
    <mesh visible userData={{ test: "hello" }} position={[0, 0, 0]} castShadow>
      <sphereGeometry attach="geometry" args={[20, 30, 30]} />
      <meshStandardMaterial
        attach="material"
        map={colorMap}
        color="white"
        side={THREE.DoubleSide}
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}



//plane
function GroundPlane() {
  const colorMap = useTexture("/images/ground.png");
  return (
    <mesh visible receiveShadow={true} rotation={[-0.5 * Math.PI, 0, 3.5]} position={[0, 0, 0]} >
      <circleGeometry attach="geometry" args={[12, 20]} />
      <meshBasicMaterial
        attach="material"
        map={colorMap}
        color="white"

      />
    </mesh>
  );
}
//roof open

const fov = 69;
let aspectRatio;
// let aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 100;
let camera = new THREE.PerspectiveCamera(
  fov,
  aspectRatio,
  near,
  far
);
camera.position.set(6, 1, -1);

export default function Home() {
  var [rotation, setAutorotation] = useState(true);
  var [redCarVisibility, setRedCarVisibility] = useState(true);
  var [blueCarVisibility, setBlueCarVisibility] = useState(false);
  var [greyCarVisibility, setGreyCarVisibility] = useState(false);
  var [defaultMesh, setDefaultMesh] = useState(true);
  var [interiormesh, setInteriorMesh] = useState(false);
  //mdels
  useEffect(() => {

    if (window) {
      aspectRatio = window.innerWidth / window.innerHeight;

    }
    return () => {

    }
  }, [])

  const RedCar = () => {

    const gltf = useLoader(GLTFLoader, "/Cars/RedCar/scene.glb");
    return (
      <>
        <primitive object={gltf.scene} visible={redCarVisibility} />
      </>
    );
  };
  const BlueCar = () => {

    const gltf = useLoader(GLTFLoader, "Cars/BlueCar/scene3.glb");
    return (
      <>
        <primitive object={gltf.scene} visible={blueCarVisibility} />
      </>
    );
  };
  //gey car
  const GreyCar = () => {

    const gltf = useLoader(GLTFLoader, "Cars/GreyCar/scene.gltf");
    return (
      <>
        <primitive object={gltf.scene} visible={greyCarVisibility} />
      </>
    );
  };
  //functions



  function redCarOpen() {
    setRedCarVisibility(true),
      setBlueCarVisibility(false),
      setGreyCarVisibility(false),
      ColorPallete.classList.toggle('active')
  }
  function blueCarOpen() {
    setRedCarVisibility(false),
      setBlueCarVisibility(true),
      setGreyCarVisibility(false),
      ColorPallete.classList.toggle('active');
  }
  function greyCarOpen() {
    setRedCarVisibility(false),
      setBlueCarVisibility(false),
      setGreyCarVisibility(true),
      ColorPallete.classList.toggle('active')
  }

  //small sphere tyre
  function SmallSphere() {
    return (
      <mesh visible position={[1.3, 0.3, -2]} onClick={tyreOpen}>
        <sphereGeometry attach="geometry" args={[0.15, 32, 16]} />
        <meshBasicMaterial
          color="white"
          opacity={0.2}

        />

      </mesh>
    );
  }
  //tyrr
  const tyreOpen = () => {
    if (typeof window !== "undefined") {
      var tireDiv = document.querySelector('.info-container');
      var canvascont = document.querySelector('.canvas-container');
      var roofDiv = document.querySelector('.roof-container');

      return (
        tireDiv.style.display = 'flex',
        roofDiv.style.display = 'none'
        , canvascont.style.width = "1028px",
        setAutorotation(false),
        camera.position.set(6, 1, -1)


      )
    }



  }
  //small sphere roof
  function RoofSphere() {
    return (
      <mesh visible position={[0, 1.95, 0.1]} onClick={roofOpen}>
        <sphereGeometry attach="geometry" args={[0.15, 32, 16]} />
        <meshBasicMaterial
          color="white"
          opacity="0.5"
        />

      </mesh>
    );
  };


  const roofOpen = (e) => {
    if (typeof window !== "undefined") {
      var roofDiv = document.querySelector('.roof-container');
      var canvascont = document.querySelector('.canvas-container');
      var tireDiv = document.querySelector('.info-container');
      return (
        roofDiv.style.display = 'flex',
        tireDiv.style.display = 'none',
        canvascont.style.width = "1028px",
        setAutorotation(false),
        camera.position.set(1, 6, 0)
      );

    }


  };
  //closeDiv
  function closeDiv() {
    if (typeof window !== "undefined") {
      var roofDiv = document.querySelector('.roof-container');
      var canvascont = document.querySelector('.canvas-container');
      var tireDiv = document.querySelector('.info-container');
      return (
        roofDiv.style.display = 'none',
        tireDiv.style.display = 'none'
        , canvascont.style.width = "100%",
        setAutorotation(true)
      );
    }


  }
  function OpenSelector() {
    if (typeof window !== "undefined") {
      var ColorPallete = document.querySelector(".car-colors");
      return (
        ColorPallete.classList.toggle('active')
      );
    }

  }

  //interior button
  function openInterior() {
    if (typeof window !== "undefined") {
      var tireDiv = document.querySelector('.info-container');
      var roofDiv = document.querySelector('.roof-container');
      var interiorbutton = document.getElementById("interior");
      var exteriorbutton = document.getElementById("exterior");
      const sideBar = document.querySelector('.sidebar');
      var canvascont = document.querySelector('.canvas-container');

      return (
        camera.position.set(6, 1, 0),
        setDefaultMesh(false),
        setInteriorMesh(true),
        interiorbutton.style.display = "none",
        exteriorbutton.style.display = "flex",
        tireDiv.style.display = "none",
        roofDiv.style.display = "none",
        sideBar.style.display = "none",
        canvascont.style.width = "100%",
        setAutorotation(false)

      );
    }


  }
  //exterior button
  function openExterior() {
    if (typeof window !== "undefined") {
      var tireDiv = document.querySelector('.info-container');
      var roofDiv = document.querySelector('.roof-container');
      var interiorbutton = document.getElementById("interior");
      var exteriorbutton = document.getElementById("exterior");
      const sideBar = document.querySelector('.sidebar');

      return (
        setDefaultMesh(true),
        setInteriorMesh(false),
        interiorbutton.style.display = "flex",
        exteriorbutton.style.display = "none",
        tireDiv.style.display = "none",
        roofDiv.style.display = "none",
        sideBar.style.display = "flex"

      );
    }

  }
  //PlayRotation
  function PlayRotation() {
    if (rotation == true) {
      setAutorotation(false)
    }
    else {
      setAutorotation(true)
    }
  }

  return (
    <div>
      <Head>
        <title>Three.js Example</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/style/style.css" />

      </Head>
      <div className='container'>

        <div className="canvas-container">
          <Canvas id='main-canvas' shadows dpr={[1, 2]} camera={camera} scene>

            <perspectiveCamera position={[6, 1, -1]} fov={69} makeDefault />
            <ambientLight intensity={0.5} />
            <directionalLight color={0xFFFFFF} intensity={5} position={(20, 20, 0)} castShadow="true" />
            <mesh visible={defaultMesh}>
              <Sphere />
              <SmallSphere />
              <GroundPlane />
              <RoofSphere />
              <Suspense fallback={null}>
                <RedCar />
                <BlueCar />
                <GreyCar />
                <Environment preset="city" />
              </Suspense>
            </mesh>
            <mesh visible={interiormesh}>
              <InteriorSphere />
            </mesh>

            <OrbitControls autoRotate={rotation}
              autoRotateSpeed={0.5}
              minDistance={5}
              maxDistance={8}
              minPolarAngle={-10}
              maxPolarAngle={1.35} />
          </Canvas>
        </div>
        <div className="info-container">
          <div className="close">

            <button type="submit" id="Close-btn" onClick={closeDiv}>
              <img src="/textures/error.png" className="closeimg" alt="close icon" />
            </button>

          </div>

          <div className="img-container">

            <img src='/textures/tireimg.avif' alt="This is a car part photu" />
          </div>

          <p>This is some info for car part</p>

        </div>
        <div className="roof-container">
          <div className="close">

            <button type="submit" id="Close-roof" onClick={closeDiv}>
              <img className="closeimg" src="/textures/error.png" alt="close icon" />
            </button>

          </div>

          <div className="img-container">

            <img src="/textures/SunRoof.jpg" alt="This is a car roof photu" />
          </div>

          <p>This is some info for car roof</p>

        </div>

        <div className="sidebar-wrapper">

          <div className="sidebar">

            <button type="button" id="roof" onClick={roofOpen} >
              <img src="/textures/roof.png" alt="" />
            </button>

            <button type="submit" id="tyre" onClick={tyreOpen}>
              <img src="/textures/wheels.png" alt="" />
            </button>

            <button type="submit" id="Colors" onClick={OpenSelector}>
              <img src="/textures/bucket.png" alt="" />
            </button>

            <button type="submit" id="play" onClick={PlayRotation}>
              <img src="/textures/play.png" alt="" />
            </button>

            <div className="car-colors" >

              <button type="submit" id="Red-Car" onClick={redCarOpen}>
                <img src="/textures/red-car.jpg" alt="" />
              </button>

              <button type="submit" id="Blue-Car" onClick={blueCarOpen}>
                <img src="/textures/blue-car.png" alt="" />
              </button>
              <button type="submit" id="Gray-Car" onClick={greyCarOpen}>
                <img src="/textures/grey-car.png" alt="" />
              </button>

              <span></span>

            </div>

          </div>

        </div>
        <div className="view">

          <button type="submit" id="interior" className="active" onClick={openInterior}>
            <img src="/textures/interioricon.png" alt="close icon" />
          </button>

          <button type="submit" id="exterior" onClick={openExterior}>
            <img src="/textures/exterior.png" alt="close icon" />
          </button>

        </div>
      </div>
    </div>


  )
}
