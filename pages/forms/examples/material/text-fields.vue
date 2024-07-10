<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <div>
          <h1>Material UI text fields (default)</h1>
          <p>Example test fields in default material UI</p>

          <FormWrapper width="medium">
            <template #default>
              <form @submit.prevent="isPending">
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

                <FormField width="wide" :has-gutter="true">
                  <template #default>
                    <InputButtonCore
                      @click.stop.prevent="isPending"
                      :is-pending="false"
                      button-text="Submit"
                      theme="tertiary"
                      size="small"
                    >
                      <template #iconOnly>
                        <Icon name="radix-icons:eye-none" class="icon" />
                      </template>
                    </InputButtonCore>
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
