<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <div>
          <h1>Material UI text fields (default)</h1>
          <p>Example test fields in default material UI</p>

          <FormWrapper width="medium">
            <template #default>
              <form @submit.prevent="submitForm">
                <FormField width="wide" :has-gutter="true">
                  <template #default>
                    <InputEmailMaterial
                      id="emailAddress"
                      name="emailAddress"
                      validation="emailaddress"
                      :required="true"
                      :c12="{
                        label: 'Your Email Address',
                        placeholder: 'eg. joe@example.com',
                        errorMessage: 'Please enter a valid email address',
                      }"
                      v-model="formData"
                      theme="secondary"
                      :compact
                    />
                  </template>
                </FormField>

                <FormField width="wide" :has-gutter="true">
                  <template #default>
                    <InputTextMaterial
                      id="username"
                      name="username"
                      validation="username"
                      :required="true"
                      :c12="{
                        label: 'Your Username',
                        placeholder: 'eg. YourUserName',
                        errorMessage: 'Please enter a valid username',
                      }"
                      v-model="formData"
                      theme="secondary"
                      :compact
                    />
                  </template>
                </FormField>

                <FormField width="wide" :has-gutter="true">
                  <template #default>
                    <InputPasswordMaterial
                      id="password"
                      name="password"
                      validation="password"
                      :required="true"
                      :c12="{
                        label: 'Password',
                        placeholder: 'eg. Your5illYPa55w0rd',
                        errorMessage: 'Please enter a valid password',
                      }"
                      v-model="formData"
                      theme="secondary"
                      :compact
                    />
                  </template>
                </FormField>

                <FormField width="wide" :has-gutter="true">
                  <template #default>
                    <InputButtonSubmit @click.stop.prevent="submitForm" :is-pending="false" :readonly="submitDisabled" button-text="Submit" theme="secondary" size="medium" />
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

const compact = ref(false);

/*
 * Setup forms
 */
const fieldsInitialState = ref<IFieldsInitialState>({
  emailAddress: '',
  username: '',
  password: '',
});

// Setup formData
const { formData, getErrorCount, updateCustomErrors, resetForm, formIsValid, submitDisabled } = useFormControl(fieldsInitialState);

const submitForm = async () => {
  await getErrorCount(true);

  if (formIsValid.value) {
    formData.value.isPending = true;
    console.log('Form is good - post it!');
    // await useSleep(2000);
    // formData.value.isPending = false;
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
