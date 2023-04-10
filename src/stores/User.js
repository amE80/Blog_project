import { defineStore } from "pinia";
import { axiosAPI } from '../plugin/axios';
import { toast } from 'vue3-toastify';


export const useUserStore = defineStore('userStore', {
    state: () => ({
        prof: false,
        user: {},
        operation_in_submission : false , 
        operation_in_submission_logOut : false , 
        operation_show_alert : false , 
        operation_alert_variant : "",
        operation_alert_msg: "",
        errorMassage:null,
        aProfile:null,

    }),
    actions: {
      
      async followUser(username){
        this.operation_in_submission = true;
        if(!this.aProfile.following){
       await axiosAPI.post(`profiles/${username}/follow`).then(response=>{
        console.log(response)
        this.aProfile.following = !this.aProfile.following
        this.operation_in_submission = false ;
       }).catch(error=>{
        console.log(error)
        this.operation_in_submission = false ;
       })                          
      }
      else if(this.aProfile.following){
      await axiosAPI.delete(`profiles/${username}/follow`).then(response=>{
         console.log(response)
         this.aProfile.following = !this.aProfile.following
         this.operation_in_submission = false ;
        }).catch(error=>{
         console.log(error)
        this.operation_in_submission = false ;
        })  
      }                        
      },

      async getCurrentUser(){
       await axiosAPI.get("user").then((response)=>{
          this.prof = true;
          this.user = response.data.user

        }).catch((error)=>{
          console.log(error)
        })

      },
      async getProfile(username){
        console.log("username from pinia" , username);
       await axiosAPI.get(`profiles/${username}`)
        .then(response=>{
          console.log(" inforamtion :", response.data.profile.following)
          this.aProfile = response.data.profile
          })

      },
        async register(u) {
        this.errorMassage=null,
        this.operation_in_submission = true,
       await axiosAPI.post('users',u).then((response)=>
        {
            toast.success("you registered successfully!", {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            setTimeout(() => {
              this.operation_in_submission = false ;
                this.$router.push({name:'signIn'});
              }, 2000);
        }
        )
        .catch((error) => {
            const values=error.response.data.errors
            this.errorMassage = Object.entries(values);
            this.operation_in_submission = false ;
            toast.error( 'Registeration failed!' , {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          })
        },
        async updateUser(us){
          this.operation_in_submission = true , 

         await axiosAPI.put('user',us).then((response)=>{
            toast.success("your information updated!", {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            this.operation_in_submission = false ;
              this.getCurrentUser();
            setTimeout(() => {
              this.$router.push(`/user-profile/${this.user.username}`)
            }, 2000);
          })
          .catch((error) => {
          console.log(error)
          toast.error("Something went wrong!", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          this.operation_in_submission = false ;
          this.operation_show_alert = false ; 
          })
        },

        async logOut(){
          this.operation_in_submission_logOut = true
          toast.success('you logged out!',{
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          })
          localStorage.clear()
          setTimeout(() => {
            this.$router.go({ name: 'home' })
            this.operation_in_submission_logOut = false
          }, 2000);
        }
    },
    persist: true,
})