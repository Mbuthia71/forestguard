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
      alerts: {
        Row: {
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
    }
    Enums: {
      alert_severity: "low" | "medium" | "high" | "critical"
      alert_source: "satellite" | "iot_sensor" | "blockchain_report"
      app_role: "admin" | "moderator" | "user"
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
      alert_severity: ["low", "medium", "high", "critical"],
      alert_source: ["satellite", "iot_sensor", "blockchain_report"],
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
