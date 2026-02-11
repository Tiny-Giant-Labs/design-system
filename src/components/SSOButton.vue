<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<template>
  <div>
    <button
      class="group flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-neutral-300 bg-white px-4 text-sm text-content-emphasis shadow-sm transition-all hover:bg-neutral-50 hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
    >
      <slot />
      <div class="min-w-0 truncate">{{ text }}</div>
    </button>
  </div>
</template>
