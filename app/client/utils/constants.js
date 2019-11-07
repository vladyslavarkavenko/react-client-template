module.exports = {
  ROLES: {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    ANALYST: 'ANALYST',
    CUSTOMER: 'CUSTOMER'
  },
  INFO_LINE_TYPES: {
    NUMBER: 'Phone',
    SITE: 'Web',
    EMAIL: 'Email'
  },
  TOKENS: {
    ACCESS: 'access_token',
    REFRESH: 'refresh_token'
  },
  HEADER_ICONS: {
    PEN: 'PEN',
    DELETE: 'DELETE',
    CAMERA: 'CAMERA'
  },
  BTN_TYPES: {
    BLUE: 'blue',
    WHITE: 'white',
    TRANSPARENT: 'transparent'
  },
  RATE_PROFILE_TYPE: {
    MANAGER: 'manager',
    COMPANY: 'company'
  },
  STAFF_TABLE_STATUS: {
    PENDING: 'Pending',
    ACTIVE: 'Active',
    BLOCKED: 'Blocked',
    EXPIRED: 'Expired'
  },
  STAFF_TABLE_TYPE: {
    INVITATIONS: 'INVITATIONS',
    PENDING: 'PENDING',
    ACTIVE: 'ACTIVE'
  },
  FILE_SIZES: {
    DEFAULT: 7340032 // 7mb
  },
  FILE_MIMES: {
    IMAGES: ['image/jpeg', 'image/png', 'image/webp'],
    DOCUMENTS: [
      'application/pdf',
      'text/csv',
      'text/plain',
      'application/msword', //.doc
      'application/vnd.ms-excel', //.xls
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //.docx
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' //.xlsx
    ],
    ARCHIVES: ['application/zip', 'application/x-7z-compressed', 'application/x-rar-compressed']
  },
  COLORS: {
    // criteria_id
    CARING: '#69BE60', // 1
    CONVENIENT: '#FFAF5F', // 2
    CREATIVE: '#F07E68', // 3
    CLEAR: '#EF6363', // 4
    COST_CONSCIOUS: '#B96E9F', // 5
    COMPENSATING: '#8E97F1', // 6
    CONFIDENT: '#4CB1E9', // 7
    COURTEGIOUS: '#13BE99' // 8
  },
  ROUTING_PARAMS: {
    MANAGER: 'manager',
    COMPANY: 'company',
    CRITERIA_ID: 'criteriaId',
    SUBJECT_ID: 'subjectId',
    TOPIC_ID: 'topicId',

    MAIN_ID: 'mainId',
    COMPARE_ID: 'compareId',

    SELECT_EXPIRED: 'getExpired'
  }
};
