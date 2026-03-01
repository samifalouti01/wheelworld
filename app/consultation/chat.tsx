/**
 * Priority Consultant Chat screen – dark mode aware
 */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Fonts, Radius } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";

/* ── Mock messages ─────────────────────────────────────── */
type Message = {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
  file?: { name: string; size: string };
};

const MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hello Amine, I've reviewed the Q3 financial data for the Algiers expansion project.",
    sender: "them",
    time: "09:12 AM",
  },
  {
    id: "2",
    text: "Here is the preliminary risk assessment report we discussed.",
    sender: "me",
    time: "09:14 AM",
    file: { name: "Risk_Assessment_v2.pdf", size: "2.4MB • PDF" },
  },
  {
    id: "3",
    text: "Thanks Sarah. Does this account for the new regulatory changes announced last week?",
    sender: "me",
    time: "09:15 AM",
  },
  {
    id: "4",
    text: "I'll need to present this to the board tomorrow morning.",
    sender: "me",
    time: "09:15 AM",
  },
];

const QUICK_ACTIONS = ["Book Meeting", "Request Report"];

/* ── Component ─────────────────────────────────────────── */
export default function ChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();
  const [message, setMessage] = useState("");

  const surface = isDark ? colors.surface : "#F5F6F8";

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender === "me";
    return (
      <View
        style={[
          styles.bubble,
          isMe
            ? [styles.bubbleMe, { backgroundColor: colors.tint }]
            : [styles.bubbleThem, { backgroundColor: surface }],
        ]}
      >
        <Text
          style={[
            styles.bubbleText,
            isMe ? styles.bubbleTextMe : { color: colors.text },
          ]}
        >
          {item.text}
        </Text>
        {item.file && (
          <View style={styles.fileCard}>
            <Ionicons name="document-outline" size={20} color="#EF4444" />
            <View style={{ marginLeft: 8, flex: 1 }}>
              <Text style={styles.fileName}>{item.file.name}</Text>
              <Text style={styles.fileSize}>{item.file.size}</Text>
            </View>
          </View>
        )}
        <Text
          style={[
            styles.timeText,
            isMe
              ? {
                  color: "rgba(255,255,255,0.7)",
                  alignSelf: "flex-end" as const,
                }
              : {
                  color: colors.textSecondary,
                  alignSelf: "flex-start" as const,
                },
          ]}
        >
          {item.time}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      {/* Header */}
      <View
        style={[
          styles.headerRow,
          { borderBottomColor: isDark ? colors.border : "#F0F0F0" },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: surface }]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.headerCenter}>
          <View style={styles.headerAvatar}>
            <Ionicons name="person" size={16} color="#fff" />
          </View>
          <View>
            <Text style={[styles.headerName, { color: colors.text }]}>
              Sarah M.
            </Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>
              Strategist
            </Text>
          </View>
        </View>
        <View style={styles.headerBadges}>
          <View style={styles.onlineBadge}>
            <View style={[styles.greenDot, { backgroundColor: colors.tint }]} />
            <Text
              style={{ fontSize: 11, color: colors.tint, fontWeight: "600" }}
            >
              Online
            </Text>
          </View>
          <View style={[styles.encryptedBadge, { backgroundColor: surface }]}>
            <Ionicons
              name="lock-closed"
              size={10}
              color={colors.textSecondary}
            />
            <Text
              style={[styles.encryptedText, { color: colors.textSecondary }]}
            >
              ENCRYPTED
            </Text>
          </View>
        </View>
      </View>

      {/* Date divider */}
      <View style={styles.dateDivider}>
        <View
          style={[
            styles.dateLine,
            { backgroundColor: isDark ? colors.border : "#E5E7EB" },
          ]}
        />
        <Text style={[styles.dateText, { color: colors.textSecondary }]}>
          Today, Oct 24
        </Text>
        <View
          style={[
            styles.dateLine,
            { backgroundColor: isDark ? colors.border : "#E5E7EB" },
          ]}
        />
      </View>

      {/* Messages */}
      <FlatList
        data={MESSAGES}
        keyExtractor={(m) => m.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
      />

      {/* Quick actions */}
      <View style={styles.quickActionsRow}>
        {QUICK_ACTIONS.map((a) => (
          <Pressable
            key={a}
            style={[
              styles.quickAction,
              { borderColor: isDark ? colors.border : "#E5E7EB" },
            ]}
          >
            <Ionicons
              name={
                a === "Book Meeting" ? "calendar-outline" : "document-outline"
              }
              size={14}
              color={colors.tint}
            />
            <Text style={[styles.quickActionText, { color: colors.text }]}>
              {a}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Input bar */}
      <View
        style={[
          styles.inputBar,
          {
            paddingBottom: Math.max(insets.bottom, 12),
            borderTopColor: isDark ? colors.border : "#F0F0F0",
          },
        ]}
      >
        <Pressable>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={colors.textSecondary}
          />
        </Pressable>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: surface, color: colors.text },
          ]}
          placeholder="Type a message…"
          placeholderTextColor={colors.textSecondary}
          value={message}
          onChangeText={setMessage}
        />
        <Pressable>
          <Ionicons name="mic-outline" size={22} color={colors.textSecondary} />
        </Pressable>
        <Pressable style={[styles.sendBtn, { backgroundColor: colors.tint }]}>
          <Ionicons name="send" size={18} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerCenter: { flexDirection: "row", alignItems: "center", flex: 1 },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2D3748",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerName: { fontSize: 16, fontWeight: "700", fontFamily: Fonts.sans },
  headerBadges: { alignItems: "flex-end", gap: 4 },
  onlineBadge: { flexDirection: "row", alignItems: "center", gap: 4 },
  greenDot: { width: 7, height: 7, borderRadius: 4 },
  encryptedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  encryptedText: { fontSize: 9, fontWeight: "700", letterSpacing: 0.5 },
  dateDivider: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  dateLine: { flex: 1, height: 1 },
  dateText: { marginHorizontal: 12, fontSize: 12, fontWeight: "500" },
  messageList: { paddingHorizontal: 16, paddingBottom: 8 },
  bubble: { maxWidth: "80%", padding: 12, borderRadius: 18, marginBottom: 8 },
  bubbleMe: { alignSelf: "flex-end", borderBottomRightRadius: 4 },
  bubbleThem: { alignSelf: "flex-start", borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTextMe: { color: "#fff" },
  timeText: { fontSize: 10, marginTop: 4 },
  fileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  fileName: { fontSize: 13, fontWeight: "600", color: "#fff" },
  fileSize: { fontSize: 11, color: "rgba(255,255,255,0.7)" },
  quickActionsRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quickAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  quickActionText: { fontSize: 13, fontWeight: "600" },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: Radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
