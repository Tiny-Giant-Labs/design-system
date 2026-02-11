<script setup lang="ts">
interface Props {
  href?: string
  size?: 'default' | 'small'
  bgColorIsVisible?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'default',
  bgColorIsVisible: false,
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="text-neutral-400 hover:text-primary rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer"
    :class="[
      size === 'small' ? 'p-1' : 'p-2',
      bgColorIsVisible ? 'bg-neutral-100' : 'hover:bg-neutral-100',
    ]"
  >
    <slot />
  </component>
</template>
