import WVMap from './components/wv-map.vue';
import WVHighlight from './components/wv-highlight.vue';

import store from './store';

const $ = document.querySelector.bind(document);

window.addEventListener('DOMContentLoaded', () => {
    /**
     * Initialize the application and render the map.
     */
    const app = new Vue({
        el: $('main'),
        store,
        components: {
            'wv-map': WVMap,
            'wv-highlight': WVHighlight,
        },
        data() {
            return {
                active: {},
            };
        },
        mounted() {
            console.log('fetching articles');
            this.$store.dispatch('fetchArticles');
        },
        methods: {
            highlight(target) {
                /* Update active country and fetch relevant articles. */
                // this.active = target;
                // this.$store.dispatch('fetchArticles', target);
            }
        }
    });
});