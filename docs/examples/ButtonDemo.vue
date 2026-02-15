<script setup lang="ts">
import { ref } from "vue";
import Button from "../../src/components/Button.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const btnText = ref("Click me");
const btnVariant = ref<"default" | "outline" | "destructive">("default");
const btnSize = ref<"default" | "small">("default");
const btnShortcut = ref("⌘K");
const btnLoading = ref(false);
const btnDisabled = ref(false);
const btnBlock = ref(false);
</script>

<template>
  <ComponentDoc :def="getDef('Button')">
    <template #preview>
      <div>
        <Button
          :text="btnText"
          :variant="btnVariant"
          :size="btnSize"
          :shortcut="btnShortcut"
          :is-loading="btnLoading"
          :disabled="btnDisabled"
          :block="btnBlock"
        />
      </div>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label"
          >text <span class="control-type">string</span></label
        >
        <input v-model="btnText" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label"
          >variant <span class="control-type">enum</span></label
        >
        <select v-model="btnVariant" class="control-select">
          <option value="default">default</option>
          <option value="outline">outline</option>
          <option value="destructive">destructive</option>
        </select>
      </div>
      <div class="control-item">
        <label class="control-label"
          >size <span class="control-type">enum</span></label
        >
        <select v-model="btnSize" class="control-select">
          <option value="default">default</option>
          <option value="small">small</option>
        </select>
      </div>
      <div class="control-item">
        <label class="control-label"
          >shortcut <span class="control-type">string</span></label
        >
        <input v-model="btnShortcut" class="control-input" />
      </div>
      <label class="control-checkbox"
        ><input type="checkbox" v-model="btnLoading" /><span
          >isLoading</span
        ></label
      >
      <label class="control-checkbox"
        ><input type="checkbox" v-model="btnDisabled" /><span
          >disabled</span
        ></label
      >
      <label class="control-checkbox"
        ><input type="checkbox" v-model="btnBlock" /><span>block</span></label
      >
    </template>
  </ComponentDoc>
</template>
