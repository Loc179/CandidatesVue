<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    modelValue: [String, Number],
    options: {
        type: Array,
        default: () => []
    },
    placeholder: {
        type: String,
        default: 'Nhập để tìm kiếm...'
    },
    allowInput: {
        type: Boolean,
        default: false
    },
    displayExpr: {
        type: String,
        default: 'label'
    },
    valueExpr: {
        type: String,
        default: 'value'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    showAddButton: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'add-new'])

const isOpen = ref(false)
const searchText = ref('')
const selectRef = ref(null)

// Lấy label hiển thị từ option object hoặc string
const getOptionLabel = (option) => {
    if (typeof option === 'string') return option
    return option[props.displayExpr] || option
}

// Lấy value từ option object hoặc string
const getOptionValue = (option) => {
    if (typeof option === 'string') return option
    return option[props.valueExpr] || option
}

// Tìm option được chọn và hiển thị label
const selectedLabel = computed(() => {
    if (!props.modelValue) return ''
    
    const selected = props.options.find(opt => 
        getOptionValue(opt) === props.modelValue
    )
    
    return selected ? getOptionLabel(selected) : props.modelValue
})

// Đồng bộ searchText với selected label
watch(
    () => props.modelValue,
    () => {
        if (!isOpen.value) {
            searchText.value = selectedLabel.value
        }
    },
    { immediate: true }
)

// Lọc options khi gõ
const filteredOptions = computed(() => {
    // Luôn hiển thị tất cả options khi dropdown mở
    // Chỉ lọc khi user đang thực sự gõ để tìm kiếm
    if (!isOpen.value) return props.options
    
    // Nếu searchText giống với selectedLabel (tức là chưa gõ gì mới)
    // thì hiện tất cả
    if (searchText.value === selectedLabel.value) return props.options
    
    // Nếu không có searchText, hiện tất cả
    if (!searchText.value) return props.options

    // Chỉ lọc khi user thực sự gõ text khác với giá trị đã chọn
    const search = searchText.value.toLowerCase()
    return props.options.filter(opt => {
        const label = getOptionLabel(opt).toLowerCase()
        return label.includes(search)
    })
})

const selectOption = (option) => {
    const value = getOptionValue(option)
    emit('update:modelValue', value)
    searchText.value = getOptionLabel(option)
    isOpen.value = false
}

const onInput = (e) => {
    searchText.value = e.target.value
    if (props.allowInput) {
        emit('update:modelValue', searchText.value)
    }
    isOpen.value = true
}

const onFocus = () => {
    if (props.disabled) return
    isOpen.value = true
}

const toggleDropdown = () => {
    if (props.disabled) return
    isOpen.value = !isOpen.value
}

// Đóng dropdown khi click bên ngoài
const handleClickOutside = (e) => {
    if (selectRef.value && !selectRef.value.contains(e.target)) {
        isOpen.value = false
        // Reset searchText về selected label khi đóng
        if (!props.allowInput) {
            searchText.value = selectedLabel.value
        }
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div ref="selectRef" class="base-select" :class="{ 'is-disabled': disabled, 'is-open': isOpen }">
        <div class="select-input-wrapper">
            <input 
                class="select-input" 
                :placeholder="placeholder" 
                :value="searchText"
                :disabled="disabled"
                @input="onInput" 
                @focus="onFocus"
                autocomplete="off"
            />
            
            <button 
                type="button"
                class="select-arrow" 
                :disabled="disabled"
                @click="toggleDropdown"
            >
                <i class="icon icon-more-option" style="background-color: #6b6b6b"></i>
            </button>
        </div>

        <div v-if="isOpen" class="select-dropdown">
            <div class="dropdown-list">
                <div 
                    v-for="(option, index) in filteredOptions" 
                    :key="index"
                    class="dropdown-item"
                    :class="{ 'is-selected': getOptionValue(option) === modelValue }"
                    @click="selectOption(option)"
                >
                    <span class="item-text">{{ getOptionLabel(option) }}</span>
                    <i 
                        v-if="getOptionValue(option) === modelValue"
                        class="icon icon-tick-blue item-check"
                    ></i>
                </div>

                <div v-if="filteredOptions.length === 0" class="dropdown-empty">
                    Không có dữ liệu
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.base-select {
    position: relative;
    width: 100%;
}

.select-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;
}

.select-input-wrapper:hover {
    border-color: #1890ff;
}

.base-select.is-open .select-input-wrapper {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.base-select.is-disabled .select-input-wrapper {
    background: #f5f5f5;
    cursor: not-allowed;
}

.select-input {
    flex: 1;
    height: 16px;
    padding: 8px 12px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.88);
}

.select-input:disabled {
    cursor: not-allowed;
    color: rgba(0, 0, 0, 0.25);
}

.select-input::placeholder {
    color: rgba(0, 0, 0, 0.25);
}

.select-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 100%;
    border: none;
    background: transparent;
    color: rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: all 0.3s;
}

.select-arrow:hover:not(:disabled) {
    color: rgba(0, 0, 0, 0.65);
}

.select-arrow:disabled {
    cursor: not-allowed;
}

.base-select.is-open .select-arrow {
    transform: rotate(180deg);
}

.select-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08);
    z-index: 1050;
    overflow: hidden;
}

.dropdown-list {
    max-height: inherit;
    overflow-y: auto;
    padding: 4px 0;
}

.dropdown-list::-webkit-scrollbar {
    width: 8px;
}

.dropdown-list::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 4px;
}

.dropdown-list::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
}

.dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    min-height: 16px;
    cursor: pointer;
    transition: all 0.3s;
    color: rgba(0, 0, 0, 0.88);
}

.dropdown-item:hover {
    background: #f5f5f5;
}

.dropdown-item.is-selected {
    background: #e6f4ff;
    font-weight: 600;
}

.item-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.item-check {
    flex-shrink: 0;
    margin-left: 8px;
}

.dropdown-empty {
    padding: 12px;
    text-align: center;
    color: rgba(0, 0, 0, 0.25);
    font-size: 14px;
}
</style>