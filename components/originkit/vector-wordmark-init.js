/**
 * Originkit Vector Wordmark Component Initializer
 * Renders the Originkit "ANANYA GHOSH" WebGL Interactive Wordmark Animation
 */

(function () {
  const MAX_DPR = 2;
  const REF_WIDTH = 1200;
  const MAX_TEX = 4096;
  const HANDLES = 3;
  const CELL_ASPECT = 0.6;
  const DRIFT_X = 0.08;
  const DRIFT_Y = 0.04;
  const DRIFT_RATE = 1.3;
  const DRIFT_RATE_Y = 1.3 * 1.3;
  const SWEEP_RATE = 0.5;
  const SWEEP_BAND = 0.28;
  const RESNAP = 0.2;
  const DAMP_REF = 20;
  const SPEED_REF = 50;
  const LABEL_MAX = 0.6;
  const DOT_DIAMETER = 4 / 440;
  const DOT_PITCH = 12 / 440;

  const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
  const fract = (x) => x - Math.floor(x);

  function parseColor(input, fallback) {
    if (!input) return fallback;
    let s = String(input).trim();
    if (s[0] === "#") {
      let h = s.slice(1);
      if (h.length === 3 || h.length === 4) {
        let x = "";
        for (const c of h) x += c + c;
        h = x;
      }
      if (h.length === 6) h += "ff";
      if (h.length !== 8 || /[^0-9a-f]/i.test(h)) return fallback;
      return [
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255,
        parseInt(h.slice(6, 8), 16) / 255,
      ];
    }
    return fallback;
  }

  const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
}`;

  const FRAG = `
precision highp float;
uniform sampler2D uMap;
uniform vec2 uRes;
uniform vec2 uAtlas;
uniform vec2 uPtr;
uniform float uReach;
uniform vec3 uText;
uniform vec3 uShade;
uniform vec4 uAccent;
uniform vec2 uV0;
uniform vec2 uV1;
uniform vec2 uV2;
uniform float uHalf;
varying vec2 vUv;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 blurRG(vec2 uv, float e) {
    vec4 sum = vec4(0.0);
    for (int i = 0; i < 6; i++) {
        float fi = float(i);
        float th = radians(fi / 6.0 * 360.0);
        vec2 dir = vec2(cos(th), sin(th));
        vec2 off = dir * (hash(vec2(fi, uv.x + uv.y)) + e);
        sum += texture2D(uMap, uv + off * e);
    }
    return (sum / 6.0).rg;
}

vec2 segment(vec2 p, vec2 a, vec2 b) {
    vec2 ab = b - a;
    vec2 ap = p - a;
    float t = clamp(dot(ap, ab) / max(dot(ab, ab), 1e-8), 0.0, 1.0);
    return vec2(length(ap - ab * t), t);
}

float stroke(float d, float lw, float px) {
    return 1.0 - smoothstep(lw, lw + px, d);
}

float dashedLine(vec2 p, vec2 a, vec2 b, float lw, float px) {
    vec2 s = segment(p, a, b);
    float dash = step(0.5, fract(s.y * length(b - a) * 100.0));
    return stroke(s.x, lw, px) * dash;
}

float boxEdge(vec2 p, vec2 c, float h, float lw, float px) {
    vec2 q = abs(p - c) - vec2(h);
    float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
    return stroke(abs(d), lw, px);
}

void main() {
    float aspect = uRes.x / uRes.y;
    vec2 E = (vUv * uRes - (uRes - uAtlas) * 0.5) / uAtlas;
    float inside = step(0.0, E.x) * step(E.x, 1.0) * step(0.0, E.y) * step(E.y, 1.0);
    vec2 safeUv = clamp(E, 0.0, 1.0);
    float b = clamp(1.0 - E.y * 3.5, 0.0, 1.0) * 0.008;
    vec2 soft = blurRG(safeUv, b);
    vec2 sharp = blurRG(safeUv, b * 0.1);
    float d = length((vUv - uPtr) / vec2(1.0, aspect));
    float k = 1.0 - pow(smoothstep(0.0, max(uReach, 1e-4), d), 3.0);
    float mask = mix(soft.r, sharp.g, k) * inside;
    vec3 fill = mix(uShade, uText, smoothstep(0.0, 1.0, E.y));
    vec2 P = vec2(vUv.x * aspect, vUv.y);
    float px = 1.0 / uRes.y;
    float lw = px * 0.2;
    float lines = max(
        max(dashedLine(P, uV0, uV1, lw, px), dashedLine(P, uV1, uV2, lw, px)),
        dashedLine(P, uV2, uV0, lw, px)
    );
    float boxes = max(
        max(boxEdge(P, uV0, uHalf, lw, px), boxEdge(P, uV1, uHalf, lw, px)),
        boxEdge(P, uV2, uHalf, lw, px)
    );
    float A = max(lines, boxes) * uAccent.a * (1.0 - vUv.y);
    vec4 card = vec4(fill * mask, mask);
    vec4 comp = vec4(uAccent.rgb * A, A) + card * (1.0 - A);
    gl_FragColor = comp * pow(clamp(E.y, 0.0, 1.0), 0.7);
}`;

  function compile(gl, vs, fs) {
    const make = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const p = gl.createProgram();
    gl.attachShader(p, make(gl.VERTEX_SHADER, vs));
    gl.attachShader(p, make(gl.FRAGMENT_SHADER, fs));
    gl.bindAttribLocation(p, 0, "aPos");
    gl.linkProgram(p);
    return p;
  }

  function fontString(f, px) {
    return `${f.style} ${f.weight} ${px}px ${f.family}`;
  }

  function buildAtlas(text, f, drawFontPx, dpr) {
    const probe = document.createElement("canvas").getContext("2d");
    if (!probe) return null;

    const setFont = (ctx, px) => {
      ctx.font = fontString(f, px);
    };

    const measure = (px) => {
      setFont(probe, px);
      const m = probe.measureText(text);
      const asc = m.actualBoundingBoxAscent || px * 0.8;
      const desc = m.actualBoundingBoxDescent || px * 0.22;
      return { w: Math.max(1, m.width), asc, desc };
    };

    let fpx = Math.max(8, drawFontPx * dpr);
    let m = measure(fpx);
    let pad = fpx * 0.12;
    const over = Math.max(
      (m.w + pad * 2) / MAX_TEX,
      (m.asc + m.desc + pad * 2) / MAX_TEX
    );
    if (over > 1) {
      fpx = Math.max(8, fpx / over);
      m = measure(fpx);
      pad = fpx * 0.12;
    }

    const w = Math.max(1, Math.ceil(m.w + pad * 2));
    const h = Math.max(1, Math.ceil(m.asc + m.desc + pad * 2));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h);
    setFont(ctx, fpx);
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.globalCompositeOperation = "lighter";

    ctx.fillStyle = "#ff0000";
    ctx.fillText(text, pad, pad + m.asc);

    const block = m.asc + m.desc;
    ctx.strokeStyle = "#00ff00";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(1, block * DOT_DIAMETER);
    ctx.setLineDash([0, Math.max(2, block * DOT_PITCH)]);
    ctx.strokeText(text, pad, pad + m.asc);

    const cssPerPx = drawFontPx / fpx;
    return { canvas, cssW: w * cssPerPx, cssH: h * cssPerPx };
  }

  function initWordmark() {
    const host = document.getElementById("originkit-wordmark-container");
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    host.appendChild(canvas);

    const labelDivs = [0, 1, 2].map((i) => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.left = "0";
      div.style.top = "0";
      div.style.opacity = String(LABEL_MAX);
      div.style.pointerEvents = "none";
      div.style.whiteSpace = "nowrap";
      div.style.fontFamily = "ui-monospace, SFMono-Regular, Menlo, monospace";
      div.style.fontSize = "11px";
      div.style.letterSpacing = "0.08em";
      div.style.color = "#ff2e4d";
      host.appendChild(div);
      return div;
    });

    const attrs = {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    };
    const gl = canvas.getContext("webgl2", attrs) || canvas.getContext("webgl", attrs);
    if (!gl) return;

    const prog = compile(gl, VERT, FRAG);
    const U = {
      map: gl.getUniformLocation(prog, "uMap"),
      res: gl.getUniformLocation(prog, "uRes"),
      atlas: gl.getUniformLocation(prog, "uAtlas"),
      ptr: gl.getUniformLocation(prog, "uPtr"),
      reach: gl.getUniformLocation(prog, "uReach"),
      text: gl.getUniformLocation(prog, "uText"),
      shade: gl.getUniformLocation(prog, "uShade"),
      accent: gl.getUniformLocation(prog, "uAccent"),
      v0: gl.getUniformLocation(prog, "uV0"),
      v1: gl.getUniformLocation(prog, "uV1"),
      v2: gl.getUniformLocation(prog, "uV2"),
      half: gl.getUniformLocation(prog, "uHalf"),
    };

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    let boxW = Math.max(1, host.offsetWidth);
    let boxH = Math.max(1, host.offsetHeight);
    let boxDirty = true;
    let dpr = 1;
    let bufW = 0, bufH = 0;
    let atlasRatioW = 1, atlasRatioH = 1, atlasKey = "";

    const fontSpec = {
      family: "Syne, sans-serif",
      weight: "900",
      style: "normal",
      size: 150,
      letterSpacing: "-0.02em",
    };
    const accentRGBA = [1, 0.18, 0.3, 0.6];

    function drawFontPx() {
      return fontSpec.size * (boxW / REF_WIDTH);
    }

    function resize() {
      boxW = Math.max(1, host.offsetWidth);
      boxH = Math.max(1, host.offsetHeight);
      dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(boxW * dpr));
      const h = Math.max(1, Math.round(boxH * dpr));
      if (w === bufW && h === bufH) return;
      bufW = w; bufH = h;
      canvas.width = w; canvas.height = h;
    }

    function rebuildAtlas() {
      const px = Math.max(8, drawFontPx());
      const atlas = buildAtlas("ANANYA GHOSH", fontSpec, px, dpr);
      if (!atlas) return;
      atlasRatioW = Math.max(1e-4, atlas.cssW / px);
      atlasRatioH = Math.max(1e-4, atlas.cssH / px);

      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas.canvas);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    }

    const target = { x: -0.5, y: 0.5 };
    const eased = { x: -0.5, y: 0.5 };
    const cells = [{ x: -0.5, y: 0.5 }, { x: -0.5, y: 0.5 }, { x: -0.5, y: 0.5 }];
    const verts = [{ x: -0.5, y: 0.5 }, { x: -0.5, y: 0.5 }, { x: -0.5, y: 0.5 }];
    let hasPointer = false, sweepClock = 0, driftT = 0;

    function snap(x, y, cw, ch) {
      const cx = Math.floor(x / cw);
      const cy = Math.floor(y / ch);
      const found = [];
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const px = (cx + i + 0.5) * cw;
          const py = (cy + j + 0.5) * ch;
          found.push({ x: px, y: py, d: Math.hypot(px - x, py - y) });
        }
      }
      found.sort((a, b) => a.d - b.d);
      for (let i = 0; i < HANDLES; i++) {
        cells[i].x = found[i + 1].x;
        cells[i].y = found[i + 1].y;
      }
    }

    host.addEventListener("pointermove", (e) => {
      hasPointer = true;
      const r = host.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
    });

    let last = 0;
    function frame(now) {
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;
      if (boxDirty) { boxDirty = false; resize(); }
      const key = `${fontSpec.family}|${dpr}|${Math.ceil(drawFontPx() / 64)}`;
      if (key !== atlasKey) { atlasKey = key; rebuildAtlas(); }

      const rate = 1;
      const cw = Math.max(0.01, 27 / 100);
      const ch = cw * CELL_ASPECT;
      const aspect = boxW / boxH;

      if (!hasPointer) {
        const band = (atlasRatioH * Math.max(8, drawFontPx())) / boxH;
        target.x += dt * SWEEP_RATE * rate;
        target.y = (1 - band) / 2 + SWEEP_BAND * band;
        if (target.x > 1.5) { target.x = -0.5; eased.x = -0.5; }
        sweepClock += dt;
        if (sweepClock >= RESNAP) { sweepClock = 0; snap(target.x * aspect, target.y, cw, ch); }
      } else {
        snap(target.x * aspect, target.y, cw, ch);
      }

      const damp = clamp(0.6 * DAMP_REF * dt, 0, 1);
      eased.x += (target.x - eased.x) * damp;
      eased.y += (target.y - eased.y) * damp;

      driftT += dt * rate;
      for (let i = 0; i < HANDLES; i++) {
        const c = cells[i];
        const sx = Math.round(c.x / cw - 0.5);
        const sy = Math.round(c.y / ch - 0.5);
        const h1 = fract(Math.sin(sx * 127.1 + sy * 311.7) * 43758.5453);
        const h2 = fract(Math.sin(sx * 269.5 + sy * 183.3) * 43758.5453);
        verts[i].x = c.x + DRIFT_X * cw * Math.sin(driftT * DRIFT_RATE + h1 * Math.PI * 2);
        verts[i].y = c.y + DRIFT_Y * ch * Math.sin(driftT * DRIFT_RATE_Y + h2 * Math.PI * 2);
      }

      for (let i = 0; i < HANDLES; i++) {
        const el = labelDivs[i];
        const bx = verts[i].x / aspect;
        const by = verts[i].y;
        const gx = Math.round(clamp(bx * 100, 0, 100));
        const gy = Math.round(clamp(by * 100, 0, 100));
        el.style.transform = `translate(${bx * boxW - 54}px, ${(1 - by) * boxH - 54}px)`;
        el.textContent = `${gx}, ${gy}`;
      }

      const tc = [1, 1, 1];
      const sc = [0.07, 0.07, 0.1];
      gl.viewport(0, 0, bufW, bufH);
      gl.useProgram(prog);
      gl.uniform1i(U.map, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform2f(U.res, boxW, boxH);
      const px = Math.max(8, drawFontPx());
      gl.uniform2f(U.atlas, atlasRatioW * px, atlasRatioH * px);
      gl.uniform2f(U.ptr, eased.x, eased.y);
      gl.uniform1f(U.reach, 290 / boxW);
      gl.uniform3f(U.text, tc[0], tc[1], tc[2]);
      gl.uniform3f(U.shade, sc[0], sc[1], sc[2]);
      gl.uniform4f(U.accent, accentRGBA[0], accentRGBA[1], accentRGBA[2], accentRGBA[3]);
      gl.uniform2f(U.v0, verts[0].x, verts[0].y);
      gl.uniform2f(U.v1, verts[1].x, verts[1].y);
      gl.uniform2f(U.v2, verts[2].x, verts[2].y);
      gl.uniform1f(U.half, 54 / boxH);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => { boxDirty = true; });
    ro.observe(host);
    requestAnimationFrame(frame);
  }

  document.addEventListener("DOMContentLoaded", initWordmark);
})();
