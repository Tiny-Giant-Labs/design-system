<script setup lang="ts">
import { ref } from "vue";
import SegmentedControl from "../../src/components/SegmentedControl.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const segValue = ref<string>("month");
const segOptions = [
  { value: "month", label: "Monthly" },
  {
    value: "year",
    label: "Yearly",
    suffix: "-20%",
    suffixClass: "text-green-600 text-xs font-semibold",
  },
];
</script>

<template>
  <ComponentDoc :def="getDef('SegmentedControl')">
    <template #preview
      ><SegmentedControl v-model="segValue" :options="segOptions"
    /></template>
    <template #controls />
  </ComponentDoc>
</template>
