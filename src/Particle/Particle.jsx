import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import React from 'react' 
export default function Particle() {
  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <>
    <Particles id="tsparticles" 
     init={particlesInit}
      loaded={particlesLoaded}
      options={
        {
          "fullScreen": {
            "enable": true,
            "zIndex": -1
        },
          background: {
            color: {
              value: "#343a40",
            },
          },
          fpsLimit: 200,
          interactivity: {
            events: {
              // onClick: {
              //   enable: true,
              //   mode: "push",
              // },
              onHover: {
                enable: true,
                mode: "repulse",
                 "parallax": {
                        "enable": false,
                        "force": 60,
                        "smooth": 10
                    }
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 1,
              },
              repulse: {
                distance: 50,
                duration: 10,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.5,
              straight: true,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 100,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }
      }
      />
  {/* <Particles id="tsparticles" 
     init={particlesInit}
      loaded={particlesLoaded}
      options={{}
      }
      /> */}
         </>
  )
}
 


