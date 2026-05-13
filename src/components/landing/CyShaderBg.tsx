import React from 'react';
import { Warp } from '@paper-design/shaders-react';

type Preset = 'brand' | 'muted';
type Intensity = 'low' | 'medium' | 'high';

type Props = {
  preset?: Preset;
  intensity?: Intensity;
  className?: string;
};

/*
 * Couleurs hardcodées en HSL — équivalents directs des tokens DS.
 * Lecture dynamique des CSS vars volontairement évitée : Warp tourne en
 * WebGL et reconfigure le programme à chaque changement de prop.
 * Si un token de la palette change, mettre à jour ici en miroir.
 */
const presetColors: Record<Preset, string[]> = {
  brand: [
    'hsl(154, 96%, 42%)',  // --cy-green-500
    'hsl(154, 93%, 58%)',  // --cy-green-400
    'hsl(151, 100%, 73%)', // --cy-green-300
    'hsl(187, 97%, 16%)',  // --cy-deep-700
  ],
  muted: [
    'hsl(154, 96%, 42%)',  // --cy-green-500
    'hsl(187, 97%, 16%)',  // --cy-deep-700
    'hsl(190, 83%, 14%)',  // --cy-deep-800
    'hsl(220, 39%, 11%)',  // --cy-deep-900
  ],
};

const intensityProfile: Record<Intensity, { distortion: number; swirl: number; speed: number }> = {
  low:    { distortion: 0.15, swirl: 0.5, speed: 0.5 },
  medium: { distortion: 0.25, swirl: 0.8, speed: 1.0 },
  high:   { distortion: 0.40, swirl: 1.2, speed: 1.5 },
};

export const CyShaderBg: React.FC<Props> = ({
  preset = 'brand',
  intensity = 'medium',
  className = '',
}) => {
  const { distortion, swirl, speed } = intensityProfile[intensity];
  const colors = presetColors[preset];
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Warp
        style={{ width: '100%', height: '100%' }}
        proportion={0.45}
        softness={1}
        distortion={distortion}
        swirl={swirl}
        swirlIterations={10}
        shape="checks"
        shapeScale={0.1}
        scale={1}
        rotation={0}
        speed={speed}
        colors={colors}
      />
    </div>
  );
};
