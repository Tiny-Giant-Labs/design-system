<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  label?: string
  description?: string
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}

const switchClass = computed(() => {
  return props.modelValue ? 'bg-primary' : 'bg-neutral-200'
})

const translateClass = computed(() => {
  return props.modelValue ? 'translate-x-5' : 'translate-x-0'
})
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-col" v-if="label || description">
      <span v-if="label" class="text-sm font-medium text-neutral-900">{{ label }}</span>
      <span v-if="description" class="text-sm text-neutral-500">{{ description }}</span>
    </div>
    <button
      type="button"
      class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      :class="[switchClass, disabled ? 'opacity-50 cursor-not-allowed' : '']"
      role="switch"
      :aria-checked="modelValue"
      @click="toggle"
      :disabled="disabled"
    >
      <span
        aria-hidden="true"
        class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        :class="translateClass"
      />
    </button>
  </div>
</template>
