import { useState } from 'react';
import { Scene02 } from './components/Scene02';
import { Preloader } from './components/Preloader';
import { resolveAssetUrl } from '@/lib/assets';

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
  '/webm/target-lock.webm',
  '/webm/target-lock.mov',
].map(resolveAssetUrl);

export default function Scene02Page() {
  const [ready, setReady] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      {ready ? (
        <Scene02 isActive={true} playAstro={true} />
      ) : (
        <Preloader assets={SCENE02_ASSETS} onComplete={() => setReady(true)} />
      )}
    </div>
  );
}
