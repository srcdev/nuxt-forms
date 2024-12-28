export const useColourScheme = (colourScheme: Ref<'auto' | 'dark' | 'light'> = ref('light')) => {
  const updateColourScheme = (newColourScheme: 'auto' | 'dark' | 'light') => {
    colourScheme.value = newColourScheme;
  };

  const getSetPrefereredColourScheme = () => {
    if (import.meta.client) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        colourScheme.value = 'dark';
      } else {
        colourScheme.value = 'light';
      }
    }
  };

  onMounted(() => {
    if (import.meta.client) {
      const storedMode = localStorage.getItem('colourScheme');
      if (storedMode) {
        colourScheme.value = storedMode as 'dark' | 'light';
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        colourScheme.value = 'dark';
      } else {
        colourScheme.value = 'light';
      }
    }
  });

  watch(colourScheme, (newVal) => {
    if (import.meta.client) {
      localStorage.setItem('colourScheme', newVal);
      document.documentElement.dataset.colorScheme = newVal;
    }
  });

  return {
    colourScheme,
    updateColourScheme,
    getSetPrefereredColourScheme,
  };
};
