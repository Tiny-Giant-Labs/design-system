<script setup lang="ts">
import { ref } from "vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/20/solid";
import { useRouter } from "vue-router";

interface Props {
  label: string;
  placeholder: string;
  id: string;
  error?: string;
  displayForgotPassword?: boolean;
}

withDefaults(defineProps<Props>(), {
  displayForgotPassword: false,
});

const router = useRouter();

const model = defineModel<string>();

const isPasswordVisible = ref(false);

const toggleVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const goToForgotPassword = () => {
  router.push({ name: "/(auth)/forgot-password" });
};
</script>

<template>
  <label>
    <div class="flex items-center justify-between mb-2">
      <span
        class="text-content-emphasis block text-sm font-medium leading-none"
      >
        {{ label }}
      </span>

      <p
        v-if="displayForgotPassword"
        class="text-[10px] leading-none underline underline-offset-2 text-neutral-500 cursor-pointer"
        @click="goToForgotPassword"
      >
        Forgot password?
      </p>
    </div>

    <div class="relative flex flex-col gap-1">
      <div class="relative">
        <input
          v-model="model"
          :id="id"
          :placeholder="placeholder"
          class="block w-full min-w-0 appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 pr-10 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary hover:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
          :type="isPasswordVisible ? 'text' : 'password'"
        />

        <button
          type="button"
          @click="toggleVisibility"
          class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-neutral-400 hover:text-neutral-600 focus:outline-none"
        >
          <component
            :is="isPasswordVisible ? EyeSlashIcon : EyeIcon"
            class="h-4 w-4"
            aria-hidden="true"
          />
        </button>
      </div>

      <span v-if="error" class="text-red-600 text-[10px] opacity-90">{{
        error
      }}</span>
    </div>
  </label>
</template>
