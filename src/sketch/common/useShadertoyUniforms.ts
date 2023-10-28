import * as THREE from "three"

import { useFrame, useThree } from "@react-three/fiber"

const shadertoyUniforms: { [key: string]: THREE.IUniform } = {
	iGlobalTime: {
		value: 0,
	},
	iTime: {
		value: 0,
	},
	iTimeDelta: {
		value: 0,
	},
	iResolution: {
		value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1),
	},
	iMouse: {
		value: new THREE.Vector4(0, 0, 0, 0),
	},
	iFrame: {
		value: 0,
	},
	iDate: {
		value: new THREE.Vector4(
			new Date().getFullYear(),
			new Date().getMonth() + 1,
			new Date().getDate(),
			new Date().getHours()
		),
	},
	iSampleRate: {
		value: 44100,
	},
	iChannelTime: {
		value: [0, 0, 0, 0],
	},
}

export function useShadertoyUniforms(shaderMaterial: THREE.ShaderMaterial) {
	shaderMaterial.uniforms = {
		...shaderMaterial.uniforms,
		...shadertoyUniforms,
	}
	const { viewport } = useThree()
	useFrame(({ clock, pointer }, delta) => {
		if (shaderMaterial) {
			const elapsed = clock.getElapsedTime()
			shaderMaterial.uniforms.iGlobalTime.value = elapsed
			shaderMaterial.uniforms.iTime.value = elapsed
			shaderMaterial.uniforms.iTimeDelta.value = delta

			shaderMaterial.uniforms.iResolution.value = new THREE.Vector3(
				viewport.width,
				viewport.height,
				1
			)

			shaderMaterial.uniforms.iMouse.value = new THREE.Vector4(
				pointer.x,
				pointer.y,
				0,
				0
			)

			shaderMaterial.uniforms.iDate.value = new THREE.Vector4(
				new Date().getFullYear(),
				new Date().getMonth() + 1,
				new Date().getDate(),
				new Date().getHours()
			)

			shaderMaterial.uniforms.iChannelTime.value = [
				elapsed,
				elapsed,
				elapsed,
				elapsed,
			]
			shaderMaterial.uniforms.iFrame.value++
		}
	})
}
