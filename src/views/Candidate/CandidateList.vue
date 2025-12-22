<script setup>
    import { ref, computed, watch } from 'vue';
    import { candidates } from '@/data/candidates';
    import CandidateAddPopup from './CandidateAddPopup.vue';
    import CandidateEditPopup from './CandidateEditPopup.vue';
    import { GenderLabels, OfferStatusLabels, RecruitmentStatusLabels } from '@/configs/enums';
    import { useFormat } from '@/utils/format';

    const { formatDisplay, getInitialsFirstLast, formatDate, getAvatarColorFromName } = useFormat();

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


    /* POPUP ADD CANDIDATE */
    const showAddPopup = ref(false)

    const openAddPopup = () => {
        showAddPopup.value = true
    }

    const closeAddPopup = () => {
        showAddPopup.value = false
    }

    const addCandidate = (newCandidate) => {
        candidatesData.value.unshift(newCandidate);
        showAddPopup.value = false;
    }


    /* POPUP EDIT CANDIDATE */
    const showEditPopup = ref(false)

    const selectedCandidate = ref(null)
    const handleEditClick = (candidate) => {
        selectedCandidate.value = { ...candidate }
        showEditPopup.value = true
    }

    const closeEditPopup = () => {
        showEditPopup.value = false
    }

    const editCandidate = (candidate) => {
        const index = candidatesData.value.findIndex(
            c => c.id === candidate.id
        );

        if (index !== -1) {
            candidatesData.value[index] = candidate;
        }
        showEditPopup.value = false;
    }

    // Tạo ID cho Candiate
    function generateCandidateId() {

        if (candidatesData.value.length === 0) return 1;

        const maxId = Math.max(
            ...candidatesData.value.map(c => Number(c.CandidateID) || 0)
        );

        return maxId + 1;
    }

    const endRecord = computed(() => {
        return currentPage.value * pageSize.value < totalRecords.value ? currentPage.value * pageSize.value : totalRecords.value;
    })

    // Tick all checkbox
    const selectedIds = ref([]);
    const selectAll = computed({
        get() {
            // Khi TẤT CẢ item đều được chọn → checkbox select-all = true
            return (
                displayCandidates.value.length > 0 &&
                selectedIds.value.length === displayCandidates.value.length
            )
        },
        set(checked) {
            if (checked) {
                // Chọn tất cả
                selectedIds.value = displayCandidates.value.map(c => c.CandidateID)
            } else {
                // Bỏ chọn tất cả
                selectedIds.value = []
            }
        }
    });

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
                        <table class="candidate-table" id="candidate-table-body">
                            <thead>
                                <tr>
                                    <th style="width: 50px; text-align: center;">
                                        <input v-model="selectAll" class="select-all select-checkbox" type="checkbox" title="Chọn tất cả">
                                    </th>
                                    <th>Họ và tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Chiến dịch tuyển dụng</th>
                                    <th>Vị trí tuyển dụng</th>
                                    <th>Tin tuyển dụng</th>
                                    <th>Vòng tuyển dụng</th>
                                    <th>Đánh giá</th>
                                    <th>Ngày ứng tuyển</th>
                                    <th>Nguồn ứng viên</th>
                                    <th>Trình độ đào tạo</th>
                                    <th>Nơi đào tạo</th>
                                    <th>Chuyên ngành</th>
                                    <th>Nơi làm việc gần đây</th>
                                    <th>Nhân sự khai thác</th>
                                    <th>Đơn vị sử dụng</th>
                                    <th>Phù hợp với chân dung</th>
                                    <th>Khu vực</th>
                                    <th>Người giới thiệu</th>
                                    <th>Thông tin tiếp nhận</th>
                                    <th>Thuộc kho tiềm năng</th>
                                    <th>Tài khoản cổng ứng viên</th>
                                    <th>Thẻ</th>
                                    <th>Trạng thái</th>
                                    <th>Giới tính</th>
                                    <th>Ngày sinh</th>
                                    <th>Địa chỉ</th>
                                    <th>Lý do loại</th>
                                    <th>Cộng tác viên</th>
                                    <th>Ngày tiếp nhận</th>
                                    <th>Trạng thái mời nhận việc</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="c in displayCandidates" class="candidate-row" :key="c.CandidateID">
                                    <td style="text-align:center">
                                        <input :value="c.CandidateID" v-model="selectedIds" class="select-item" type="checkbox">
                                    </td>
                                    <td>
                                        <div class="fullname">
                                            <div class="avatar" :style="{ backgroundColor: getAvatarColorFromName(c.CandidateName) }">
                                                {{getInitialsFirstLast(c.CandidateName)}}
                                            </div>
                                            <div>
                                                {{formatDisplay(c.CandidateName)}}
                                                <div v-if="c.IsEmployee" class="display-flex align-items-center" style="margin-top: 4px">
                                                    <div class="icon icon-tick"></div>
                                                    <div style="color: #4fbd5b; margin-left: 4px">Nhân viên</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{{formatDisplay(c.Email)}}</td>
                                    <td>{{formatDisplay(c.Mobile)}}</td>
                                    <td>{{formatDisplay(c.RecruitmentCampaignNames)}}</td>
                                    <td>{{formatDisplay(c.JobPositionName)}}</td>
                                    <td>{{formatDisplay(c.RecruitmentName)}}</td>
                                    <td>{{formatDisplay(c.RecruitmentRoundName)}}</td>
                                    <td>{{formatDisplay(c.Score)}}</td>
                                    <td>{{formatDate(c.ApplyDate)}}</td>
                                    <td>{{formatDisplay(c.ChannelName)}}</td>
                                    <td>{{formatDisplay(c.EducationDegreeName)}}</td>
                                    <td>{{formatDisplay(c.EducationPlaceName)}}</td>
                                    <td>{{formatDisplay(c.EducationMajorName)}}</td>
                                    <td>{{formatDisplay(c.WorkPlaceRecent)}}</td>
                                    <td>{{formatDisplay(c.AttractivePersonnel)}}</td>
                                    <td>{{formatDisplay(c.OrganizationUnitName)}}</td>
                                    <td>{{formatDisplay(c.AreaName)}}</td>
                                    <td>{{formatDisplay(c.PresenterName)}}</td>
                                    <td>{{formatDisplay(c.ProbationInfoStatus)}}</td>
                                    <td>{{formatDisplay(c.ProbationInfoStatus)}}</td>
                                    <td>{{formatDisplay(c.IsTalentPoolDetail)}}</td>
                                    <td>{{formatDisplay(c.AccountPortal)}}</td>
                                    <td>{{formatDisplay(c.TagInfos)}}</td>
                                    <td>{{RecruitmentStatusLabels[c.CandidateStatusID] || '--'}}</td>
                                    <td>{{GenderLabels[c.Gender] || '--'}}</td>
                                    <td>{{formatDate(c.Birthday)}}</td>
                                    <td>{{formatDisplay(c.Address)}}</td>
                                    <td>{{formatDisplay(c.ReasonRemoved)}}</td>
                                    <td>{{formatDisplay(c.CollaboratorName)}}</td>
                                    <td>{{formatDate(c.HireDate)}}</td>
                                    <td>{{OfferStatusLabels[c.OfferStatus] || '--'}}</td>
                                    <td class="row-edit-btn">
                                        <div class="icon icon-edit pointer" @click="handleEditClick(c)"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

                            <div class="icon icon-left pointer" @click="prePage"></div>
                            <div class="icon icon-right pointer" @click="nextPage"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <CandidateAddPopup :visible="showAddPopup" :CandidateID="generateCandidateId()" @close="closeAddPopup" @submit="addCandidate"/>
        <CandidateEditPopup :visible="showEditPopup" :candidate="selectedCandidate" @close="closeEditPopup" @submitEdit="editCandidate" />
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
</style>