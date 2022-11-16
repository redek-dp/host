new Vue({
    el: "#app",
    data: {
        nuber: "25",
        thum: "https://image.thum.io/get/image/fit/300x300/",
        posts: []
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            axios.get("https://dl.dropboxusercontent.com/s/rv8j8yd1cho43sm/instagram-receitas.json").then((posts) => {
                this.posts = posts.data;
                console.log(this.posts);
            });
        }
    }
});