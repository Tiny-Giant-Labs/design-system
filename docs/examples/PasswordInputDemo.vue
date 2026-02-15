<script setup lang="ts">
import { ref } from "vue";
import PasswordInput from "../../src/components/PasswordInput.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const pwLabel = ref("Password");
const pwPlaceholder = ref("Enter your password");
const pwId = ref("demo-pw");
const pwError = ref("");
const pwForgot = ref(false);
const pwModel = ref("");
</script>

<template>
  <ComponentDoc :def="getDef('PasswordInput')">
    <template #preview>
      <div style="width: 300px">
        <PasswordInput
          v-model="pwModel"
          :label="pwLabel"
          :placeholder="pwPlaceholder"
          :id="pwId"
          :error="pwError"
          :display-forgot-password="pwForgot"
        />
      </div>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">label</label
        ><input v-model="pwLabel" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">placeholder</label
        ><input v-model="pwPlaceholder" class="control-input" />
      </div>
      <div class="control-item">
        <label class="control-label">error</label
        ><input v-model="pwError" class="control-input" />
      </div>
      <label class="control-checkbox"
        ><input type="checkbox" v-model="pwForgot" /><span
          >displayForgotPassword</span
        ></label
      >
    </template>
  </ComponentDoc>
</template>
