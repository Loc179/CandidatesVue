// Hàm validate cho ứng viên
export function validateCandidate(candidate) {
    const errors = {};

    // Validate họ tên (bắt buộc)
    if (!candidate.CandidateName || !candidate.CandidateName.trim()) {
        errors.CandidateName = 'Họ và tên không được để trống';
    }

    // Validate email (optional, nhưng nếu có thì đúng format)
    if (candidate.Email && candidate.Email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(candidate.Email.trim())) {
            errors.Email = 'Email không hợp lệ';
        }
    }

    // Validate số điện thoại (optional, nhưng nếu có thì đúng format)
    if (candidate.Mobile && candidate.Mobile.trim()) {
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(candidate.Mobile.trim().replace(/\s/g, ''))) {
            errors.Mobile = 'Số điện thoại không hợp lệ (10-11 chữ số)';
        }
    }

    return Object.keys(errors).length > 0 ? errors : null;
}

// Hàm validate chung cho form
export function validateForm(data, requiredFields = []) {
    const errors = {};

    requiredFields.forEach(field => {
        if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
            errors[field] = `${field} không được để trống`;
        }
    });

    return Object.keys(errors).length > 0 ? errors : null;
}