<script setup lang="ts">
import { ref } from "vue";
import { componentDefs } from "./componentDefs";

// Demo components
import ButtonDemo from "./examples/ButtonDemo.vue";
import InputDemo from "./examples/InputDemo.vue";
import TextAreaDemo from "./examples/TextAreaDemo.vue";
import ToggleDemo from "./examples/ToggleDemo.vue";
import SelectDemo from "./examples/SelectDemo.vue";
import IconButtonDemo from "./examples/IconButtonDemo.vue";
import SSOButtonDemo from "./examples/SSOButtonDemo.vue";
import OTPInputDemo from "./examples/OTPInputDemo.vue";
import PasswordInputDemo from "./examples/PasswordInputDemo.vue";
import PasswordValidationDemo from "./examples/PasswordValidationDemo.vue";
import TabsDemo from "./examples/TabsDemo.vue";
import SegmentedControlDemo from "./examples/SegmentedControlDemo.vue";
import PaginationDemo from "./examples/PaginationDemo.vue";
import ModalDemo from "./examples/ModalDemo.vue";
import TooltipDemo from "./examples/TooltipDemo.vue";
import DropdownDemo from "./examples/DropdownDemo.vue";
import CardViewDemo from "./examples/CardViewDemo.vue";
import SimpleImageUploadDemo from "./examples/SimpleImageUploadDemo.vue";
import FilterDemo from "./examples/FilterDemo.vue";
import SearchableSelectDemo from "./examples/SearchableSelectDemo.vue";
import ShopifyIconDemo from "./examples/ShopifyIconDemo.vue";

const activeSection = ref("Button");

const scrollTo = (name: string) => {
  activeSection.value = name;
  const el = document.getElementById(name);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const demos: Record<string, any> = {
  Button: ButtonDemo,
  Input: InputDemo,
  TextArea: TextAreaDemo,
  Toggle: ToggleDemo,
  Select: SelectDemo,
  IconButton: IconButtonDemo,
  SSOButton: SSOButtonDemo,
  OTPInput: OTPInputDemo,
  PasswordInput: PasswordInputDemo,
  PasswordValidation: PasswordValidationDemo,
  Tabs: TabsDemo,
  SegmentedControl: SegmentedControlDemo,
  Pagination: PaginationDemo,
  Modal: ModalDemo,
  Tooltip: TooltipDemo,
  Dropdown: DropdownDemo,
  CardView: CardViewDemo,
  SimpleImageUpload: SimpleImageUploadDemo,
  Filter: FilterDemo,
  SearchableSelect: SearchableSelectDemo,
  ShopifyIcon: ShopifyIconDemo,
};
</script>

<template>
  <div class="docs-layout">
    <!-- Sidebar -->
    <aside class="docs-sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div>
            <div class="sidebar-title">TinyGiant</div>
            <div class="sidebar-subtitle">Design System</div>
          </div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="sidebar-section-title">Components</div>
        <div
          v-for="comp in componentDefs"
          :key="comp.name"
          class="sidebar-link"
          :class="{ active: activeSection === comp.name }"
          @click="scrollTo(comp.name)"
        >
          <span class="sidebar-link-dot" />
          {{ comp.name }}
        </div>
      </nav>
    </aside>

    <!-- Main -->
    <main class="docs-main">
      <div class="docs-page-header">
        <h1>Components</h1>
        <p>
          Explore every component in the Priscope Design System. Use the
          interactive controls to tweak props in real-time.
        </p>
      </div>

      <template v-for="comp in componentDefs" :key="comp.name">
        <component :is="demos[comp.name]" v-if="demos[comp.name]" />
      </template>
    </main>
  </div>
</template>
