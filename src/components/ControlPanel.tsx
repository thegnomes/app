import { useState } from 'react';
import { ChevronRight, ChevronDown, Play, Palette } from 'lucide-react';
import type { AppState, ParticleConfig } from '@/types';
import { STATE_LABELS } from '@/types';

interface ControlPanelProps {
  state: AppState;
  config: ParticleConfig;
  setConfig: (config: ParticleConfig) => void;
}

interface ExpandableSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function ExpandableSection({ title, icon, children, defaultOpen = false }: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm font-medium text-white/90">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-white/50" />
        ) : (
          <ChevronRight className="w-4 h-4 text-white/50" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function Slider({ label, value, min, max, step, onChange }: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-white/60">{label}</span>
        <span className="text-white/80">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
        style={{
          background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)`
        }}
      />
    </div>
  );
}

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/60">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
        />
        <span className="text-xs text-white/40 font-mono">{value}</span>
      </div>
    </div>
  );
}



export function ControlPanel({ state, config, setConfig }: ControlPanelProps) {
  const updateConfig = (key: keyof ParticleConfig, value: number | string) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <div className="fixed right-0 top-0 h-full w-72 bg-[#1a1625]/95 backdrop-blur-xl border-l border-white/10 z-20 flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h1 className="text-lg font-bold text-white">NebulaHero</h1>
        <p className="text-xs text-white/50">State: {STATE_LABELS[state]}</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <ExpandableSection title="Status" icon={<Play className="w-4 h-4 text-purple-400" />} defaultOpen={true}>
          <div className="space-y-2 text-xs text-white/70">
            <p><span className="text-white/40">Current:</span> {STATE_LABELS[state]}</p>
            <p className="text-white/40 mt-1">Controls:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>State 0: Click to begin</li>
              <li>State 1: Hold mouse to charge shell</li>
              <li>State 2: Migrators form spiky shell (3s)</li>
              <li>State 3: Stabilize + planets enter (8s)</li>
              <li>Release early → State 4</li>
            </ul>
          </div>
        </ExpandableSection>

        <ExpandableSection title="Animation" icon={<Play className="w-4 h-4 text-green-400" />}>
          <div className="space-y-4">
            <Slider
              label="Speed"
              value={config.speed}
              min={0.2}
              max={3}
              step={0.1}
              onChange={(v) => updateConfig('speed', v)}
            />
          </div>
        </ExpandableSection>

        <ExpandableSection title="Colors" icon={<Palette className="w-4 h-4 text-pink-400" />}>
          <div className="space-y-3">
            <ColorPicker
              label="Core / Singularity"
              value={config.centerColor}
              onChange={(v) => updateConfig('centerColor', v)}
            />
            <ColorPicker
              label="Ambient / Shell"
              value={config.ambientColor}
              onChange={(v) => updateConfig('ambientColor', v)}
            />
          </div>
        </ExpandableSection>
      </div>

      <div className="p-4 border-t border-white/10">
        <a
          href="https://evolvehub.gumroad.com/l/nebula-hero-framer-component"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black rounded-lg font-medium text-sm hover:bg-white/90 transition-colors"
        >
          Buy Now!
        </a>
      </div>
    </div>
  );
}
