<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { onUnmounted, ref, watch } from 'vue'

interface Emits {
  (event: 'openStateChanged', state: 'open' | 'close'): void
}

const emit = defineEmits<Emits>()

interface Props {
  title?: string
  widthClass?: string
  zIndexClass?: string
  beforeOpen?: () => Promise<boolean> | boolean
}

const props = withDefaults(defineProps<Props>(), {
  widthClass: 'w-lg',
  zIndexClass: 'z-50',
})

const isOpen = ref(false)

const openModal = async () => {
  if (props.beforeOpen) {
    const canOpen = await props.beforeOpen()
    if (!canOpen) {
      return
    }
  }

  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

defineExpose({
  closeModal,
  openModal,
})

const updateProductFruitsVisibility = (visible: boolean) => {
  const elements = document.querySelectorAll<HTMLElement>('.productfruits--container')
  elements.forEach((el) => {
    el.style.display = visible ? '' : 'none'
  })
}

watch(isOpen, async (open) => {
  updateProductFruitsVisibility(!open)

  if (open) {
    emit('openStateChanged', 'open')
  } else {
    emit('openStateChanged', 'close')
  }
})

onUnmounted(() => {
  if (isOpen.value) {
    updateProductFruitsVisibility(true)
  }
})

onKeyStroke('Escape', (event) => {
  event.preventDefault()
  if (!isOpen.value) return
  closeModal()
})
</script>

<template>
  <div>
    <div @click="openModal">
      <slot name="trigger" />
    </div>
    <Teleport to="body">
      <Transition name="fade" mode="out-in">
        <div
          v-if="isOpen"
          class="bg-neutral-950/30 pointer-events-auto fixed inset-0 flex items-center justify-center backdrop-blur-xs"
          :class="zIndexClass"
          @click="closeModal"
        >
          <div
            class="relative mx-4 max-h-[700px] overflow-auto rounded-2xl bg-white shadow-lg"
            :class="widthClass"
            @click.stop
          >
            <slot name="content" :close="closeModal"></slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
