import Store from './store/index.js'

import CanvasContainer from './component/canvasContainer.js'

const vueApp = Vue.createApp({
    components: {
        'canvas-container': CanvasContainer,
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