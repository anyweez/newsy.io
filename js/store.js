
Vue.use(Vuex);

const state = {
    articles: [],
};

const mutations = {
    addArticle(state, article) {
        state.articles.push(article);
        console.log(`Articles: ${state.articles.length}`)
    },

    clearArticles(state) {
        state.articles.length = 0;
    }
};

const actions = {
    /**
     * Fetch a new set of articles and modify the shared state.
     */
    fetchArticles({ commit }, country) {
        return new Promise((resolve, reject) => {
            commit('clearArticles');

            console.log(`Retrieving articles for ${country.id}`);
            fetch('articles.json')
                .then(resp => resp.json())
                .then(articles => {
                    console.log('got articles');
                    console.log(articles);
                    articles.forEach(article => commit('addArticle', article));
                    resolve();
                })
                .catch(err => reject(err));
        });
    }
};

const getters = {
    articles(state) {
        return state.articles;
    },
}

export default new Vuex.Store({ state, getters, actions, mutations });