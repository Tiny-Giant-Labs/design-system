<script setup lang="ts">
import { ref } from "vue";
import SearchableSelect from "../../src/components/SearchableSelect.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const ssLabel = ref("Workspace");
const ssPlaceholder = ref("Select workspace...");
const ssLoading = ref(false);
const ssError = ref("");
const ssModel = ref<string | null>(null);
const ssOptions = [
  { id: "1", name: "Acme Corp" },
  { id: "2", name: "Globex Inc" },
  { id: "3", name: "Initech" },
];
</script>

<template>
  <ComponentDoc :def="getDef('SearchableSelect')">
    <template #preview>
      <div style="width: 300px; height: 300px">
        <SearchableSelect
          v-model="ssModel"
          :options="ssOptions"
          :label="ssLabel"
          :placeholder="ssPlaceholder"
          :loading="ssLoading"
          :error="ssError"
        />
      </div>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">label</label
        ><input v-model="ssLabel" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">placeholder</label
        ><input v-model="ssPlaceholder" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">error</label
        ><input v-model="ssError" class="control-input" />
      </div>
      <label class="control-checkbox"
        ><input type="checkbox" v-model="ssLoading" /><span
          >loading</span
        ></label
      >
    </template>
  </ComponentDoc>
</template>
