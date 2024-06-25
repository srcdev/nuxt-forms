<template>
    <div>
        <input type="text" class="input-text" v-model="formValue" />
    </div>
</template>
<script setup lang="ts">
    console.log("InputText component loaded");

    const formValue = ref("");

    watchEffect(() => {
        console.log("Form value changed to: ", formValue.value);
    });

</script>
