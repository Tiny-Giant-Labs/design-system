<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

interface Props {
  label?: string
  id?: string
  error?: string
  disabled?: boolean
  widthClass?: string
}

withDefaults(defineProps<Props>(), {
  widthClass: 'w-full',
})

const model = defineModel<string | number | null | undefined>()
</script>

<template>
  <div :class="widthClass">
    <label
      v-if="label"
      :for="id"
      class="text-content-emphasis mb-2 block text-sm font-medium leading-none"
    >
      {{ label }}
    </label>
    <div class="flex flex-col gap-1">
      <div class="relative">
        <select
          :id="id"
          v-model="model"
          :disabled="disabled"
          class="appearance-none block w-full min-w-0 rounded-md border border-neutral-300 bg-white px-3 py-2 pr-10 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary hover:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <slot />
        </select>
        <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <ChevronDownIcon class="w-4 h-4 text-neutral-500" />
        </div>
      </div>
      <span v-if="error" class="text-red-600 text-[10px] opacity-90">{{ error }}</span>
    </div>
  </div>
</template>
