import { Scene02 } from './components/Scene02';

export default function Scene02Page() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      <Scene02 isActive={true} playAstro={true} />
    </div>
  );
}
