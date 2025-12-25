import { ref } from 'vue';

const toasts = ref([]);

let id = 0;

export function useToast() {
  const show = (message, type = 'success', duration = 3000) => {
    const toastId = id++;

    toasts.value.push({
      id: toastId,
      message,
      type
    });

    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== toastId);
    }, duration);
  };

  return {
    toasts,
    success: (msg) => show(msg, 'success'),
    warning: (msg) => show(msg, 'warning'),
    error: (msg) => show(msg, 'error'),
    info: (msg) => show(msg, 'info')
  };
}
