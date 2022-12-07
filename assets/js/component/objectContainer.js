import Visualizer from '../class/visualizer/visualizer.js'

export default {
    template: `
        <div id="object-container"></div>
    `,
    setup(){
        const {ref, onMounted, watch, computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()


        // variables
        const app = computed(() => store.getters['app/getApp'])

        let visualizer = null


        // life cycle
        onMounted(() => {
        })

        watch(app, (cur, pre) => {
            if(cur){
                visualizer = new Visualizer({app: app.value})
            }
        })


        return {
        }
    }
}