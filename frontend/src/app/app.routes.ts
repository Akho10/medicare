import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { UserLogin } from './pages/auth/user-login/user-login';
import { UserRegister } from './pages/auth/user-register/user-register';
import { AdminLogin } from './pages/auth/admin-login/admin-login';
import { AdminRegister } from './pages/auth/admin-register/admin-register';
import { UserDashboard } from './pages/user/user-dashboard/user-dashboard';
import { MedicineList } from './pages/user/medicine-list/medicine-list';
import { MyPrescriptions } from './pages/user/my-prescriptions/my-prescriptions';
import { MyOrders } from './pages/user/my-orders/my-orders';
import { UserProfile } from './pages/user/user-profile/user-profile';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { ManageMedicines } from './pages/admin/manage-medicines/manage-medicines';
import { ManageBrands } from './pages/admin/manage-brands/manage-brands';
import { ManageSymptoms } from './pages/admin/manage-symptoms/manage-symptoms';
import { ManagePrescriptions } from './pages/admin/manage-prescriptions/manage-prescriptions';
import { ManagePayments } from './pages/admin/manage-payments/manage-payments';

export const routes: Routes = [
    //home
    {
        path: '',
        component: Home
    },
    //auth
    {
        path: 'user-login',
        component: UserLogin
    },
    {
        path: 'user-register',
        component: UserRegister
    },
    {
        path: 'admin-login',
        component: AdminLogin
    },
    {
        path: 'admin-register',
        component: AdminRegister
    },

    //user
    {
        path: 'user-dashboard',
        component: UserDashboard
    },
    {
        path: 'medicines',
        component: MedicineList
    },
    {
        path: 'my-prescriptions',
        component: MyPrescriptions
    },
    {
        path: 'my-orders',
        component: MyOrders
    },
    {
        path: 'user-profile',
        component: UserProfile
    },
    //admin
    {
        path: 'admin-dashboard',
        component: AdminDashboard
    },
    {
        path: 'manage-medicines',
        component: ManageMedicines
    },
    {
        path: 'manage-brands',
        component: ManageBrands
    },
    {
        path: 'manage-symptoms',
        component: ManageSymptoms
    },
    {
        path: 'manage-prescriptions',
        component: ManagePrescriptions
    },
    {
        path: 'manage-payments',
        component: ManagePayments
    },

    {
        path: '**',
        redirectTo: ''
    }
];
