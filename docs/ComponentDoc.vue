<script setup lang="ts">
import type { ComponentDef } from "./componentDefs";

defineProps<{
  def: ComponentDef;
}>();
</script>

<template>
  <section :id="def.name" class="component-section">
    <div class="component-header">
      <div class="component-badge">{{ def.icon }}</div>
      <div>
        <h2 class="component-title">{{ def.name }}</h2>
        <p class="component-description">{{ def.description }}</p>
      </div>
    </div>

    <div class="preview-card">
      <!-- Live Preview -->
      <div class="preview-area">
        <slot name="preview" />
      </div>

      <!-- Dynamic Controls -->
      <div class="controls-panel" v-if="def.props.length > 0">
        <h3 class="controls-title">Controls</h3>
        <div class="controls-grid">
          <slot name="controls" />
        </div>
      </div>

      <!-- Props Table -->
      <div class="props-table-wrapper" v-if="def.props.length > 0">
        <table class="props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in def.props" :key="prop.name">
              <td>
                <span class="prop-name">{{ prop.name }}</span>
                <span
                  v-if="prop.required"
                  class="prop-required"
                  style="margin-left: 6px"
                  >required</span
                >
              </td>
              <td>
                <span class="prop-type-badge">{{ prop.type }}</span>
              </td>
              <td>
                <span class="prop-default">{{ prop.default ?? "—" }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
