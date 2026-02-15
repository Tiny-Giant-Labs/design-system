<script setup lang="ts">
import { ref } from "vue";
import Modal from "../../src/components/Modal.vue";
import Button from "../../src/components/Button.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const modalTitle = ref("Confirm Action");
const modalWidth = ref("w-lg");
</script>

<template>
  <ComponentDoc :def="getDef('Modal')">
    <template #preview>
      <Modal :title="modalTitle" :width-class="modalWidth">
        <template #trigger
          ><Button text="Open Modal" variant="outline" :block="false"
        /></template>
        <template #content="{ close }">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">
              {{ modalTitle }}
            </h3>
            <p class="text-sm text-neutral-500 mb-4">
              Are you sure you want to proceed?
            </p>
            <div class="flex gap-2 justify-end">
              <Button
                text="Cancel"
                variant="outline"
                :block="false"
                size="small"
                @click="close"
              />
              <Button
                text="Confirm"
                :block="false"
                size="small"
                @click="close"
              />
            </div>
          </div>
        </template>
      </Modal>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">title</label
        ><input v-model="modalTitle" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">widthClass</label
        ><input v-model="modalWidth" class="control-input" />
      </div>
    </template>
  </ComponentDoc>
</template>
