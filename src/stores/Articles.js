import { defineStore } from "pinia";
import { DateTime } from "luxon"
import { axiosAPI } from '../plugin/axios';


// Pay attention to names which I wrote here , names are important for pinia to work
export const useArticlesStore = defineStore('articleStore', {
    state: () => ({
        fetching_in_progress : false,
        artTime: null,
        articles: null,
        article:null,
        userArticles:null,
        aBlog:null
    }),
    actions: {
      async getAnArticle(slug){
        console.log("slug from pinia" , slug);
        axiosAPI.get(`articles/${slug}`)
        .then(response=>{
          console.log("this is one article inforamtion",response)
        })
      },

      async getUserPosts(a){
        
        this.fetching_in_progress = true;
        axiosAPI.get('articles',{ params: { author: a }}
        ).then((response) => {
          //changing date format
          const articles = response.data.articles.map((artTime) => {
            artTime.createdAt = DateTime.fromISO(artTime.createdAt).toFormat("yyyy/MM/dd hh:mm")
            return artTime 
          });
          console.log('users art')
          this.userArticles = articles;
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
            const article = a;
            console.log(article)
            axiosAPI.post('articles', article).then((response)=>{
              this.$router.push({name:'home'})
            })
            .catch((error) => {
              console.log(error)
            })
          },

         toggleFav(slug){
          const article = this.articles.find(a => a.slug === slug)
          article.favorited = !article.favorited ;

          if (article.favorited){
            article.favoritesCount ++ ;
          }
          
          else if (!article.favorited){
            article.favoritesCount -- 
          }

         }
    }
})