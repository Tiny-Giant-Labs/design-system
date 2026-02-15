<script setup lang="ts">
import { ref } from "vue";
import Select from "../../src/components/Select.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const selectLabel = ref("Country");
const selectId = ref("demo-select");
const selectError = ref("");
const selectDisabled = ref(false);
const selectModel = ref("us");
</script>

<template>
  <ComponentDoc :def="getDef('Select')">
    <template #preview>
      <div style="width: 260px">
        <Select
          v-model="selectModel"
          :label="selectLabel"
          :id="selectId"
          :error="selectError"
          :disabled="selectDisabled"
        >
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="de">Germany</option>
        </Select>
      </div>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">label</label
        ><input v-model="selectLabel" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">error</label
        ><input v-model="selectError" class="control-input" />
      </div>
      <label class="control-checkbox"
        ><input type="checkbox" v-model="selectDisabled" /><span
          >disabled</span
        ></label
      >
    </template>
  </ComponentDoc>
</template>
