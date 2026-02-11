<script setup lang="ts">
import Button from "./Button.vue";
import { useTemplateRef, ref } from "vue";
import { CloudArrowUpIcon } from "@heroicons/vue/24/outline";

interface Emits {
  (event: "imageSelected", image: string): void;
}

const emit = defineEmits<Emits>();

interface Props {
  image: string;
  error?: string;
  loading?: boolean;
  helperText: string;
  maxFileSize?: number; // in bytes
}

const props = defineProps<Props>();

const fileInput = useTemplateRef("fileInput");
const localError = ref<string>("");

const openFileDialog = () => {
  fileInput.value?.click();
};

const onFileChange = (e: Event) => {
  localError.value = "";
  const target = e.target as HTMLInputElement;
  if (!target.files || !target.files[0]) return;

  const file = target.files[0];

  if (props.maxFileSize && file.size > props.maxFileSize) {
    const sizeInMb = props.maxFileSize / (1024 * 1024);
    localError.value = `Image must be smaller than ${sizeInMb >= 1 ? sizeInMb.toFixed(0) + "MB" : (props.maxFileSize / 1024).toFixed(0) + "KB"}`;
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    emit("imageSelected", reader.result as string);
  };

  reader.onerror = (err) => {
    console.error("Error reading file:", err);
  };

  reader.readAsDataURL(file);
};
</script>

<template>
  <div class="flex gap-4">
    <div
      class="w-16 h-16 rounded-full border border-neutral-300 bg-neutral-100 overflow-hidden flex items-center justify-center"
    >
      <img v-if="image" :src="image" class="object-cover h-full" />
      <CloudArrowUpIcon v-else class="w-5 h-5 text-neutral-500" />
    </div>

    <div class="flex flex-col justify-center">
      <Button
        size="small"
        variant="outline"
        text="Upload image"
        class="w-max"
        @click.prevent="openFileDialog"
      />

      <p class="text-[10px] mt-1 text-neutral-500">{{ helperText }}</p>

      <span
        v-if="error || localError"
        class="text-red-600 text-[10px] opacity-90"
        >{{ error || localError }}</span
      >

      <input
        ref="fileInput"
        type="file"
        accept=".jpg, .jpeg, .png, .svg, .webp"
        class="hidden"
        @change="onFileChange"
      />
    </div>
  </div>
</template>
