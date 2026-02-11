<script setup lang="ts">
import tippy, { type Instance } from "tippy.js";
import "tippy.js/dist/tippy.css";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

interface Props {
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "auto"
    | "auto-start"
    | "auto-end";
  offset?: [number, number];
  hideAfterClick?: boolean;
  appendToBody?: boolean;
  onClosed?: () => void;
  onShown?: () => void;
  onShow?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  placement: "bottom-end",
  hideAfterClick: true,
  appendToBody: true,
  offset: () => [0, 0],
});

let tippyInstance: Instance | null = null;

const triggerElement = ref<HTMLElement | null>(null);
const dropdownContentElement = ref<HTMLElement | null>(null);

const initTippy = () => {
  if (triggerElement.value && dropdownContentElement.value) {
    tippyInstance = tippy(triggerElement.value, {
      content: dropdownContentElement.value,
      arrow: false,
      allowHTML: true,
      interactive: true,
      theme: "transparent",
      trigger: "click",
      placement: props.placement,
      appendTo: props.appendToBody ? document.body : undefined,
      offset: props.offset,
      onShow() {
        if (props.onShow) {
          props.onShow();
        }
      },
      onShown(tippyInstance) {
        if (props.onShown) {
          props.onShown();
        }
        if (!props.hideAfterClick) return;
        const tippyElement = document.querySelector("[data-tippy-root]");
        if (tippyElement) {
          tippyElement.addEventListener("click", () => {
            tippyInstance.hide();
          });
        }
      },
      onHidden() {
        if (props.onClosed) {
          props.onClosed();
        }
      },
      onTrigger(_instance, event) {
        if (event.type === "click") {
          event.stopPropagation();
        }
      },
    });
  }
};

const destroyTippy = () => {
  if (tippyInstance) {
    tippyInstance.destroy();
  }
};

const hideTippy = () => {
  if (tippyInstance) {
    tippyInstance.hide();
  }
};

const showTippy = () => {
  if (tippyInstance) {
    tippyInstance.show();
  }
};

defineExpose({
  hideTippy,
  showTippy,
});

watch(
  () => [triggerElement, dropdownContentElement],
  ([newTriggerElement, newDropdownContentElement]) => {
    destroyTippy();
    if (newTriggerElement && newDropdownContentElement) {
      initTippy();
    }
  },
);

onMounted(() => {
  initTippy();
});

onBeforeUnmount(() => {
  destroyTippy();
});
</script>

<template>
  <div>
    <div ref="triggerElement">
      <slot name="trigger"></slot>
    </div>
    <div ref="dropdownContentElement">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style>
.tippy-box[data-theme~="transparent"] {
  background-color: transparent !important;
  box-shadow: none !important;
  z-index: 10001;
}
.tippy-box[data-theme~="transparent"] .tippy-content {
  padding: 0;
  color: #0a0a0a;
}
</style>
