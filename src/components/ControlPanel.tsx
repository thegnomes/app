import { useState } from 'react';
import { ChevronRight, ChevronDown, Play, Palette, ChevronLeft, MousePointer2, Brain, Sparkles, Orbit, Zap } from 'lucide-react';
import type { AppState, ParticleConfig } from '@/types';
import { STATE_LABELS } from '@/types';

interface ControlPanelProps {
  state: AppState;
  setState: (state: AppState) => void;
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
        className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-xs font-medium text-white/90">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-3 h-3 text-white/50" />
        ) : (
          <ChevronRight className="w-3 h-3 text-white/50" />
        )}
      </button>
      {isOpen && (
        <div className="px-3 pb-3 space-y-3">
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
    <div className="space-y-1.5">
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
        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
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
          className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
        />
        <span className="text-[10px] text-white/40 font-mono">{value}</span>
      </div>
    </div>
  );
}

interface StateButtonProps {
  stateNum: AppState;
  currentState: AppState;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function StateButton({ stateNum, currentState, label, icon, onClick }: StateButtonProps) {
  const isActive = stateNum === currentState;
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-purple-500/30 text-purple-200 border border-purple-500/50' 
          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-transparent'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function ControlPanel({ state, setState, config, setConfig }: ControlPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const updateConfig = (key: keyof ParticleConfig, value: number | string) => {
    setConfig({ ...config, [key]: value });
  };

  if (isCollapsed) {
    return (
      <div className="control-panel fixed right-4 top-4 z-20">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center justify-center w-10 h-10 bg-[#1a1625]/95 backdrop-blur-xl border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
          title="Open controls"
        >
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </button>
      </div>
    );
  }

  return (
    <div className="control-panel fixed right-0 top-0 h-full w-64 bg-[#1a1625]/95 backdrop-blur-xl border-l border-white/10 z-20 flex flex-col">
      {/* Header with collapse button */}
      <div className="p-3 border-b border-white/10 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-white">NebulaHero</h1>
          <p className="text-[10px] text-white/50">{STATE_LABELS[state]}</p>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="flex items-center justify-center w-8 h-8 hover:bg-white/10 rounded-lg transition-colors"
          title="Collapse"
        >
          <ChevronRight className="w-5 h-5 text-white/50" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* State Toggle Buttons */}
        <ExpandableSection title="States" icon={<MousePointer2 className="w-3.5 h-3.5 text-purple-400" />} defaultOpen={true}>
          <div className="space-y-1.5">
            <StateButton
              stateNum={0}
              currentState={state}
              label="Neural Brain"
              icon={<Brain className="w-3.5 h-3.5" />}
              onClick={() => setState(0)}
            />
            <StateButton
              stateNum={1}
              currentState={state}
              label="Starfield"
              icon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={() => setState(1)}
            />
            <StateButton
              stateNum={2}
              currentState={state}
              label="Charging Shell"
              icon={<Zap className="w-3.5 h-3.5" />}
              onClick={() => setState(2)}
            />
            <StateButton
              stateNum={3}
              currentState={state}
              label="Solar System"
              icon={<Orbit className="w-3.5 h-3.5" />}
              onClick={() => setState(3)}
            />
            <StateButton
              stateNum={4}
              currentState={state}
              label="Collapse"
              icon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={() => setState(4)}
            />
          </div>
          
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-[10px] text-white/40 leading-relaxed">
              Click a state to jump to it. The animation will transition smoothly.
            </p>
          </div>
        </ExpandableSection>

        <ExpandableSection title="Animation" icon={<Play className="w-3.5 h-3.5 text-green-400" />}>
          <div className="space-y-3">
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

        <ExpandableSection title="Colors" icon={<Palette className="w-3.5 h-3.5 text-pink-400" />}>
          <div className="space-y-2">
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

      <div className="p-3 border-t border-white/10">
        <a
          href="https://evolvehub.gumroad.com/l/nebula-hero-framer-component"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-black rounded-lg font-medium text-xs hover:bg-white/90 transition-colors"
        >
          Buy Now!
        </a>
      </div>
    </div>
  );
}
