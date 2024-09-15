<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <div>
          <h1 class="header-1">Material UI text fields ({{ compact ? 'compact' : 'default' }})</h1>
          <ul class="flex-group">
            <li>
              <InputButtonSubmit type="button" @click.stop.prevent="swapCompact(false)" button-text="Use Default UI" theme="secondary" size="normal" />
            </li>
            <li>
              <InputButtonSubmit type="button" @click.stop.prevent="swapCompact(true)" button-text="Use Compact UI" theme="secondary" size="normal" />
            </li>
          </ul>

          <p>Example test fields in default material UI</p>
          <p>Use 'test@test.com' to trigger server errors</p>
        </div>
        <ContentGrid>
          <template #slot1>
            <FormWrapper width="medium">
              <template #default>
                <ClientOnly>
                  <form class="form-wrapper" @submit.stop.prevent="submitForm()">
                    <div aria-live="assertive" id="aria-live-message"></div>
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
                        <InputRangeDefault
                          id="score"
                          name="score"
                          :min="0"
                          :max="100"
                          :step="1"
                          :required="true"
                          validation="positiveNumber0to100"
                          :c12="{
                            label: 'Score between 0 & 100',
                            placeholder: 'eg. What\'s your score?',
                            errorMessage: 'Score between 0 & 100',
                          }"
                          v-model="formData"
                          theme="secondary"
                        >
                          <template #description>
                            <p class="label-description">This is a description of what the user is required to do</p>
                          </template>
                          <template #datalist>
                            <datalist class="input-range-datalist" id="score-datalist">
                              <option value="0" label="Rubbish!"></option>
                              <option value="25" label="Below par"></option>
                              <option value="50" label="Average"></option>
                              <option value="75" label="Quite good"></option>
                              <option value="100" label="Excellent"></option>
                            </datalist>
                          </template>
                          <template #left>
                            <Icon name="gridicons:minus-small" class="icon" />
                          </template>
                          <template #right>
                            <Icon name="gridicons:plus-small" class="icon" />
                          </template>
                        </InputRangeDefault>
                      </template>
                    </FormField>

                    <FormField v-if="citiesData !== null" width="wide" :has-gutter="false">
                      <template #default>
                        <MultipleCheckboxes
                          id="cities"
                          name="cities"
                          legend="Choose a location"
                          :required="true"
                          :c12="{
                            label: 'Check all Cities you like',
                            placeholder: 'eg. Type something here',
                            errorMessage: 'Please choose at least 1 location',
                          }"
                          v-model="formData"
                          v-model:fieldData="citiesData"
                          theme="secondary"
                          size="normal"
                          checkbox-style="check"
                          checkbox-appearance="with-decorator"
                        >
                          <template #description>
                            <p class="label-description">This is description: optionsLayout = 'equal-widths'</p>
                          </template>
                        </MultipleCheckboxes>
                      </template>
                    </FormField>

                    <FormField v-if="countriesData !== null" width="wide" :has-gutter="false">
                      <template #default>
                        <MultipleCheckboxes
                          id="countries"
                          name="countries"
                          legend="Choose a country"
                          :required="true"
                          :c12="{
                            label: 'Check all countries you like',
                            placeholder: 'eg. Choose some locations',
                            errorMessage: 'Please select a country',
                          }"
                          v-model="formData"
                          v-model:fieldData="countriesData"
                          theme="secondary"
                          size="normal"
                          options-layout="inline"
                          checkbox-style="cross"
                          checkbox-appearance="with-decorator"
                        >
                          <template #description>
                            <p class="label-description">This is description: optionsLayout = 'inline'</p>
                          </template>
                        </MultipleCheckboxes>
                      </template>
                    </FormField>

                    <FormField v-if="titleData !== null" width="wide" :has-gutter="false">
                      <template #default>
                        <MultipleRadio
                          id="title"
                          name="title"
                          legend="Choose a title"
                          :required="true"
                          :c12="{
                            label: 'Check all title you like',
                            placeholder: 'eg. Choose some title',
                            errorMessage: 'Please select a title',
                          }"
                          v-model="formData"
                          v-model:fieldData="titleData"
                          theme="secondary"
                          size="normal"
                          options-layout="equal-widths"
                          radio-appearance="with-decorator"
                        >
                          <template #description>
                            <p class="label-description">This is description: optionsLayout = 'equal-widths'</p>
                          </template>
                        </MultipleRadio>
                      </template>
                    </FormField>

                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <SingleCheckbox
                          id="terms"
                          name="terms"
                          legend="Accept terms and conditions"
                          :required="true"
                          :c12="{
                            label: 'Accept terms and conditions',
                            placeholder: 'eg. Type something here',
                            errorMessage: 'Please accept our terms and conditions',
                          }"
                          v-model="formData"
                          theme="secondary"
                          size="normal"
                          checkbox-appearance="with-decorator"
                          checkbox-style="check"
                        >
                          <template #description>
                            <p class="label-description">This is a description of what the user is required to do</p>
                          </template>
                        </SingleCheckbox>
                      </template>
                    </FormField>

                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <InputButtonSubmit type="button" @click.stop.prevent="submitForm()" :is-pending="false" :readonly="submitDisabled" button-text="Submit" theme="secondary" size="medium" />
                      </template>
                    </FormField>
                  </form>
                </ClientOnly>
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
import type { IFieldsInitialState, IOptionsConfig, IFormMultipleOptions } from '@/types/types.forms';

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
const swapCompact = (newStyle: boolean) => {
  compact.value = newStyle;
};

/*
 * Fetch some sample data
 **/
const { data: citiesData } = await useFetch<IFormMultipleOptions>('/api/places/list?category=cities');
const { data: countriesData } = await useFetch<IFormMultipleOptions>('/api/places/list?category=countries');
const { data: titleData } = await useFetch<IFormMultipleOptions>('/api/utils?category=title');

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
  score: 50,
  cities: [],
  countries: [],
  title: [],
  terms: false,
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

<style lang="css">
.flex-group {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 32px;
}

ul.flex-group {
  list-style-type: none;
  padding: 0;
}

.header-1 {
  font-family: var(--font-family);
  color: var(--brand-success-text-text);
}
</style>
