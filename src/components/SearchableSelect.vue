<script setup lang="ts" generic="T extends { id: string; name: string }">
import { ref, watch, computed } from "vue";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import { debounce } from "lodash-es";
import { useInfiniteScroll } from "@vueuse/core";
import Dropdown from "./Dropdown.vue";

interface Props {
  label?: string;
  options: T[];
  modelValue?: string | null;
  placeholder?: string;
  loading?: boolean;
  hasMore?: boolean;
  error?: string;
  widthClass?: string;
  selection?: T | null;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Select an option...",
  widthClass: "w-full",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "select", option: T): void;
  (e: "search", query: string): void;
  (e: "load-more"): void;
}>();

const searchQuery = ref("");
const scrollContainer = ref<HTMLElement | null>(null);
const dropdownRef = ref<InstanceType<typeof Dropdown> | null>(null);

useInfiniteScroll(
  scrollContainer,
  () => {
    if (props.hasMore && !props.loading) {
      emit("load-more");
    }
  },
  { distance: 10 },
);

watch(
  searchQuery,
  debounce((val) => {
    emit("search", val);
  }, 300),
);

const selectedOption = computed(() => {
  if (props.selection && props.selection.id === props.modelValue) {
    return props.selection;
  }
  return props.options.find((o) => o.id === props.modelValue);
});

const selectOption = (option: T) => {
  emit("update:modelValue", option.id);
  emit("select", option);
  dropdownRef.value?.hideTippy();
};
</script>

<template>
  <div :class="widthClass">
    <label
      v-if="label"
      class="text-content-emphasis mb-2 block text-sm font-medium leading-none"
    >
      {{ label }}
    </label>

    <Dropdown
      ref="dropdownRef"
      :hide-after-click="true"
      width-class="w-full"
      placement="bottom-start"
    >
      <template #trigger>
        <button
          type="button"
          class="relative w-full cursor-default rounded-md border border-neutral-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm transition-colors hover:border-neutral-400"
          :class="{
            'border-red-300 focus:border-red-500 focus:ring-red-500': error,
          }"
        >
          <span v-if="selectedOption" class="block truncate">{{
            selectedOption.name
          }}</span>
          <span v-else class="block truncate text-neutral-500">{{
            placeholder
          }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <div
              v-if="loading"
              class="animate-spin rounded-full h-4 w-4 border-2 border-neutral-500 border-t-transparent mr-1"
            ></div>
            <ChevronDownIcon
              v-else
              class="h-4 w-4 text-neutral-500"
              aria-hidden="true"
            />
          </span>
        </button>
      </template>

      <template #content>
        <div
          class="w-full min-w-[200px] max-w-[400px] bg-white shadow-lg rounded-md border border-neutral-200 py-2"
        >
          <!-- Search Input -->
          <div class="px-2 pb-2 mb-1 border-b border-neutral-100">
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
              >
                <MagnifyingGlassIcon class="h-3.5 w-3.5 text-neutral-400" />
              </div>
              <input
                v-model="searchQuery"
                type="text"
                class="block w-full pl-8 pr-3 py-1.5 border border-neutral-200 rounded-md text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Search..."
                @click.stop
              />
            </div>
          </div>

          <!-- Options List -->
          <ul
            ref="scrollContainer"
            class="max-h-60 w-full overflow-auto py-1 text-base sm:text-sm focus:outline-none"
          >
            <li
              v-for="option in options"
              :key="option.id"
              class="relative select-none py-2 pl-3 pr-9 hover:bg-neutral-50 text-neutral-900 cursor-pointer"
              @click="selectOption(option)"
            >
              <span
                class="block truncate"
                :class="{ 'font-semibold': modelValue === option.id }"
              >
                {{ option.name }}
              </span>

              <span
                v-if="modelValue === option.id"
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary"
              >
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </li>

            <!-- Loading State -->
            <li
              v-if="loading"
              class="relative cursor-default select-none py-2 pl-3 pr-9 text-neutral-500 text-center"
            >
              <div class="flex justify-center">
                <div
                  class="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"
                ></div>
              </div>
            </li>

            <!-- No Results -->
            <li
              v-if="!loading && options.length === 0"
              class="relative cursor-default select-none py-2 pl-3 pr-9 text-neutral-500 text-center"
            >
              No results found
            </li>
          </ul>
        </div>
      </template>
    </Dropdown>

    <p v-if="error" class="mt-1 text-[10px] text-red-600 opacity-90">
      {{ error }}
    </p>
  </div>
</template>
