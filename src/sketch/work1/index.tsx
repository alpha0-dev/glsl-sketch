import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useControls } from "leva"
import vert from "./vert.glsl"
import frag from "./frag.glsl"
import { useShadertoyUniforms } from "../common/useShadertoyUniforms"

const material = new THREE.ShaderMaterial({
	vertexShader: vert,
	fragmentShader: frag,
	side: THREE.DoubleSide,
	uniforms: {
		uDistort: { value: 0 },
	},
})

function Experience() {
	useShadertoyUniforms(material)
	const { viewport } = useThree()
	useControls({
		uDistort: {
			value: 1,
			min: 0,
			max: 2,
			onChange: value => {
				material.uniforms.uDistort.value = value
			},
		},
	})
	return (
		<mesh material={material}>
			<planeGeometry args={[viewport.width, viewport.height, 64, 64]} />
		</mesh>
	)
}

export function Work1() {
	return (
		<Canvas>
			<OrbitControls />
			<Experience />
		</Canvas>
	)
}
