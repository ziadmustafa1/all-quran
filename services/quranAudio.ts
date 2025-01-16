export const getRecitationAudio = async (chapterId: number) => {
  try {
    const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${chapterId}`);
    const data = await response.json();
    
    if (data.audio_files) {
      return data.audio_files.map((file: any) => ({
        id: file.id,
        chapterId: file.chapter_id,
        audioUrl: file.audio_url,
        fileSize: file.file_size,
        format: file.format,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching recitation audio:', error);
    return [];
  }
}; 