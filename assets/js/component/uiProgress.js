export default {
    template: `
        <div 
            class="ui-progress"
            :style="rootStyle"
        >

            <div 
                class="progressBar"
                :style="progressStyle"
            ></div>

        </div>
    `,
    setup(){
        const {ref, onMounted, computed} = Vue
        const {useStore} = Vuex


        // variables
        const store = useStore()
        const audio = computed(() => store.getters['audio/getAudio'])


        // styles
        const rootStyle = ref({
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '10px'
        })
        const progressStyle = ref({
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '4px',
            background: 'white',
            transform: 'scaleX(0)',
            transformOrigin: 'left'
        })
        const trackStyle = ref({})


        // methods
        const setProgress = () => {
            const progress = audio.value.getProgress()
            progressStyle.value.transform = `scaleX(${progress})`
        }
        const animate = () => {
            if(!audio.value) return

            setProgress()

            requestAnimationFrame(animate)
        }


        // life cycle
        onMounted(() => {
            animate()
        })


        return{
            rootStyle,
            progressStyle
        }
    }
}