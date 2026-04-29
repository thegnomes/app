import { useEffect, useState } from 'react';
import { Scene02 } from './components/Scene02';
import { AstronautTextOverlay } from './components/AstronautTextOverlay';

export default function Scene02Page() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      <Scene02 isActive={true} playAstro={true} />
      <AstronautTextOverlay isActive={showText} />
    </div>
  );
}
