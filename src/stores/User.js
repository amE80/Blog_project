import { defineStore } from "pinia";
import { axiosAPI } from '../plugin/axios';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        prof: false,
        user: null,
        operation_in_submission : false , 
        operation_show_alert : false , 
        operation_alert_variant : "",
        operation_alert_msg: "",
        errorMassage:null,
        aProfile:null

    }),
    actions: {
      async getCurrentUser(){
        axiosAPI.get("user").then((response)=>{
          this.prof = true;
          this.user = response.data.user

        }).catch((error)=>{
          console.log(error)
        })

      },
      async getProfile(username){
        console.log("username from pinia" , username);
        axiosAPI.get(`profiles/${username}`)
        .then(response=>{
          console.log(" inforamtion :", response)
          this.aProfile = response.data.profile
          })

      },
        async register(u) {
        this.errorMassage=null,
        this.operation_in_submission = true , 
        this.operation_show_alert = true , 
        this.operation_alert_variant = "bg-blue-500",
        this.operation_alert_msg= "Please wait! It's take a few time"
        axiosAPI.post('users',u).then((response)=>
        {
            this.operation_alert_variant = "bg-green-500";
            this.operation_alert_msg= "Success! meow :) moving in sign in page..";
            setTimeout(() => {
                this.$router.push({name:'signIn'});
              }, 2000);
            setTimeout(() => {
                this.operation_in_submission = false ;
                this.operation_show_alert = false ; 
              }, 3000);
          
        }
        )
        .catch((error) => {
            const values=error.response.data.errors
            this.errorMassage = Object.entries(values);
            this.operation_in_submission = false ;
            this.operation_show_alert = false ; 
          })
        },
        async updateUser(us){
          this.operation_in_submission = true , 
          this.operation_show_alert = true , 
          this.operation_alert_variant = "bg-blue-500",
          this.operation_alert_msg= "Upadting your information..."

          axiosAPI.put('user',us).then((response)=>{
            setTimeout(() => {
              this.operation_in_submission = false ;
              this.operation_show_alert = false ; 
              this.getCurrentUser();
            }, 1000);
          })
          .catch((error) => {
          console.log(error)
          this.operation_in_submission = false ;
          this.operation_show_alert = false ; 
          })
        }
    }
})