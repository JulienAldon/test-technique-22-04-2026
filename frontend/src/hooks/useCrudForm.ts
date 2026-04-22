import { ref } from 'vue'

export function useCrudForm<T extends object>(initial: T) {
  const dialog = ref(false)
  const isEditMode = ref(false)
  const editingId = ref<number | null>(null)

  const form = ref<T>({ ...initial })

  const openCreate = () => {
    isEditMode.value = false
    editingId.value = null
    form.value = { ...initial }
    dialog.value = true
  }

  const openEdit = (id: number, data: T) => {
    isEditMode.value = true
    editingId.value = id
    form.value = { ...data }
    dialog.value = true
  }

  const reset = () => {
    dialog.value = false
    isEditMode.value = false
    editingId.value = null
    form.value = { ...initial }
  }

  return {
    dialog,
    isEditMode,
    editingId,
    form,
    openCreate,
    openEdit,
    reset,
  }
}
