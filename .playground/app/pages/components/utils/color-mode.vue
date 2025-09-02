<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <TripleToggleSwitchCore v-model="colorModeVal" v-model:field-data="sampleFieldData" />
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: "Colour Mode Switcher",
  meta: [{ name: "description", content: "Colour Mode Switcher" }],
  bodyAttrs: {
    class: "",
  },
})

const sampleFieldData = <IFormMultipleOptions>{
  data: [
    {
      id: "auto",
      name: "colorModeVal",
      value: "auto",
      label: "Auto",
      icon: "material-symbols:night-sight-auto-sharp",
    },
    {
      id: "light",
      name: "colorModeVal",
      value: "light",
      label: "Light",
      icon: "radix-icons:sun",
    },
    {
      id: "dark",
      name: "colorModeVal",
      value: "dark",
      label: "Dark",
      icon: "radix-icons:moon",
    },
  ],
  total: 3,
  skip: 0,
  limit: 3,
}

const colorModeVal = ref("auto")
watch(colorModeVal, (val) => {
  console.log("colorModeVal", val)
})
</script>

<style lang="css">
/* p {
  color: initial;
} */
</style>
