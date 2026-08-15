import { useRef, useState } from 'react';
import { HiOutlineCamera } from 'react-icons/hi2';
import Avatar from '../common/Avatar';

export default function ProfileEditor({ currentImage, name, onImageChange, isUploading }) {
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => onImageChange(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative group inline-block">
      <Avatar src={currentImage} name={name} size="xl" />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={isUploading}
        className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-wait"
      >
        {isUploading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <HiOutlineCamera className="w-7 h-7 text-white" />
        )}
      </button>
      <input
        type="file"
        ref={fileRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
}
