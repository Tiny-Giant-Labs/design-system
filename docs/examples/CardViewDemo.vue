<script setup lang="ts">
import CardView from "../../src/components/CardView.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;
</script>

<template>
  <ComponentDoc :def="getDef('CardView')">
    <template #preview>
      <div style="width: 300px">
        <CardView>
          <p class="text-sm text-neutral-700">
            This is content inside a <strong>CardView</strong>. It provides a
            clean bordered container.
          </p>
        </CardView>
      </div>
    </template>
    <template #controls />
  </ComponentDoc>
</template>
