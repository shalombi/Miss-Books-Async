const { createApp } = Vue
const { createRouter, createWebHashHistory } = VueRouter


// views
import bookApp from './views/book-app.cmp.js'
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'


import bookDetails from './views/book-details.cmp.js'
import bookEditCmp from './views/book-edit.cmp.js'

// cmps
import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'


const options = {
    template: `
        <section>
            <app-header />
            <user-msg/>
            <router-view/>
            <app-footer />
        </section>
    `,
    components: {
        appHeader,
        userMsg,
        bookApp,
        appFooter,
    }
}

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/book',
            component: bookApp
        },
        {
            path: '/book/:id',
            component: bookDetails
        },
        {
            path: '/book/edit/:id?',
            component: bookEditCmp
        },
        {
            path: '/about',
            component: aboutPage
        },
    ]
}

const app = createApp(options)
const router = createRouter(routerOptions)

app.use(router)
app.mount('#app')
