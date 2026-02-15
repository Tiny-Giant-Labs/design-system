<script setup lang="ts">
import ShopifyIcon from "../../src/components/ShopifyIcon.vue";
import ComponentDoc from "../ComponentDoc.vue";
import { componentDefs } from "../componentDefs";

const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;
</script>

<template>
  <ComponentDoc :def="getDef('ShopifyIcon')">
    <template #preview>
      <div class="flex gap-4">
        <ShopifyIcon source="OrderIcon" class="w-8 h-8 text-neutral-500" />
        <ShopifyIcon source="ProductIcon" class="w-8 h-8 text-blue-500" />
        <ShopifyIcon source="StoreIcon" class="w-8 h-8 text-green-500" />
      </div>
    </template>
    <template #controls>
      <p class="text-sm text-neutral-500 px-4">
        Accepts any icon source from @shopify/polaris-icons
      </p>
    </template>
  </ComponentDoc>
</template>
