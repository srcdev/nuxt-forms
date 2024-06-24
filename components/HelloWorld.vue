<template>
  <div>
    <h1>Hello World!</h1>
    <pre>{{ myLayer }}</pre>
    <div>
      <InputText />
    </div>
  </div>
</template>

<script setup lang="ts">
  const { myLayer } = useAppConfig()
</script>

