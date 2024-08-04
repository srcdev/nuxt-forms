<template>
  <div class="wrapper">
    <div class="text-wrapper">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
    <div class="text-wrapper">
      <p>Nisi harum impedit, expedita eius doloremque dicta obcaecati tempora dolorem eum fuga deserunt minus facere error mollitia pariatur cum tempore, reiciendis molestiae?</p>
    </div>
    <div class="text-wrapper">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi harum impedit, expedita eius doloremque dicta obcaecati tempora dolorem eum fuga deserunt minus facere error mollitia pariatur cum
        tempore, reiciendis molestiae?
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
<style lang="css">
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.text-wrapper {
  max-height: 100px;
  width: 200px;
  padding: 20px;
  outline: 1px solid black;

  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>
