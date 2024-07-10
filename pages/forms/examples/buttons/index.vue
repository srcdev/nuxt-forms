<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <div>
          <h1>Example buttons</h1>
          <p>Primary submit</p>

          <p>Themes switcher</p>
          <ul class="flex-group">
            <li>
              <InputButtonSubmit
                @click.stop.prevent="swapTheme('primary')"
                :is-pending="false"
                button-text="Primary"
                theme="primary"
                size="normal"
              />
            </li>
            <li>
              <InputButtonSubmit
                @click.stop.prevent="swapTheme('secondary')"
                :is-pending="false"
                button-text="Secondary"
                theme="secondary"
                size="normal"
              />
            </li>
            <li>
              <InputButtonSubmit
                @click.stop.prevent="swapTheme('tertiary')"
                :is-pending="false"
                button-text="Tertiary"
                theme="tertiary"
                size="normal"
              />
            </li>
            <li>
              <InputButtonSubmit
                @click.stop.prevent="swapTheme('ghost')"
                :is-pending="false"
                button-text="Ghost"
                theme="ghost"
                size="normal"
              />
            </li>
          </ul>

          <FormWrapper width="medium">
            <template #default>
              <form @submit.prevent="isPending">
                <div class="flex-group">
                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    :theme
                    size="x-small"
                  />

                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    :theme
                    size="small"
                  />

                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    :theme
                    size="normal"
                  />
                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    :theme
                    size="medium"
                  />
                  <InputButtonSubmit
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    :theme
                    size="large"
                  />
                </div>

                <div class="flex-group">
                  <InputButtonConfirm
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Confirm"
                    :theme
                    size="x-small"
                  />
                  <InputButtonConfirm
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Confirm"
                    :theme
                    size="small"
                  />
                  <InputButtonConfirm
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Confirm"
                    :theme
                    size="normal"
                  />
                  <InputButtonConfirm
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Confirm"
                    :theme
                    size="medium"
                  />
                  <InputButtonConfirm
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Confirm"
                    :theme
                    size="large"
                  />
                </div>
                <div class="flex-group">
                  <InputButtonCore
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    :theme
                    size="x-small"
                  >
                    <template #iconOnly>
                      <Icon name="radix-icons:eye-none" class="icon" />
                    </template>
                  </InputButtonCore>

                  <InputButtonCore
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    :theme
                    size="small"
                  >
                    <template #iconOnly>
                      <Icon name="radix-icons:eye-none" class="icon" />
                    </template>
                  </InputButtonCore>

                  <InputButtonCore
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    :theme
                    size="normal"
                  >
                    <template #iconOnly>
                      <Icon name="radix-icons:eye-none" class="icon" />
                    </template>
                  </InputButtonCore>

                  <InputButtonCore
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    :theme
                    size="medium"
                  >
                    <template #iconOnly>
                      <Icon name="radix-icons:eye-none" class="icon" />
                    </template>
                  </InputButtonCore>

                  <InputButtonCore
                    @click.stop.prevent="isPending"
                    :is-pending="false"
                    button-text="Submit"
                    :theme
                    size="large"
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

const theme = ref('primary');

const swapTheme = (newTheme: string) => {
  theme.value = newTheme;
};

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

ul.flex-group {
  list-style-type: none;
  padding: 0;
}
</style>
