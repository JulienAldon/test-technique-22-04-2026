<script setup lang="ts">
defineProps<{
  page: number
  total: number
  perPage: number
}>()

defineEmits(['update:page'])
</script>

<template>
  <div class="d-flex justify-center mt-4">
    <v-pagination
      :model-value="page"
      @update:model-value="$emit('update:page', $event)"
      :length="Math.ceil(total / perPage)"
      :total-visible="5"
    />
  </div>
</template>