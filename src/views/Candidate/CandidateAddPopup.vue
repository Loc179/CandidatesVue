<script setup>
    import { reactive } from 'vue';
    import { validateCandidate } from '@/utils/validate';
    
    const props = defineProps({
        visible: Boolean,
        CandidateID: Number,
    });

    const emit = defineEmits(['close','submit'])

    const candidate = reactive({
        CandidateID: props.CandidateID,
        CandidateName: '',
        Birthday: '',
        Gender: '',
        AreaName: '',
        Mobile: '',
        Email: '',
        Address: '',
        ApplyDate: '',
    });

    const submitForm = () => {
        const errors = validateCandidate(candidate);
        if (errors) {
            alert(Object.values(errors).join('\n'));
            return;
        }

        emit('submit', {
            ...candidate,
        })
    }


</script>

<template>
    <div class="popup-backdrop" :class="{ active: props.visible }" id="popupBackdrop">
        <div class="popup-overlay" id="popup-overlay">
            <div class="popup-header">
                <div class="popup-title">Thêm ứng viên</div>
                <button class="close-btn" @click="emit('close')"></button>
            </div>

            <div class="popup-content">
                <div class="upload-area">
                    <div class="upload-text">Kéo thả hoặc bấm vào đây để tải CV lên</div>
                    <div class="upload-subtext">
                        Chấp nhận file .doc, .docx, .pdf, .jpg, .jpeg, .png (Dung lượng &lt; hơn 15 Mb)
                    </div>
                </div>

                <div class="candidate-info">
                    <div class="avatar-section">
                        <div class="avatar-placeholder">Ảnh</div>
                    </div>

                    <div class="form-section">
                        <div class="form-row">
                            <label class="label">Họ và tên <span class="required">*</span></label>
                            <input v-model="candidate.CandidateName" type="text" class="input-field" id="CandidateName" placeholder="Nhập họ và tên" maxlength="255">
                        </div>

                        <div class="form-row-double">
                            <div class="form-row-double-first">
                                <div class="date-format">
                                    <label class="label">Ngày sinh</label>
                                </div>
                                <input v-model="candidate.Birthday" type="date" class="input-field" id="Birthday" placeholder="dd/MM/yyyy">
                            </div>
                            <div class="form-row-double-second">
                                <label class="label">Giới tính</label>
                                <select v-model="candidate.Gender" class="input-field" id="Gender">
                                    <option value="">Chọn giới tính</option>
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                    <option value="-1">Khác</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row">
                            <label class="label">Khu vực</label>
                            <select v-model="candidate.AreaName" class="input-field" id="AreaName">
                                <option value="">Chọn giá trị</option>
                                <option value="Cầu Giấy">Cầu Giấy</option>
                                <option value="Hồ Tây">Hồ Tây</option>
                                <option value="Bắc Từ Liêm">Bắc Từ Liêm</option>
                            </select>
                        </div>

                        <div class="form-row-double">
                            <div class="form-row-double-first">
                                <label class="label">Số điện thoại</label>
                                <input v-model="candidate.Mobile" type="tel" class="input-field" id="Mobile" placeholder="Nhập số điện thoại" maxlength="20">
                            </div>
                            <div class="form-row-double-second">
                                <label class="label">Email</label>
                                <input v-model="candidate.Email" type="email" class="input-field" id="Email" placeholder="Nhập Email" maxlength="255">
                            </div>
                        </div>

                        <div class="form-row">
                            <label class="label">Địa chỉ</label>
                            <input v-model="candidate.Address" type="text" class="input-field" id="Address" placeholder="Nhập địa chỉ" maxlength="255">
                        </div>

                        <div class="education-section">
                            <div class="education-title">HỌC VẤN</div>
                            <div class="education-item">
                                <span class="education-label">Trình độ đào tạo</span>
                                <input type="text" class="input-field" id="EducationDegreeName" placeholder="Nhập trình độ đào tạo">
                            </div>
                            <div class="education-item">
                                <span class="education-label">Nơi đào tạo</span>
                                <input type="text" class="input-field" id="EducationPlaceName" placeholder="Nhập nơi đào tạo">
                            </div>
                            <div class="education-item">
                                <span class="education-label">Chuyên ngành</span>
                                <input type="text" class="input-field" id="EducationMajorName" placeholder="Nhập chuyên ngành">
                            </div>
                            <hr>
                            <button class="add-button">Thêm học vấn</button>
                        </div>

                        <div class="form-row-double">
                            <div class="form-row-double-first">
                                <label class="label">Ngày ứng tuyển</label>
                                <input v-model="candidate.ApplyDate" type="date" class="input-field" id="ApplyDate" placeholder="dd/MM/yyyy">
                            </div>
                            <div class="form-row-double-second">
                                <label class="label">Nguồn ứng viên</label>
                                <select class="input-field" id="ChannelName">
                                    <option value="">Chọn nguồn ứng viên</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Vieclam24h">Vieclam24h</option>
                                    <option value="Careerbuilder">Careerbuilder</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row-double">
                            <div class="form-row-double-first">
                                <label class="label">Nhân sự khai thác</label>
                                <select class="input-field" id="AttractivePersonnel">
                                    <option value="">Chọn nhân sự khai thác ứng viên</option>
                                    <option value="Nguyễn Văn A">Nguyễn Văn A</option>
                                    <option value="Nguyễn Thị B">Nguyễn Thị B</option>
                                </select>
                            </div>
                            <div class="form-row-double-second">
                                <label class="label">Cộng tác viên</label>
                                <select class="input-field" id="CollaboratorName">
                                    <option value="">Chọn cộng tác viên</option>
                                    <option value="Nguyễn Thị Bích">Nguyễn Thị Bích</option>
                                    <option value="Nguyễn Thị An">Nguyễn Thị An</option>
                                </select>
                            </div>
                        </div>

                        <div class="checkbox-row">
                            <input type="checkbox" id="quickAdd">
                            <label for="quickAdd">Thêm nhanh người tham chiếu vào kho ứng viên</label>
                        </div>

                        <button class="add-button">Thêm người giới thiệu</button>

                        <div class="form-row">
                            <label class="label">Nơi làm việc gần đây</label>
                            <input type="text" class="input-field" id="WorkPlaceRecent" placeholder="Nhập nơi làm việc gần đây">
                        </div>

                        <div class="divider"></div>

                        <button class="add-button">Thêm kinh nghiệm làm việc</button>

                        <div class="work-experience">
                            <div class="form-row">
                                <label class="label">Nơi làm việc</label>
                                <input type="text" class="input-field" id="" placeholder="Nhập nơi làm việc">
                            </div>
                            <div class="form-row">
                                <label class="label">Thời gian</label>
                                <div class="date-range">
                                    <input type="month" class="input-field" placeholder="MM/yyyy">
                                    <span>-</span>
                                    <input type="month" class="input-field" placeholder="MM/yyyy">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="label">Vị trí công việc</label>
                                <input type="text" class="input-field" id="JobPositionName" placeholder="Nhập vị trí công việc">
                            </div>
                            <div class="form-row">
                                <label class="label">Mô tả công việc</label>
                                <textarea class="input-field" placeholder="Nhập mô tả công việc"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="popup-footer">
                <button class="btn btn-cancel">Hủy</button>
                <button class="btn btn-primary" @click="submitForm">Lưu</button>
            </div>

        </div>
    </div>
</template>

<style scoped>
    .popup-backdrop {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: calc(100% - 48px);
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        justify-content: center;
        align-items: center;
        padding: 20px;
        animation: fadeIn 0.3s ease;
    }

    .popup-backdrop.active {
        display: flex;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .popup-overlay {
        background: white;
        border-radius: 8px;
        width: 100%;
        max-width: 600px;
        max-height: 95vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        animation: slideUp 0.3s ease;
    }

    .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid #e0e0e0;
    }

    .popup-title {
        font-size: 24px;
        font-weight: 700;
        color: #333;
    }

    .close-btn {
        width: 32px;
        height: 32px;
        border: none;
        background: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background 0.2s;
    }

    .close-btn:hover {
        background: #f0f0f0;
    }

    .close-btn::before {
        content: "✕";
        font-size: 20px;
        color: #666;
    }

    .popup-content {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
    }

    .upload-area {
        border: 2px dashed #1890ff;
        border-radius: 8px;
        padding: 30px;
        text-align: center;
        background: #f8fbff;
        margin-bottom: 20px;
        cursor: pointer;
        transition: background 0.2s;
    }

    .upload-area:hover {
        background: #e6f4ff;
    }

    .upload-text {
        color: #333;
        margin-bottom: 8px;
        font-size: 14px;
    }

    .upload-subtext {
        color: #999;
        font-size: 12px;
    }

    .candidate-info {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }

    .avatar-section {
        flex-shrink: 0;
    }

    .avatar-placeholder {
        width: 100px;
        height: 100px;
        border: 2px dashed #d9d9d9;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
        cursor: pointer;
        transition: border-color 0.2s;
    }

    .avatar-placeholder:hover {
        border-color: #1890ff;
    }

    .form-section {
        flex: 1;
    }

    .form-row {
        margin-bottom: 16px;
    }

    .form-row-double {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 16px;
    }

    .form-row-double-first {
        width: calc(50% - 8px);
    }

    .form-row-double-second {
        flex: 1;
    }

    .label {
        display: block;
        margin-bottom: 6px;
        font-size: 14px;
        color: #333;
    }

    .required {
        color: #ff4d4f;
    }

    .input-field {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
        transition: border-color 0.2s;
    }

    .input-field:focus {
        outline: none;
        border-color: #1890ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
    }

    .input-field::placeholder {
        color: #bfbfbf;
    }

    select.input-field {
        cursor: pointer;
        background: white;
    }


    .date-format {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* margin-bottom: 6px; */
    }

    .format-selector {
        font-size: 12px;
        color: #1890ff;
        cursor: pointer;
    }

    .education-section {
        margin: 20px 0;
    }

    .education-title {
        font-weight: 600;
        margin-bottom: 12px;
        color: #333;
    }

    .education-item {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
    }

    .education-item::before {
        content: "•";
        color: #000;
        font-size: 20px;
    }

    .education-label {
        min-width: 150px;
        font-size: 14px;
        color: #666;
    }

    .add-button {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #1890ff;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 14px;
        padding: 8px 0;
    }

    .add-button::before {
        content: "+";
        font-size: 18px;
        font-weight: bold;
    }

    .checkbox-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 16px 0;
    }

    .checkbox-row input[type="checkbox"] {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    .checkbox-row label {
        font-size: 14px;
        cursor: pointer;
    }

    .divider {
        height: 1px;
        background: #e0e0e0;
        margin: 20px 0;
    }

    .popup-footer {
        padding: 16px 20px;
        border-top: 1px solid #e0e0e0;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
    }

    .btn {
        padding: 8px 24px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.2s;
    }

    .btn-cancel {
        background: white;
        border-color: #d9d9d9;
        color: #333;
    }

    .btn-cancel:hover {
        border-color: #1890ff;
        color: #1890ff;
    }

    .btn-primary {
        background: #1890ff;
        color: white;
        border: none;
    }

    .btn-primary:hover {
        background: #40a9ff;
    }

    .work-experience {
        padding: 16px;
        border-radius: 6px;
        margin-top: 12px;
    }

    .date-range {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .date-range input {
        flex: 1;
    }

    textarea.input-field {
        min-height: 100px;
        resize: vertical;
        font-family: inherit;
    }

    /* Scrollbar styling */
    .popup-content::-webkit-scrollbar {
        width: 6px;
    }

    .popup-content::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    .popup-content::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }

    .popup-content::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .popup-overlay {
            max-width: 100%;
            max-height: 100vh;
            border-radius: 0;
        }
        
        .candidate-info {
            flex-direction: column;
        }
        
        .form-row-double {
            grid-template-columns: 1fr;
        }
    }
</style>