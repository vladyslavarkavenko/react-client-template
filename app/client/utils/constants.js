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
    MANAGER: 'MANAGER',
    COMPANY: 'COMPANY'
  },
  STAFF_TABLE_TYPE: {
    INVITATION: 'INVITATION',
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
  }
};
