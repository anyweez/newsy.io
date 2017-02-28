
Vue.use(Vuex);

const state = {
    articles: [],
};

const mutations = {
    addArticle(state, article) {
        state.articles.push(article);
    },

    clearArticles(state) {
        state.articles.splice(0, state.articles.length);
    },
};

const actions = {
    /**
     * Fetch a new set of articles and modify the shared state.
     */
    fetchArticles({ commit }) {
        return new Promise((resolve, reject) => {
            commit('clearArticles');

            // TODO: path should be data/articles/<country_id>.json
            fetch('data/articles/articles.json')
                .then(resp => resp.json())
                .then(articles => {
                    articles.forEach(article => commit('addArticle', article));
                    resolve();
                })
                .catch(err => reject(err));
        });
    }
};

const getters = {
    articles: state => state.articles,
};

export default new Vuex.Store({ state, getters, actions, mutations });