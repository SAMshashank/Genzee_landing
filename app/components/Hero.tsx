"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Euler } from 'three'
// import App1 from './App1';
// import App2 from './App2';
import mouthMovement1 from './JSONmotion/MU1.json';
import mouthMovement2 from './JSONmotion/MU2.json';
import mouthMovement3 from './JSONmotion/MU3.json';
import gestureMotion1 from './JSONmotion/MO1.json';
import gestureMotion2 from './JSONmotion/MO2.json';
import gestureMotion3 from './JSONmotion/MO3.json';
import img1 from "./assets/1.png";
import img2 from "./assets/2.png";
import img3 from "./assets/3.png";
import img4 from "./assets/4.png";


// Placeholder for App1 and App2 components
const avatars = [
  "https://models.readyplayer.me/667c2b910f0bc383f8db6fc8.glb?morphTargets=ARKit&textureAtlas=1024",
  "https://models.readyplayer.me/666b2785dae1a80d3a206cad.glb?morphTargets=ARKit&textureAtlas=1024",
  "https://models.readyplayer.me/672f449eb4b22aa2992c39e6.glb?morphTargets=ARKit&textureAtlas=1024",
  "https://models.readyplayer.me/672f42ab20724d926819bac2.glb?morphTargets=ARKit&textureAtlas=1024",
];

const avatarsPP = [
img1,
img2,img3,img4
];

export default function Hero() {
  const [myAvatar, setMyAvatar] = useState(avatars[0]);
  // const [theirAvatar, setTheirAvatar] = useState(avatarsPP[0]);

  // Import multiple JSON files for mouth and motion gestures



  const [currentMouthFrames, setCurrentMouthFrames] = useState<any[]>([]);
  const [currentGestureFrames, setCurrentGestureFrames] = useState<any[]>([]);
  const [currentMouthFrameIndex, setCurrentMouthFrameIndex] = useState<number>(0);
  const [currentGestureFrameIndex, setCurrentGestureFrameIndex] = useState<number>(0);
  const [rotation, setRotation] = useState<Euler>(new Euler());
  const [blendshapes, setBlendshapes] = useState<any[]>([]);

  // Arrays of mouth and gesture JSON files
  const mouthFiles = [mouthMovement1, mouthMovement2, mouthMovement3];
  const gestureFiles = [gestureMotion1, gestureMotion2, gestureMotion3];

  // Select random files for mouth and motion gestures on mount
  useEffect(() => {
    const randomMouthFile = mouthFiles[Math.floor(Math.random() * mouthFiles.length)];
    const randomGestureFile = gestureFiles[Math.floor(Math.random() * gestureFiles.length)];
    
    // Check if the selected files contain valid data
    if (randomMouthFile && Array.isArray(randomMouthFile) && randomMouthFile.length > 0) {
      setCurrentMouthFrames(randomMouthFile);
    }
    if (randomGestureFile && Array.isArray(randomGestureFile) && randomGestureFile.length > 0) {
      setCurrentGestureFrames(randomGestureFile);
    }
  }, []); // This runs once when the component is mounted

  // Update rotation and blendshapes based on the randomly selected frames
  useEffect(() => {
    if (currentMouthFrames.length > 0 || currentGestureFrames.length > 0) {
      let combinedRotation = new Euler();
      let combinedBlendshapes: any[] = [];

      // Use gesture frame if available
      if (currentGestureFrames.length > 0) {
        const gestureFrame = currentGestureFrames[currentGestureFrameIndex];
        combinedRotation = new Euler(
          gestureFrame.rotation.x,
          gestureFrame.rotation.y,
          gestureFrame.rotation.z,
          gestureFrame.rotation.order
        );
        combinedBlendshapes = [...gestureFrame.blendshapes];
      }

      // Merge mouth frame if available
      if (currentMouthFrames.length > 0) {
        const mouthFrame = currentMouthFrames[currentMouthFrameIndex];
        combinedBlendshapes = [...combinedBlendshapes, ...mouthFrame.blendshapes];
      }

      setRotation(combinedRotation);
      setBlendshapes(combinedBlendshapes);
    }
  }, [currentMouthFrames, currentGestureFrames, currentMouthFrameIndex, currentGestureFrameIndex]);

  // Frame-by-frame animation using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const updateFrames = () => {
      // Randomize frame selection for mouth and gesture data
      if (currentMouthFrames.length > 0) {
        setCurrentMouthFrameIndex((prevIndex) => (prevIndex + 1) % currentMouthFrames.length);
      }
      if (currentGestureFrames.length > 0) {
        setCurrentGestureFrameIndex((prevIndex) => (prevIndex + 1) % currentGestureFrames.length);
      }
      animationFrameId = requestAnimationFrame(updateFrames);
    };

    if (currentMouthFrames.length > 0 || currentGestureFrames.length > 0) {
      animationFrameId = requestAnimationFrame(updateFrames);
    }

    return () => cancelAnimationFrame(animationFrameId); // Clean up on unmount
  }, [currentMouthFrames, currentGestureFrames]);

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">Web3 Social Avatar App</h1>

      <div className="flex flex-col lg:flex-row gap-6 flex-grow">
        <div className="flex-grow flex flex-col sm:flex-row gap-4 p-6 bg-gray-800 shadow-xl rounded-xl">
          <div className="flex-1 aspect-video bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg overflow-hidden relative shadow-md">
            <div className="w-full h-full object-cover">
              {/* <App1 myAvatar={myAvatar} /> */}
            </div>
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-semibold">
              You
            </div>
          </div>

          <div className="flex-1 aspect-video bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg overflow-hidden relative shadow-md">
            <div className="w-full h-full object-cover">
              {/* <App2 rotation={rotation} blendshapes={blendshapes} /> */}
            </div>
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Them
            </div>
          </div>
        </div>

        <div className="p-4 lg:w-auto bg-gray-800 shadow-xl rounded-xl self-center lg:self-start">
          <h2 className="text-lg font-semibold mb-3 text-yellow-400 text-center">Change Your Avatar</h2>
          <div className="flex justify-center space-x-2">
            {avatars.map((avatar, index) => (
              <button
                key={index}
                className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  myAvatar === avatar
                    ? 'border-black shadow-md scale-110'
                    : 'border-yellow-600 hover:border-yellow-900 hover:shadow-sm hover:scale-105'
                }`}
                onClick={() => setMyAvatar(avatar)}
              >
                <Image
                  src={avatarsPP[index]}
                  alt={`Avatar ${index + 1}`}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300">
          End Call
        </button>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300">
          Mute
        </button>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300">
          Turn Off Camera
        </button>
      </div>
    </div>
  )
}

