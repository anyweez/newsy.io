<template>
    <section id="highlight">
            <transition-group name="articles" tag="ul">
                <li class="article" :key="article" v-for="article in chosen">
                    <h3 class="country">{{ article.country.name }} <span class="perf">{{ display_perf(article.country.performance) }}</span></h3>
                    <h2 class="headline">
                        <a :href="article.url">{{ article.title }}</a>
                    </h2>
                    <h4 class="source">{{ article.source.name }}</h4>
                </li>
            </transition-group>
    </section>
</template>

<script>
    import store from '../store';
    const VISIBLE_ARTICLE_COUNT = 7;
    const SCROLL_TIME_SECONDS = 20;

    export default {
        name: 'wv-highlight',
        /* Automatically rotate through the set of available articles. */
        created() {
            setInterval(() => {
                this.current = this.current + 1 < this.articles.length ? this.current + 1 : 0;
            }, SCROLL_TIME_SECONDS * 1000);
        },
        data() {
            return {
                articles: store.getters.articles,
                current: 0,
            };
        },
        computed: {
            chosen() {
                const end = this.current + VISIBLE_ARTICLE_COUNT;

                /* Normal case: advance down the array */
                if (end < this.articles.length) {
                    return this.articles.slice(this.current, end);
                } else { /* Edge case: wrap around */
                    const remainder = VISIBLE_ARTICLE_COUNT - (this.articles.length - this.current);
                    const result = this.articles.slice(this.current).concat(this.articles.slice(0, remainder));

                    return result;
                }
            },
        },
        methods: {
            display_perf(score) {
                return ['(', score >= 0 ? '+' : '-', Math.round(score * 1000) / 10, '%)'].join('');
            },
        },
    };

</script>