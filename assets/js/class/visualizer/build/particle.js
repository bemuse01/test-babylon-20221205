import ShaderName from '../shader/particle.shader.js'

export default class{
    constructor({scene, engine}){
        this.scene = scene
        this.engine = engine

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const count = 10

        const SPS = new BABYLON.SolidParticleSystem('SPS', this.scene);
        const circle = BABYLON.MeshBuilder.CreateDisc('disc', {
            radius: 0.1,
            tessellation: 16
        }, this.scene)

        SPS.addShape(circle, count)

        const material = this.createMaterial()

        const mesh = SPS.buildMesh()
        mesh.material = material

        const numVertices = circle.getTotalVertices()
        const test = []
        for(let i = 0; i < count; i++){
            const opacity = Math.random() * 0.75 + 0.25
            for(let j = 0; j < numVertices; j++){
                test.push(opacity)
            }
        }
        circle.dispose()

        // const buffer = new BABYLON.Buffer(this.engine, test, false, 3)
        // mesh.setVerticesBuffer(buffer.createVertexBuffer('test', 0, 3))
        const buffer = new BABYLON.Buffer(this.engine, test, false)
        mesh.setVerticesBuffer(buffer.createVertexBuffer('test', 0, 1))

        console.log(numVertices)

        // console.log(mesh)
        // console.log(SPS)
        // console.log(mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind))

        SPS.initParticles = () => {
            for (let p = 0; p < SPS.nbParticles; p++) {
                const particle = SPS.particles[p]
                particle.position.x = BABYLON.Scalar.RandomRange(-5, 5)
                particle.position.y = BABYLON.Scalar.RandomRange(-3, 3)
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
            attributes: ['position', 'uv', 'test'],
            uniforms: ['worldViewProjection', 'uColor'],
            needAlphaBlending: true,
            needAlphaTesting: true,
        },
        )

        material.setColor3('uColor', BABYLON.Color3.FromHexString('#ffffff'))

        return material
    }
}