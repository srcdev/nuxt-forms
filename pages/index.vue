<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <div>
          <h1>Sample form page</h1>

          <FormWrapper width="medium">
            <template #default>
              <form>
                <p>Form content</p>
                <FormField width="wide" :has-gutter="true">
                  <template #default>
                    <p>Input text</p>
                    <InputTextCore />
                  </template>
                </FormField>
              </form>
            </template>
          </FormWrapper>
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
