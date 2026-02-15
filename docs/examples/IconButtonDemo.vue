<script setup lang="ts">
import { ref } from "vue";
import IconButton from "../../src/components/IconButton.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const ibSize = ref<"default" | "small">("default");
const ibBgVisible = ref(false);
</script>

<template>
  <ComponentDoc :def="getDef('IconButton')">
    <template #preview>
      <IconButton :size="ibSize" :bg-color-is-visible="ibBgVisible">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          style="width: 20px; height: 20px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </IconButton>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">size</label
        ><select v-model="ibSize" class="control-select">
          <option value="default">default</option>
          <option value="small">small</option>
        </select>
      </div>
      <label class="control-checkbox"
        ><input type="checkbox" v-model="ibBgVisible" /><span
          >bgColorIsVisible</span
        ></label
      >
    </template>
  </ComponentDoc>
</template>
