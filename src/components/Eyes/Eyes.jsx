import { useEffect } from 'react';
import './Eyes.css'; // Import the CSS file for keyframes and custom properties

const Eyes = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const eyesContainer = document.querySelector('.eyes');
      const eyes = document.querySelectorAll('.eyes > div');

      if (!eyesContainer || eyes.length !== 2) return;

      const containerRect = eyesContainer.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;

      const angle = Math.atan2(e.clientY - containerCenterY, e.clientX - containerCenterX);
      const distance = Math.min(
        eyes[0].offsetWidth / 4,
        Math.sqrt(Math.pow(e.clientX - containerCenterX, 2) + Math.pow(e.clientY - containerCenterY, 2))
      );

      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      eyes.forEach((eye) => {
        const eyeBall = eye.querySelector('i');
        eyeBall.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="eyes flex items-center justify-center gap-5 p-5">
      <div className="relative w-24 aspect-square bg-white rounded-full overflow-hidden flex items-center justify-center">
        <i className="absolute w-3/5 aspect-square bg-black rounded-full"></i>
      </div>
      <div className="relative w-24 aspect-square bg-white rounded-full overflow-hidden flex items-center justify-center">
        <i className="absolute w-3/5 aspect-square bg-black rounded-full"></i>
      </div>
    </div>
  );
};

export default Eyes;