<script setup lang="ts">
import { vMaska } from "maska/vue";
import { ref } from "vue";

defineOptions({
  inheritAttrs: false,
});

interface Props {
  label?: string;
  placeholder?: string;
  type: "text" | "email" | "password" | "number" | "date" | "datetime-local";
  id: string;
  error?: string;
  mask?: object | string;
}

defineProps<Props>();

const model = defineModel<string | number>();
const inputRef = ref<HTMLInputElement | null>(null);

defineExpose({
  focus: () => inputRef.value?.focus(),
});
</script>

<template>
  <label class="block">
    <span
      v-if="label"
      class="text-content-emphasis mb-2 block text-sm font-medium leading-none"
    >
      {{ label }}
    </span>

    <div class="flex flex-col gap-1">
      <div class="relative">
        <div
          v-if="$slots['start-icon']"
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <slot name="start-icon"></slot>
        </div>
        <input
          ref="inputRef"
          v-bind="$attrs"
          v-model="model"
          :id="id"
          :placeholder="placeholder"
          class="block w-full min-w-0 appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary hover:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
          :class="{
            'pr-10': $slots['end-icon'],
            'pl-10': $slots['start-icon'],
          }"
          :type="type"
          v-maska="mask"
        />
        <div
          v-if="$slots['end-icon']"
          class="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <slot name="end-icon"></slot>
        </div>
      </div>

      <span v-if="error" class="text-red-600 text-[10px] opacity-90">{{
        error
      }}</span>
    </div>
  </label>
</template>
