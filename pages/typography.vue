<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <h1 class="heading-3">Typography</h1>
        <h2 class="heading-4">Headings</h2>
        <ul>
          <li class="heading-1">Heading 1</li>
          <li class="heading-2">Heading 2</li>
          <li class="heading-3">Heading 3</li>
          <li class="heading-4">Heading 4</li>
          <li class="heading-5">Heading 5</li>
          <li class="heading-6">Heading 6</li>
        </ul>

        <h2 class="heading-4">Body Regular</h2>
        <ul>
          <li class="body-large">Body Large</li>
          <li class="body-normal">Body Normal</li>
          <li class="body-small">Body Small</li>
          <li class="body-xsmall">Body X-Small</li>
        </ul>

        <h2 class="heading-4">Body Semi-Bold</h2>
        <ul>
          <li class="body-large-semibold">Body Large Semi-Bold</li>
          <li class="body-normal-semibold">Body Normal Semi-Bold</li>
          <li class="body-small-semibold">Body Small Semi-Bold</li>
          <li class="body-xsmall-semibold">Body X-Small Semi-Bold</li>
        </ul>

        <h2 class="heading-4">Body Bold</h2>
        <ul>
          <li class="body-large-bold">Body Large Bold</li>
          <li class="body-normal-bold">Body Normal Bold</li>
          <li class="body-small-bold">Body Small Bold</li>
          <li class="body-xsmall-bold">Body X-Small Bold</li>
        </ul>

        <h2 class="heading-4">Links</h2>
        <ul>
          <li class="link-large">Link Large</li>
          <li class="link-normal">Link Normal</li>
          <li class="link-small">Link Small</li>
          <li class="link-xsmall">Link X-Small</li>
        </ul>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: 'Typography Examples',
  meta: [{ name: 'description', content: 'Typography' }],
  bodyAttrs: {
    class: 'typography',
  },
});
</script>

<style lang="css">
.typography {
  /* font-family: 'Poppins', Sans-serif; */
  /* font-family: var(--font-family); */

  ul {
    list-style-type: none;
    padding: 0;

    li {
      background: #ffffff;
      border-radius: 5px;
      padding: 10px;
      margin-block-end: 20px;
    }
  }
}
</style>
