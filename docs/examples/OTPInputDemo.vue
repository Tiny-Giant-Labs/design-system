<script setup lang="ts">
import { ref } from "vue";
import OTPInput from "../../src/components/OTPInput.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const otpLength = ref(6);
</script>

<template>
  <ComponentDoc :def="getDef('OTPInput')">
    <template #preview><OTPInput :length="otpLength" /></template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">length</label
        ><input
          v-model.number="otpLength"
          type="number"
          min="3"
          max="8"
          class="control-input"
        />
      </div>
    </template>
  </ComponentDoc>
</template>
