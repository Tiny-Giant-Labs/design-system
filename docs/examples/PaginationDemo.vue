<script setup lang="ts">
import { ref } from "vue";
import Pagination from "../../src/components/Pagination.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const pagTotal = ref(120);
const pagSize = ref(10);
const pagLoading = ref(false);
const pagLabel = ref("items");
const pagCurrent = ref(1);
</script>

<template>
  <ComponentDoc :def="getDef('Pagination')">
    <template #preview>
      <div style="width: 400px">
        <Pagination
          v-model="pagCurrent"
          :total-count="pagTotal"
          :page-size="pagSize"
          :is-loading="pagLoading"
          :label="pagLabel"
        />
      </div>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">totalCount</label
        ><input v-model.number="pagTotal" type="number" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">pageSize</label
        ><input v-model.number="pagSize" type="number" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">label</label
        ><input v-model="pagLabel" class="control-input" />
      </div>
      <label class="control-checkbox"
        ><input type="checkbox" v-model="pagLoading" /><span
          >isLoading</span
        ></label
      >
    </template>
  </ComponentDoc>
</template>
