<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

interface Props {
  label: string
  placeholder?: string
  id: string
  error?: string
}

defineProps<Props>()

const model = defineModel<string>()
</script>

<template>
  <label>
    <span class="text-content-emphasis mb-2 block text-sm font-medium leading-none">
      {{ label }}
    </span>

    <div class="flex flex-col gap-1">
      <textarea
        v-bind="$attrs"
        v-model="model"
        :id="id"
        :placeholder="placeholder"
        class="block w-full min-w-0 appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-400 shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary hover:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
      ></textarea>

      <span v-if="error" class="text-red-600 text-[10px] opacity-90">{{ error }}</span>
    </div>
  </label>
</template>
