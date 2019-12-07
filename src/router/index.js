import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddDiet from '@/components/AddDiet';
import EditDiet from '@/components/EditDiet';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-diet',
      name: 'AddDiet',
      component: AddDiet
    },
    {
      path: '/edit-diet/:diet_slug',
      name: 'EditDiet',
      component: EditDiet
    }
  ]
})
