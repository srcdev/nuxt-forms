<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <div>
          <h1>Material UI text fields ({{ compact ? 'compact' : 'default' }})</h1>
          <p>Example test fields in default material UI</p>
          <p>Use 'test@test.com' to trigger server errors</p>
        </div>
        <ContentGrid>
          <template #slot1>
            <FormWrapper width="medium">
              <template #default>
                <form class="form-wrapper" @submit.stop.prevent="submitForm()">
                  <FormField width="wide" :has-gutter="false">
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

                  <FormField width="wide" :has-gutter="false">
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

                  <FormField width="wide" :has-gutter="false">
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

                  <FormField width="wide" :has-gutter="false">
                    <template #default>
                      <InputTextareaMaterial
                        id="message"
                        name="message"
                        validation="message"
                        :required="true"
                        :c12="{
                          label: 'Message',
                          placeholder: 'eg. Type something here',
                          errorMessage: 'Bad characters in message',
                        }"
                        v-model="formData"
                        theme="secondary"
                        :compact
                      />
                    </template>
                  </FormField>

                  <FormField width="wide" :has-gutter="false">
                    <template #default>
                      <InputButtonSubmit @click.stop.prevent="submitForm()" :is-pending="false" :readonly="submitDisabled" button-text="Submit" theme="secondary" size="medium" />
                    </template>
                  </FormField>
                </form>
              </template>
            </FormWrapper>
          </template>
          <template #slot2>
            <ClientOnly>
              <p>Client only content</p>
              <pre>
                {{ formData }}
              </pre>
            </ClientOnly>
          </template>
        </ContentGrid>
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
  title: 'Text Field Example',
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
  // emailAddress: "simon@simon.com",
  // emailAddress: "test@test.com",
  emailAddress: '',
  // username: "",
  username: '',
  // password: "!+Password123",
  password: '',
  message: '',
  // message: 'This is test 1234567890,.<>?@;:',
});

// Setup formData
const { formData, initFormData, getErrorCount, updateErrorMessages, formIsValid, submitDisabled, useApiErrors } = useFormControl();
await initFormData(fieldsInitialState);

async function postFormData() {
  try {
    const data = await $fetch('/api/textFields', {
      method: 'post',
      body: formData.value.data,
      onResponse({ response }) {
        if (response.status === 400) {
          console.log('onResponse', response);
          console.log(response.status);

          useApiErrors(response._data.data.errors);
          // for (const [key, message] of Object.entries(response._data.data.errors)) {
          //   console.log(`${key}: ${message}`);
          //   updateErrorMessages(key, message);
          // }
        }
        if (response.status === 200) {
          formData.value.isPending = false;
          formData.value.submitSuccess = true;
        }
      },
    });
    console.log('3: Finished data', data);
    // return data;
  } catch (error) {
    console.warn('2: An error occured posting form data', error);
  }
}

const submitForm = async () => {
  getErrorCount(true);

  if (formIsValid.value) {
    formData.value.isPending = true;
    formData.value.submitDisabled = true;
    console.log('Form is good - post it!');

    postFormData();

    // formData.value.errorMessages['emailAddress'] = {
    //   useCustomError: true,
    //   message: 'This is a custom error message',
    // };

    // executePost();
  } else {
    console.warn('Form has errors');
  }
};
</script>
