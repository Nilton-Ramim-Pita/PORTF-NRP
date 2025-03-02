import React, { useEffect, useRef } from 'react';

interface ParticlesBackgroundProps {
  id: string;
  darkMode?: boolean;
}

declare global {
  interface Window {
    particlesJS: any;
    pJSDom: any[];
  }
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ id, darkMode = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay particles initialization to improve initial load time
    const timer = setTimeout(() => {
      if (window.particlesJS) {
        window.particlesJS(id, {
          particles: {
            number: {
              value: 40, // Reduced number of particles
              density: {
                enable: true,
                value_area: 1000 // Increased area to reduce density
              }
            },
            color: {
              value: darkMode ? "#ffffff" : "#3b82f6"
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000"
              }
            },
            opacity: {
              value: 0.3, // Reduced opacity
              random: false,
              anim: {
                enable: false
              }
            },
            size: {
              value: 2, // Smaller particles
              random: true,
              anim: {
                enable: false
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: darkMode ? "#ffffff" : "#3b82f6",
              opacity: 0.2, // Reduced opacity of lines
              width: 1
            },
            move: {
              enable: true,
              speed: 1, // Slower movement
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false
              }
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab"
              },
              onclick: {
                enable: false // Disabled click interaction to improve performance
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 0.5
                }
              }
            }
          },
          retina_detect: false // Disabled retina detection to improve performance
        });
      }
    }, 1000); // Delay initialization by 1 second
    
    return () => {
      clearTimeout(timer);
      // Clean up particles
      if (window.pJSDom && window.pJSDom.length > 0) {
        try {
          const index = window.pJSDom.findIndex(dom => dom.canvas.el.id === id);
          if (index !== -1) {
            window.pJSDom[index].pJS.fn.vendors.destroypJS();
            window.pJSDom.splice(index, 1);
          }
        } catch (e) {
          console.log("Error cleaning up particles:", e);
        }
      }
    };
  }, [id, darkMode]);

  return (
    <div 
      id={id} 
      ref={containerRef} 
      className="absolute inset-0 z-0"
      style={{ opacity: 0.4 }} // Reduced opacity
    ></div>
  );
};

export default ParticlesBackground;