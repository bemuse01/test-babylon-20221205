const name = 'VisualizerParticle'

const vertex = `
    attribute vec3 position;
    uniform mat4 worldViewProjection;

    void main(){
        vec3 nPosition = position;
        // nPosition.xy *= 0.5;

        gl_Position = worldViewProjection * vec4(nPosition, 1.0);
    }
`
const fragment = `
    uniform vec3 uColor;

    void main(){
        gl_FragColor = vec4(uColor, 1.0);
    }
`

BABYLON.Effect.ShadersStore[name + 'VertexShader'] = vertex
BABYLON.Effect.ShadersStore[name + 'FragmentShader'] = fragment

export default name