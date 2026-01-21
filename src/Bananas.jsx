import { useGLTF, Detailed, Environment } from '@react-three/drei'
import { EffectComposer, DepthOfField, ToneMapping } from '@react-three/postprocessing'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useState } from 'react'
import * as THREE from 'three'
import { Suspense } from 'react'

useGLTF.preload('/banana-v1-transformed.glb')


function Banana({index,z,speed}){
    const ref = useRef()
    const {viewport,camera} = useThree()
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
    const { nodes, materials } = useGLTF('/banana-v1-transformed.glb')

    const data = useMemo(() =>({
    // Randomly distributing the objects along the vertical
    y: THREE.MathUtils.randFloatSpread(height * 2),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: THREE.MathUtils.randFloatSpread(2),
    // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
    spin: THREE.MathUtils.randFloat(8, 12),
    // Some random rotations, Math.PI represents 360 degrees in radian
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI
  }),[height])

  useFrame((state, dt) => {
    if (!ref.current || dt > 0.1) return

    // Movimiento vertical
    data.y += dt * speed

    ref.current.position.set(
      index === 0 ? 0 : data.x * width,
      data.y,
      -z
    )

    // Rotación
    ref.current.rotation.set(
      data.rX += dt / data.spin,
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      data.rZ += dt / data.spin
    )

    // Recycle (loop infinito)
    const limit = height * (index === 0 ? 4 : 1)
    if (data.y > limit) data.y = -limit
  })

    return (
    <Detailed ref={ref} distances={[0, 65, 80]}>
      <mesh geometry={nodes.banana_high.geometry} material={materials.skin} emissive="#ff9f00" />
      <mesh geometry={nodes.banana_mid.geometry} material={materials.skin} emissive="#ff9f00" />
      <mesh geometry={nodes.banana_low.geometry} material={materials.skin} emissive="#ff9f00" />
    </Detailed>
  )

}

export default function Bananas({ speed = 1, count = 80, depth = 80, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) {
  return (
    // No need for antialias (faster), dpr clamps the resolution to 1.5 (also faster than full resolution)
    // As of three > r154 if postprocessing is used the canvas can not have tonemapping (which is what "flat" is, no tonemapping)
    <Canvas flat gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}>
      <color attach="background" args={['#ffb940ff']} />
      {/* As of three > r153 lights work differently in threejs, to get similar results as before you have to add decay={0} */}
      <spotLight position={[10, 20, 10]} penumbra={1} decay={0} intensity={3} color="orange" />
      {/* Using cubic easing here to spread out objects a little more interestingly, i wanted a sole big object up front ... */}
      <Suspense fallback={null}>
      {Array.from({ length: count }, (_, i) => <Banana key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} /> /* prettier-ignore */)}
      <Environment preset="sunset" />
      </Suspense>
      {/* Multisampling (MSAA) is WebGL2 antialeasing, we don't need it (faster)
          The normal-pass is not required either, saves a bit of performance */}
      <EffectComposer disableNormalPass multisampling={0}>
        <DepthOfField target={[0, 0, 60]} focalLength={0.4} bokehScale={14} height={700} />
        {/* As of three > r154 tonemapping is not applied on rendertargets any longer, it requires a pass */}
        <ToneMapping />
      </EffectComposer>
    </Canvas>
  )
}