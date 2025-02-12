export const useColourScheme = () => {
  // const currentColourScheme = computed(() => {
  //   return colourScheme.value;
  // });

  const currentColourScheme = ref<'auto' | 'dark' | 'light' | null>(null);

  // const updateColourScheme = (newColourScheme: 'auto' | 'dark' | 'light') => {
  //   colourScheme.value = newColourScheme;
  // };

  // const getSetPrefereredColourScheme = () => {
  //   if (import.meta.client) {
  //     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !document.documentElement.dataset.colorScheme) {
  //       colourScheme.value = 'dark';
  //     } else {
  //       colourScheme.value = 'light';
  //     }
  //   }
  // };

  const returnSavedColourPreferenceFromLocalStorage = () => {
    if (import.meta.client) {
      return localStorage.getItem('colourScheme') as 'auto' | 'dark' | 'light' | null;
    }
  };

  onMounted(() => {
    currentColourScheme.value = returnSavedColourPreferenceFromLocalStorage() || 'auto';
    // colourScheme.value = currentColourScheme.value;
    //
    // if (import.meta.client) {
    //   const savedColourScheme = localStorage.getItem('colourScheme');
    //   if (savedColourScheme) {
    //     colourScheme.value = savedColourScheme as 'dark' | 'light';
    //   } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //     colourScheme.value = 'dark';
    //   } else {
    //     colourScheme.value = 'light';
    //   }
    // }
  });

  watch(currentColourScheme, (newVal) => {
    if (import.meta.client && newVal !== null) {
      localStorage.setItem('colourScheme', newVal);
      document.documentElement.dataset.colorScheme = newVal;
      currentColourScheme.value = newVal;
    }
  });

  return {
    currentColourScheme,
    // colourScheme,
    // updateColourScheme,
    // getSetPrefereredColourScheme,
  };
};
