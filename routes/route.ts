import CreateForm from '@/Components/CreateForm.vue';
import EditForm from '@/Components/EditForm.vue';
import { createRouter, createWebHistory } from 'vue-router'
import AllData from '@/Components/AllData.vue';
import Login from '@/Components/Admin/Login.vue';
// import Logout from '@/components/Admin/Logout.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/login', component:Login},
        // {path:'/logout', component:Logout},
        { path: '/', redirect: '/login' },
        { path: '/create', component:CreateForm },
        {path: '/users', component:AllData},
        { path: '/users/:id/edit', component: EditForm },

    ]
});
export default router;