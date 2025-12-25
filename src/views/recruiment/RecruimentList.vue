<script setup>
    import { ref, computed, watch } from 'vue';
    import { candidates } from '@/data/candidates';
    import { GenderLabels } from '@/const/enums';
    import BaseTable from '@/components/controls/BaseTable.vue';
    import RatingStar from '../candidate/components/RatingStar.vue';
    import { fieldsCandidate } from '@/const/enums';
    import { useFormat } from '@/utils/format';

    const { formatDisplay, getInitialsFirstLast, getAvatarColorFromName } = useFormat();


    const candidatesData = ref([...candidates]);
    const pageSize = ref(10);
    const currentPage = ref(1);
    const keyword = ref("");
    const filterCandidates = computed(() => {
        const key = keyword.value.toLowerCase().trim()

        if(!key) return candidatesData.value;

        return candidatesData.value.filter(c => c.CandidateName?.toLocaleLowerCase().includes(key) ||
                                        c.Email?.toLocaleLowerCase().includes(key) ||
                                        c.Mobile?.toLocaleLowerCase().includes(key));
    });
    const totalRecords = computed(() => filterCandidates.value.length);
    const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value));

    // Lấy dữ liệu để hiện thị lên table
    const displayCandidates = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value;
        const end = start + pageSize.value;
        return filterCandidates.value.slice(start, end);
    })

    // Chuyển đến trang tiếp theo
    const nextPage = () => {
        if(currentPage.value < totalPages.value){
            currentPage.value++;
        }
    }

    // Chuyển đến trang trước
    const prePage = () => {
        if(currentPage.value > 1){
            currentPage.value--;
        }
    }

    watch(pageSize, () => {
        currentPage.value = 1;
    })

    const endRecord = computed(() => {
        return currentPage.value * pageSize.value < totalRecords.value ? currentPage.value * pageSize.value : totalRecords.value;
    })

    const rows = displayCandidates;
    const fields = fieldsCandidate;

</script>

<template>
    <div class="candidate-container">
        <div class="candidate-header display-flex align-items-center justify-content-between">
            <div class="candidate-header-left">Ứng viên</div>
            <div class="candidate-header-right display-flex align-items-center">
                <button @click="openAddPopup" id="openPopupBtn" class="btn-candidate-add display-flex align-items-center justify-content-center">
                    <div class="icon icon-add-candidate"></div>
                    <div class="btn-add-text">Thêm ứng viên</div>
                </button>
                <div class="more-option display-flex align-items-center justify-content-center">
                    <div class="icon icon-more-option"></div>
                </div>
            </div>
        </div>
        <div class="candidate-body">
            <div class="candidate-wrapper-content">
                <div class="toolbar display-flex align-items-center justify-content-between">
                    <div class="toolbar-left display-flex align-items-center justify-content-between">
                        <div class="toolbar-search display-flex align-items-center">
                            <div class="icon-cd-ai-search"></div>
                            <div class="toolbar-search-inp">
                                <input v-model="keyword" type="text" class="search-input" id="searchInput" placeholder="Tìm kiếm hoặc nhờ AI trợ giúp">
                            </div>
                        </div>
                    </div>
                    <div class="toolbar-right display-flex align-items-center">
                        <div class="area">
                            <div class="icon icon-filter"></div>
                        </div>
                        <div class="area">
                            <div class="icon icon-export"></div>
                        </div>
                        <div class="area">
                            <div class="icon icon-interactive-history"></div>
                        </div>
                        <div class="area">
                            <div class="icon icon-setting-column"></div>
                        </div>
                    </div>
                </div>
                <div class="candidate-list-container">
                    <div class="candidate-list">
                        
                        <BaseTable
                            :fields="fields"
                            :rows="rows"
                        >
                            <template #header-select="{ field }">
                                <input :value="field" class="select-item" type="checkbox">
                            </template>
                            <template #select="{ row }">
                                <input :value="row.CandidateID" class="select-item" type="checkbox">
                            </template>
                            <template #CandidateName="{ row, value }">
                                <div class="fullname">
                                    <div class="avatar" :style="{ backgroundColor: getAvatarColorFromName(value) }">
                                        {{getInitialsFirstLast(value)}}
                                    </div>
                                    <div>
                                        {{formatDisplay(value)}}
                                        <div v-if="row.IsEmployee" class="display-flex align-items-center" style="margin-top: 4px">
                                            <div class="icon icon-tick"></div>
                                            <div style="color: #4fbd5b; margin-left: 4px">Nhân viên</div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #Gender="{ value }">
                                {{ GenderLabels[value] || '--' }}
                            </template>
                            <template #Score="{value}">
                                <RatingStar :score="value" />
                            </template>
                        </BaseTable>
                    </div>
                </div>
                <div class="app-page display-flex align-items-center justify-content-between">
                    <div class="total-record">
                        Tổng: <span class="total">{{ totalRecords }}</span> bản ghi
                    </div>
                    <div class="app-page-right display-flex align-items-center">
                        <div class="text-record">Số bản ghi/trang</div>
                        <div class="dropdown">
                            <select name="recordsPerPage" id="recordsPerPage" v-model="pageSize">
                                <option :value="10">10</option>
                                <option :value="25">25</option>
                                <option :value="50">50</option>
                                <option :value="100">100</option>
                            </select>
                        </div>
                        <div class="control-paging display-flex align-items-center">
                            <div class="text-paging">
                                <span class="start">{{ (currentPage - 1) * pageSize + 1 }}</span>
                                <span>-</span>
                                <span class="end">{{ endRecord }}</span>
                                <span class="nowrap">bản ghi</span>
                            </div>

                            <div :class="['icon', 'icon-left', 'pointer', {disabled: currentPage==1}]" @click="prePage"></div>
                            <div :class="['icon', 'icon-right', 'pointer', {disabled:currentPage==totalPages}]" @click="nextPage"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<style scoped>
.candidate-container {
    height: 100%;
    box-sizing: border-box;
}


/* Candidate Header */
.main-content .candidate-header {
    height: 50px;
    padding-bottom: 8px;
}

.main-content .candidate-header .candidate-header-left {
    font-size: 20px;
    font-weight: 700;
    padding-top: 8px;
    padding-bottom: 4px;
}

.main-content .candidate-header .candidate-header-right {
    height: 36px;
    background-color: #2680eb;
    border-radius: 4px;
}

.main-content .candidate-header .btn-candidate-add {
    width: auto;
    font-weight: 500;
    font-size: 14px;
    background-color: #2680eb;
    height: 100%;
    border: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 8px 12px;
}

.main-content .candidate-header .btn-candidate-add:hover {
    background-color: #4097ff;
    cursor: pointer;
}

.btn-candidate-add .btn-add-text {
    color: white;
    font-weight: 3000;
    padding-left: 8px;
}

.more-option {
    width: 40px;
    height: 36px;
    border-left: 1px solid #176cd1;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 3;
}

.more-option:hover {
    background-color: #4097ff;
    cursor: pointer;
}

.main-content .candidate-body {
    background-color: white;
    border-radius: 4px;
    height: calc(100% - 58px);
}

.main-content .candidate-wrapper-content {
    height: 100%;
}

/* Candidate Toolbar */

.candidate-body .toolbar {
    padding: 12px 16px;
}

.candidate-body .toolbar-left {
    width: 250px;
}

.candidate-body .toolbar-left .toolbar-search {
    border: #decdcd 1px solid;
    border-radius: 4px;
    padding: 4px;
}

.toolbar-search-inp {
    margin-left: 12px;
}

.toolbar-left .toolbar-search .search-input {
    border: none;
    outline: none;
}


.candidate-body .toolbar-right {
    gap: 8px;
}

.toolbar-right .area {
    background-color: #ffffff;
    height: 20px;
    width: 20px;
    padding: 8px;
    border: 1px solid #e0e6ec;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
}

/* Candidate Body */
.candidate-list-container {
    height: calc(100% - 62px - 60px); /* header + pagination */
    overflow: hidden;
}

.candidate-list {
    height: 100%;
    overflow-y: auto;
    overflow-x: auto;
    background: #fff;
    position: relative;
}

.candidate-list .candidate-table {
    table-layout: fixed;
    /* width: max-content; */
    border-collapse: collapse;
}

.candidate-list .candidate-table thead {
    background-color: #f5f5f5;
    border-bottom: 2px solid #e0e0e0;
}

.candidate-list .candidate-row {
    position: relative;
    height: 48px;
    border-bottom: 1px solid #e0e6ec;
    cursor: pointer;
}

.candidate-list .candidate-row:hover {
    background-color: #e1eeff;
}

.candidate-list .candidate-row-ticked {
    background-color: #e1eeff;
}

.row-edit-btn {
  position: sticky;
  right: 0;
  background: #fff;
  z-index: 5;
  text-align: center;
  width: 48px;
  opacity: 0;
}

.candidate-row:hover .row-edit-btn {
  opacity: 1;
  pointer-events: auto;
  background-color: #e1eeff;
}


.candidate-table th,
.candidate-table td {
    padding: 8px 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.avatar {
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    border-radius: 50%;
    color: #ffffff;
    background-color: #5598fc;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fullname {
    display: flex;
    align-items: center;
    gap: 8px;
}


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
}

.app-page-right .text-record {
    white-space: nowrap;
}

.app-page-right .dropdown {
    /* padding: 8px 8px; */
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