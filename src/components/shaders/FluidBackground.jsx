import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * FluidBackground
 *
 * A full-screen WebGL plane rendering an animated multi-octave noise
 * gradient — the Midnight Aurora signature visual. Slow-moving, organic,
 * and reacts subtly to mouse movement.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uIntensity;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  // Simplex noise (Ashima)
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}

  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz;
    x12.xy-=i1;
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m; m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  // Fractal Brownian Motion
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float t = uTime * 0.08;

    // Mouse influence (very subtle)
    vec2 m = (uMouse - 0.5) * aspect;
    float mouseDist = length(p - m * 0.4);
    float mouseGlow = exp(-mouseDist * 1.8) * 0.35;

    // Layered noise to create flowing aurora
    vec2 q = vec2(fbm(p + t), fbm(p - t * 0.7));
    vec2 r = vec2(
      fbm(p + q + vec2(1.7, 9.2) + t * 0.5),
      fbm(p + q + vec2(8.3, 2.8) + t * 0.4)
    );
    float n = fbm(p + r);

    // Map noise to a 3-stop color gradient
    float k = smoothstep(-0.5, 0.8, n);
    vec3 col = mix(uColorA, uColorB, k);
    col = mix(col, uColorC, smoothstep(0.4, 1.0, n + 0.2));

    // Aurora-style brightness streaks
    float streak = smoothstep(0.4, 0.9, abs(r.y) * 0.9);
    col += uColorC * streak * 0.25;

    // Mouse glow
    col += uColorB * mouseGlow;

    // Vignette
    float vig = smoothstep(1.4, 0.3, length(p));
    col *= mix(0.55, 1.0, vig);

    // Deep base — keeps things dark and premium
    col = mix(vec3(0.02, 0.024, 0.06), col, 0.65 * uIntensity);

    // Film grain
    float grain = fract(sin(dot(uv * uResolution, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.025;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function FluidPlane({ intensity = 1, palette }) {
  const meshRef = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uIntensity: { value: intensity },
      uColorA: { value: new THREE.Color(palette?.[0] || '#0a0c1c') },
      uColorB: { value: new THREE.Color(palette?.[1] || '#22d3ee') },
      uColorC: { value: new THREE.Color(palette?.[2] || '#7c3aed') },
    }),
    [intensity, palette]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uResolution.value.set(state.size.width, state.size.height);
    // Smooth mouse interpolation
    const target = state.pointer;
    uniforms.uMouse.value.lerp(
      new THREE.Vector2(target.x * 0.5 + 0.5, target.y * 0.5 + 0.5),
      0.04
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function FluidBackground({
  intensity = 1,
  palette,
  className = '',
}) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 1] }}
      >
        <FluidPlane intensity={intensity} palette={palette} />
      </Canvas>
    </div>
  );
}
