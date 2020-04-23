import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Register from './components/auth/Register';
import Voters from './components/voter/Voters';

const routes = [

    {
        path: '/register',
        component: Register,
        name: 'register',
        meta: {
            requiresVisitor: true
        }
    },

    {
        path: '/',
        component: Login,
        name: 'login',
        meta: {
            requiresVisitor: true
        }
    },

    {
        path: '/logout',
        component: Logout
    },

    {
        path: '/voters',
        name: 'voters',
        component: Voters,
        meta: {
            requiresAuth: true
        },
    },
];

export default routes;
