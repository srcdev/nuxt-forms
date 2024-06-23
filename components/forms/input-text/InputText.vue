<script lang="ts" setup>
    const formValue = ref('');

    watchEffect(() => {
        console.log(formValue.value);
    });
</script>

<template>
    <div>
        <input type="text" v-model="formValue" />
    </div>
</template>

<style lang="css" scoped>
    
</style>
