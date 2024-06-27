<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <div>
          <h1>Sample form page</h1>

          <NuxtFormsScaffoldingFormWrapper width="medium">
            <template #default>
              <form>
                <p>Form content</p>
                <NuxtFormsScaffoldingFormField width="wide" :has-gutter="true">
                  <template #default>
                    <p>Input text</p>
                    <NuxtFormsInputText />
                  </template>
                </NuxtFormsScaffoldingFormField>
              </form>
            </template>
          </NuxtFormsScaffoldingFormWrapper>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Homepage',
  meta: [{ name: 'description', content: 'Homepage' }],
  bodyAttrs: {
    class: '',
  },
})
</script>

<style lang="css">
p {
  color: initial;
}
</style>
