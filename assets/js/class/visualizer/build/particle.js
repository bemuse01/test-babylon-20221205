import ShaderName from '../shader/particle.shader.js'
import Method from '../../../method/method.js'

export default class{
    constructor({scene, engine, audio}){
        this.scene = scene
        this.engine = engine
        this.audio = audio

        this.rad = 20
        this.radStep = 0.2
        this.count = 720
        this.countStep = 120
        this.iter = 16
        this.radius = 0.3

        this.init()
    }


    // init
    init(){
        this.create()
        this.animate()
    }


    // create
    create(){
        const count = Array.from({length: this.iter}, (_, i) => this.count + i * this.countStep).reduce((pre, cur) => pre + cur)
        // console.log(count)

        const SPS = new BABYLON.SolidParticleSystem('SPS', this.scene);
        const circle = BABYLON.MeshBuilder.CreateDisc('disc', {
            radius: this.radius,
            tessellation: 4
        }, this.scene)

        SPS.addShape(circle, count)

        const material = this.createMaterial()

        this.mesh = SPS.buildMesh()
        this.mesh.material = material

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
        // const buffer = new BABYLON.Buffer(this.engine, test, false)
        // mesh.setVerticesBuffer(buffer.createVertexBuffer('test', 0, 1))

        const {seedX, seedY} = this.createAttribute(SPS, numVertices)

        const seedXBuffer = new BABYLON.Buffer(this.engine, seedX, false)
        this.mesh.setVerticesBuffer(seedXBuffer.createVertexBuffer('seedX', 0, 1))

        const seedYBuffer = new BABYLON.Buffer(this.engine, seedY, false)
        this.mesh.setVerticesBuffer(seedYBuffer.createVertexBuffer('seedY', 0, 1))

        SPS.setParticles()
    }
    createAttribute(SPS, numVertices){
        const {count, countStep, iter, rad, radStep} = this
        const minRad = rad
        const maxRad = rad + radStep * (iter - 1)
        const seedX = []
        const seedY = []
        let n = 0

        for(let i = 0; i < iter; i++){

            const r = rad + radStep * i
            const c = count + countStep * i
            const deg = 360 / c
            const nr = Method.normalize(r, 1, 2, minRad, maxRad)

            // const nr = Method.normalize(r, 1, 2, minRad, maxRad)

            for(let j = 0; j < c; j++){
                const particle = SPS.particles[n++]

                const degree = (deg * j) * RADIAN
                const x = Math.cos(degree) * r
                const y = Math.sin(degree) * r

                const nx = Math.cos(degree) * nr
                const ny = Math.sin(degree) * nr

                seedX.push(...Array.from({length: numVertices}, _ => nx))
                seedY.push(...Array.from({length: numVertices}, _ => ny))

                particle.position.x = x
                particle.position.y = y
            }

        }

        console.log(seedX)

        return{
            seedX,
            seedY
        }
    }
    createMaterial(){
        // const material = new BABYLON.StandardMaterial('material', this.scene)
        // material.emissiveColor = new BABYLON.Color3(1, 1, 1)
        const material = new BABYLON.ShaderMaterial('particleShader', this.scene, {
            vertex: ShaderName,
            fragment: ShaderName,
        },
        {
            attributes: ['position', 'uv', 'seedX', 'seedY'],
            uniforms: ['worldViewProjection', 'time', 'uColor', 'audioDataAvg'],
            needAlphaBlending: true,
            needAlphaTesting: true,
        },
        )

        material.setColor3('uColor', BABYLON.Color3.FromHexString('#ffffff'))

        return material
    }


    // animate
    animate(){
        this.render()

        requestAnimationFrame(() => this.animate())
    }
    render(){        
        const time = window.performance.now()

        this.mesh.material.setFloat('time', time)
        
        if(!this.audio.audioDataAvg) return
        this.mesh.material.setFloat('audioDataAvg', this.audio.audioDataAvg)
    }
}