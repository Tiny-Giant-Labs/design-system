<script setup lang="ts">
import { ref, computed } from "vue";
import PasswordValidation from "../../src/components/PasswordValidation.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const pvPassword = ref("hello1");
const pvValidation = computed(() => ({
  minCharacter: pvPassword.value.length >= 8,
  hasLetterAndNumber:
    /[a-zA-Z]/.test(pvPassword.value) && /\d/.test(pvPassword.value),
}));
</script>

<template>
  <ComponentDoc :def="getDef('PasswordValidation')">
    <template #preview>
      <div style="width: 300px">
        <input
          v-model="pvPassword"
          placeholder="Type a password..."
          class="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 mb-3"
        />
        <PasswordValidation :password="pvPassword" :validation="pvValidation" />
      </div>
    </template>
    <template #controls>
      <div class="control-item">
        <label class="control-label">password</label
        ><input v-model="pvPassword" class="control-input" />
      </div>
    </template>
  </ComponentDoc>
</template>
