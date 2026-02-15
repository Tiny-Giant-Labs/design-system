<script setup lang="ts">
import { ref } from "vue";
import Dropdown from "../../src/components/Dropdown.vue";
import Button from "../../src/components/Button.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const ddPlacement = ref("bottom-end");
const ddHideAfterClick = ref(true);
</script>

<template>
  <ComponentDoc :def="getDef('Dropdown')">
    <template #preview>
      <Dropdown
        :placement="ddPlacement as any"
        :hide-after-click="ddHideAfterClick"
      >
        <template #trigger
          ><Button text="Open Dropdown" variant="outline" :block="false"
        /></template>
        <template #content>
          <div
            class="bg-white border border-neutral-200 rounded-lg shadow-lg py-1 w-48"
          >
            <div
              class="px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 cursor-pointer"
            >
              Edit
            </div>
            <div
              class="px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 cursor-pointer"
            >
              Duplicate
            </div>
            <div
              class="px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
            >
              Delete
            </div>
          </div>
        </template>
      </Dropdown>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">placement</label
        ><select v-model="ddPlacement" class="control-select">
          <option
            v-for="p in ['bottom-end', 'bottom-start', 'top', 'left', 'right']"
            :key="p"
            :value="p"
          >
            {{ p }}
          </option>
        </select>
      </div>
      <label class="control-checkbox"
        ><input type="checkbox" v-model="ddHideAfterClick" /><span
          >hideAfterClick</span
        ></label
      >
    </template>
  </ComponentDoc>
</template>
