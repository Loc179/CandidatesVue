<script setup>
    import { computed, ref, watch } from 'vue';
    const props = defineProps({
        pageSize: {
            type: Number,
            default: 10,
        },
        totalRecords: {
            type: Number,
            required: true,
            default: 100,
        },
        currentPage: {
            type: Number,
            default: 1,
        }
    })

    const emit = defineEmits(['update:currentPage', 'update:pageSize']);
    const localCurrentPage = ref(props.currentPage);
    const localPageSize = ref(props.pageSize);

    const totalPages = computed(() => Math.ceil(props.totalRecords / localPageSize.value));

    // Chuyển đến trang tiếp theo
    const nextPage = () => {
        if(localCurrentPage.value < totalPages.value){
            localCurrentPage.value++;
            emit('update:currentPage', localCurrentPage.value);
        }
    }

    // Chuyển đến trang trước
    const prePage = () => {
        if(localCurrentPage.value > 1){
            localCurrentPage.value--;
            emit('update:currentPage', localCurrentPage.value);
        }
    }

    const endRecord = computed(() => {
        return localCurrentPage.value * localPageSize.value < props.totalRecords ? localCurrentPage.value * localPageSize.value : props.totalRecords;
    })

    watch(() => props.pageSize, (newVal) => {
        localPageSize.value = newVal;
        localCurrentPage.value = 1;
        emit('update:currentPage', 1);
    })

    watch(() => localPageSize.value, (newVal) => {
        emit('update:pageSize', newVal);
    })

    watch(() => props.currentPage, (newVal) => {
        localCurrentPage.value = newVal;
    })
</script>

<template>
    <div class="app-page display-flex align-items-center justify-content-between">
        <div class="total-record">
            Tổng: <span class="total">{{ props.totalRecords }}</span> bản ghi
        </div>
        <div class="app-page-right display-flex align-items-center">
            <div class="text-record">Số bản ghi/trang</div>
            <div class="dropdown">
                <select name="recordsPerPage" id="recordsPerPage" v-model="localPageSize">
                    <option :value="10">10</option>
                    <option :value="25">25</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
            </div>
            <div class="control-paging display-flex align-items-center">
                <div class="text-paging">
                    <span class="start">{{ (localCurrentPage - 1) * localPageSize + 1 }}</span>
                    <span> - </span>
                    <span class="end">{{ endRecord }}</span>
                    <span class="nowrap"> bản ghi</span>
                </div>

                <div :class="['icon', 'icon-left', 'pointer', {disabled: localCurrentPage==1}]" @click="prePage"></div>
                <div :class="['icon', 'icon-right', 'pointer', {disabled:localCurrentPage==totalPages}]" @click="nextPage"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* App pages */
.app-page {
    width: 100%;
    background-color: #f5f5f5;
    height: 60px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 8px 16px;
    box-sizing: border-box;
}

.app-page .total-record {
    color: #000;
}

.app-page .total-record .total {
    font-weight: 600;
}

.app-page .app-page-right {
    gap: 12px;
    margin-right: 16px;
}

.app-page-right .text-record {
    white-space: nowrap;
}

.app-page-right .dropdown {
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
}

.dropdown #recordsPerPage {
    padding: 8px 4px;
    margin-right: 4px;
    border: none;
    outline: none;
    background: transparent;
    box-sizing: border-box;
    cursor: pointer;
}

.app-page-right .control-paging {
    gap: 12px;
}

.icon.disabled {
  opacity: 0.4;
  pointer-events: none;
  cursor: default;
}
</style>