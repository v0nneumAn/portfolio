import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uGyro;

  varying vec2 vUv;

  // Simplex 3D noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    // Combine mouse and gyro influence (gyro only on mobile where mouse is zero)
    vec2 influence = uMouse * 0.35 + uGyro * 0.25;

    float t = uTime * 0.035;

    // Layered noise for a slow-moving aurora / fluid feel
    float n1 = snoise(vec3(uv * 1.4 + influence, t));
    float n2 = snoise(vec3(uv * 2.8 - influence * 0.5, t * 1.4));
    float n3 = snoise(vec3(uv * 5.0 + influence * 0.25, t * 0.7));

    float combined = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

    // Base page background
    vec3 base = vec3(0.0392, 0.0549, 0.0392); // #0A0E0A
    // Brand green glow
    vec3 glow = vec3(0.1333, 0.7725, 0.3647); // #22C55E

    // Subtle radial vignette
    float vignette = 1.0 - smoothstep(0.4, 1.2, length(vUv - 0.5));

    float intensity = smoothstep(-0.2, 0.65, combined) * 0.16 * vignette;
    intensity += smoothstep(-0.1, 0.5, n2) * 0.06 * vignette;

    vec3 color = mix(base, glow, intensity);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // eslint-disable-next-line no-console
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    // eslint-disable-next-line no-console
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const gyroRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'low-power',
    });
    if (!gl) {
      // eslint-disable-next-line no-console
      console.warn('WebGL not supported; fluid background disabled.');
      return;
    }

    const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    if (!program) return;

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    const resolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const timeLoc = gl.getUniformLocation(program, 'uTime');
    const mouseLoc = gl.getUniformLocation(program, 'uMouse');
    const gyroLoc = gl.getUniformLocation(program, 'uGyro');

    // Full-screen quad
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth - 0.5;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleOrientation = (e: DeviceOrientationEvent) => {
      // beta is front/back tilt, gamma is left/right
      const beta = e.beta ?? 0;
      const gamma = e.gamma ?? 0;
      gyroRef.current.x = Math.max(-1, Math.min(1, gamma / 45));
      gyroRef.current.y = Math.max(-1, Math.min(1, beta / 45));
    };

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (acc && acc.x != null && acc.y != null) {
        gyroRef.current.x = Math.max(-1, Math.min(1, acc.x / 10));
        gyroRef.current.y = Math.max(-1, Math.min(1, acc.y / 10));
      }
    };

    if (isMobile) {
      if (typeof (DeviceOrientationEvent as never as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
        // iOS 13+ requires a user gesture to request permission.
        // We attempt on first interaction.
        const request = () => {
          (DeviceOrientationEvent as never as { requestPermission?: () => Promise<string> }).requestPermission?.().then((state) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation, { passive: true });
              window.addEventListener('devicemotion', handleMotion, { passive: true });
            }
          }).catch(() => {});
        };
        window.addEventListener('pointerdown', request, { once: true });
      } else {
        window.addEventListener('deviceorientation', handleOrientation, { passive: true });
        window.addEventListener('devicemotion', handleMotion, { passive: true });
      }
    }

    let startTime = performance.now();
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible) startTime = performance.now();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let currentMouseX = 0;
    let currentMouseY = 0;
    let currentGyroX = 0;
    let currentGyroY = 0;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (!isVisible || reducedMotionRef.current) return;

      const time = (performance.now() - startTime) / 1000;

      // Smooth lerp for inputs
      currentMouseX += (mouseRef.current.x - currentMouseX) * 0.05;
      currentMouseY += (mouseRef.current.y - currentMouseY) * 0.05;
      currentGyroX += (gyroRef.current.x - currentGyroX) * 0.08;
      currentGyroY += (gyroRef.current.y - currentGyroY) * 0.08;

      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, time);
      gl.uniform2f(mouseLoc, currentMouseX, currentMouseY);
      gl.uniform2f(gyroLoc, currentGyroX, currentGyroY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('devicemotion', handleMotion);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        backgroundColor: '#0A0E0A',
      }}
    />
  );
}
