<script setup lang="ts">
import { ref } from "vue";
import SimpleImageUpload from "../../src/components/SimpleImageUpload.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const siuImage = ref("");
const siuHelper = ref("JPG, PNG, SVG. Max 2MB");
const siuError = ref("");
const siuLoading = ref(false);
</script>

<template>
  <ComponentDoc :def="getDef('SimpleImageUpload')">
    <template #preview>
      <SimpleImageUpload
        :image="siuImage"
        :helper-text="siuHelper"
        :error="siuError"
        :loading="siuLoading"
        @image-selected="siuImage = $event"
      />
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">helperText</label
        ><input v-model="siuHelper" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">error</label
        ><input v-model="siuError" class="control-input" />
      </div>
      <label class="control-checkbox"
        ><input type="checkbox" v-model="siuLoading" /><span
          >loading</span
        ></label
      >
    </template>
  </ComponentDoc>
</template>
