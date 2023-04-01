import { defineStore } from "pinia";
import { axiosAPI } from '../plugin/axios';
import { toast } from 'vue3-toastify';


export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null,
        operation_in_submission : false , 
        operation_show_alert : false , 
        operation_alert_variant : "",
        operation_alert_msg: "",
    }),
    actions: {
        async login(u) {
            this.errorMassage=null,
            this.operation_in_submission = true , 
            this.operation_show_alert = true , 
            this.operation_alert_variant = "bg-blue-500",
            this.operation_alert_msg= "Please wait! It's take a few time"

        axiosAPI.post('users/login',u).then((response)=>
        {
            this.operation_show_alert = false ; 
            this.operation_in_submission = false ;
            toast.success("Success! meow :) moving in home page..", {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            setTimeout(() => {
             localStorage.setItem('token', response.data.user.token );
             localStorage.setItem('user',JSON.stringify(response.data.user) );
            this.$router.push({name:'home'})
        }, 2000);
            setTimeout(() => {
                location.reload()
              }, 2000);
        }
        )
        .catch((error) => {
            console.log(error)
            toast.error( 'Sign in failed!' , {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            const values=error.response.data.errors
            this.errorMassage = Object.entries(values);
            this.operation_in_submission = false ;
            this.operation_show_alert = false ; 
          })
        }
    }
})