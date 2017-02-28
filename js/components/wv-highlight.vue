<template>
    <section id="highlight">
        <ul>
            <li class="article" v-for="article in articles">
                <h3 class="country">{{ article.country.name }} <span class="perf">(+x.x%}</span></h3>
                <h2 class="headline">
                    <a :href="article.url">{{ article.title }}</a>
                </h2> 
                <h4 class="source">{{ article.source.name }}</h4>
            </li>
        </ul>
    </section>
</template>

<script>
    import store from '../store';

    export default {
        name: 'wv-highlight',
        data() {
            return {
                articles: store.getters.articles,
            };
        },
    };

</script>