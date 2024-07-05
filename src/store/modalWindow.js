const modalWindow = {
    state: {
        open: false,
    },
    mutations: {
        open(state) {
            state.open = true;
        },
        close(state) {
            state.open = false;
        },
    },
    actions: {
        async openWindow({commit}) {
            try {
                commit('open');
            } catch(error) {
                console.log(error);
            }
        },
        async closeWindow({commit}) {
            try {
                commit('close');
            } catch(error) {
                console.log(error);
            }
        },
    },

}

export { modalWindow }

