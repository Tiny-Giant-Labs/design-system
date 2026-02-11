<script setup lang="ts">
import { ref, watch } from "vue";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  CheckIcon,
} from "@heroicons/vue/24/outline";
import { debounce } from "lodash-es";
import { useInfiniteScroll } from "@vueuse/core";
import Dropdown from "./Dropdown.vue";

interface Option {
  id: string;
  name: string;
  color?: string;
}

interface Props {
  label: string;
  options: Option[];
  single?: boolean;
  onSearch?: (query: string) => void;
  hasMore?: boolean;
  loading?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "load-more"): void;
}>();

const model = defineModel<string[] | string>({ required: true });

const searchQuery = ref("");
const scrollContainer = ref<HTMLElement | null>(null);

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
    if (props.onSearch) {
      props.onSearch(val);
    }
  }, 300),
);

const isSelected = (id: string) => {
  if (Array.isArray(model.value)) {
    return model.value.includes(id);
  }
  return model.value === id;
};

const toggleOption = (id: string) => {
  if (props.single) {
    model.value = id;
  } else {
    const current = Array.isArray(model.value) ? [...model.value] : [];
    const index = current.indexOf(id);
    if (index === -1) {
      current.push(id);
    } else {
      current.splice(index, 1);
    }
    model.value = current;
  }
};
</script>

<template>
  <Dropdown :hide-after-click="false" placement="bottom-start">
    <template #trigger>
      <button
        type="button"
        class="group inline-flex items-center px-4 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white transition-colors hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      >
        <div
          class="-ml-1 mr-2 h-4 w-4 text-neutral-500 group-hover:text-neutral-600"
        >
          <slot name="icon">
            <FunnelIcon class="h-4 w-4" />
          </slot>
        </div>
        {{ label }}
        <span
          v-if="Array.isArray(model) ? model.length > 0 : !!model"
          class="ml-2 bg-neutral-100 py-0.5 px-2 rounded-full text-xs font-medium text-neutral-600"
        >
          {{ Array.isArray(model) ? model.length : 1 }}
        </span>
      </button>
    </template>
    <template #content>
      <div
        class="w-64 bg-white shadow-lg rounded-md border border-neutral-200 py-2"
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
              :placeholder="`Search ${label.toLowerCase()}...`"
              class="block w-full pl-8 pr-3 py-1.5 border border-neutral-200 rounded-md text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <!-- Scrollable Content -->
        <div ref="scrollContainer" class="max-h-60 overflow-y-auto">
          <!-- Clear selection option for single mode -->
          <div
            v-if="single && model"
            class="flex items-center px-4 py-2 hover:bg-neutral-50 transition-colors cursor-pointer"
            @click="model = ''"
          >
            <span
              class="text-sm text-neutral-500 hover:text-neutral-900 w-full text-left"
            >
              Clear selection
            </span>
          </div>

          <div
            v-for="option in options"
            :key="option.id"
            class="flex items-center justify-between px-4 py-2 hover:bg-neutral-50 transition-colors cursor-pointer"
            @click="toggleOption(option.id)"
          >
            <div class="flex items-center gap-2 overflow-hidden">
              <span
                v-if="option.color"
                :style="{ backgroundColor: option.color }"
                class="w-2 h-2 rounded-full inline-block ring-1 ring-neutral-200 shrink-0"
              ></span>
              <span
                class="text-sm font-medium text-neutral-700 truncate select-none"
                >{{ option.name }}</span
              >
            </div>

            <CheckIcon
              v-if="isSelected(option.id)"
              class="h-4 w-4 text-primary shrink-0"
            />
          </div>
          <div
            v-if="options.length === 0 && !loading"
            class="px-4 py-2 text-sm text-neutral-500 text-center"
          >
            No results found
          </div>
          <div v-if="loading" class="px-4 py-2 flex justify-center">
            <div
              class="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"
            ></div>
          </div>
        </div>
      </div>
    </template>
  </Dropdown>
</template>
