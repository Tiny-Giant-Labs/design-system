<script setup lang="ts">
import { ref } from "vue";
import Filter from "../../src/components/Filter.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const filterLabel = ref("Status");
const filterSingle = ref(false);
const filterLoading = ref(false);
const filterModel = ref<string[]>([]);
const filterOptions = [
  { id: "1", name: "Active", color: "#22c55e" },
  { id: "2", name: "Pending", color: "#f59e0b" },
  { id: "3", name: "Inactive", color: "#ef4444" },
];
</script>

<template>
  <ComponentDoc :def="getDef('Filter')">
    <template #preview>
      <div style="height: 200px">
        <Filter
          v-model="filterModel"
          :label="filterLabel"
          :options="filterOptions"
          :single-select="filterSingle"
          :loading="filterLoading"
        />
      </div>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">label</label
        ><input v-model="filterLabel" class="control-input" />
      </div>
      <label class="control-checkbox"
        ><input type="checkbox" v-model="filterSingle" /><span
          >singleSelect</span
        ></label
      >
      <label class="control-checkbox"
        ><input type="checkbox" v-model="filterLoading" /><span
          >loading</span
        ></label
      >
    </template>
  </ComponentDoc>
</template>
