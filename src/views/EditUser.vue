<template>
  <div>
    <top-nav />

    <div v-if="!userStore.prof" class="text-center mt-20 text-2xl">Loading..</div>
    <Form v-if="userStore.prof" class="w-4/5 sm:w-3/5 lg:w-2/5 space-y-4 mx-auto mt-10 " :validation-schema="schema"
      @submit="submitUserInfo">
      <div class="flex justify-center">
        <img :src="userStore.user.image" class="rounded-full w-16 h-16" alt="user profile">
      </div>
      <Field type="text" v-model="userStore.user.username" name="username"
        class="block w-full px-2 py-2 text-xs md:text-sm font-semibold transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
        placeholder="username" />
      <ErrorMessage name="username" class="mt-1 text-red-800" />

      <Field type="text" v-model="userStore.user.email" name="email"
        class="block w-full px-2 py-2 text-xs md:text-sm font-normal transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
        placeholder="email" />
      <ErrorMessage name="email" class="mt-1 text-red-800" />

      <Field as="textarea" type="text" v-model="userStore.user.bio" name="bio"
        class="text-area block w-full px-2 py-2 text-xs md:text-sm font-normal transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
        placeholder="put your biogeraphy here" />
      <ErrorMessage name="bio" class="mt-1 text-red-800" />

      <Field type="text" v-model="userStore.user.image" name="image"
        class="block w-full px-2 py-2 text-xs md:text-sm font-normal transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
        placeholder="profile image URL" />

      <div class="flex justify-between">
        <button class="mt-5 w-24 font-semibold py-2 float-right text-base transition bg-red-500  text-cream rounded-lg"
          @click="logOut">log out</button>

        <button type="submit"
          :disabled="userStore.operation_in_submission"
          class="mt-5 w-24 font-semibold py-2 float-right text-base transition bg-mainRed text-cream rounded-lg disabled:bg-gray-400 disabled:cursor-wait">
          Save it!
        </button>
      </div>
    </Form>
  </div>
</template>
<script>
import { useUserStore } from "../stores/User.js";
import { Field, Form, ErrorMessage } from "vee-validate";
import TopNav from '../components/Navigation/TopNav.vue'

export default {

  name: 'editUserInfo',
  components: { TopNav, Field, Form, ErrorMessage },

  setup() {
    const userStore = useUserStore();
    userStore.getCurrentUser();

    return {
      userStore
    }
  },
  data() {
    return {
      schema: {
        username: "min:3|max:30|required",
        email: "email|required",
      },
    }
  },

  methods: {
    logOut() {
      this.userStore.logOut();
    },
    submitUserInfo(user) {
      console.log("this is user information", user);
      this.userStore.updateUser(user = { user });
    }
  }
}
</script>
<style scoped>
.text-area {
  min-height: 10rem;
  max-height: 25rem;
}
</style>