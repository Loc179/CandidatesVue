export const Gender = {
  FEMALE: 0,
  MALE: 1,
  OTHER: 2
};

export const GenderLabels = {
  [Gender.FEMALE]: 'Nữ',
  [Gender.MALE]: 'Nam',
  [Gender.OTHER]: 'Khác'
};

export const RecruitmentStatus = {
  PENDING: 0,
  IN_PROGRESS: 1,
  INTERVIEW: 2,
  TEST: 3,
  OFFER: 4,
  HIRED: 5,
  REJECTED: 6
};

export const RecruitmentStatusLabels = {
  [RecruitmentStatus.PENDING]: 'Chưa xử lý',
  [RecruitmentStatus.IN_PROGRESS]: 'Ứng tuyển',
  [RecruitmentStatus.INTERVIEW]: 'Phỏng vấn',
  [RecruitmentStatus.TEST]: 'Thi tuyển',
  [RecruitmentStatus.OFFER]: 'Chào offer',
  [RecruitmentStatus.HIRED]: 'Đã tuyển',
  [RecruitmentStatus.REJECTED]: 'Đã loại'
};

export const OfferStatus = {
  PENDING: 0,
  SENT: 1,
  ACCEPTED: 2,
  REJECTED: 3
};

export const OfferStatusLabels = {
  [OfferStatus.PENDING]: 'Chờ gửi',
  [OfferStatus.SENT]: 'Đã gửi',
  [OfferStatus.ACCEPTED]: 'Đã chấp nhận',
  [OfferStatus.REJECTED]: 'Đã từ chối'
};

export const fieldsCandidate = [
  {
    key: 'select',
    label: '',
    type: 'custom', // checkbox
  },
  {
    key: 'CandidateName',
    label: 'Họ và tên',
    type: 'custom', // avatar + tên + nhân viên
  },
  {
    key: 'Email',
    label: 'Email',
    type: 'text',
  },
  {
    key: 'Mobile',
    label: 'Số điện thoại',
    type: 'text',
  },
  {
    key: 'RecruitmentCampaignNames',
    label: 'Chiến dịch tuyển dụng',
    type: 'text',
  },
  {
    key: 'JobPositionName',
    label: 'Vị trí tuyển dụng',
    type: 'text',
  },
  {
    key: 'RecruitmentName',
    label: 'Tin tuyển dụng',
    type: 'text',
  },
  {
    key: 'RecruitmentRoundName',
    label: 'Vòng tuyển dụng',
    type: 'text',
  },
  {
    key: 'Score',
    label: 'Đánh giá',
    type: 'number',
  },
  {
    key: 'ApplyDate',
    label: 'Ngày ứng tuyển',
    type: 'date',
  },
  {
    key: 'ChannelName',
    label: 'Nguồn ứng viên',
    type: 'text',
  },
  {
    key: 'EducationDegreeName',
    label: 'Trình độ đào tạo',
    type: 'text',
  },
  {
    key: 'EducationPlaceName',
    label: 'Nơi đào tạo',
    type: 'text',
  },
  {
    key: 'EducationMajorName',
    label: 'Chuyên ngành',
    type: 'text',
  },
  {
    key: 'WorkPlaceRecent',
    label: 'Nơi làm việc gần đây',
    type: 'text',
  },
  {
    key: 'AttractivePersonnel',
    label: 'Nhân sự khai thác',
    type: 'text',
  },
  {
    key: 'OrganizationUnitName',
    label: 'Đơn vị sử dụng',
    type: 'text',
  },
  {
    key: 'AreaName',
    label: 'Khu vực',
    type: 'text',
  },
  {
    key: 'PresenterName',
    label: 'Người giới thiệu',
    type: 'text',
  },
  {
    key: 'ProbationInfoStatus',
    label: 'Thông tin tiếp nhận',
    type: 'text',
  },
  {
    key: 'IsTalentPoolDetail',
    label: 'Thuộc kho tiềm năng',
    type: 'text',
  },
  {
    key: 'AccountPortal',
    label: 'Tài khoản cổng ứng viên',
    type: 'text',
  },
  {
    key: 'TagInfos',
    label: 'Thẻ',
    type: 'text',
  },
  {
    key: 'CandidateStatusID',
    label: 'Trạng thái',
    type: 'text', // map label
  },
  {
    key: 'Gender',
    label: 'Giới tính',
    type: 'custom',
  },
  {
    key: 'Birthday',
    label: 'Ngày sinh',
    type: 'date',
  },
  {
    key: 'Address',
    label: 'Địa chỉ',
    type: 'text',
  },
  {
    key: 'ReasonRemoved',
    label: 'Lý do loại',
    type: 'text',
  },
  {
    key: 'CollaboratorName',
    label: 'Cộng tác viên',
    type: 'text',
  },
  {
    key: 'HireDate',
    label: 'Ngày tiếp nhận',
    type: 'date',
  },
  {
    key: 'OfferStatus',
    label: 'Trạng thái mời nhận việc',
    type: 'text',
  }
];
