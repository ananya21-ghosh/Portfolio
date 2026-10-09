/**
 * Originkit Hero-24 Animated 3D Globe Background Initializer
 * Renders the Three.js Interactive 3D Globe Background behind the Skills Section
 */

(function () {
  function initHero24Globe() {
    const container = document.getElementById("hero24-globe-bg");
    if (!container) return;

    if (typeof THREE === "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.onload = () => buildGlobe(container);
      document.head.appendChild(script);
    } else {
      buildGlobe(container);
    }
  }

  function buildGlobe(container) {
    let width = container.clientWidth || container.offsetWidth || 800;
    let height = container.clientHeight || container.offsetHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Globe Radius & Colors matching portfolio theme (#ff2e4d & #e50914)
    const radius = 95;
    const dotColor = new THREE.Color("#ff2e4d");
    const gridColor = new THREE.Color("#ff5277");

    // 1. Create Instanced Mesh for Latitude / Longitude Dot Matrix
    const dotGeo = new THREE.SphereGeometry(0.9, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: dotColor, transparent: true, opacity: 0.85 });

    const dots = [];
    const latLines = 36;
    const lonLines = 72;

    for (let i = 0; i <= latLines; i++) {
      const lat = (i / latLines) * Math.PI - Math.PI / 2;
      const radiusAtLat = radius * Math.cos(lat);
      const y = radius * Math.sin(lat);

      for (let j = 0; j < lonLines; j++) {
        // Density filter for realistic landmass feel
        if (Math.sin(j * 0.45) + Math.cos(i * 0.35) > -0.2) {
          const lon = (j / lonLines) * 2 * Math.PI;
          const x = radiusAtLat * Math.sin(lon);
          const z = radiusAtLat * Math.cos(lon);
          dots.push({ x, y, z });
        }
      }
    }

    const instancedMesh = new THREE.InstancedMesh(dotGeo, dotMat, dots.length);
    const dummy = new THREE.Object3D();

    dots.forEach((d, idx) => {
      dummy.position.set(d.x, d.y, d.z);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(idx, dummy.matrix);
    });
    instancedMesh.instanceMatrix.needsUpdate = true;
    globeGroup.add(instancedMesh);

    // 2. Graticule Outer Atmosphere Ring / Wireframe Lines
    const ringGeo = new THREE.BufferGeometry();
    const ringPoints = [];
    const ringSegs = 128;
    for (let i = 0; i <= ringSegs; i++) {
      const theta = (i / ringSegs) * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(Math.cos(theta) * (radius + 6), Math.sin(theta) * (radius + 6), 0));
    }
    ringGeo.setFromPoints(ringPoints);
    const ringMat = new THREE.LineBasicMaterial({ color: gridColor, transparent: true, opacity: 0.35 });
    const ringLine = new THREE.Line(ringGeo, ringMat);
    ringLine.rotation.x = Math.PI / 4;
    globeGroup.add(ringLine);

    const ringLine2 = new THREE.Line(ringGeo, ringMat);
    ringLine2.rotation.y = Math.PI / 3;
    globeGroup.add(ringLine2);

    // Initial Tilt
    globeGroup.rotation.x = 0.35;
    globeGroup.rotation.z = -0.15;

    // Animation Loop
    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.0035;
      renderer.render(scene, camera);
    }
    animate();

    // Window Resize Listener
    window.addEventListener("resize", () => {
      width = container.clientWidth || container.offsetWidth || 800;
      height = container.clientHeight || container.offsetHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }

  document.addEventListener("DOMContentLoaded", initHero24Globe);
})();
