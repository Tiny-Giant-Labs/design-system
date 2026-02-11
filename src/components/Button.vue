<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text?: string
  isLoading?: boolean
  variant?: 'default' | 'outline' | 'destructive'
  size?: 'default' | 'small'
  shortcut?: string
  disabled?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  block: true,
})

const variantClasses = computed(() => {
  if (props.variant === 'outline') {
    return 'border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 hover:border-neutral-400 disabled:opacity-50 disabled:hover:bg-white disabled:hover:border-neutral-300'
  }

  if (props.variant === 'destructive') {
    return 'border-red-600 bg-red-600 text-white hover:bg-red-700 hover:ring-4 hover:ring-red-100 disabled:opacity-50 disabled:hover:bg-red-600 disabled:hover:ring-0'
  }

  return 'border-primary bg-primary text-white hover:bg-primary/90 hover:ring-4 hover:ring-neutral-200 disabled:opacity-50 disabled:hover:bg-primary disabled:hover:ring-0'
})

const sizeClasses = computed(() => {
  if (props.size === 'small') {
    return 'h-8 px-3 text-xs'
  }

  return 'h-10 px-4 text-sm'
})
</script>

<template>
  <button
    class="group items-center justify-center gap-2 whitespace-nowrap rounded-md border shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed"
    :class="[variantClasses, sizeClasses, block ? 'flex w-full' : 'inline-flex']"
    :disabled="isLoading || disabled"
  >
    <div v-if="isLoading" class="min-w-0 truncate">Loading...</div>
    <div v-else-if="$slots.default" class="flex items-center gap-2">
      <slot />
    </div>
    <div v-else class="min-w-0 truncate">{{ text }}</div>
    <kbd
      v-if="shortcut && !isLoading"
      class="hidden items-center justify-center rounded border px-1.5 font-sans text-[10px] font-medium opacity-70 group-hover:opacity-100 sm:inline-flex"
      :class="[
        variant === 'outline'
          ? 'border-neutral-200 bg-neutral-100 text-neutral-500'
          : variant === 'destructive'
            ? 'border-red-200/20 bg-white/20 text-white'
            : 'border-primary-foreground/20 bg-primary-foreground/10 text-white',
      ]"
    >
      {{ shortcut }}
    </kbd>
  </button>
</template>
