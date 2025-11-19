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
      admin_forum_comments: {
        Row: {
          comment_text: string
          created_at: string | null
          created_by: string
          id: string
          thread_id: string
        }
        Insert: {
          comment_text: string
          created_at?: string | null
          created_by: string
          id?: string
          thread_id: string
        }
        Update: {
          comment_text?: string
          created_at?: string | null
          created_by?: string
          id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_forum_comments_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "admin_forum_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_forum_threads: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_messages: {
        Row: {
          channel: string
          created_at: string | null
          created_by: string
          id: string
          message_text: string
        }
        Insert: {
          channel?: string
          created_at?: string | null
          created_by: string
          id?: string
          message_text: string
        }
        Update: {
          channel?: string
          created_at?: string | null
          created_by?: string
          id?: string
          message_text?: string
        }
        Relationships: []
      }
      alerts: {
        Row: {
          action_notes: string | null
          action_status: Database["public"]["Enums"]["action_status"] | null
          action_taken_by: string | null
          action_timestamp: string | null
          created_at: string
          description: string | null
          id: string
          latitude: number | null
          location: string
          longitude: number | null
          metadata: Json | null
          severity: Database["public"]["Enums"]["alert_severity"]
          source: Database["public"]["Enums"]["alert_source"]
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          action_notes?: string | null
          action_status?: Database["public"]["Enums"]["action_status"] | null
          action_taken_by?: string | null
          action_timestamp?: string | null
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          location: string
          longitude?: number | null
          metadata?: Json | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          source: Database["public"]["Enums"]["alert_source"]
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          action_notes?: string | null
          action_status?: Database["public"]["Enums"]["action_status"] | null
          action_taken_by?: string | null
          action_timestamp?: string | null
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          location?: string
          longitude?: number | null
          metadata?: Json | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          source?: Database["public"]["Enums"]["alert_source"]
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      blockchain_reports: {
        Row: {
          action_notes: string | null
          action_status: Database["public"]["Enums"]["action_status"] | null
          action_taken_by: string | null
          action_timestamp: string | null
          blockchain_tx_hash: string | null
          coordinates_text: string | null
          created_at: string
          description: string
          evidence_url: string | null
          id: string
          ipfs_hash: string | null
          latitude: number | null
          location: string
          location_name: string | null
          longitude: number | null
          reporter_anonymous_id: string | null
          verified: boolean | null
        }
        Insert: {
          action_notes?: string | null
          action_status?: Database["public"]["Enums"]["action_status"] | null
          action_taken_by?: string | null
          action_timestamp?: string | null
          blockchain_tx_hash?: string | null
          coordinates_text?: string | null
          created_at?: string
          description: string
          evidence_url?: string | null
          id?: string
          ipfs_hash?: string | null
          latitude?: number | null
          location: string
          location_name?: string | null
          longitude?: number | null
          reporter_anonymous_id?: string | null
          verified?: boolean | null
        }
        Update: {
          action_notes?: string | null
          action_status?: Database["public"]["Enums"]["action_status"] | null
          action_taken_by?: string | null
          action_timestamp?: string | null
          blockchain_tx_hash?: string | null
          coordinates_text?: string | null
          created_at?: string
          description?: string
          evidence_url?: string | null
          id?: string
          ipfs_hash?: string | null
          latitude?: number | null
          location?: string
          location_name?: string | null
          longitude?: number | null
          reporter_anonymous_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          action_notes: string | null
          action_status: Database["public"]["Enums"]["action_status"] | null
          action_taken_by: string | null
          action_timestamp: string | null
          blockchain_tx_hash: string | null
          created_at: string | null
          email: string
          id: string
          ipfs_hash: string | null
          message: string
          name: string
          status: string | null
        }
        Insert: {
          action_notes?: string | null
          action_status?: Database["public"]["Enums"]["action_status"] | null
          action_taken_by?: string | null
          action_timestamp?: string | null
          blockchain_tx_hash?: string | null
          created_at?: string | null
          email: string
          id?: string
          ipfs_hash?: string | null
          message: string
          name: string
          status?: string | null
        }
        Update: {
          action_notes?: string | null
          action_status?: Database["public"]["Enums"]["action_status"] | null
          action_taken_by?: string | null
          action_timestamp?: string | null
          blockchain_tx_hash?: string | null
          created_at?: string | null
          email?: string
          id?: string
          ipfs_hash?: string | null
          message?: string
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      field_reports: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          latitude: number
          longitude: number
          photos: Json | null
          ranger_id: string
          report_type: string
          severity: string | null
          status: string | null
          synced_at: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          latitude: number
          longitude: number
          photos?: Json | null
          ranger_id: string
          report_type: string
          severity?: string | null
          status?: string | null
          synced_at?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          latitude?: number
          longitude?: number
          photos?: Json | null
          ranger_id?: string
          report_type?: string
          severity?: string | null
          status?: string | null
          synced_at?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "field_reports_ranger_id_fkey"
            columns: ["ranger_id"]
            isOneToOne: false
            referencedRelation: "rangers"
            referencedColumns: ["id"]
          },
        ]
      }
      forest_alerts_kenya: {
        Row: {
          alert_type: string
          confidence_score: number | null
          created_at: string | null
          description: string
          evidence_image_url: string | null
          id: string
          location: string
          sensor_id: string | null
          timestamp: string | null
        }
        Insert: {
          alert_type: string
          confidence_score?: number | null
          created_at?: string | null
          description: string
          evidence_image_url?: string | null
          id?: string
          location: string
          sensor_id?: string | null
          timestamp?: string | null
        }
        Update: {
          alert_type?: string
          confidence_score?: number | null
          created_at?: string | null
          description?: string
          evidence_image_url?: string | null
          id?: string
          location?: string
          sensor_id?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forest_alerts_kenya_sensor_id_fkey"
            columns: ["sensor_id"]
            isOneToOne: false
            referencedRelation: "sensors_kenya"
            referencedColumns: ["id"]
          },
        ]
      }
      forest_summaries: {
        Row: {
          ai_summary: string | null
          created_at: string | null
          created_by: string | null
          id: string
          metrics: Json | null
          period_end: string
          period_start: string
          summary_type: string
        }
        Insert: {
          ai_summary?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          metrics?: Json | null
          period_end: string
          period_start: string
          summary_type: string
        }
        Update: {
          ai_summary?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          metrics?: Json | null
          period_end?: string
          period_start?: string
          summary_type?: string
        }
        Relationships: []
      }
      forest_zones: {
        Row: {
          area_hectares: number | null
          boundary_geojson: Json
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          area_hectares?: number | null
          boundary_geojson: Json
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          area_hectares?: number | null
          boundary_geojson?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pending_admin_approvals: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          display_name: string
          id: string
          requested_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          display_name: string
          id?: string
          requested_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          display_name?: string
          id?: string
          requested_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ranger_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          priority: string | null
          status: string | null
          title: string
          updated_at: string | null
          zone_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          zone_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ranger_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "rangers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ranger_tasks_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "forest_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      rangers: {
        Row: {
          assigned_zones: string[] | null
          created_at: string | null
          department: string | null
          employee_id: string | null
          id: string
          phone: string | null
          place_of_employment: string | null
          position: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assigned_zones?: string[] | null
          created_at?: string | null
          department?: string | null
          employee_id?: string | null
          id?: string
          phone?: string | null
          place_of_employment?: string | null
          position?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assigned_zones?: string[] | null
          created_at?: string | null
          department?: string | null
          employee_id?: string | null
          id?: string
          phone?: string | null
          place_of_employment?: string | null
          position?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      satellite_layers: {
        Row: {
          created_at: string | null
          date_captured: string
          file_url: string | null
          id: string
          layer_type: string
          metadata: Json | null
          name: string
          thumbnail_url: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          date_captured: string
          file_url?: string | null
          id?: string
          layer_type: string
          metadata?: Json | null
          name: string
          thumbnail_url?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          date_captured?: string
          file_url?: string | null
          id?: string
          layer_type?: string
          metadata?: Json | null
          name?: string
          thumbnail_url?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      sensor_data: {
        Row: {
          battery_level: number | null
          created_at: string
          humidity: number | null
          id: string
          location: string
          motion_detected: boolean | null
          node_id: string
          signal_strength: number | null
          sound_detected: boolean | null
          temperature: number | null
        }
        Insert: {
          battery_level?: number | null
          created_at?: string
          humidity?: number | null
          id?: string
          location: string
          motion_detected?: boolean | null
          node_id: string
          signal_strength?: number | null
          sound_detected?: boolean | null
          temperature?: number | null
        }
        Update: {
          battery_level?: number | null
          created_at?: string
          humidity?: number | null
          id?: string
          location?: string
          motion_detected?: boolean | null
          node_id?: string
          signal_strength?: number | null
          sound_detected?: boolean | null
          temperature?: number | null
        }
        Relationships: []
      }
      sensors_kenya: {
        Row: {
          battery_level: number | null
          created_at: string | null
          forest_name: string
          gps_location: string
          id: string
          last_seen: string | null
          latitude: number | null
          longitude: number | null
          purpose: string
          sensor_type: string
          status: string
          zone_name: string
        }
        Insert: {
          battery_level?: number | null
          created_at?: string | null
          forest_name: string
          gps_location: string
          id?: string
          last_seen?: string | null
          latitude?: number | null
          longitude?: number | null
          purpose: string
          sensor_type: string
          status?: string
          zone_name: string
        }
        Update: {
          battery_level?: number | null
          created_at?: string | null
          forest_name?: string
          gps_location?: string
          id?: string
          last_seen?: string | null
          latitude?: number | null
          longitude?: number | null
          purpose?: string
          sensor_type?: string
          status?: string
          zone_name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      webauthn_credentials: {
        Row: {
          counter: number
          created_at: string | null
          credential_id: string
          id: string
          last_used_at: string | null
          public_key: string
          transports: string[] | null
          user_id: string
        }
        Insert: {
          counter?: number
          created_at?: string | null
          credential_id: string
          id?: string
          last_used_at?: string | null
          public_key: string
          transports?: string[] | null
          user_id: string
        }
        Update: {
          counter?: number
          created_at?: string | null
          credential_id?: string
          id?: string
          last_used_at?: string | null
          public_key?: string
          transports?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_master_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      action_status:
        | "received"
        | "under_review"
        | "in_progress"
        | "resolved"
        | "ignored"
      alert_severity: "low" | "medium" | "high" | "critical"
      alert_source: "satellite" | "iot_sensor" | "blockchain_report"
      app_role: "admin" | "moderator" | "user"
      user_role_type: "admin" | "ranger" | "stakeholder"
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
    Enums: {
      action_status: [
        "received",
        "under_review",
        "in_progress",
        "resolved",
        "ignored",
      ],
      alert_severity: ["low", "medium", "high", "critical"],
      alert_source: ["satellite", "iot_sensor", "blockchain_report"],
      app_role: ["admin", "moderator", "user"],
      user_role_type: ["admin", "ranger", "stakeholder"],
    },
  },
} as const
