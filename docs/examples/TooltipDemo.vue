<script setup lang="ts">
import { ref } from "vue";
import Tooltip from "../../src/components/Tooltip.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const tipContent = ref("This is a tooltip");
const tipPlacement = ref<"top" | "bottom" | "right">("top");
</script>

<template>
  <ComponentDoc :def="getDef('Tooltip')">
    <template #preview>
      <Tooltip :content="tipContent" :placement="tipPlacement">
        <span
          style="
            cursor: help;
            text-decoration: underline dashed;
            text-underline-offset: 4px;
            color: #335cff;
            font-size: 14px;
          "
          >Hover me</span
        >
      </Tooltip>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">content</label
        ><input v-model="tipContent" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">placement</label
        ><select v-model="tipPlacement" class="control-select">
          <option v-for="p in ['top', 'bottom', 'right']" :key="p" :value="p">
            {{ p }}
          </option>
        </select>
      </div>
    </template>
  </ComponentDoc>
</template>
