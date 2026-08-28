import { useRef, useState } from "react";

export default function SponsorsBanner() {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  const addFiles = (fileList) => {
    setFiles((prev) => [...prev, ...Array.from(fileList)]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = "";
  };

  return (
    <section className="countdown-banner countdown-banner-intro sponsors-banner">
      <p className="countdown-title">Vous souhaitez nous aider ?</p>
      <p className="sponsors-text">
        Proposez un spot publicitaire pour votre entreprise en échange d'une subvention.
        <br />
        Déposez votre fichier ci-dessous, notre équipe vous recontactera.
      </p>

      <div
        className={`sponsors-dropzone ${dragActive ? "drag-active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*,.pdf"
          multiple
          hidden
          onChange={handleChange}
        />
        <span className="sponsors-dropzone-title">Glissez-déposez votre fichier ici</span>
        <span className="sponsors-dropzone-sub">ou cliquez pour parcourir (image, vidéo, PDF)</span>
      </div>

      {files.length > 0 && (
        <ul className="sponsors-file-list">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`}>✓ {file.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
