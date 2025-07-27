export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_type: 'individual' | 'corporate'
          name: string
          phone: string | null
          birth_date: string | null
          gender: 'M' | 'F' | null
          resident_number: string | null
          address: string | null
          education_level: 'high_school' | 'college' | 'bachelor' | 'master' | 'doctor' | null
          company_name: string | null
          business_number: string | null
          company_address: string | null
          representative_name: string | null
          company_size: 'large' | 'medium' | 'small' | 'startup' | null
          email_verified: boolean
          phone_verified: boolean
          status: 'active' | 'inactive' | 'suspended'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_type?: 'individual' | 'corporate'
          name: string
          phone?: string | null
          birth_date?: string | null
          gender?: 'M' | 'F' | null
          resident_number?: string | null
          address?: string | null
          education_level?: 'high_school' | 'college' | 'bachelor' | 'master' | 'doctor' | null
          company_name?: string | null
          business_number?: string | null
          company_address?: string | null
          representative_name?: string | null
          company_size?: 'large' | 'medium' | 'small' | 'startup' | null
          email_verified?: boolean
          phone_verified?: boolean
          status?: 'active' | 'inactive' | 'suspended'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_type?: 'individual' | 'corporate'
          name?: string
          phone?: string | null
          birth_date?: string | null
          gender?: 'M' | 'F' | null
          resident_number?: string | null
          address?: string | null
          education_level?: 'high_school' | 'college' | 'bachelor' | 'master' | 'doctor' | null
          company_name?: string | null
          business_number?: string | null
          company_address?: string | null
          representative_name?: string | null
          company_size?: 'large' | 'medium' | 'small' | 'startup' | null
          email_verified?: boolean
          phone_verified?: boolean
          status?: 'active' | 'inactive' | 'suspended'
          created_at?: string
          updated_at?: string
        }
      }
      careers: {
        Row: {
          id: string
          user_id: string
          company_name: string
          business_number: string | null
          start_date: string
          end_date: string | null
          is_current: boolean
          position: string
          department: string | null
          job_category: 'development' | 'analysis' | 'design' | 'test' | 'maintenance' | 'consulting' | 'management'
          job_description: string
          technologies: Json
          projects: Json
          status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
          submitted_at: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          review_comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          business_number?: string | null
          start_date: string
          end_date?: string | null
          is_current?: boolean
          position: string
          department?: string | null
          job_category: 'development' | 'analysis' | 'design' | 'test' | 'maintenance' | 'consulting' | 'management'
          job_description: string
          technologies?: Json
          projects?: Json
          status?: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
          submitted_at?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          review_comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          business_number?: string | null
          start_date?: string
          end_date?: string | null
          is_current?: boolean
          position?: string
          department?: string | null
          job_category?: 'development' | 'analysis' | 'design' | 'test' | 'maintenance' | 'consulting' | 'management'
          job_description?: string
          technologies?: Json
          projects?: Json
          status?: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
          submitted_at?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          review_comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      uploaded_files: {
        Row: {
          id: string
          user_id: string
          career_id: string | null
          original_name: string
          stored_name: string
          file_path: string
          file_size: number
          file_type: string
          mime_type: string
          category: 'identity' | 'education' | 'career_cert' | 'work_confirm' | 'portfolio' | 'other'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          career_id?: string | null
          original_name: string
          stored_name: string
          file_path: string
          file_size: number
          file_type: string
          mime_type: string
          category: 'identity' | 'education' | 'career_cert' | 'work_confirm' | 'portfolio' | 'other'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          career_id?: string | null
          original_name?: string
          stored_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          mime_type?: string
          category?: 'identity' | 'education' | 'career_cert' | 'work_confirm' | 'portfolio' | 'other'
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          order_id: string
          payment_method: 'card' | 'bank_transfer' | 'virtual_account' | 'mobile'
          service_type: 'career_register' | 'certificate_issue' | 'annual_fee' | 'expedited_service'
          amount: number
          status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded'
          pg_provider: string | null
          pg_transaction_id: string | null
          pg_response: Json | null
          paid_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          order_id: string
          payment_method: 'card' | 'bank_transfer' | 'virtual_account' | 'mobile'
          service_type: 'career_register' | 'certificate_issue' | 'annual_fee' | 'expedited_service'
          amount: number
          status?: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded'
          pg_provider?: string | null
          pg_transaction_id?: string | null
          pg_response?: Json | null
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          order_id?: string
          payment_method?: 'card' | 'bank_transfer' | 'virtual_account' | 'mobile'
          service_type?: 'career_register' | 'certificate_issue' | 'annual_fee' | 'expedited_service'
          amount?: number
          status?: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded'
          pg_provider?: string | null
          pg_transaction_id?: string | null
          pg_response?: Json | null
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      certificates: {
        Row: {
          id: string
          user_id: string
          certificate_type: 'total' | 'partial' | 'english'
          purpose: string | null
          career_ids: Json
          certificate_number: string
          file_path: string | null
          file_name: string | null
          payment_id: string | null
          issued_at: string
        }
        Insert: {
          id?: string
          user_id: string
          certificate_type?: 'total' | 'partial' | 'english'
          purpose?: string | null
          career_ids?: Json
          certificate_number: string
          file_path?: string | null
          file_name?: string | null
          payment_id?: string | null
          issued_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          certificate_type?: 'total' | 'partial' | 'english'
          purpose?: string | null
          career_ids?: Json
          certificate_number?: string
          file_path?: string | null
          file_name?: string | null
          payment_id?: string | null
          issued_at?: string
        }
      }
      notices: {
        Row: {
          id: string
          category: 'system' | 'policy' | 'feature' | 'fee' | 'maintenance'
          title: string
          content: string
          is_important: boolean
          view_count: number
          author: string
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category: 'system' | 'policy' | 'feature' | 'fee' | 'maintenance'
          title: string
          content: string
          is_important?: boolean
          view_count?: number
          author?: string
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: 'system' | 'policy' | 'feature' | 'fee' | 'maintenance'
          title?: string
          content?: string
          is_important?: boolean
          view_count?: number
          author?: string
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      downloads: {
        Row: {
          id: string
          category: 'forms' | 'guides' | 'samples' | 'legal'
          title: string
          description: string | null
          file_path: string
          file_name: string
          file_size: number
          download_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category: 'forms' | 'guides' | 'samples' | 'legal'
          title: string
          description?: string | null
          file_path: string
          file_name: string
          file_size: number
          download_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: 'forms' | 'guides' | 'samples' | 'legal'
          title?: string
          description?: string | null
          file_path?: string
          file_name?: string
          file_size?: number
          download_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      system_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: string | null
          description: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value?: string | null
          description?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: string | null
          description?: string | null
          updated_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          target_type: string | null
          target_id: string | null
          details: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          target_type?: string | null
          target_id?: string | null
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          target_type?: string | null
          target_id?: string | null
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}