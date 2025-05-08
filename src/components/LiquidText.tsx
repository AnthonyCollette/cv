import { useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, Text } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect } from "react";

// Shader sans vague, uniquement distorsion locale
const LiquidDistortionMaterial = shaderMaterial(
  {
    time: 0,
    point: new THREE.Vector3(10000, 10000, 10000), // Initialement très éloigné pour éviter toute distorsion
    color: new THREE.Color("white"),
    radius: 1.2,
    effectStrength: 0, // Pas de distorsion au départ
  },
  // Vertex Shader
  `
uniform vec3 point;
uniform float effectStrength;
uniform float radius;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vec3 pos = position;

  // Applique la distorsion seulement si l'effet est activé
  if (effectStrength > 0.0) {
    float dist = distance(pos.xy, point.xy);
    float falloff = exp(-pow(dist / radius, 2.0)); // Effet de distorsion plus doux
    float effect = falloff * effectStrength;
    pos.z += effect * 0.6;
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
  `,
  // Fragment Shader
  `
uniform vec3 color;
void main() {
  gl_FragColor = vec4(color, 1.0);
}
  `
);

// Props du composant shader
interface LiquidDistortionMeshProps {
  initialColor?: THREE.Color | string | number;
  textMeshRef: React.RefObject<THREE.Object3D | null>;
}

// Composant wrapper
const LiquidDistortionMesh: React.FC<LiquidDistortionMeshProps> = ({
  initialColor = "white",
  textMeshRef,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse, camera, raycaster } = useThree();
  const lastKnownPointRef = useRef(new THREE.Vector3(10000, 10000, 10000)); // Initialement, un point très éloigné

  // Initialisation de la force de distorsion à 0, s'assurant qu'il n'y a pas d'effet avant le survol
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.userData.effectStrength = 0;
      materialRef.current.uniforms.effectStrength.value = 0;
      materialRef.current.uniforms.point.value = new THREE.Vector3(
        10000,
        10000,
        10000
      ); // Point éloigné
    }
  }, []);

  useFrame(() => {
    if (!materialRef.current || !textMeshRef.current) return;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(textMeshRef.current, true);

    // Condition : on veut uniquement le texte et pas d'autres objets
    if (intersects.length === 1) {
      const liveHoverPoint = new THREE.Vector3();
      liveHoverPoint.copy(intersects[0].point);
      textMeshRef.current.worldToLocal(liveHoverPoint); // Convertir les coordonnées globales en locales
      lastKnownPointRef.current.copy(liveHoverPoint);
    }

    const currentShaderPoint = materialRef.current.uniforms.point
      .value as THREE.Vector3;

    // Utilisation de la lerp pour une transition plus fluide
    currentShaderPoint.lerp(lastKnownPointRef.current, 0.15);

    // Transition de la force de distorsion (plus douce)
    const targetStrength = intersects.length === 1 ? 1.0 : 0.0;
    materialRef.current.uniforms.effectStrength.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.effectStrength.value,
      targetStrength,
      0.1 // Douceur de la transition
    );
  });

  return (
    <primitive
      object={new LiquidDistortionMaterial({ color: initialColor })}
      ref={materialRef}
      attach="material"
    />
  );
};

// Composant principal
export default function LiquidText() {
  const textMeshRef = useRef<THREE.Object3D>(null);

  return (
    <Text
      ref={textMeshRef}
      fontSize={2.4}
      color="white"
      position={[0, 0, 0]}
      anchorX="center"
      anchorY="middle"
      font="/fonts/Bebas_Neue/BebasNeue-Regular.ttf"
    >
      ANTHONY COLLETTE
      <LiquidDistortionMesh initialColor="white" textMeshRef={textMeshRef} />
    </Text>
  );
}
