<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  title?: string;
  maxWidth?: string | number;
}>();
const emit = defineEmits(["update:modelValue"]);
</script>
<template>
  <v-dialog
    :model-value="modelValue"
    :max-width="maxWidth || 500"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>

      <v-card-text>
        <slot />
      </v-card-text>

      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>