export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          active: boolean
          created_at: string
          email: string
          id: string
          name: string | null
          password_hash: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          email: string
          id?: string
          name?: string | null
          password_hash: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          password_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          published: boolean
          published_at: string | null
          read_time: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          published?: boolean
          published_at?: string | null
          read_time?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          published?: boolean
          published_at?: string | null
          read_time?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          budget: string | null
          created_at: string
          email: string
          email_sent: boolean | null
          id: string
          message: string
          name: string
          service_interest: string | null
          source: string | null
          timeline: string | null
        }
        Insert: {
          budget?: string | null
          created_at?: string
          email: string
          email_sent?: boolean | null
          id?: string
          message: string
          name: string
          service_interest?: string | null
          source?: string | null
          timeline?: string | null
        }
        Update: {
          budget?: string | null
          created_at?: string
          email?: string
          email_sent?: boolean | null
          id?: string
          message?: string
          name?: string
          service_interest?: string | null
          source?: string | null
          timeline?: string | null
        }
        Relationships: []
      }
      discovery_submissions: {
        Row: {
          confidence: string | null
          created_at: string
          email: string
          email_sent: boolean | null
          engagement_tier: string | null
          full_name: string
          generated_brief: string | null
          id: string
          polished_brief: string | null
          practice_name: string | null
          quality_flags: string[] | null
          quality_score: number | null
          reference_image_urls: string[] | null
          responses: Json
          services: string[] | null
        }
        Insert: {
          confidence?: string | null
          created_at?: string
          email: string
          email_sent?: boolean | null
          engagement_tier?: string | null
          full_name: string
          generated_brief?: string | null
          id?: string
          polished_brief?: string | null
          practice_name?: string | null
          quality_flags?: string[] | null
          quality_score?: number | null
          reference_image_urls?: string[] | null
          responses: Json
          services?: string[] | null
        }
        Update: {
          confidence?: string | null
          created_at?: string
          email?: string
          email_sent?: boolean | null
          engagement_tier?: string | null
          full_name?: string
          generated_brief?: string | null
          id?: string
          polished_brief?: string | null
          practice_name?: string | null
          quality_flags?: string[] | null
          quality_score?: number | null
          reference_image_urls?: string[] | null
          responses?: Json
          services?: string[] | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          cta_label: string | null
          id: string
          inclusions: string[] | null
          problem: string | null
          result: string | null
          slug: string
          solution: string | null
          summary: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          cta_label?: string | null
          id?: string
          inclusions?: string[] | null
          problem?: string | null
          result?: string | null
          slug: string
          solution?: string | null
          summary?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          cta_label?: string | null
          id?: string
          inclusions?: string[] | null
          problem?: string | null
          result?: string | null
          slug?: string
          solution?: string | null
          summary?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      work: {
        Row: {
          body: string | null
          created_at: string | null
          featured: boolean | null
          gallery: Json | null
          hero_media: Json | null
          id: string
          industry: string
          metrics: Json | null
          slug: string
          summary: string | null
          tech: string[] | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          featured?: boolean | null
          gallery?: Json | null
          hero_media?: Json | null
          id?: string
          industry: string
          metrics?: Json | null
          slug: string
          summary?: string | null
          tech?: string[] | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string | null
          featured?: boolean | null
          gallery?: Json | null
          hero_media?: Json | null
          id?: string
          industry?: string
          metrics?: Json | null
          slug?: string
          summary?: string | null
          tech?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
