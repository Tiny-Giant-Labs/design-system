<script setup lang="ts">
import { ref } from "vue";
import Tabs from "../../src/components/Tabs.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const tabItems = ref([
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" },
]);
const activeTab = ref("overview");
</script>

<template>
  <ComponentDoc :def="getDef('Tabs')">
    <template #preview
      ><div style="width: 360px">
        <Tabs v-model="activeTab" :tabs="tabItems" /></div
    ></template>
    <template #controls />
  </ComponentDoc>
</template>
