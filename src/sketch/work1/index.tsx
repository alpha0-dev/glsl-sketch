import { Canvas } from "@react-three/fiber"
import vert from "./vert.glsl"
import frag from "./frag.glsl"

export function Work1() {
	return (
		<Canvas>
			<color attach="background" args={["#000"]} />
			<points>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						count={5}
						array={Float32Array.from([
							0.0,
							0.0,
							0.0, // １つ目の頂点の XYZ
							-0.5,
							0.5,
							0.0, // ２つ目の頂点の XYZ
							0.5,
							0.5,
							0.0, // ３つ目の頂点の XYZ
							-0.5,
							-0.5,
							0.0, // ４つ目の頂点の XYZ
							0.5,
							-0.5,
							0.0, // ５つ目の頂点の XYZ
						])}
						itemSize={3}
					/>
				</bufferGeometry>
				<shaderMaterial vertexShader={vert} fragmentShader={frag} />
			</points>
		</Canvas>
	)
}
