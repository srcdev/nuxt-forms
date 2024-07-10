<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <div>
          <h1>Example buttons</h1>
          <p>Primary submit</p>

          <FormWrapper width="medium">
            <template #default>
              <form @submit.prevent="isPending">
                <div class="flex-group">
                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    theme="primary"
                    size="x-small"
                  />

                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    theme="primary"
                    size="small"
                  />

                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    theme="primary"
                    size="normal"
                  />
                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    theme="primary"
                    size="medium"
                  />
                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    theme="primary"
                    size="large"
                  />
                </div>

                <div class="flex-group">
                  <InputButtonConfirm
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Confirm"
                    theme="primary"
                    size="x-small"
                  />
                  <InputButtonConfirm
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Confirm"
                    theme="primary"
                    size="small"
                  />
                  <InputButtonConfirm
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Confirm"
                    theme="primary"
                    size="normal"
                  />
                  <InputButtonConfirm
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Confirm"
                    theme="tertiary"
                    size="medium"
                  />
                  <InputButtonConfirm
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Confirm"
                    theme="tertiary"
                    size="large"
                  />
                </div>
                <div class="flex-group">
                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    theme="primary"
                    size="medium"
                  />

                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    theme="secondary"
                    size="medium"
                  />

                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    theme="tertiary"
                    size="medium"
                  />

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
                </div>

                <div class="flex-group">
                  <InputButtonCore
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    theme="ghost"
                    size="x-small"
                  >
                    <template #iconOnly>
                      <Icon name="radix-icons:eye-none" class="icon" />
                    </template>
                  </InputButtonCore>
                </div>
              </form>
            </template>
          </FormWrapper>
        </div>
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
.flex-group {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 32px;
}
</style>
