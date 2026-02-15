<script setup lang="ts">
import { ref, computed } from "vue";
import { componentDefs } from "./componentDefs";
import ComponentDoc from "./ComponentDoc.vue";

// Component imports
import Button from "../src/components/Button.vue";
import Input from "../src/components/Input.vue";
import TextArea from "../src/components/TextArea.vue";
import Toggle from "../src/components/Toggle.vue";
import Select from "../src/components/Select.vue";
import IconButton from "../src/components/IconButton.vue";
import SSOButton from "../src/components/SSOButton.vue";
import OTPInput from "../src/components/OTPInput.vue";
import PasswordInput from "../src/components/PasswordInput.vue";
import PasswordValidation from "../src/components/PasswordValidation.vue";
import Tabs from "../src/components/Tabs.vue";
import SegmentedControl from "../src/components/SegmentedControl.vue";
import Pagination from "../src/components/Pagination.vue";
import Modal from "../src/components/Modal.vue";
import Tooltip from "../src/components/Tooltip.vue";
import Dropdown from "../src/components/Dropdown.vue";
import CardView from "../src/components/CardView.vue";
import SimpleImageUpload from "../src/components/SimpleImageUpload.vue";
import Filter from "../src/components/Filter.vue";
import SearchableSelect from "../src/components/SearchableSelect.vue";
import ShopifyIcon from "../src/components/ShopifyIcon.vue";

const activeSection = ref("Button");
const getDef = (name: string) => componentDefs.find((c) => c.name === name)!;

const scrollTo = (name: string) => {
  activeSection.value = name;
  document.getElementById(name)?.scrollIntoView({ behavior: "smooth" });
};

// === Button ===
const btnText = ref("Click me");
const btnVariant = ref<"default" | "outline" | "destructive">("default");
const btnSize = ref<"default" | "small">("default");
const btnShortcut = ref("⌘K");
const btnLoading = ref(false);
const btnDisabled = ref(false);
const btnBlock = ref(false);

// === Input ===
const inputLabel = ref("Email address");
const inputPlaceholder = ref("you@example.com");
const inputType = ref<"text" | "email">("email");
const inputId = ref("demo-input");
const inputError = ref("");
const inputModel = ref("");

// === TextArea ===
const taLabel = ref("Description");
const taPlaceholder = ref("Write something...");
const taId = ref("demo-textarea");
const taError = ref("");
const taModel = ref("");

// === Toggle ===
const toggleValue = ref(true);
const toggleLabel = ref("Dark mode");
const toggleDesc = ref("Enable dark mode theme");
const toggleDisabled = ref(false);

// === Select ===
const selectLabel = ref("Country");
const selectId = ref("demo-select");
const selectError = ref("");
const selectDisabled = ref(false);
const selectModel = ref("us");

// === IconButton ===
const ibSize = ref<"default" | "small">("default");
const ibBgVisible = ref(false);

// === SSOButton ===
const ssoText = ref("Continue with Google");

// === OTPInput ===
const otpLength = ref(6);

// === PasswordInput ===
const pwLabel = ref("Password");
const pwPlaceholder = ref("Enter your password");
const pwId = ref("demo-pw");
const pwError = ref("");
const pwForgot = ref(false);
const pwModel = ref("");

// === PasswordValidation ===
const pvPassword = ref("hello1");
const pvValidation = computed(() => ({
  minCharacter: pvPassword.value.length >= 8,
  hasLetterAndNumber:
    /[a-zA-Z]/.test(pvPassword.value) && /\d/.test(pvPassword.value),
}));

// === Tabs ===
const tabItems = ref([
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" },
]);
const activeTab = ref("overview");

// === SegmentedControl ===
const segValue = ref<string>("month");
const segOptions = [
  { value: "month", label: "Monthly" },
  {
    value: "year",
    label: "Yearly",
    suffix: "-20%",
    suffixClass: "text-green-600 text-xs font-semibold",
  },
];

// === Pagination ===
const pagTotal = ref(120);
const pagSize = ref(10);
const pagLoading = ref(false);
const pagLabel = ref("items");
const pagCurrent = ref(1);

// === Modal ===
const modalTitle = ref("Confirm Action");
const modalWidth = ref("w-lg");

// === Tooltip ===
const tipContent = ref("This is a tooltip");
const tipPlacement = ref<"top" | "bottom" | "right">("top");

// === Dropdown ===
const ddPlacement = ref("bottom-end");
const ddHideAfterClick = ref(true);

// === SimpleImageUpload ===
const siuImage = ref("");
const siuHelper = ref("JPG, PNG, SVG. Max 2MB");
const siuError = ref("");
const siuLoading = ref(false);

// === Filter ===
const filterLabel = ref("Status");
const filterSingle = ref(false);
const filterLoading = ref(false);
const filterModel = ref<string[]>([]);
const filterOptions = [
  { id: "1", name: "Active", color: "#22c55e" },
  { id: "2", name: "Pending", color: "#f59e0b" },
  { id: "3", name: "Inactive", color: "#ef4444" },
];

// === SearchableSelect ===
const ssLabel = ref("Workspace");
const ssPlaceholder = ref("Select workspace...");
const ssLoading = ref(false);
const ssError = ref("");
const ssModel = ref<string | null>(null);
const ssOptions = [
  { id: "1", name: "Acme Corp" },
  { id: "2", name: "Globex Inc" },
  { id: "3", name: "Initech" },
];
</script>

<template>
  <div class="docs-layout">
    <!-- Sidebar -->
    <aside class="docs-sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="sidebar-logo-icon">P</div>
          <div>
            <div class="sidebar-title">Priscope</div>
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

      <!-- Button -->
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
            ><input type="checkbox" v-model="btnBlock" /><span
              >block</span
            ></label
          >
        </template>
      </ComponentDoc>

      <!-- Input -->
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

      <!-- TextArea -->
      <ComponentDoc :def="getDef('TextArea')">
        <template #preview>
          <div style="width: 300px">
            <TextArea
              v-model="taModel"
              :label="taLabel"
              :placeholder="taPlaceholder"
              :id="taId"
              :error="taError"
            />
          </div>
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">label</label
            ><input v-model="taLabel" class="control-input" />
          </div>
          <div class="control-item">
            <label class="control-label">placeholder</label
            ><input v-model="taPlaceholder" class="control-input" />
          </div>
          <div class="control-item">
            <label class="control-label">error</label
            ><input v-model="taError" class="control-input" />
          </div>
        </template>
      </ComponentDoc>

      <!-- Toggle -->
      <ComponentDoc :def="getDef('Toggle')">
        <template #preview>
          <div style="width: 280px">
            <Toggle
              v-model="toggleValue"
              :label="toggleLabel"
              :description="toggleDesc"
              :disabled="toggleDisabled"
            />
          </div>
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">label</label
            ><input v-model="toggleLabel" class="control-input" />
          </div>
          <div class="control-item">
            <label class="control-label">description</label
            ><input v-model="toggleDesc" class="control-input" />
          </div>
          <label class="control-checkbox"
            ><input type="checkbox" v-model="toggleDisabled" /><span
              >disabled</span
            ></label
          >
        </template>
      </ComponentDoc>

      <!-- Select -->
      <ComponentDoc :def="getDef('Select')">
        <template #preview>
          <div style="width: 260px">
            <Select
              v-model="selectModel"
              :label="selectLabel"
              :id="selectId"
              :error="selectError"
              :disabled="selectDisabled"
            >
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="de">Germany</option>
            </Select>
          </div>
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">label</label
            ><input v-model="selectLabel" class="control-input" />
          </div>
          <div class="control-item">
            <label class="control-label">error</label
            ><input v-model="selectError" class="control-input" />
          </div>
          <label class="control-checkbox"
            ><input type="checkbox" v-model="selectDisabled" /><span
              >disabled</span
            ></label
          >
        </template>
      </ComponentDoc>

      <!-- IconButton -->
      <ComponentDoc :def="getDef('IconButton')">
        <template #preview>
          <IconButton :size="ibSize" :bg-color-is-visible="ibBgVisible">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              style="width: 20px; height: 20px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
          </IconButton>
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">size</label
            ><select v-model="ibSize" class="control-select">
              <option value="default">default</option>
              <option value="small">small</option>
            </select>
          </div>
          <label class="control-checkbox"
            ><input type="checkbox" v-model="ibBgVisible" /><span
              >bgColorIsVisible</span
            ></label
          >
        </template>
      </ComponentDoc>

      <!-- SSOButton -->
      <ComponentDoc :def="getDef('SSOButton')">
        <template #preview>
          <div style="width: 300px">
            <SSOButton :text="ssoText"
              ><svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                /></svg
            ></SSOButton>
          </div>
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">text</label
            ><input v-model="ssoText" class="control-input" />
          </div>
        </template>
      </ComponentDoc>

      <!-- OTPInput -->
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

      <!-- PasswordInput -->
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

      <!-- PasswordValidation -->
      <ComponentDoc :def="getDef('PasswordValidation')">
        <template #preview>
          <div style="width: 300px">
            <input
              v-model="pvPassword"
              placeholder="Type a password..."
              class="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 mb-3"
            />
            <PasswordValidation
              :password="pvPassword"
              :validation="pvValidation"
            />
          </div>
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">password</label
            ><input v-model="pvPassword" class="control-input" />
          </div>
        </template>
      </ComponentDoc>

      <!-- Tabs -->
      <ComponentDoc :def="getDef('Tabs')">
        <template #preview
          ><div style="width: 360px">
            <Tabs v-model="activeTab" :tabs="tabItems" /></div
        ></template>
        <template #controls />
      </ComponentDoc>

      <!-- SegmentedControl -->
      <ComponentDoc :def="getDef('SegmentedControl')">
        <template #preview
          ><SegmentedControl v-model="segValue" :options="segOptions"
        /></template>
        <template #controls />
      </ComponentDoc>

      <!-- Pagination -->
      <ComponentDoc :def="getDef('Pagination')">
        <template #preview>
          <div style="width: 400px">
            <Pagination
              v-model="pagCurrent"
              :total-count="pagTotal"
              :page-size="pagSize"
              :is-loading="pagLoading"
              :label="pagLabel"
            />
          </div>
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">totalCount</label
            ><input
              v-model.number="pagTotal"
              type="number"
              class="control-input"
            />
          </div>
          <div class="control-item">
            <label class="control-label">pageSize</label
            ><input
              v-model.number="pagSize"
              type="number"
              class="control-input"
            />
          </div>
          <div class="control-item">
            <label class="control-label">label</label
            ><input v-model="pagLabel" class="control-input" />
          </div>
          <label class="control-checkbox"
            ><input type="checkbox" v-model="pagLoading" /><span
              >isLoading</span
            ></label
          >
        </template>
      </ComponentDoc>

      <!-- Modal -->
      <ComponentDoc :def="getDef('Modal')">
        <template #preview>
          <Modal :title="modalTitle" :width-class="modalWidth">
            <template #trigger
              ><Button text="Open Modal" variant="outline" :block="false"
            /></template>
            <template #content="{ close }">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-neutral-900 mb-2">
                  {{ modalTitle }}
                </h3>
                <p class="text-sm text-neutral-500 mb-4">
                  Are you sure you want to proceed?
                </p>
                <div class="flex gap-2 justify-end">
                  <Button
                    text="Cancel"
                    variant="outline"
                    :block="false"
                    size="small"
                    @click="close"
                  />
                  <Button
                    text="Confirm"
                    :block="false"
                    size="small"
                    @click="close"
                  />
                </div>
              </div>
            </template>
          </Modal>
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">title</label
            ><input v-model="modalTitle" class="control-input" />
          </div>
          <div class="control-item">
            <label class="control-label">widthClass</label
            ><input v-model="modalWidth" class="control-input" />
          </div>
        </template>
      </ComponentDoc>

      <!-- Tooltip -->
      <ComponentDoc :def="getDef('Tooltip')">
        <template #preview>
          <Tooltip :content="tipContent" :placement="tipPlacement">
            <span
              style="
                cursor: help;
                text-decoration: underline dashed;
                text-underline-offset: 4px;
                color: #335cff;
                font-size: 14px;
              "
              >Hover me</span
            >
          </Tooltip>
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">content</label
            ><input v-model="tipContent" class="control-input" />
          </div>
          <div class="control-item">
            <label class="control-label">placement</label
            ><select v-model="tipPlacement" class="control-select">
              <option
                v-for="p in ['top', 'bottom', 'right']"
                :key="p"
                :value="p"
              >
                {{ p }}
              </option>
            </select>
          </div>
        </template>
      </ComponentDoc>

      <!-- Dropdown -->
      <ComponentDoc :def="getDef('Dropdown')">
        <template #preview>
          <Dropdown
            :placement="ddPlacement as any"
            :hide-after-click="ddHideAfterClick"
          >
            <template #trigger
              ><Button text="Open Dropdown" variant="outline" :block="false"
            /></template>
            <template #content>
              <div
                class="bg-white border border-neutral-200 rounded-lg shadow-lg py-1 w-48"
              >
                <div
                  class="px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  Edit
                </div>
                <div
                  class="px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  Duplicate
                </div>
                <div
                  class="px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  Delete
                </div>
              </div>
            </template>
          </Dropdown>
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">placement</label
            ><select v-model="ddPlacement" class="control-select">
              <option
                v-for="p in [
                  'bottom-end',
                  'bottom-start',
                  'top',
                  'left',
                  'right',
                ]"
                :key="p"
                :value="p"
              >
                {{ p }}
              </option>
            </select>
          </div>
          <label class="control-checkbox"
            ><input type="checkbox" v-model="ddHideAfterClick" /><span
              >hideAfterClick</span
            ></label
          >
        </template>
      </ComponentDoc>

      <!-- CardView -->
      <ComponentDoc :def="getDef('CardView')">
        <template #preview>
          <div style="width: 300px">
            <CardView>
              <p class="text-sm text-neutral-700">
                This is content inside a <strong>CardView</strong>. It provides
                a clean bordered container.
              </p>
            </CardView>
          </div>
        </template>
        <template #controls />
      </ComponentDoc>

      <!-- SimpleImageUpload -->
      <ComponentDoc :def="getDef('SimpleImageUpload')">
        <template #preview>
          <SimpleImageUpload
            :image="siuImage"
            :helper-text="siuHelper"
            :error="siuError"
            :loading="siuLoading"
            @image-selected="siuImage = $event"
          />
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">helperText</label
            ><input v-model="siuHelper" class="control-input" />
          </div>
          <div class="control-item">
            <label class="control-label">error</label
            ><input v-model="siuError" class="control-input" />
          </div>
          <label class="control-checkbox"
            ><input type="checkbox" v-model="siuLoading" /><span
              >loading</span
            ></label
          >
        </template>
      </ComponentDoc>

      <!-- Filter -->
      <ComponentDoc :def="getDef('Filter')">
        <template #preview>
          <Filter
            v-model="filterModel"
            :label="filterLabel"
            :options="filterOptions"
            :single="filterSingle"
            :loading="filterLoading"
          />
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">label</label
            ><input v-model="filterLabel" class="control-input" />
          </div>
          <label class="control-checkbox"
            ><input type="checkbox" v-model="filterSingle" /><span
              >single</span
            ></label
          >
          <label class="control-checkbox"
            ><input type="checkbox" v-model="filterLoading" /><span
              >loading</span
            ></label
          >
        </template>
      </ComponentDoc>

      <!-- SearchableSelect -->
      <ComponentDoc :def="getDef('SearchableSelect')">
        <template #preview>
          <div style="width: 300px">
            <SearchableSelect
              v-model="ssModel"
              :label="ssLabel"
              :placeholder="ssPlaceholder"
              :options="ssOptions"
              :loading="ssLoading"
              :error="ssError"
            />
          </div>
        </template>
        <template #controls>
          <div class="control-item">
            <label class="control-label">label</label
            ><input v-model="ssLabel" class="control-input" />
          </div>
          <div class="control-item">
            <label class="control-label">placeholder</label
            ><input v-model="ssPlaceholder" class="control-input" />
          </div>
          <div class="control-item">
            <label class="control-label">error</label
            ><input v-model="ssError" class="control-input" />
          </div>
          <label class="control-checkbox"
            ><input type="checkbox" v-model="ssLoading" /><span
              >loading</span
            ></label
          >
        </template>
      </ComponentDoc>

      <!-- ShopifyIcon -->
      <ComponentDoc :def="getDef('ShopifyIcon')">
        <template #preview
          ><div style="width: 48px"><ShopifyIcon /></div
        ></template>
        <template #controls />
      </ComponentDoc>
    </main>
  </div>
</template>
