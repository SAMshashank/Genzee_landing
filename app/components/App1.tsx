"use client";

import { useEffect, useState } from 'react';
import { FaceLandmarker, FaceLandmarkerOptions, FilesetResolver } from "@mediapipe/tasks-vision";
import { Color, Euler, Matrix4 } from 'three';
import { Canvas, useFrame, useGraph } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import dynamic from 'next/dynamic';

let video: HTMLVideoElement;
let faceLandmarker: FaceLandmarker;
let lastVideoTime = -1;
let blendshapes: any[] = [];
let rotation: Euler;
let headMesh: any[] = [];

const options: FaceLandmarkerOptions = {
  baseOptions: {
    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
    delegate: "GPU"
  },
  numFaces: 1,
  runningMode: "VIDEO",
  outputFaceBlendshapes: true,
  outputFacialTransformationMatrixes: true,
};

// State to store all captured data
const gesturesAndMotionData: { rotation: Euler, blendshapes: any[] }[] = [];
const mouthMovementData: { rotation: Euler, blendshapes: any[] }[] = [];

function Avatar({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const { nodes } = useGraph(scene);

  useEffect(() => {
    if (nodes.Wolf3D_Head) headMesh.push(nodes.Wolf3D_Head);
    if (nodes.Wolf3D_Teeth) headMesh.push(nodes.Wolf3D_Teeth);
    if (nodes.Wolf3D_Beard) headMesh.push(nodes.Wolf3D_Beard);
    if (nodes.Wolf3D_Avatar) headMesh.push(nodes.Wolf3D_Avatar);
    if (nodes.Wolf3D_Head_Custom) headMesh.push(nodes.Wolf3D_Head_Custom);
  }, [nodes, url]);

  useFrame(() => {
    if (blendshapes.length > 0) {
      // Separate blendshapes into general gestures/motions and mouth movements
      const mouthBlendshapes = blendshapes.filter(bs => bs.categoryName.startsWith('mouth') || bs.categoryName.startsWith('jaw'));
      const gestureBlendshapes = blendshapes.filter(bs => !bs.categoryName.startsWith('mouth') && !bs.categoryName.startsWith('jaw'));

      // Capture rotation and blendshapes for gestures and motions
      gesturesAndMotionData.push({ rotation: rotation.clone(), blendshapes: [...gestureBlendshapes] });
      // Capture rotation and blendshapes for mouth movements
      mouthMovementData.push({ rotation: rotation.clone(), blendshapes: [...mouthBlendshapes] });

      // Apply blendshapes to the avatar
      blendshapes.forEach(element => {
        headMesh.forEach(mesh => {
          let index = mesh.morphTargetDictionary[element.categoryName];
          if (index >= 0) {
            mesh.morphTargetInfluences[index] = element.score;
          }
        });
      });

      // Update avatar's rotations
      nodes.Head.rotation.set(rotation.x, rotation.y, rotation.z);
      nodes.Neck.rotation.set(rotation.x / 5 + 0.3, rotation.y / 5, rotation.z / 5);
      nodes.Spine2.rotation.set(rotation.x / 10, rotation.y / 10, rotation.z / 10);
    }
  });

  return <primitive object={scene} position={[0, -1.75, 3]} />;
}

function App1({myAvatar}: any) {
  const [urt, setUrt] = useState<string>(myAvatar);

  useEffect(() => {
    setUrt(myAvatar); // Update `urt` whenever `myAvatar` changes
  }, [myAvatar]);

  const setup = async () => {
    const filesetResolver = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, options);

    video = document.getElementById("video") as HTMLVideoElement;
    navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
      audio: false,
    }).then(function (stream) {
      video.srcObject = stream;
      video.addEventListener("loadeddata", predict);
    });
  };

  const predict = async () => {
    let nowInMs = Date.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      const faceLandmarkerResult = faceLandmarker.detectForVideo(video, nowInMs);

      if (faceLandmarkerResult.faceBlendshapes && faceLandmarkerResult.faceBlendshapes.length > 0 && faceLandmarkerResult.faceBlendshapes[0].categories) {
        blendshapes = faceLandmarkerResult.faceBlendshapes[0].categories;

        const matrix = new Matrix4().fromArray(faceLandmarkerResult.facialTransformationMatrixes![0].data);
        rotation = new Euler().setFromRotationMatrix(matrix);
      }
    }

    window.requestAnimationFrame(predict);
  };

  useEffect(() => {
    setup();
  }, []);


  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-full iphone-se:h-[200px]" >
      
 
    <Canvas
      className="w-full h-full"
      camera={{ fov: 25 }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <pointLight
        position={[10, 10, 10]}
        color={new Color(1, 1, 0)}
        intensity={0.5}
        castShadow
      />
      <pointLight
        position={[-10, 0, 10]}
        color={new Color(1, 0, 0)}
        intensity={0.5}
        castShadow
      />
      <pointLight
        position={[0, 0, 10]}
        intensity={0.5}
        castShadow
      />
      <Avatar url={urt} />
    </Canvas>
  </div>
);
}
  


export default dynamic(() => Promise.resolve(App1), { ssr: false });
