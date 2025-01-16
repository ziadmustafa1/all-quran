const SuraAudioPlayer = ({ audioFiles }) => {
  return (
    <div>
      {audioFiles.map(file => (
        <div key={file.id}>
          <audio controls>
            <source src={file.audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <p>{`سورة ${file.chapterId}`}</p>
        </div>
      ))}
    </div>
  );
}; 