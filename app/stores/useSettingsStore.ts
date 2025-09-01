// const delay = (t: number) => new Promise((r) => setTimeout(r, t))

export const useSettingsStore = defineStore(
  "settingsStore",
  () => {
    // State
    const colourScheme = ref<"auto" | "dark" | "light" | null>(null)

    // Getters
    const currentColourScheme = computed(() => colourScheme.value)

    // Actions
    const setColourScheme = (state: "auto" | "dark" | "light" | null) => {
      console.log("Setting colour scheme:", state)
      colourScheme.value = state
    }

    return {
      currentColourScheme,
      setColourScheme,
    }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies(),
    },
  }
)
