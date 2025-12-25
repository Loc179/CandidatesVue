<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', toast.type]"
      >
        <div class="toast-icon">
          <span v-if="toast.type === 'success'"><div class="icon-default icon-success"></div></span>
          <span v-else-if="toast.type === 'error'"><div class="icon-default icon-error"></div></span>
          <span v-else-if="toast.type === 'warning'"><div class="icon-default icon-warning"></div></span>
          <span v-else><div class="icon-default icon-info"></div></span>
        </div>
        <span class="toast-message">{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
defineProps({
  toasts: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}

.toast {
  min-width: 320px;
  max-width: 400px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15),
              0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  pointer-events: auto;
  backdrop-filter: blur(10px);
  animation: slideIn 0.3s ease-out;
}

.toast-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 14px;
  color: white;
}

.toast-message {
  flex: 1;
  line-height: 1.5;
}

/* Success Toast */
.toast.success {
  background: linear-gradient(135deg, #4CAF50 0%, #388E3C 100%);
  color: white;
  border-left: 4px solid #2E7D32;
}

.toast.success .toast-icon {
  color: #4CAF50;
}

/* Error Toast */
.toast.error {
  background: linear-gradient(135deg, #F44336 0%, #D32F2F 100%);
  color: white;
  border-left: 4px solid #B71C1C;
}

.toast.error .toast-icon {
  color: #F44336;
}

/* Warning Toast */
.toast.warning {
  background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
  color: white;
  border-left: 4px solid #E65100;
}

.toast.warning .toast-icon {
  color: #FF9800;
}

/* Info Toast */
.toast.info {
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  color: white;
  border-left: 4px solid #0D47A1;
}

.toast.info .toast-icon {
  color: #2196F3;
}

/* Animation */
@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* TransitionGroup animations */
.toast-enter-active {
  animation: slideIn 0.3s ease-out;
}

.toast-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
}

.toast-move {
  transition: transform 0.3s ease;
}

/* Responsive */
@media (max-width: 640px) {
  .toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
    align-items: stretch;
  }
  
  .toast {
    min-width: auto;
    width: 100%;
  }
}

/* Hover effect */
.toast:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2),
              0 3px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}
</style>