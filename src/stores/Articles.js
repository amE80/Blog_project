import { defineStore } from "pinia";
import { DateTime } from "luxon"
import { axiosAPI } from '../plugin/axios';


// Pay attention to names which I wrote here , names are important for pinia to work
export const useArticlesStore = defineStore('articleStore', {
  state: () => ({
    fetching_in_progress: false,
    artTime: null,
    articles: [],
    article: null,
    user: null,
    allComments: null,
    operation_in_submission: false,
    operation_show_alert: false,
    operation_alert_variant: "",
    operation_alert_msg: "",
    isFavorited: false,
  }),
  actions: {
    
    async getFavPosts(a){
      this.fetching_in_progress = true;
      axiosAPI.get('articles', { params: { favorited: a } }
      ).then((response) => {
        //changing date format
        const articles = response.data.articles.map((artTime) => {
          artTime.createdAt = DateTime.fromISO(artTime.createdAt).toFormat("yyyy/MM/dd hh:mm")
          return artTime
        });
        console.log('fav art:', articles)
        this.articles = articles;
        this.fetching_in_progress = false;

      })
        .catch((error) => {
          console.log(error);
          this.fetching_in_progress = false;
        })
    },

    async getAnArticle(slug) {
      console.log("slug from pinia", slug);
      axiosAPI.get(`articles/${slug}`)
        .then(response => {
          response.data.article.createdAt = DateTime.fromISO(response.data.article.createdAt).toFormat("yyyy/MM/dd hh:mm")
          this.articles = response.data.article
          console.log(" inforamtion :", this.articles)
        })
    },

    async getComments(slug) {
      this.operation_show_alert = true,
        this.operation_in_submission = true,
        this.operation_alert_variant = "bg-blue-500",
        this.operation_alert_msg = "Loading comments...",

        axiosAPI.get(`articles/${slug}/comments`)
          .then(response => {

            const comments = response.data.comments.map((comTime) => {
              comTime.createdAt = DateTime.fromISO(comTime.createdAt).toLocaleString(DateTime.DATE_MED)
              return comTime
            })

            console.log('get comment date response', response.data.comments);
            this.operation_show_alert = false;
            this.operation_alert_variant = "";
            this.operation_alert_msg = "";
            this.allComments = response.data.comments
            this.operation_in_submission = false
          }).catch(error => {
            console.log(error)
            this.operation_in_submission = false
            this.operation_show_alert = false;
          })
    },


    async postComments(slug, data) {
      this.operation_in_submission = true,

        axiosAPI.post(`articles/${slug}/comments`, data)
          .then(response => {
            console.log('post comment response', response);
            this.getComments(slug);
          }).catch(error => {
            console.log(error)
          })
    },


    async deleteComments(slug, id) {
      this.operation_in_submission = true,

        axiosAPI.delete(`articles/${slug}/comments/${id}`)
          .then(response => {
            console.log('delete comment response', response);
            this.getComments(slug);
          }).catch(error => {
            console.log(error)
          })
    },


    async getCurrentUser() {
      axiosAPI.get("user").then((response) => {
        this.user = response.data.user
        console.log('user:', this.user)
      }).catch((error) => {
        console.log(error)
      })
    },

    async getUserPosts(a) {
      this.fetching_in_progress = true;
      axiosAPI.get('articles', { params: { author: a } }
      ).then((response) => {
        //changing date format
        const articles = response.data.articles.map((artTime) => {
          artTime.createdAt = DateTime.fromISO(artTime.createdAt).toFormat("yyyy/MM/dd hh:mm")
          return artTime
        });
        console.log('users art')
        this.articles = articles;
        this.fetching_in_progress = false;

      })
        .catch((error) => {
          console.log(error);
          this.fetching_in_progress = false;
        })
    },
    async getPosts() {
      this.fetching_in_progress = true;
      axiosAPI.get('articles').then((response) => {
        //changing date format
        const articles = response.data.articles.map((artTime) => {
          artTime.createdAt = DateTime.fromISO(artTime.createdAt).toFormat("yyyy/MM/dd hh:mm")
          return artTime
        });
        console.log('all art')
        this.articles = articles;
        this.fetching_in_progress = false;

      })
        .catch((error) => {
          console.log(error);
          this.fetching_in_progress = false;
        })
    },

    async shareBlog(a) {
      a.article.tagList = a.article.tagList.split(" ");
      this.operation_show_alert = true;
      this.operation_in_submission = true;
      this.operation_alert_variant = "bg-green-500";
      this.operation_alert_msg = "successfull move to home page...";

      axiosAPI.post('articles', a).then((response) => {
        setTimeout(() => {
          this.operation_in_submission = false;
          this.operation_show_alert = false;
          this.$router.push({ name: 'home' })
        }, 1000);
      })
        .catch((error) => {
          console.log(error)
          this.operation_in_submission = false;
          this.operation_show_alert = false;
        })
    },

    async toggleFav(slug, isFavorited) {
      this.operation_in_submission = true;

      if (!isFavorited) {
        await axiosAPI.post(`articles/${slug}/favorite`)
          .then((response => {
            const article = this.articles.find(a => a.slug === slug)
            article.favorited = !article.favorited;
            article.favoritesCount++;
            console.log(response)
            this.operation_in_submission = false;
          })).catch(err => {
            console.log('main error', err)
            this.operation_show_alert= true;
            this.operation_alert_variant= "bg-purple-600";
            this.operation_alert_msg= err.response.data.message;
            setTimeout(() => {
              this.operation_show_alert = false;
              this.operation_alert_variant= "";
              this.operation_alert_msg= "";
            }, 2000);
            this.operation_in_submission = false;
          })
      }
      else {
        await axiosAPI.delete(`articles/${slug}/favorite`)
          .then(response => {
            console.log(response);
            const article = this.articles.find(a => a.slug === slug)
            article.favoritesCount--
            article.favorited = !article.favorited;
            this.operation_in_submission = false;
          }).catch(err => {
            console.log('main error', err)
            this.operation_show_alert= true;
            this.operation_alert_variant= "bg-purple-600";
            this.operation_alert_msg= err.response.data.message;
            setTimeout(() => {
              this.operation_show_alert = false;
              this.operation_alert_variant= "";
              this.operation_alert_msg= "";
            }, 2000);
            this.operation_in_submission = false;
          })

      }
    },
    async toggleArt(slug, isFavorited) {
      this.operation_in_submission = true;

      if (!isFavorited) {
        await axiosAPI.post(`articles/${slug}/favorite`)
          .then((response => {
            this.articles.favorited = !this.articles.favorited;
            this.articles.favoritesCount++;
            console.log(response)
            this.operation_in_submission = false;
          })).catch(err => {
            console.log('main error', err)
            this.operation_in_submission = false;
          })
      }
      else {
        await axiosAPI.delete(`articles/${slug}/favorite`)
          .then(response => {
            console.log(response);
            this.articles.favorited = !this.articles.favorited;
            this.articles.favoritesCount--
            this.operation_in_submission = false;
          }).catch(err => {
            console.log('main error', err)
            this.operation_in_submission = false;
          })

      }
    },
    async followUser(username){
      this.operation_in_submission = true ;

      if(!this.articles.author.following){
     await axiosAPI.post(`profiles/${username}/follow`).then(response=>{
      console.log(response)
      this.articles.author.following = !this.articles.author.following
      this.operation_in_submission = false ;
     }).catch(error=>{
      console.log(error)
      this.operation_in_submission = false ;
     })                          
    }
    else if(this.articles.author.following){
    await axiosAPI.delete(`profiles/${username}/follow`).then(response=>{
       console.log(response)
       this.articles.author.following = !this.articles.author.following
       this.operation_in_submission = false ;
      }).catch(error=>{
       console.log(error)
      this.operation_in_submission = false ;
      })  
    }                        
    },
    async deleteBlog(slug){
      this.operation_in_submission=true;
      await axiosAPI.delete(`articles/${slug}`).then(response=>{
        console.log(response)
        this.operation_in_submission = false ;
        this.$router.push({ name: 'user_article', query: {author:this.username}})
       }).catch(error=>{
        console.log(error)
       this.operation_in_submission = false ;
       })  
    },
    async updateBlog(slug , data){
      this.operation_in_submission = true , 
      this.operation_show_alert = true , 
      this.operation_alert_variant = "bg-green-500",
      this.operation_alert_msg= "Upadting your blog..."

      axiosAPI.put(`articles/${slug}`, data).then((response)=>{
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