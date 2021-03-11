const app = Vue.createApp({
    data() {
        return {
            keyword: '',
            result: null
        }
    },
    methods: {
        searchGoogleBooks() {
            fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.keyword + "&startIndex=0&maxResults=30")
                .then(response => response.json())
                .then(json => {
                    this.result = json;
                })

        }
    }
})