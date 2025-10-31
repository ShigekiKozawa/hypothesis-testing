export interface ExamRecord {
  examId: string;
  examTitle: string;
  grade: '3級' | '4級';
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  date: string;
}

const STORAGE_KEY = 'statistics-exam-records';
const MAX_RECORDS = 100;

export const saveExamRecord = (record: Omit<ExamRecord, 'date'>): void => {
  try {
    const records = getExamRecords();
    const newRecord: ExamRecord = {
      ...record,
      date: new Date().toISOString()
    };
    
    records.unshift(newRecord);
    
    if (records.length > MAX_RECORDS) {
      records.splice(MAX_RECORDS);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error('Failed to save exam record:', error);
  }
};

export const getExamRecords = (): ExamRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get exam records:', error);
    return [];
  }
};

export const getRecordsByGrade = (grade: '3級' | '4級'): ExamRecord[] => {
  return getExamRecords().filter(record => record.grade === grade);
};

export const getRecordsByExam = (examId: string): ExamRecord[] => {
  return getExamRecords().filter(record => record.examId === examId);
};

export const getBestScore = (examId: string): ExamRecord | null => {
  const records = getRecordsByExam(examId);
  if (records.length === 0) return null;
  
  return records.reduce((best, current) => 
    current.percentage > best.percentage ? current : best
  );
};

export const clearAllRecords = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear exam records:', error);
  }
};

export const getStorageInfo = (): { used: number; available: number } => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const used = data ? new Blob([data]).size : 0;
    const available = 5 * 1024 * 1024;
    return { used, available };
  } catch {
    return { used: 0, available: 5 * 1024 * 1024 };
  }
};

