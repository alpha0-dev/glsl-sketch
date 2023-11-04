import * as THREE from "three"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useShadertoy } from "../common/useShadertoy"
import vertexShader from "./vert.glsl"
import fragmentShader from "./frag.glsl"
import { useControls } from "leva"
import { useMemo } from "react"

const material = new THREE.ShaderMaterial({
	vertexShader,
	fragmentShader,
})

function Work1() {
	useShadertoy(material)
	const { count, size, scale } = useControls({
		count: {
			value: 10000,
			min: 1000,
			max: 100000,
			step: 1,
		},
		size: {
			value: 3,
			min: 0.01,
			max: 10,
			step: 0.01,
		},
		scale: {
			value: 0.2,
			min: 0,
			max: 2,
			step: 0.1,
		},
	})
	const { positions, indexes, colors } = useMemo(() => {
		const positions = new Float32Array(count * 3)
		const indexes = new Float32Array(count)
		const colors = new Float32Array(count * 3)
		for (let i = 0; i <= count; i++) {
			const r = Math.random() * 2 * Math.PI
			// 頂点座標
			positions[i * 3 + 0] = Math.cos(r) + (Math.random() - 0.5) * scale
			positions[i * 3 + 1] = Math.sin(r) + (Math.random() - 0.5) * scale
			positions[i * 3 + 2] = 0
			// インデックス
			indexes[i] = i
			// 色
			colors[i * 3 + 0] = Math.random()
			colors[i * 3 + 1] = Math.random()
			colors[i * 3 + 2] = Math.random()
		}
		return { positions, indexes, colors }
	}, [count, scale])
	const sizes = useMemo(() => {
		const sizes = new Float32Array(count)
		for (let i = 0; i <= count; i++) {
			sizes[i] = size * Math.random()
		}
		return sizes
	}, [size, count])
	return (
		<points material={material}>
			<bufferGeometry>
				<bufferAttribute attach="attributes-position" args={[positions, 3]} />
				<bufferAttribute attach="attributes-index" args={[indexes, 1]} />
				<bufferAttribute attach="attributes-color" args={[colors, 3]} />
				<bufferAttribute attach="attributes-size" args={[sizes, 1]} />
			</bufferGeometry>
		</points>
	)
}

export function Root() {
	return (
		<Canvas>
			<OrbitControls />
			<color attach="background" args={["#000"]} />
			<Work1 />
		</Canvas>
	)
}
