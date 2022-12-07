import ShaderName from '../shader/particle.shader.js'

export default class{
    constructor({scene}){
        this.scene = scene

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const SPS = new BABYLON.SolidParticleSystem('SPS', this.scene);
        const circle = BABYLON.MeshBuilder.CreateDisc('disc', {
            radius: 0.1,
            tessellation: 16
        }, this.scene)

        SPS.addShape(circle, 100)
        circle.dispose()

        const material = this.createMaterial()

        const mesh = SPS.buildMesh()
        mesh.material = material

        SPS.initParticles = () => {
            for (let p = 0; p < SPS.nbParticles; p++) {
                const particle = SPS.particles[p]
                particle.position.x = BABYLON.Scalar.RandomRange(-5, 5)
                particle.position.y = BABYLON.Scalar.RandomRange(-5, 5)
                // particle.position.z = BABYLON.Scalar.RandomRange(-50, 50)
            }
        }
    
        SPS.initParticles()
        SPS.setParticles()
    }
    createMaterial(){
        // const material = new BABYLON.StandardMaterial('material', this.scene)
        // material.emissiveColor = new BABYLON.Color3(1, 1, 1)
        const material = new BABYLON.ShaderMaterial('particleShader', this.scene, {
            vertex: ShaderName,
            fragment: ShaderName,
        },
        {
            attributes: ['position', 'uv'],
            uniforms: ['worldViewProjection', 'uColor']
        })

        material.setColor3('uColor', BABYLON.Color3.FromHexString('#ff0000'))

        return material
    }
}