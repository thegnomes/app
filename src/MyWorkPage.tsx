import { Scene02 } from './components/Scene02';

export default function MyWorkPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      <Scene02 isActive={true} playAstro={true} />
    </div>
  );
}
