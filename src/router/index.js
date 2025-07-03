import { createRouter, createWebHistory } from 'vue-router'

function loadView(view) {
    return () => import(`../views/pages/${view}.vue`);
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'BaseUser',
            component: () => import('../views/layout/Base.vue'),
            children: [
                // admin
                {
                    path: 'admin/product',
                    name: 'ManageProduct',
                    component: loadView('ManageProduct')
                },
                {
                    path: 'admin/dashboard',
                    name: 'Dashboard',
                    component: loadView('Dashboard')
                },
                {
                    path: 'admin/product/create',
                    name: 'ProductCreate',
                    component: loadView('ManageCreateProduct')
                },
                {
                    path: 'admin/product/:product_id/update',
                    name: 'ProductUpdate',
                    component: loadView('ManageUpdateProduct')
                },
                {
                    path: 'admin/orders',
                    name: 'ManageOrders',
                    component: loadView('ManageOrders')
                },
                {
                    path: 'admin/:product_id/session',
                    name: 'ManageSessionCourse',
                    component: loadView('ManageSessionCourse')
                },
                {
                    path: 'admin/history/:user_id',
                    name: 'HistoryUserBuy',
                    component: loadView('HistoryUserBuy')
                },
                {
                    path: 'admin/customer',
                    name: 'ManageCustomer',
                    component: loadView('ManageCustomer')
                },
                
                {
                    path: 'admin/type-product',
                    name: 'ManageTypeProduct',
                    component: loadView('ManageTypeProduct')
                },

                {
                    path: '',
                    name: 'Home',
                    component: loadView('Home')
                },

                {
                    path: '/courses',
                    name: 'Courses',
                    component: loadView('Courses')
                },

                {
                    path: '/homework/:home_work_id',
                    name: 'HomeWork',
                    component: loadView('HomeWork')
                },

                {
                    path: '/homework/:session_id/detail',
                    name: 'HomeWorkDetail',
                    component: loadView('HomeWorkDetail')
                },

                {
                    path: '/admin/home-work/:product_id',
                    name: 'ManageHomeWork',
                    component: loadView('ManageHomeWork')
                },
                {
                    path: 'admin/:product_id/home-work/:home_work_id',
                    name: 'ManageHomeWorkDetail',
                    component: loadView('ManageHomeWorkDetail')
                },
                {
                    path: '/course/:product_id',
                    name: 'CourseDetail',
                    component: loadView('CourseDetail')
                },
               
               
                {
                    path: 'product/:product_id',
                    name: 'ProductDetail',
                    component: loadView('ProductDetail')
                },
                {
                    path: 'about-us',
                    name: 'AboutUs',
                    component: loadView('AboutUs')
                },
                {
                    path: 'contact',
                    name: 'Contact',
                    component: loadView('Contact')
                },
                {
                    path: 'term',
                    name: 'Term',
                    component: loadView('Term')
                },
                {
                    path: 'profile',
                    name: 'UpdateProfile',
                    component: loadView('UpdateProfile')
                },
                
                {
                    path: 'cart',
                    name: 'Cart',
                    component: loadView('Cart')
                },
                {
                    path: '/orders',
                    name: 'Orders',
                    component: loadView('Orders')

                },
               
                {
                    path: 'session/:session_id',
                    name: 'SessionOrder',
                    component: loadView('SessionOrder')
                },
                // {
                //     path: 'cuongtest',
                //     name: 'CuongTest',
                //     component: loadView('CuongTest')
                // },
                
            ]
        },
        {
            path: '/',
            name: 'BaseAuth',
            component: () => import('../views/layout/BaseAuth.vue'),
            children: [
                {
                    path: 'login',
                    name: 'Login',
                    component: loadView('Login')
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: loadView('Register')
                }
            ]
        },
        {
            path: '/notfound',
            name: 'NotFound',
            component: loadView('NotFound'),
        },
        {
            // will match everything
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: loadView('NotFound'),
        },
    ],
})

export default router
