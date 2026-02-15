<script setup lang="ts">
import { ref } from "vue";
import Toggle from "../../src/components/Toggle.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const toggleValue = ref(true);
const toggleLabel = ref("Dark mode");
const toggleDesc = ref("Enable dark mode theme");
const toggleDisabled = ref(false);
</script>

<template>
  <ComponentDoc :def="getDef('Toggle')">
    <template #preview>
      <div style="width: 280px">
        <Toggle
          v-model="toggleValue"
          :label="toggleLabel"
          :description="toggleDesc"
          :disabled="toggleDisabled"
        />
      </div>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">label</label
        ><input v-model="toggleLabel" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">description</label
        ><input v-model="toggleDesc" class="control-input" />
      </div>
      <label class="control-checkbox"
        ><input type="checkbox" v-model="toggleDisabled" /><span
          >disabled</span
        ></label
      >
    </template>
  </ComponentDoc>
</template>
