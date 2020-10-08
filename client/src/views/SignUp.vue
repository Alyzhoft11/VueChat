<template>
  <div class="flex justify-center my-10">
    <div class="bg-white shadow-md sm:w-5/6 md:w-5/6 lg:w-1/4 xl:w-1/4 h-signup rounded-md">
      <div class="flex justify-center">
        <h1 class="text-3xl font-bold mt-5">Sign Up</h1>
      </div>
      <form action="">
        <div class="flex justify-center">
          <input class="rounded-md px-2 mt-10 bg-gray-200 w-4/6 h-10" type="text" placeholder="Username" />
        </div>
        <div class="flex justify-center">
          <input class="rounded-md px-2 mt-5 bg-gray-200 w-4/6 h-10" type="email" placeholder="Email" />
        </div>
        <div class="flex justify-center">
          <input class="rounded-md px-2 mt-5 bg-gray-200 w-4/6 h-10" type="password" placeholder="Password" />
        </div>
        <div class="flex justify-center">
          <button class="bg-red-900 rounded-md px-2 mt-5 w-4/6 h-10 text-white text-xl font-bold">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Sign Up',
};
</script>
