export default {
    namespaced: true,
    state: {
        audio: null,
    },
    getters: {
        getAudio: (state) => state.audio,
    },
    mutations: {
        setApp(state, newAudio){
            state.audio = newAudio
        },
    },
    actions: {
        setApp({commit}, newAudio){
            commit('setAudio', newAudio)
        },
    },
}