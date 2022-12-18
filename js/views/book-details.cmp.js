import { bookService } from "../services/book-service.js"

export default {
    // props: ['book'],
    template: `
        <section class="book-details" v-if="book">
           <h2> 
                 <span class="info-book">Description : </span>
                 {{ book.description }}
            </h2>

            <h2>
                <span class="info-book">Reading length : </span>  
                {{ readingLength}}
            </h2>

            <h2>
            <span class="info-book">Published date : </span>  
                {{publishedDateDesc}}
            </h2>
            
            
            <img class="saleImg" :src="setUrlImgSale"/>
            <img :src="book.thumbnail" alt="">
            <h2 class="price">price:<span :class="priceStyle">{{ book.listPrice.amount }} {{ book.listPrice.currencyCode }} </span> </h2>



            <!-- <button @click="$emit('close')">Close</button> -->
            <router-link class="router-link" to="/book">Back</router-link>
        </section>
    `,
    created() {
        const id = this.$route.params.id
        console.log(id)
        bookService.get(id)
            .then(book => {
                this.book = book
            })

    },
    data() {
        return {
            book: null,
            descPublished: {
                new: 'New!',
                veteran: 'Veteran Book'
            },
            saleImgURL: {
                available: '../../img/available.png',
                soldOut: '../../img/sold-out-rubber-stamp.jpeg'
                // "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
            }
        }
    },
    computed: {
        imgUrl() {
            return `book.thumbnail`
        },

        readingLength() {
            const pageCount = this.book.pageCount

            let pageCountDesc = ''
            if (pageCount > 500) pageCountDesc = 'long reading'
            if (pageCount > 200) pageCountDesc = 'decent reading'
            if (pageCount <= 200) pageCountDesc = 'light reading'
            return pageCountDesc
        },
        publishedDateDesc() {

            const publishedDate = this.book.publishedDate
            const date = new Date();
            const timePublished = date.getFullYear() - publishedDate
            const publishedDateToStr = (timePublished < 1) ? this.descPublished.new : this.descPublished.veteran
            return publishedDateToStr
        },
        priceStyle() {
            return { red: this.book.listPrice.amount >= 65, green: this.book.listPrice.amount < 65 }
        },
        setUrlImgSale() {
            return this.book.listPrice.isOnSale ? this.saleImgURL.available : this.saleImgURL.soldOut
        }


    }
}
