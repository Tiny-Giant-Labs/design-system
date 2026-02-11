<script setup lang="ts">
import { InformationCircleIcon } from "@heroicons/vue/20/solid";
import tippy, { type Instance } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from "vue";

interface Props {
  content?: string | undefined;
  htmlContent?: string | undefined;
  placement?: "bottom" | "top" | "right";
  followCursor?: boolean;
  maxWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placement: "top",
});

const slots = defineSlots();

const tooltip = useTemplateRef("tooltip");

let tippyInstance: Instance | null = null;

const initTippy = () => {
  const tooltipContent = props.htmlContent || props.content;

  if (tooltip.value && tooltipContent) {
    tippyInstance = tippy(tooltip.value, {
      allowHTML: true,
      content: tooltipContent,
      arrow: false,
      placement: props.placement,
      theme: "custom-tooltip",
      maxWidth: props.maxWidth,
    });
  }
};

watch(
  () => [props.content, props.htmlContent],
  () => {
    const tooltipContent = props.htmlContent || props.content;
    if (tooltipContent) {
      tippyInstance?.setContent(tooltipContent);
    }
  },
);

onMounted(() => {
  initTippy();
});

onBeforeUnmount(() => {
  if (tippyInstance) {
    tippyInstance.destroy();
  }
});
</script>

<template>
  <span ref="tooltip">
    <slot></slot>
    <InformationCircleIcon v-if="!slots.default" class="w-4 h-4" />
  </span>
</template>
