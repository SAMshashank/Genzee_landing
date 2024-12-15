import { useEffect, useState } from 'react';
import { Color, Euler } from 'three';
import { Canvas, useFrame, useGraph } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

interface AvatarProps {
  url: string;
  rotation: Euler;
  blendshapes: any[];
}

let headMesh: any[] = [];

function Avatar({ url, rotation, blendshapes }: AvatarProps) {
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
      blendshapes.forEach(element => {
        headMesh.forEach(mesh => {
          let index = mesh.morphTargetDictionary[element.categoryName];
          if (index >= 0) {
            mesh.morphTargetInfluences[index] = element.score;
          }
        });
      });

      nodes.Head.rotation.set(rotation.x, rotation.y, rotation.z);
      nodes.Neck.rotation.set(rotation.x / 5 + 0.3, rotation.y / 5, rotation.z / 5);
      nodes.Spine2.rotation.set(rotation.x / 10, rotation.y / 10, rotation.z / 10);
    }
  });

  return <primitive object={scene} position={[0, -1.75, 3]} />;
}

interface App2Props {
  rotation: Euler;
  blendshapes: any[];
}

function App2({ rotation, blendshapes }: App2Props) {
  const [url] = useState<string>("https://models.readyplayer.me/67443e346d5052803b292f54.glb?morphTargets=ARKit&textureAtlas=1024");

  return (
    // <div>
    //   <Canvas style={{ height: 600 }} camera={{ fov: 25 }} shadows>
    //     <ambientLight intensity={0.5} />
    //     <pointLight position={[10, 10, 10]} color={new Color(1, 1, 0)} intensity={0.5} castShadow />
    //     <pointLight position={[-10, 0, 10]} color={new Color(1, 0, 0)} intensity={0.5} castShadow />
    //     <pointLight position={[0, 0, 10]} intensity={0.5} castShadow />
    //     <Avatar url={url} rotation={rotation} blendshapes={blendshapes} />
    //   </Canvas>
    // </div>

    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-full iphone-se:h-[200px]">
    <video
      className="camera-feed hidden"
      id="video"
      autoPlay
    ></video>
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
      <Avatar url={url} rotation={rotation} blendshapes={blendshapes} />
    </Canvas>
  </div>
  );
}

export default App2;
