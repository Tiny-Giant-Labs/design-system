<script setup lang="ts">
import { computed } from 'vue'

interface Tab {
  id: string
  label: string
}

interface Props {
  tabs: Tab[]
}

defineProps<Props>()

const activeTab = defineModel<string>({ required: true })

const isActive = (tabId: string) => activeTab.value === tabId

const tabClasses = (tabId: string) =>
  computed(() => [
    'px-4 py-2 text-sm font-medium transition-colors cursor-pointer border-b-2',
    isActive(tabId)
      ? 'border-primary text-primary'
      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300',
  ])
</script>

<template>
  <div class="border-b border-neutral-200">
    <nav class="flex">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="tabClasses(tab.id).value"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </nav>
  </div>
</template>
