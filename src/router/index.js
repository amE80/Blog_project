import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Edit from '../views/EditUser.vue'
import AddBlog from '../views/AddBlog.vue'
import Article from '../views/Article.vue'
import UserProfile from '../views/Profile.vue'
import EditArticle from '../views/EditArticle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        accsess:false
      }
    },
    {
      path: '/feed',
      name: 'homeFeed',
      component: Home,
      meta:{
        accsess:true
      }
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
      meta:{
        accsess:false
      }    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp,
      meta:{
        accsess:false
      }    },
    {
      path: '/edit-user',
      name: 'edit',
      component: Edit,
      meta:{
        accsess:true
      }
    },
    {
      path: '/add-blog',
      name: 'addBlog',
      component: AddBlog,
      meta:{
        accsess:true
      }
    },
    {
      path: '/single-article/:slug',
      name: 'article',
      component:Article,
      meta:{
        accsess:true
      }
    },
    {
      path: '/user-profile/:username',
      name: 'userProfile',
      component:UserProfile,
      meta:{
        accsess:true
      }
    },
    {
      path: '/user-profile/fav/:username',
      name: 'userProfileFav',
      component:UserProfile,
      meta:{
        accsess:true
      }
    },
    {
      path: '/edit-article/:slug',
      name: 'editArticle',
      component:EditArticle,
      meta:{
        accsess:true
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  if(to.meta.accsess){
    if(localStorage.getItem('token')){
      next()
    }
    else{
      next({name: 'home'})
    }
  }
  else{
    if(localStorage.getItem('token') && to.name !== 'home' ) {
      next({name: 'home'})
        }
    else{
      next()
    }  }
});
export default router
