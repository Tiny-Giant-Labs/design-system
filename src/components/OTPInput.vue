<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'

interface Emits {
  (event: 'changed', value: string): void
}

const emit = defineEmits<Emits>()

interface Props {
  length?: number
}

const props = withDefaults(defineProps<Props>(), {
  length: 6,
})

const otp = ref<string[]>(Array(props.length).fill(''))
const inputs = ref<(HTMLInputElement | null)[]>([])

const focusInput = (index: number) => {
  nextTick(() => {
    inputs.value[index]?.focus()
  })
}

const onInput = (index: number) => {
  const value = otp.value[index]
  if (value && value.length > 1) {
    otp.value[index] = value.slice(-1)
  }
  if (value && index < props.length - 1) {
    focusInput(index + 1)
  }
}

const onBackspace = (index: number) => {
  if (!otp.value[index] && index > 0) {
    focusInput(index - 1)
  }
}

const onPaste = (event: ClipboardEvent) => {
  const pastedData = event.clipboardData?.getData('text') ?? ''
  if (!pastedData) return
  const digits = pastedData.replace(/\D/g, '').slice(0, props.length).split('')
  digits.forEach((digit, i) => {
    otp.value[i] = digit
  })
  nextTick(() => {
    const nextIndex = Math.min(digits.length, props.length - 1)
    focusInput(nextIndex)
  })
  event.preventDefault()
}

watch(
  otp,
  (newOtp) => {
    const code = newOtp.join('')
    emit('changed', code)
  },
  { deep: true },
)

onMounted(() => {
  focusInput(0)
})

defineExpose({
  focus: () => focusInput(0),
})
</script>

<template>
  <div class="flex space-x-2">
    <input
      v-for="(_digit, index) in otp"
      :key="index"
      ref="inputs"
      v-model="otp[index]"
      type="text"
      class="h-16 w-14 rounded-md border border-neutral-300 bg-white text-center text-2xl text-neutral-950 shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary hover:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
      maxlength="1"
      @input="onInput(index)"
      @keydown.backspace="onBackspace(index)"
      @paste="onPaste"
    />
  </div>
</template>
