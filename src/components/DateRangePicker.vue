<script setup lang="ts">
import Button from "./Button.vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { computed, onMounted, ref, watch } from "vue";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/outline";

export type DateType = Date | [Date, Date];

interface Emits {
  (event: "selected", data: DateType): void;
}

const emit = defineEmits<Emits>();

type Props =
  | {
      mode: "date";
      selectedDate?: Date;
      label: string;
      isUtcTime?: boolean;
    }
  | {
      mode: "range";
      selectedDate?: [Date, Date];
      label?: never;
      preventSameDayRange?: boolean;
      isUtcTime?: boolean;
    };

const props = withDefaults(defineProps<Props>(), {
  mode: "date",
  isUtcTime: false,
});

const date = ref<DateType | null>(null);
const selectedPresetSlotName = ref<string | null>(null);

const todaysDate = computed(() => {
  return props.isUtcTime ? toZonedTime(new Date(), "UTC") : new Date();
});

const presetDates = computed(() => {
  const allPresets = [
    {
      label: "Today",
      value: [todaysDate.value, todaysDate.value],
      slot: "today",
    },
    {
      label: "Yesterday",
      value: [subDays(todaysDate.value, 1), subDays(todaysDate.value, 1)],
      slot: "yesterday",
    },
    {
      label: "This Week",
      value: [
        startOfWeek(todaysDate.value, { weekStartsOn: 1 }),
        todaysDate.value,
      ],
      slot: "this-week",
    },
    {
      label: "Last Week",
      value: [
        startOfWeek(subWeeks(todaysDate.value, 1), { weekStartsOn: 1 }),
        endOfWeek(subWeeks(todaysDate.value, 1), { weekStartsOn: 1 }),
      ],
      slot: "last-week",
    },
    {
      label: "Last 7 Days",
      value: [subDays(todaysDate.value, 7), todaysDate.value],
      slot: "last-7-days",
    },
    {
      label: "This Month",
      value: [startOfMonth(todaysDate.value), todaysDate.value],
      slot: "this-month",
    },
    {
      label: "Last Month",
      value: [
        startOfMonth(subMonths(todaysDate.value, 1)),
        endOfMonth(subMonths(todaysDate.value, 1)),
      ],
      slot: "last-month",
    },
    {
      label: "Last 30 Days",
      value: [subDays(todaysDate.value, 30), todaysDate.value],
      slot: "last-30-days",
    },
    {
      label: "Last 90 Days",
      value: [subDays(todaysDate.value, 90), todaysDate.value],
      slot: "last-90-days",
    },
    {
      label: "This Year",
      value: [startOfYear(todaysDate.value), todaysDate.value],
      slot: "this-year",
    },
  ];

  // Note: Remove Today and Yesterday from presets
  if (props.mode === "range" && props.preventSameDayRange) {
    return allPresets.filter((_, index) => index !== 0 && index !== 1);
  }

  return allPresets;
});

const handleDateSelect = (data: DateType) => {
  if (props.mode === "range" && Array.isArray(data) && data[0] && !data[1]) {
    const adjustedData: [Date, Date] = [data[0], data[0]];
    date.value = adjustedData;
    emit("selected", adjustedData);
  } else {
    date.value = data;
    emit("selected", data);
  }
};

watch(
  () => props.selectedDate,
  (newValue) => {
    if (newValue) {
      date.value = newValue;
    }
  },
);

const handlePresetClick = (
  presetDay: (value: [Date, Date]) => void,
  value: [Date, Date],
  slotName: string,
) => {
  selectedPresetSlotName.value = slotName;
  presetDay(value);
};

onMounted(() => {
  if (props.mode === "range") {
    if (!props.selectedDate) {
      const endDate = todaysDate.value;
      const startDate = subDays(todaysDate.value, 7);
      date.value = [startDate, endDate];
    } else {
      date.value = props.selectedDate;
    }
  }
});
</script>

<template>
  <div>
    <VueDatePicker
      v-model="date"
      :range="mode === 'range'"
      :max-date="todaysDate"
      prevent-min-max-navigation
      week-start="1"
      :time-config="{
        enableTimePicker: false,
      }"
      :hide-navigation="['year']"
      position="left"
      offset="4"
      :preset-dates="mode === 'range' ? presetDates : undefined"
      :year-range="[2024, todaysDate.getFullYear()]"
      @range-start="selectedPresetSlotName = null"
      @update:model-value="handleDateSelect"
    >
      <template #trigger>
        <div
          v-if="mode === 'range'"
          class="flex items-center gap-2 px-3 py-2 bg-white border border-neutral-300 rounded-md shadow-sm hover:bg-neutral-50 transition-colors text-sm text-neutral-900 w-full justify-between"
        >
          <p v-if="Array.isArray(date)">
            {{
              `${format(date[0], "MMMM dd, yyyy")} - ${format(date[1], "MMMM dd, yyyy")}`
            }}
          </p>
          <ChevronDownIcon class="w-5 h-5" />
        </div>
        <div v-if="mode === 'date'">
          <div class="flex w-full cursor-pointer flex-col gap-1">
            <label class="text-sm font-bold">{{ label }}</label>
            <div
              class="flex h-10 items-center justify-between rounded-lg border px-3"
            >
              <p>
                {{
                  date instanceof Date && !isNaN(date.getTime())
                    ? format(date, "MMMM dd, yyyy")
                    : label
                }}
              </p>
              <ChevronDownIcon class="w-5 h-5" />
            </div>
          </div>
        </div>
      </template>

      <template #year-overlay-header="{ toggle }">
        <div class="flex cursor-pointer items-center gap-2 p-2 pt-3">
          <Icon
            name="heroicons-solid:chevron-left"
            :size="24"
            classes="text-sub-600"
          />
          <span @click.prevent="toggle">
            {{ "Back" }}
          </span>
        </div>
      </template>

      <template #month-overlay-header="{ toggle }">
        <div class="flex cursor-pointer items-center gap-2 p-2 pt-3">
          <ChevronLeftIcon class="w-5 h-5" />
          <span @click.prevent="toggle">
            {{ "Back" }}
          </span>
        </div>
      </template>

      <template #arrow-left>
        <ChevronLeftIcon class="w-5 h-5" />
      </template>

      <template #arrow-right>
        <ChevronRightIcon class="w-5 h-5" />
      </template>

      <template #action-row="{ selectDate }">
        <div class="w-full">
          <div class="w-full">
            <Button
              text="Done"
              size="small"
              class="w-full"
              @click.prevent="selectDate"
            />
          </div>
        </div>
      </template>

      <template
        v-for="preset in presetDates"
        :key="preset.slot"
        #[preset.slot]="{ label, value, presetDate }"
      >
        <p
          role="button"
          :tabindex="0"
          class="hover:bg-weak-50 w-28 cursor-pointer rounded-lg px-2 py-1"
          :class="{ 'bg-weak-50': selectedPresetSlotName === preset.slot }"
          @click="handlePresetClick(presetDate, value, preset.slot)"
          @keyup.enter.prevent="
            handlePresetClick(presetDate, value, preset.slot)
          "
          @keyup.space.prevent="
            handlePresetClick(presetDate, value, preset.slot)
          "
        >
          {{ label }}
        </p>
      </template>
    </VueDatePicker>
  </div>
</template>

<style>
:root {
  --dp-font-family: "Inter";
  --dp-action-button-height: 2rem;
  --dp-action-buttons-padding: 0;
  --dp-font-size: 0.9rem;
  --dp-border-radius: 8px;
}

.dp__theme_light {
  --dp-primary-color: var(--color-primary);
  --dp-hover-color: var(--color-weak-50);
  --dp-border-color: var(--color-soft-200);
}

.dp--preset-dates {
  padding: 12px !important;
}

.dp__selection_preview {
  display: none !important;
}

.dp__overlay_action {
  display: none !important;
}

.dp__overlay_row {
  flex: 0 !important;
  padding: 0 8px !important;
}

.dp__arrow_top {
  display: none !important;
}

.input {
  box-shadow: 0 1px 2px 0 var(--color-black-alpha-10);
}
</style>
