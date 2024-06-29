<template>
  <div>
    <input type="text" class="input-text" v-model="formValue" />
  </div>
</template>
<script setup lang="ts">
console.log('InputText component loaded')

const formValue = ref('')

watchEffect(() => {
  console.log('Form value changed to: ', formValue.value)
})
</script>

<style lang="css">
.input-text {
  border: var(--input-border-width-thin) solid var(--input-border);
  border-radius: var(--input-border-radius);
  padding: 10px;
}
</style>
