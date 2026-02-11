<script setup lang="ts" generic="T extends string | number">
interface Option {
  value: T
  label: string
  suffix?: string
  suffixClass?: string
}

defineProps<{
  options: Option[]
}>()

const modelValue = defineModel<T>()
</script>

<template>
  <div class="bg-neutral-100 p-1 rounded-lg inline-flex items-center w-fit">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      @click="modelValue = option.value"
      :class="[
        'px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 select-none cursor-pointer',
        modelValue === option.value
          ? 'bg-white shadow-sm text-neutral-900'
          : 'text-neutral-500 hover:text-neutral-900',
      ]"
    >
      {{ option.label }}
      <span v-if="option.suffix" :class="option.suffixClass">{{ option.suffix }}</span>
    </button>
  </div>
</template>
