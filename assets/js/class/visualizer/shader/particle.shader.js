import ShaderMethod from '../../../method/method.shader.js'

const name = 'VisualizerParticle'

const vertex = `
    attribute vec3 position;
    attribute vec2 uv;
    attribute float seedX;
    attribute float seedY;
    uniform mat4 worldViewProjection;
    uniform float time;
    uniform float audioDataAvg;

    varying float vOpacity;

    ${ShaderMethod.snoise3D()}

    void main(){
        vec3 nPosition = position;
        // nPosition.xy *= 0.5;
        // if(uv.x == 0.0) nPosition.x = 5.0;
        // nPosition.x += 5.0;

        float nx = snoise3D(vec3(seedX * 0.2, seedY * 0.2, time * 0.00175));
        float ny = snoise3D(vec3(seedX * 0.2 * 3.0, seedY * 0.2 * 3.0, time * 0.00175));

        nPosition.xy += vec2(nx, ny) * audioDataAvg * 0.2;

        gl_Position = worldViewProjection * vec4(nPosition, 1.0);
    }
`
const fragment = `
    uniform vec3 uColor;

    void main(){
        // gl_FragColor = vec4(uColor, vOpacity);
        gl_FragColor = vec4(uColor, 1.0);
    }
`

BABYLON.Effect.ShadersStore[name + 'VertexShader'] = vertex
BABYLON.Effect.ShadersStore[name + 'FragmentShader'] = fragment

export default name