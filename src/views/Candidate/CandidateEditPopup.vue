<script setup>
    import {reactive, watch, ref} from 'vue'
    import { validateCandidate } from '@/utils/validate'
    import { useFormat } from '@/utils/format';

    const { getInitialsFirstLast, getAvatarColorFromName } = useFormat();

    const props = defineProps({
        visible: Boolean,
        candidate: Object,
    });

    const emit = defineEmits(['close', 'submitEdit']);

    const candidateData = reactive({});

    // Refs for file inputs
    const avatarFileInput = ref(null);

    // Reactive data for files
    const avatarFile = ref(null);
    const avatarPreview = ref(null);

    watch(
        () => props.candidate,
        (newVal) => {
            if (newVal) {
            Object.assign(candidateData, newVal)
            }
        },
        { immediate: true }
    )

    // Handle avatar file selection
    const handleAvatarFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                alert('Chỉ chấp nhận file ảnh .jpg, .jpeg, .png');
                return;
            }
            // Validate file size (15MB)
            if (file.size > 15 * 1024 * 1024) {
                alert('Dung lượng file phải nhỏ hơn 15MB');
                return;
            }
            avatarFile.value = file;
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                avatarPreview.value = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger file inputs
    const triggerAvatarUpload = () => {
        avatarFileInput.value.click();
    };

    const submitFormEdit = () => {
        const errors = validateCandidate(candidateData);
        if (errors) {
            alert(Object.values(errors).join('\n'));
            return;
        }

        emit('submitEdit', {
            ...candidateData,
            Avatar: avatarFile.value,
        })
    }
</script>

<template>
    <div class="popup-edit" :class="{ active: props.visible }" id="popupEdit">
        <div class="popup-overlay" id="popup-overlay">
            <div class="popup-header">
                <div class="popup-title">Chỉnh sửa thông tin ứng viên</div>
                <button class="close-btn-edit" @click="emit('close')"></button>
            </div>

            <div class="popup-content">
                <div class="candidate-info">
                    <div class="avatar-section">
                        <div v-if="avatarPreview" class="avatar-preview" @click="triggerAvatarUpload">
                            <img :src="avatarPreview" alt="Avatar" class="avatar-image">
                        </div>
                        <div v-else class="avatar-placeholder" @click="triggerAvatarUpload" :style="{'background-color': getAvatarColorFromName(candidateData.CandidateName)}">{{ getInitialsFirstLast(candidateData.CandidateName) }}</div>
                        <input ref="avatarFileInput" type="file" @change="handleAvatarFileSelect" accept=".jpg,.jpeg,.png" style="display: none;">
                    </div>

                    <div class="form-section">
                        <div class="form-row">
                            <label class="label">Họ và tên <span class="required">*</span></label>
                            <input v-model="candidateData.CandidateName" type="text" class="input-field fullname-edit" id="CandidateNameEdit" placeholder="Nhập họ và tên" maxlength="255">
                        </div>

                        <div class="form-row-double">
                            <div class="form-row-double-first">
                                <div class="date-format">
                                    <label class="label">Ngày sinh</label>
                                </div>
                                <input v-model="candidateData.Birthday" type="date" class="input-field" id="BirthdayEdit" placeholder="dd/MM/yyyy">
                            </div>
                            <div class="form-row-double-second">
                                <label class="label">Giới tính</label>
                                <select v-model="candidateData.Gender" class="input-field" id="GenderEdit">
                                    <option value="">Chọn giới tính</option>
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                    <option value="-1">Khác</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row-double">
                            <div class="form-row-double-first">
                                <label class="label">Ngày ứng tuyển 
                                </label>
                                <input v-model="candidateData.ApplyDate" type="date" class="input-field" id="ApplyDateEdit" placeholder="dd/MM/yyyy">
                            </div>
                            <div class="form-row-double-second">
                                <label class="label">Nguồn ứng viên</label>
                                <select class="input-field" id="ChannelNameEdit">
                                    <option value="">Chọn nguồn ứng viên</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Vieclam24h">Vieclam24h</option>
                                    <option value="Careerbuilder">Careerbuilder</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row">
                            <label class="label">Khu vực</label>
                            <select v-model="candidateData.AreaName" class="input-field" id="AreaNameEdit">
                                <option value="">Chọn giá trị</option>
                                <option value="Cầu Giấy">Cầu Giấy</option>
                                <option value="Hồ Tây">Hồ Tây</option>
                                <option value="Bắc Từ Liêm">Bắc Từ Liêm</option>
                            </select>
                        </div>

                        <div class="form-row">
                            <label class="label">Nhân sự khai thác</label>
                            <select class="input-field" id="AttractivePersonnelEdit">
                                <option value="">Chọn nhân sự khai thác ứng viên</option>
                                <option value="Nguyễn Văn A">Nguyễn Văn A</option>
                                <option value="Nguyễn Thị B">Nguyễn Thị B</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <label class="label">Cộng tác viên</label>
                            <select class="input-field" id="CollaboratorNameEdit">
                                <option value="">Chọn cộng tác viên</option>
                                <option value="Nguyễn Thị Bích">Nguyễn Thị Bích</option>
                                <option value="Nguyễn Thị An">Nguyễn Thị An</option>
                            </select>
                        </div>

                        <button class="add-button">Thêm người giới thiệu</button>
                    </div>

                </div>

                <div class="contact-info">
                    <div class="popup-edit-title-item">THÔNG TIN LIÊN HỆ</div>

                    <div class="contact-info-container">
                        <div class="contact-info-item">
                            <div class="info-item-left">
                                <div class="icon icon-phone"></div>
                                <div class="info-left-text">Số điện thoại</div>
                            </div>
                            <div class="info-item-right">
                                <input v-model="candidateData.Mobile" type="text" class="input-field info-right-input mobile-edit" id="MobileEdit">
                            </div>
                        </div>
                        <div class="contact-info-add">
                            <button class="add-button" style="margin-left: 150px;">Thêm số điện thoại</button>
                        </div>

                        
                        <div class="contact-info-item">
                            <div class="info-item-left">
                                <div class="icon icon-email"></div>
                                <div class="info-left-text">Email</div>
                            </div>
                            <div class="info-item-right">
                                <input v-model="candidateData.Email" type="text" class="input-field info-right-input email-edit" id="EmailEdit">
                            </div>
                        </div>
                        <div class="contact-info-add">
                            <button class="add-button" style="margin-left: 150px;">Thêm email</button>
                        </div>


                        <div class="contact-info-item contact-info-row">
                            <div class="info-item-left">
                                <div class="icon icon-location"></div>
                                <div class="info-left-text">Địa chỉ</div>
                            </div>
                            <div class="info-item-right">
                                <input v-model="candidateData.Address" type="text" class="input-field info-right-input" id="AddressEdit">
                            </div>
                        </div>

                        <div class="contact-info-item contact-info-row">
                            <div class="info-item-left">
                                <div class="icon icon-skype-trans"></div>
                                <div class="info-left-text">Skype</div>
                            </div>
                            <div class="info-item-right display-flex gap-16">
                                <input type="text" class="input-field info-right-input" placeholder="Tên hiển thị">
                                <input type="text" class="input-field info-right-input" placeholder="Live">
                            </div>
                        </div>

                        <div class="contact-info-item contact-info-row">
                            <div class="info-item-left">
                                <div class="icon icon-facebook-trans"></div>
                                <div class="info-left-text">Facebook</div>
                            </div>
                            <div class="info-item-right">
                                <input type="text" class="input-field info-right-input">
                            </div>
                        </div>

                        <div class="contact-info-item contact-info-row">
                            <div class="info-item-left">
                                <div class="icon icon-zalo"></div>
                                <div class="info-left-text">Zalo</div>
                            </div>
                            <div class="info-item-right">
                                <input type="text" class="input-field info-right-input">
                            </div>
                        </div>

                        <div class="contact-info-item pt-16">
                            <div class="info-item-left">
                                <div class="icon icon-otherlink-trans"></div>
                                <div class="info-left-text">Liên kết khác</div>
                            </div>
                            <div class="info-item-right">
                                <input type="text" class="input-field info-right-input">
                            </div>
                        </div>
                        <div class="contact-info-add">
                            <button class="add-button" style="margin-left: 150px;">Thêm đường dẫn</button>
                        </div>
                    </div>


                </div>

                <div class="education-content">
                    <div class="popup-edit-title-item">HỌC VẤN</div>
                    
                    <div class="education-info">
                        <div class="education-info-row">
                            <span class="education-info-label">Trình độ đào tạo</span>
                            <input type="text" class="input-field" id="EducationDegreeNameEdit" placeholder="Nhập trình độ đào tạo">
                        </div>
                        <div class="education-info-row">
                            <span class="education-info-label">Nơi đào tạo</span>
                            <input type="text" class="input-field" id="EducationPlaceNameEdit" placeholder="Nhập nơi đào tạo">
                        </div>
                        <div class="education-info-row">
                            <span class="education-info-label">Chuyên ngành</span>
                            <input type="text" class="input-field" id="EducationMajorNameEdit" placeholder="Nhập chuyên ngành">
                        </div>
                    </div>
                    <hr>
                    <button class="add-button">Thêm học vấn</button>
                </div>

                <div class="work-experience-edit">
                    <div class="popup-edit-title-item">KINH NGHIỆM LÀM VIỆC</div>
                    <div class="work-experience-edit-info">
                        <div class="experience-info-row">
                            <span class="experience-info-label">Nơi làm việc gần đây</span>
                            <input type="text" class="input-field" id="WorkPlaceRecentEdit" placeholder="Nhập nơi làm việc gần đây">
                        </div>
                        <hr>
                        <button class="add-button">Thêm học vấn</button>
                        <div class="experience-info-row">
                            <span class="experience-info-label">Nơi làm việc gần đây</span>
                            <input type="text" class="input-field" id="" placeholder="Nhập nơi làm việc gần đây">
                        </div>
                        <div class="experience-info-row">
                            <span class="experience-info-label">Thời gian</span>
                            <div class="date-range">
                                <input type="date" class="input-field" placeholder="MM/yyyy">
                                <span>-</span>
                                <input type="date" class="input-field" placeholder="MM/yyyy">
                            </div>
                        </div>
                        <div class="experience-info-row">
                            <span class="experience-info-label">Vị trí công việc</span>
                            <input type="text" class="input-field" id="JobPositionName" placeholder="Nhập vị trí công việc">
                        </div>
                        <div class="experience-info-row">
                            <span class="experience-info-label">Mô tả công việc</span>
                            <textarea class="input-field" placeholder="Nhập mô tả công việc"></textarea>
                        </div>
                    </div>
                </div>


            </div>

            <div class="popup-footer">
                <button class="btn btn-cancel-edit">Hủy</button>
                <button class="btn btn-primary-edit" @click="submitFormEdit">Lưu</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Popup Edit */
    .popup-edit {
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

    /* Hiện popup khi có class active */
    .popup-edit.active {
        display: flex;
    }

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

    /* Hiện popup khi có class active */
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
        width: 80px;
        height: 80px;
        border: 2px dashed #d9d9d9;
        border-radius: 50%;
        color: #fff;
        font-size: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: border-color 0.2s;
    }

    .avatar-placeholder:hover {
        border-color: #1890ff;
    }

    .avatar-preview {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid #1890ff;
    }

    .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
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

    .popup-edit-title-item {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 16px;
    }

    .close-btn-edit {
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

    .close-btn-edit:hover {
        background: #f0f0f0;
    }

    .close-btn-edit::before {
        content: "✕";
        font-size: 20px;
        color: #666;
    }

    .candidate-info {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
    }


    .contact-info-container {
        width: 100%;
    }

    .contact-info-add {
        padding-bottom: 8px;
    }

    .contact-info-row {
        padding: 16px 0;
    }

    .contact-info-item {
        display: grid;
        grid-template-columns: 150px calc(100% - 150px);
        margin-top: 6px;
    }

    .info-item-left {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .info-item-left .info-left-text {
        white-space: nowrap;
        font-weight: 550;
    }


    .education-info-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
    }

    .education-info-label {
        white-space: nowrap;
        width: 150px;
        min-width: 150px;
        position: relative;
        padding-left: 14px;
        box-sizing: border-box;
        font-weight: 550;
        color: #333;
    }

    .education-info-label::before {
        content: "•";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #000000;
        font-size: 24px;
    }


    .work-experience-edit {
        margin-top: 32px;
    }

    .experience-info-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
    }

    .experience-info-label {
        width: 150px;
        min-width: 150px;
        position: relative;
        padding-left: 14px;
        box-sizing: border-box;
        font-weight: 550;
        color: #333;
    }

    .experience-info-label::before {
        content: "•";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #000000;
        font-size: 24px;
    }

    .btn-primary-edit {
        background: #1890ff;
        color: white;
        border: none;
    }

    .btn-primary-edit:hover {
        background: #40a9ff;
    }

    .btn-cancel-edit {
        background: white;
        border-color: #d9d9d9;
        color: #333;
    }

    .btn-cancel-edit:hover {
        border-color: #1890ff;
        color: #1890ff;
    }
</style>