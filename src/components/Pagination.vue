<script setup lang="ts">
import { computed } from "vue";
import Button from "./Button.vue";

interface Props {
  totalCount: number;
  pageSize?: number;
  isLoading?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  isLoading: false,
  label: "items",
});

const currentPage = defineModel<number>({ required: true });

const totalPages = computed(() => Math.ceil(props.totalCount / props.pageSize));

const startItem = computed(() =>
  props.totalCount === 0 ? 0 : (currentPage.value - 1) * props.pageSize + 1,
);

const endItem = computed(() =>
  Math.min(currentPage.value * props.pageSize, props.totalCount),
);

const handlePrevious = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const handleNext = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="flex items-center justify-between border-t border-neutral-200 pt-4"
  >
    <p class="text-sm text-neutral-500">
      Viewing {{ startItem }}-{{ endItem }} of {{ totalCount }} {{ label }}
    </p>

    <div class="flex gap-2">
      <Button
        text="Previous"
        variant="outline"
        size="small"
        :disabled="currentPage === 1 || isLoading"
        @click="handlePrevious"
      />
      <Button
        text="Next"
        variant="outline"
        size="small"
        :disabled="currentPage >= totalPages || isLoading"
        @click="handleNext"
      />
    </div>
  </div>
</template>
