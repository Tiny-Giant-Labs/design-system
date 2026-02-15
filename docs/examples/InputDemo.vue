<script setup lang="ts">
import { ref } from "vue";
import Input from "../../src/components/Input.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const inputLabel = ref("Email address");
const inputPlaceholder = ref("you@example.com");
const inputType = ref<"text" | "email" | "password" | "number">("email");
const inputId = ref("demo-input");
const inputError = ref("");
const inputModel = ref("");
</script>

<template>
  <ComponentDoc :def="getDef('Input')">
    <template #preview>
      <div style="width: 300px">
        <Input
          v-model="inputModel"
          :label="inputLabel"
          :placeholder="inputPlaceholder"
          :type="inputType"
          :id="inputId"
          :error="inputError"
        />
      </div>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">label</label
        ><input v-model="inputLabel" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">placeholder</label
        ><input v-model="inputPlaceholder" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">type</label>
        <select v-model="inputType" class="control-select">
          <option
            v-for="t in ['text', 'email', 'password', 'number']"
            :key="t"
            :value="t"
          >
            {{ t }}
          </option>
        </select>
      </div>
      <div class="control-item">
        <label class="control-label">error</label
        ><input
          v-model="inputError"
          class="control-input"
          placeholder="e.g. Required field"
        />
      </div>
    </template>
  </ComponentDoc>
</template>
