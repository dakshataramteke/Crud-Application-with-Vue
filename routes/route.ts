import CreateForm from '@/Components/CreateForm.vue';
import EditForm from '@/Components/EditForm.vue';
import { createRouter, createWebHistory } from 'vue-router'
import AllData from '@/Components/AllData.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/users' },
        { path: '/create', component:CreateForm },
        {path: '/users', component:AllData},
        { path: '/users/:id/edit', component: EditForm },
    ]
});
export default router;