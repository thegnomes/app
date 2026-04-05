import { Framer } from 'lucide-react';

export function Footer() {
  return (
    <div className="fixed bottom-4 left-4 z-20">
      <a
        href="https://www.framer.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm hover:bg-white/20 transition-colors"
      >
        <Framer className="w-4 h-4" />
        <span>Made in Framer</span>
      </a>
    </div>
  );
}
