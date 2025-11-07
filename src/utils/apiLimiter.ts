// Gemini API使用量制限管理
// Gemini 2.5 Pro の制限:
// - RPM (1分あたりのリクエスト): 2
// - TPM (1分あたりのトークン): 125,000
// - RPD (1日あたりのリクエスト): 50回
// ユーザー制限: 1日10回

const STORAGE_KEY_USAGE = 'gemini_api_usage';
const DAILY_LIMIT_PER_USER = 10; // 1日あたり10回
const MINUTE_LIMIT = 2; // 1分あたり2回
const API_RPD_LIMIT = 50; // API全体の1日制限

export interface UsageRecord {
  timestamp: number;
  date: string; // YYYY-MM-DD形式
}

export interface UsageStats {
  today: number; // 今日の使用回数
  lastMinute: number; // 直近1分の使用回数
  remaining: number; // 残り使用可能回数
  nextResetTime: Date; // 次のリセット時刻（翌日0時）
}

function getTodayDateString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getUsageRecords(): UsageRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_USAGE);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('使用履歴の読み込みエラー:', error);
    return [];
  }
}

function saveUsageRecords(records: UsageRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_USAGE, JSON.stringify(records));
  } catch (error) {
    console.error('使用履歴の保存エラー:', error);
  }
}

function cleanOldRecords(records: UsageRecord[]): UsageRecord[] {
  const today = getTodayDateString();
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  
  return records.filter(record => {
    return record.date === today || record.timestamp > oneDayAgo;
  });
}

export function getUsageStats(): UsageStats {
  const records = cleanOldRecords(getUsageRecords());
  const today = getTodayDateString();
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;

  const todayCount = records.filter(r => r.date === today).length;
  const lastMinuteCount = records.filter(r => r.timestamp > oneMinuteAgo).length;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return {
    today: todayCount,
    lastMinute: lastMinuteCount,
    remaining: Math.max(0, DAILY_LIMIT_PER_USER - todayCount),
    nextResetTime: tomorrow,
  };
}

export function canMakeRequest(): {
  allowed: boolean;
  reason?: string;
  waitTime?: number; // ミリ秒
} {
  const stats = getUsageStats();

  if (stats.today >= DAILY_LIMIT_PER_USER) {
    const hoursUntilReset = Math.ceil((stats.nextResetTime.getTime() - Date.now()) / (1000 * 60 * 60));
    return {
      allowed: false,
      reason: `本日の使用制限（${DAILY_LIMIT_PER_USER}回）に達しました。${hoursUntilReset}時間後にリセットされます。`,
    };
  }

  if (stats.lastMinute >= MINUTE_LIMIT) {
    return {
      allowed: false,
      reason: `1分あたりの制限（${MINUTE_LIMIT}回）に達しました。しばらく待ってから再試行してください。`,
      waitTime: 60 * 1000, // 60秒
    };
  }

  return { allowed: true };
}

export function recordUsage(): void {
  const records = cleanOldRecords(getUsageRecords());
  const newRecord: UsageRecord = {
    timestamp: Date.now(),
    date: getTodayDateString(),
  };
  
  records.push(newRecord);
  saveUsageRecords(records);
}

export function resetUsage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_USAGE);
    console.log('使用履歴をリセットしました');
  } catch (error) {
    console.error('使用履歴のリセットエラー:', error);
  }
}

export function getUsageSummary(): string {
  const stats = getUsageStats();

  return `今日の使用回数: ${stats.today}/${DAILY_LIMIT_PER_USER}回（残り${stats.remaining}回） | リセット: 翌日0:00`;
}

export const LIMITS = {
  DAILY_LIMIT_PER_USER,
  MINUTE_LIMIT,
  API_RPD_LIMIT,
} as const;

