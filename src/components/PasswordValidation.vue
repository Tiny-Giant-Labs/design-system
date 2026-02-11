<script setup lang="ts">
import { computed } from 'vue'
import { InformationCircleIcon } from '@heroicons/vue/16/solid'

interface Props {
  password: string
  validation: {
    minCharacter: boolean
    hasLetterAndNumber: boolean
  }
}

const props = defineProps<Props>()

const passwordMinLengthValidationClasses = computed(() => {
  if (!props.password) return 'text-neutral-400'
  if (!props.validation?.minCharacter) {
    return 'text-red-600'
  }
  return 'text-green-600'
})

const passwordLetterAndNumberValidationClasses = computed(() => {
  if (!props.password) return 'text-neutral-400'
  if (!props.validation?.hasLetterAndNumber) {
    return 'text-red-600'
  }
  return 'text-green-600'
})
</script>

<template>
  <div class="flex gap-3">
    <div class="flex items-center gap-1 opacity-80" :class="passwordMinLengthValidationClasses">
      <InformationCircleIcon class="h-3.5 w-3.5" />
      <p :class="passwordMinLengthValidationClasses" class="text-[10px]">Min 8 characters</p>
    </div>

    <div
      class="flex items-center gap-1 opacity-80"
      :class="passwordLetterAndNumberValidationClasses"
    >
      <InformationCircleIcon class="h-3.5 w-3.5" />
      <p :class="passwordLetterAndNumberValidationClasses" class="text-[10px]">
        Letters and numbers
      </p>
    </div>
  </div>
</template>
