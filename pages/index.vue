<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <div>
          <h1>Sample form page</h1>

          <FormWrapper width="medium">
            <template #default>
              <form @submit.prevent="isPending">
                <p>Form content</p>
                <FormField width="wide" :has-gutter="true">
                  <template #default>
                    <p>Input text</p>
                    <InputTextMaterial
                      id="username"
                      name="username"
                      type="text"
                      validation="username"
                      :required="true"
                      :c12="{
                        label: 'Choose Username',
                        placeholder: 'eg. YourUserName',
                        errorMessage: 'Please enter a valid username',
                      }"
                      v-model="formData"
                      theme="primary"
                    />
                  </template>
                </FormField>

                <FormField
                  width="wide"
                  :has-gutter="true"
                  style-class-passthrough="mb-20"
                >
                  <template #default>
                    <InputButtonConfirm
                      @click.stop.prevent="isPending"
                      :is-pending="false"
                      button-text="Confirm"
                      theme="secondary"
                      size="medium"
                    />
                  </template>
                </FormField>

                <FormField width="wide" :has-gutter="true">
                  <template #default>
                    <InputButtonSubmit
                      @click.stop.prevent="isPending"
                      :is-pending="false"
                      button-text="Submit"
                      theme="primary"
                      size="medium"
                    />
                  </template>
                </FormField>

                <FormField width="wide" :has-gutter="true">
                  <template #default>
                    <InputButtonSubmit
                      @click.stop.prevent="isPending"
                      :is-pending="false"
                      button-text="Submit"
                      theme="secondary"
                      size="medium"
                    />
                  </template>
                </FormField>

                <FormField width="wide" :has-gutter="true">
                  <template #default>
                    <InputButtonSubmit
                      @click.stop.prevent="isPending"
                      :is-pending="false"
                      button-text="Submit"
                      theme="tertiary"
                      size="medium"
                    />
                  </template>
                </FormField>
              </form>
            </template>
          </FormWrapper>
        </div>
        <ClientOnly>
          <p>Client only content</p>
          <pre>
            {{ formData }}
          </pre>
        </ClientOnly>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { IFieldsInitialState, IOptionsConfig } from '@/types/types.forms';

definePageMeta({
  layout: false,
});

useHead({
  title: 'Homepage',
  meta: [{ name: 'description', content: 'Homepage' }],
  bodyAttrs: {
    class: '',
  },
});

/*
 * Setup forms
 */
const fieldsInitialState = ref<IFieldsInitialState>({
  username: 'PreFilledUsername',
});

// Setup formData
const {
  formData,
  initFormData,
  getErrorCount,
  updateCustomErrors,
  resetForm,
  formIsValid,
  showErrors,
} = useFormControl(fieldsInitialState);

await initFormData();

const isPending = async () => {
  formData.value.isPending = true;
  await getErrorCount();

  if (formIsValid.value) {
    console.log('Form is good - post it!');
  } else {
    console.warn('Form has errors');
  }
};
</script>

<style lang="css">
p {
  color: initial;
}
</style>
