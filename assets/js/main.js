import Store from './store/index.js'

import CanvasContainer from './component/canvasContainer.js'
import AudioContainer from './component/audioContainer.js'

const vueApp = Vue.createApp({
    components: {
        'canvas-container': CanvasContainer,
        'audio-container': AudioContainer
    },
    setup(){
        const {onMounted} = Vue

        const animate = () => {
            TWEEN.update()

            requestAnimationFrame(animate)
        }
        
        onMounted(() => {
            animate()
        })
    }
})

vueApp.use(Store)
vueApp.mount('#wrap')