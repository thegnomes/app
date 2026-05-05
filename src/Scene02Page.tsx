import { useState } from 'react';
import { Scene02 } from './components/Scene02';
import { Preloader } from './components/Preloader';

const SCENE02_ASSETS = [
  '/scene02/nebula_space_only2x.png',
  '/scene02/looking-astro-loop2.webm',
  '/scene02/looking-astro-loop2.mov',
  '/webm/toto-ga2.webm',
  '/webm/toto-ga2.mov',
  '/webm/nft11-ga2.webm',
  '/webm/nft11-ga2.mov',
  '/webm/oxytap-ga2.webm',
  '/webm/oxytap-ga2.mov',
];

export default function Scene02Page() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      {!loaded && (
        <Preloader
          assets={SCENE02_ASSETS}
          onComplete={() => setLoaded(true)}
        />
      )}
      <div
        className={`transition-opacity duration-1000 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Scene02 isActive={loaded} playAstro={loaded} />
      </div>
    </div>
  );
}
