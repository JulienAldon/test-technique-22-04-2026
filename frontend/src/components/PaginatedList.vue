<script setup lang="ts" generic="T extends Record<string, unknown>">

defineProps<{
  items: T[]
  loading: boolean
  itemKey: keyof T
}>()

defineEmits<{
  (e: 'edit', item: T): void
  (e: 'delete', item: T): void
}>()

</script>

<template>
  <div v-if="loading">
    <v-skeleton-loader type="card" />
  </div>

  <v-list v-else>
    <v-list-item
      v-for="item in items"
      :key="item[itemKey]"
    >
      <slot name="item" :item="item" />

      <template #append>
        <slot name="actions" :item="item" />
      </template>
    </v-list-item>
  </v-list>
</template>