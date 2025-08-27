export type UserCategory = 'Staff' | 'Vendor' | 'PublicUser'

export type UserRole = 
  | 'SuperAdmin'
  | 'SupportAdmin' 
  | 'AccountsAdmin' 
  | 'MarketingAdmin'
  | 'PartnerAdmin' 
  | 'SupplierAdmin' 
  | 'AgentAdmin'
  | 'UserAdmin'

export interface Profile {
  id: string
  first_name: string
  last_name: string
  dob: string
  mobile: string
  email: string
  category: UserCategory
  role: UserRole
  address?: string
  city?: string
  post?: string
  country?: string
  created_at: string
  updated_at: string
}

export const ROLE_PERMISSIONS = {
  SuperAdmin: ['admin', 'staff', 'vendor', 'user'],
  SupportAdmin: ['staff'],
  AccountsAdmin: ['staff'],
  MarketingAdmin: ['staff'],
  PartnerAdmin: ['vendor'],
  SupplierAdmin: ['vendor'],
  AgentAdmin: ['vendor'],
  UserAdmin: ['user']
} as const

export const CATEGORY_ROLES: Record<UserCategory, UserRole[]> = {
  Staff: ['SupportAdmin', 'AccountsAdmin', 'MarketingAdmin'],
  Vendor: ['PartnerAdmin', 'SupplierAdmin', 'AgentAdmin'],
  PublicUser: ['UserAdmin']
}