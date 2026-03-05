import {createRouter, createWebHashHistory} from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'Projects',
                    component: () => import('@/views/pages/projects/Index.vue')
                },
                {
                    path: '/projects',
                    name: 'Projects',
                    component: () => import('@/views/pages/projects/Index.vue')
                },
                 {
                    path: '/tasks',
                    name: 'Tasks',
                    component: () => import('@/views/pages/tasks/Index.vue')
                },
            ]
        },
        {
            path: '/auth/login',
            name: 'Login',
            component: () => import('@/views/pages/auth/Login.vue')
        }
    ]
});

function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

router.beforeEach((to, from, next) => {
    const publicPages = ['/auth/login', '/auth/access', '/auth/error', '/pages/notfound'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && !isAuthenticated()) {
        return next('/auth/login');
    }

    if (to.path === '/auth/login' && isAuthenticated()) {
        return next('/');
    }

    next();
});


export default router;
