import CreateForm from '@/Components/CreateForm.vue';
import EditForm from '@/Components/EditForm.vue';
import { createRouter, createWebHistory } from 'vue-router'
import AllData from '@/Components/AllData.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/create', component:CreateForm },
        {path: '/alldata', component:AllData},
        { path: '/api/users/:id/edit', component: EditForm },
    ]
});
export default router;