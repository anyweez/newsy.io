<template>
    <section id="highlight">
        <div class="heading">
            <img src="https://unsplash.it/300/200?image=10" />
            <h2>Country: {{ target.name }} ({{ target.diff }})</h2>
            <p>Leader: tbd</p>
        </div>
        <div class="body">
            <ul>
                <li v-for="article in articles">
                    <h3>{{ article.title }}</h3>
                    <p>published by {{ article.source.name }} on {{ article.published }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import store from '../store';

    export default {
        name: 'wv-highlight',
        props: {
            target: Object,
        },
        computed: {
            articles() {
                return store.getters.articles;
            }
        }
    };

</script>