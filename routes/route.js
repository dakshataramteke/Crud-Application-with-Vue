import CreateForm from '@/Components/CreateForm.vue';
import Home from '@/Components/Home.vue';
import EditForm from '@/Components/EditForm.vue';
import { createRouter, createWebHistory } from 'vue-router'
import AllData from '@/Components/AllData.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', component:Home},
        { path: '/api/users/create', component:CreateForm },
        {path: '/api/users', component:AllData},
        { path: '/api/users/:id/edit', component: EditForm },
    ]
});
export default router;