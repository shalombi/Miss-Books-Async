import { eventBus } from '../services/event-bus.service.js'


export default {
    template: `
        <section 
        :class="msg.type"
          class="user-msg"
           v-if="msg.txt"
            >
           <h1 > {{ msg.txt }} </h1>
        </section>
    `,
    data() {
        return {
            msg: { txt: "", type: 'success' }
        }
    }
    ,
    created() {
        console.log('created')
        eventBus.on('user-msg', this.showMsg)
    },
    methods: {
        showMsg(payload) {
            this.msg = payload
            setTimeout(() => {
                setTimeout(() => this.msg.txt = '')
            }, 1500);
        }
    }
}


// import { eventBus } from "../services/event-bus.service.js"

// export default {
//     template: `
//         <section  v-if="msg.txt" class="user-msg">
//             <h1>{{ msg.txt }}</h1>
//         </section>
//     `,
//     data(){
//         return {
//             msg: { txt: '', type: 'success' }
//         }
//     },
//     created(){
//         eventBus.on('user-msg', this.showMsg)
//     },
//     methods: {
//         showMsg(payload){
//             this.msg = payload
//             setTimeout(() => this.msg.txt = '', this.msg.timeout || 1500)
//         }
//     },
// }