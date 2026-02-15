<script setup lang="ts">
import { ref } from "vue";
import TextArea from "../../src/components/TextArea.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const taLabel = ref("Description");
const taPlaceholder = ref("Write something...");
const taId = ref("demo-textarea");
const taError = ref("");
const taModel = ref("");
</script>

<template>
  <ComponentDoc :def="getDef('TextArea')">
    <template #preview>
      <div style="width: 300px">
        <TextArea
          v-model="taModel"
          :label="taLabel"
          :placeholder="taPlaceholder"
          :id="taId"
          :error="taError"
        />
      </div>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">label</label
        ><input v-model="taLabel" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">placeholder</label
        ><input v-model="taPlaceholder" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">error</label
        ><input v-model="taError" class="control-input" />
      </div>
    </template>
  </ComponentDoc>
</template>
